// Load modules

var Events = require('events');
var Hoek = require('hoek');
var Sensors = require('sensors');
var Addons = require('./addons');
var Readings = require('./readings');


// Declare internals

var internals = {
    defaults: {
        gatewayId: 255,
        gatewayChildId: 255,
        unit: 'metric'
    },
    allowedTypes: ['internal', 'set', 'req', 'presentation', 'stream']
};


module.exports = internals.Mouth = function (stream, options) {

    Hoek.assert(this.constructor === internals.Mouth, 'must be constructed with new');
    Hoek.assert(stream && stream.readable && stream.write, 'A readable and writable stream is required');

    this._settings = Hoek.applyToDefaults(internals.defaults, options || {});
    this._stream = stream;

    Events.EventEmitter.call(this);

    stream.on('data', this._readData.bind(this));
    stream.on('error', this._handleError.bind(this));
};

Hoek.inherits(internals.Mouth, Events.EventEmitter);


internals.Mouth.prototype._handleError = function (err) {

    this.emit('error', err);
};


internals.Mouth.prototype.sendCommand = function (command, callback) {

    callback = callback || Hoek.ignore;

    if (!command || typeof command !== 'object') {
        return callback(new Error('Command must be an object'));
    }

    var payload = command.value;
    if (typeof payload === 'boolean') {
        payload = payload ? '1' : '0';
    }

    var mySensorsCommand = {
        id: command.boardId,
        childId: command.addonId,
        type: 'set',
        subType: Readings.toMySensorType(command.type),
        ack: false,
        payload: payload
    };

    this.write(mySensorsCommand, callback);
};


internals.Mouth.prototype.write = function (command, callback) {

    callback = callback || Hoek.ignore;

    var stringified = (command && typeof command === 'object') ? Sensors.stringify(command) : command;

    if (!stringified || (typeof stringified !== 'string')) {
        return callback(new Error(stringified || 'Cannot convert command'));
    }

    this._stream.write(stringified, callback);
};


internals.Mouth.prototype.writeTime = function (destination, callback) {

    var command = {
        id: destination.boardId,
        childId: destination.addonId,
        type: 'internal',
        subType: 'I_TIME',
        ack: false,
        payload: new Date().getTime()
    };

    this.write(command, callback);
};


internals.Mouth.prototype.writeConfig = function (destination, callback) {

    var command = {
        id: destination.boardId,
        childId: destination.addonId,
        type: 'internal',
        subType: 'I_CONFIG',
        ack: false,
        payload: this._settings.unit === 'metric' ? 'M' : 'I'
    };

    this.write(command, callback);
};


internals.Mouth.prototype.writeId = function (id, callback) {

    var command = {
        id: this._settings.gatewayId,
        childId: this._settings.gatewayChildId,
        type: 'internal',
        subType: 'I_ID_RESPONSE',
        ack: false,
        payload: id
    };

    this.write(command, callback);
};


internals.Mouth.prototype.rebootId = function (id, callback) {

    var command = {
        id: id,
        childId: 0,
        type: 'internal',
        ack: false,
        subType: 'I_REBOOT',
        payload: ''
    };

    this.write(command, callback);
};


internals.Mouth.prototype._internalCommand = function (command, source) {

    var now = Date.now();
    var boardId = parseInt(source.id);
    var addonId = parseInt(source.childId);

    switch(command) {
        case 'I_ID_REQUEST':
            this.emit('register');
            break;
        case 'I_TIME':
            this.writeTime({
                boardId: boardId,
                addonId: addonId
            });
            break;
        case 'I_BATTERY_LEVEL':
            this.emit('battery', {
                boardId: boardId,
                level: parseFloat(source.payload)
            });
            break;
        case 'I_LOG_MESSAGE':
            this.emit('log', {
                boardId: boardId,
                message: source.payload,
                time: now
            });
            break;
        case 'I_SKETCH_NAME':
            this.emit('name', {
                boardId: boardId,
                name: source.payload
            });
            break;
        case 'I_SKETCH_VERSION':
            this.emit('version', {
                boardId: boardId,
                version: source.payload
            });
            break;
        case 'I_CONFIG':
            this.writeConfig({
                boardId: boardId,
                addonId: source.childId
            });
            break;
    }
};


internals.Mouth.prototype._presentation = function (addon) {

    if (addon.id === this._settings.gatewayId) {
        return this.emit('protocol', addon.payload);
    }

    this.emit('addon', {
        boardId: parseInt(addon.id),
        addonId: parseInt(addon.childId),
        type: Addons.toFriendlyType(addon.subType)
    });
};


internals.Mouth.prototype._readData = function (data) {

    var arr = Sensors.parse(data.toString());
    if (!arr || (arr instanceof Error)) {
        this.emit('error', arr);
        return;
    }

    for (var i = 0, il = arr.length; i < il; ++i) {
        var addon = arr[i];
        if (addon.type === 'internal') {
            this._internalCommand(addon.subType, addon);
        }
        else if (addon.type === 'presentation') {
            this._presentation(addon);
        }
        else if (addon.type === 'set') {
            this.emit('reading', {
                boardId: parseInt(addon.id),
                addonId: parseInt(addon.childId),
                value: Readings.isBoolSensor(addon.subType) ? !!addon.payload : addon.payload,
                type: Readings.toFriendlyType(addon.subType),
                time: Date.now()
            });
        }
    }
};


internals.allowedType = function (type) {

    return (internals.allowedTypes.indexOf(type) !== -1);
};
