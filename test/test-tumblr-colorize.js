var childProcess = require('child_process')
  , fs = require('fs')
  , fse = require('fs-extra');

exports['outputs file'] = function (test) {
    test.expect(1);
	
	childProcess.exec('node index.js 0', function(err, stdin, stdout) {
		test.ok(fs.existsSync('build/tumblr.user.css'), 'output build file exists');
		
		test.done();
		fse.remove('build');
	});
};

exports['outputs file when given different directory'] = function (test) {
    test.expect(1);
	
	childProcess.exec('node index.js 0 --file=build_test/nodeunit.fakepath', function(err, stdin, stdout) {
		test.ok(fs.existsSync('build_test/nodeunit.fakepath'), 'output build file exists');
		
		test.done();
		fse.remove('build_test');
	});
};

exports['correct color calculations'] = {
	"red": function (test) {
		test.expect(8);
		
		childProcess.exec('node index.js 0', function(err, stdin, stdout) {
			test.ok(fs.existsSync('build/tumblr.user.css'), 'output build file exists');
			fs.readFile('build/tumblr.user.css', 'utf8', function (err, data) {
			  test.ifError(err, 'read file correctly');
			  
			  test.ok(data.indexOf('background: #612c2c') > 0, '@body-color calculated correctly');
			  test.ok(data.indexOf('background-color: #380a0a;') > 0, '@avatar-color calculated correctly');
			  test.ok(data.indexOf('text-shadow: #421313') > 0, '@shadow-color calculated correctly');
			  test.ok(data.indexOf('background-image: linear-gradient(top, #cc7272 0%, #c26767 50%, #bd5e5e 50%, #b35454 100%);') > 0, 'fan mail gradient calculated correctly');
			  test.ok(data.indexOf('background-color: rgba(153, 132, 132, 0.9);') > 0, '@count-color:hover calculated correctly');
			  test.ok(data.indexOf('color: #ab7b7b;') > 0, '@footer-color calculated correctly');
			  
			  test.done();
			  fse.remove('build');
			});
			
		});
	},
	"blue": function (test) {
		test.expect(8);
		
		childProcess.exec('node index.js 210', function(err, stdin, stdout) {
			test.ok(fs.existsSync('build/tumblr.user.css'), 'output build file exists');
			fs.readFile('build/tumblr.user.css', 'utf8', function (err, data) {
			  test.ifError(err, 'read file correctly');
			  
			  test.ok(data.indexOf('background: #2c4661') > 0, '@body-color calculated correctly');
			  test.ok(data.indexOf('background-color: #0a2138;') > 0, '@avatar-color calculated correctly');
			  test.ok(data.indexOf('text-shadow: #132b42') > 0, '@shadow-color calculated correctly');
			  test.ok(data.indexOf('background-image: linear-gradient(top, #729fcc 0%, #6794c2 50%, #5e8ebd 50%, #5483b3 100%);') > 0, 'fan mail gradient calculated correctly');
			  test.ok(data.indexOf('background-color: rgba(132, 142, 153, 0.9);') > 0, '@count-color:hover calculated correctly');
			  test.ok(data.indexOf('color: #7b93ab;') > 0, '@footer-color calculated correctly');
			  
			  test.done();
			  fse.remove('build');
			});
			
		});
	},
	"bright pink (saturation and value)": function (test) {
		test.expect(8);
		
		childProcess.exec('node index.js 330 --value=50 -s 50', function(err, stdin, stdout) {
			test.ok(fs.existsSync('build/tumblr.user.css'), 'output build file exists');
			fs.readFile('build/tumblr.user.css', 'utf8', function (err, data) {
			  test.ifError(err, 'read file correctly');
			  
			  test.ok(data.indexOf('background: #e0006b') > 0, '@body-color calculated correctly');
			  test.ok(data.indexOf('background-color: #b8003e;') > 0, '@avatar-color calculated correctly');
			  test.ok(data.indexOf('text-shadow: #c2004d') > 0, '@shadow-color calculated correctly');
			  test.ok(data.indexOf('background-image: linear-gradient(top, #ff14b0 0%, #ff0aa5 50%, #ff009e 50%, #ff0094 100%);') > 0, 'fan mail gradient calculated correctly');
			  test.ok(data.indexOf('background-color: rgba(281, 101, 191, 0.9);') > 0, '@count-color:hover calculated correctly');
			  test.ok(data.indexOf('color: #ff42b6;') > 0, '@footer-color calculated correctly');
			  
			  test.done();
			  fse.remove('build');
			});
			
		});
	}
};