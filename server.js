var beefy = require('beefy'),
	http = require('http')

http.createServer(beefy({
    entries: ['./public/scripts/main.js'],
	cwd: './public/',
	quiet: false
})).listen(8124);
