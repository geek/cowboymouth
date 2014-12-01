// Load modules

var Stream = require('stream');
var Code = require('code');
var Lab = require('lab');
var Mouth = require('../');


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Cowboy Mouth', function () {

    it('emits parsed sensor data when a sensor sends data', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.on('addon', function (data) {

            expect(data.boardId).to.equal('12');
            done();
        });

        stream.write('12;6;0;0;3;1.4\n');
    });
});