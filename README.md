Tumblr Colorizer
================
A simple way to color Tumblr any way you want.

[![Build Status](https://travis-ci.org/Tylian/tumblr-colorize-node.png?branch=master)](https://travis-ci.org/Tylian/tumblr-colorize-node)

Usage
-----

1. Clone the repo
2. Download and install nodejs and npm if you don't have them.
3. Change to the directory to the of the node script.
4. Install the required modules
        
		npm install
		
5. Run `node .` to get help with the script
6. Generate the css file as you see fit.

        Example: node . 0 --value=+20
		or
		index.js 0 --value=+20
	
7. Load the generated user script with Stylish, or something.
8. For Google Chrome's Stylish, you will have to add the following rules to the script for it to function correctly:
    * *URLs starting with:* http://tumblr.com
	* *URLs starting with:* http://www.tumblr.com
	* *URLs starting with:* https://tumblr.com
	* *URLs starting with:* https://www.tumblr.com