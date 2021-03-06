#!/usr/bin/env node

var Canvas = require('canvas')
  , color = require('onecolor')
  , less = require('less')
  , fs = require('fs')
  , fse = require('fs-extra')
  , path = require('path');

var argv = require('optimist')
		.usage('Generate a Tumblr colorization with a specifiv HSV value.\nUsage: $0 hue [-s saturation] [-v value] [--file=path/to/output.user.css]')
		.demand(1)
		.alias({'h': 'hue', 's': 'saturation', 'v': 'value'})
		.describe({
			'h': 'Base hue of theme, from 0 to 360.', 
			's': 'Saturation to shift the theme by. Integer, can be negative.',
			'v': 'Value to shift the theme by. Integer, can be negative.',
			'file': 'Path to output the file.', 
			'userstyle': 'Should userstyle specific content be added to the file?'
		})
		.default({'s': 0, 'v': 0, 'file': 'build/tumblr.user.css', 'userstyle': false})
		.argv;

var hue = argv._[0];

// Generate gradient image data urls
var background = createGradient(553, hsvHex(hue, 51, 46), hsvHex(hue, 55, 38));
var loading = createGradient(100, hsvHex(hue, 60, 27), hsvHex(hue, 57, 30));

// Generate the LESS file with HSV variables
var content =  [
	'/*',
	'Name: Tumblr Colorized to HSV(' + hue + ', ' + showSign(argv.saturation) + ', ' + showSign(argv.value) + ')',
	'Version: 0.4',
	'*/',
	''
];

if(argv.userstyle) {
	content.push(
		'@namespace url(http://www.w3.org/1999/xhtml);',
		'',
		'@-moz-document  url-prefix("http://tumblr.com"), url-prefix("https://tumblr.com"), url-prefix("http://www.tumblr.com"), url-prefix("https://www.tumblr.com") {'
	);
}

content.push(
	'@import "less/tumblr.less";',
	"@hue: " + hue + ";",
	"@saturation: " + argv.saturation + ";",
	"@value: " + argv.value + ";",
	"@background-url: \"" + background + '";',
	"@loading-url: \"" + loading + '";'
)

if(argv.userstyle) {
	content.push('}');
}

// Render the LESS file and write the result to disk
less.render(content.join('\n'), function (err, css) {
	if(err) { return console.error(err) }
	fse.mkdirsSync(path.dirname(argv.file));
	fs.writeFile(argv.file, css, function(err, written, buffer) {
		if(err) { return console.error(err); }
		console.log('Success! Wrote output to %s', argv.file);
	});
});



/*
	Helper functions
*/

// Generates a 1xHeight pixel linear gradient png data url
function createGradient(height, start, stop) {
	var canvas = new Canvas(1, height);
	var ctx = canvas.getContext('2d');
	
	var gradient = ctx.createLinearGradient(0, 0, 1, height);
	gradient.addColorStop(0, start);
	gradient.addColorStop(1, stop);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 1, height);
	
	return canvas.toDataURL('image/png');
}

// Covnvers a HSV value into a hex value.
function hsvHex(h, s, v) {
	return color(['HSV', h / 360, (s + argv.saturation) / 100, (v + argv.value) / 100, 1]).hex();
}

// Adds a positive sign to a number if it's needed.
function showSign(value) {
	if(value >= 0) return "+" + value;
	return value.toString(10);
}