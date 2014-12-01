// Declare internals

var internals = {};


exports.typeDescriptions = {
    door: 'Door and window sensor',
    motion: 'Motion sensor',
    smoke: 'Smoke sensor',
    light_switch: 'Turn a light on or off',
    dimmer: 'Control a dimmer',
    window_shade: 'Open or close a window shade',
    temperature: 'Temperature sensor',
    humidity: 'Humidity sensor',
    barometer: 'Barometer sensor',
    wind: 'Wind sensor',
    rain: 'Rain sensor',
    uv: 'Ultraviolet sensor',
    weight: 'Weight sensor',
    power: 'Power sensor',
    heater: 'Control a heater',
    distance: 'Distance sensor',
    light: 'Light sensor',
    board: 'Arduino board',
    board_relay: 'Arduino relay',
    lock: 'Control a lock',
    ir: 'IR sender and receiver',
    water: 'Water sensor',
    air: 'Air sensor',
    custom: 'Any custom sensor or controller',
    dust: 'Dust sensor',
    scene: 'Control a scene'
};


exports.toFriendlyType = function (mysensorType) {

    var types = Object.keys(internals.friendlyMap);
    for (var i = 0, il = types.length; i < il; ++i) {
        var type = types[i];
        if (internals.friendlyMap[type] === mysensorType) {
            return type;
        }
    }
};


exports.toMySensorType = function (type) {

    return internals.friendlyMap[type];
};


internals.friendlyMap = {
    door: 'S_DOOR',
    motion: 'S_MOTION',
    smoke: 'S_SMOKE',
    light_switch: 'S_LIGHT',
    dimmer: 'S_DIMMER',
    window_shade: 'S_COVER',
    temperature: 'S_TEMP',
    humidity: 'S_HUM',
    barometer: 'S_BARO',
    wind: 'S_WIND',
    rain: 'S_RAIN',
    uv: 'S_UV',
    weight: 'S_WEIGHT',
    power: 'S_POWER',
    heater: 'S_HEATER',
    distance: 'S_DISTANCE',
    light: 'S_LIGHT_LEVEL',
    board: 'S_ARDUINO_NODE',
    board_relay: 'S_ARDUINO_RELAY',
    lock: 'S_LOCK',
    ir: 'S_IR',
    water: 'S_WATER',
    air: 'S_AIR_QUALITY',
    custom: 'S_CUSTOMr',
    dust: 'S_DUST',
    scene: 'S_SCENE_CONTROLLER'
};
