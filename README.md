what-happened
=============

Digs into the nested dependency tree for the current package and prints out each package sorted by release date.

Use this script to determine which recent patch broke a project that has not been shrinkwrapped.

Install
-------

	npm install

Usage
-----

Run the script in a working directory with a package.json file

	node /path/to/what-happened.js

Every found dependency will be printed to the screen by ascending patch release date.

Use the built-in `npm ls` to see where each dependency fits into the tree.
