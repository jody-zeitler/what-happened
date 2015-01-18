#!/usr/bin/env node

/**
 * what-happened
 * Copyright (c) 2015 Jody Zeitler
 * Released under the MIT license
 *
 * Digs into the nested dependency tree for the current package and
 * prints out each package sorted by release date.
 */

var npm = require('npm'),
	_ = require('lodash');

npm.load({}, function() {
	var packageList = [];
	var packageCounter = 0;

	function done() {
		if (--packageCounter <= 0) {
			var sortedList = _.sortBy(packageList, function (pkg) {
				return pkg.created;
			});
			_.each(sortedList, function (pkg) {
				console.log(pkg.created + " ::: " + pkg.name + "@" + pkg.version);
			});
		}
	}

	function pushInfo(name, version) {
		packageCounter++;
		var nameVersion = name + "@" + version;
		npm.commands.view([nameVersion, "time"], true, function (err, data) {
			var ver = data && data[version];
			var times = ver && ver["time"];
			var created = times && times[version];
			if (created) {
				packageList.push({name: name, version: version, created: created});
			}
			done();
		});
	}

	function digPackage(pkg) {
		pushInfo(pkg.name, pkg.version);
		_.each(pkg.dependencies, digPackage);
	}

	npm.commands.ls([], true, function (err, data, lite) {
		digPackage(data);
	});
});
