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

    it('emits addon when an addon is registered', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('addon', function (data) {

            expect(data.boardId).to.equal(12);
            done();
        });

        stream.write('12;6;0;0;3;1.4\n');
    });

    it('converts a friendly command to a serial command', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        var command = {
            boardId: 1,
            addonId: 3,
            type: 'light_switch',
            value: true
        };

        stream.once('data', function (data) {

            expect(data.toString()).to.equal('1;3;1;0;2;1\n');
            done();
        });

        mouth.sendCommand(command);
    });

    it('converts addon data to a friendly reading', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('reading', function (reading) {

            expect(reading.boardId).to.equal(1);
            expect(reading.value).to.equal(true);
            expect(reading.type).to.equal('movement');
            expect(reading.time).to.exist();
            done();
        });

        stream.write('1;3;1;0;16;1\n');
    });

    it('converts addon data to a friendly reading when movement stops', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('reading', function (reading) {

            expect(reading.boardId).to.equal(1);
            expect(reading.value).to.equal(false);
            expect(reading.type).to.equal('movement');
            expect(reading.time).to.exist();
            done();
        });

        stream.write('1;3;1;0;16;0\n');
    });

    it('emits battery level', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('battery', function (battery) {

            expect(battery.boardId).to.equal(1);
            expect(battery.level).to.equal(30.0);
            done();
        });

        stream.write('1;3;3;0;0;30\n');
    });

    it('emits sketch version', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('version', function (sketch) {

            expect(sketch.boardId).to.equal(1);
            expect(sketch.version).to.equal('1.3');
            done();
        });

        stream.write('1;3;3;0;12;1.3\n');
    });

    it('emits sketch name', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('name', function (sketch) {

            expect(sketch.boardId).to.equal(1);
            expect(sketch.name).to.equal('my test');
            done();
        });

        stream.write('1;3;3;0;11;my test\n');
    });

    it('emits log message', function (done) {

        var stream = new Stream.PassThrough();

        var mouth = new Mouth(stream);
        mouth.once('log', function (log) {

            expect(log.boardId).to.equal(1);
            expect(log.message).to.equal('my test');
            expect(log.time).to.exist();
            done();
        });

        stream.write('1;3;3;0;9;my test\n');
    });
});