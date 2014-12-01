// Declare internals

var internals = {};


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


exports.isBoolSensor = function (mysensorType) {

    return internals.boolSensorTypes.indexOf(mysensorType) !== -1;
};


internals.friendlyMap = {
    temperature: 'V_TEMP',
    humidity: 'V_HUM',
    light_switch: 'V_LIGHT',
    dimmer: 'V_DIMMER',
    pressure: 'V_PRESSURE',
    weather_forecast: 'V_FORECAST',
    rain_amount: 'V_RAIN',
    rain_rate: 'V_RAINRATE',
    wind_speed: 'V_WIND',
    wind_gust: 'V_GUST',
    wind_direction: 'V_DIRECTION',
    uv: 'V_UV',
    weight: 'V_WEIGHT',
    distance: 'V_DISTANCE',
    impedance: 'V_IMPEDANCE',
    armed: 'V_ARMED',
    movement: 'V_TRIPPED',
    watt: 'V_WATT',
    kmh: 'V_KWH',
    scene_on: 'V_SCENE_ON',
    scene_off: 'V_SCENE_OFF',
    heater: 'V_HEATER',
    heater_switch: 'V_HEATER_SW',
    light_level: 'V_LIGHT_LEVEL',
    custom1: 'V_VAR1',
    custom2: 'V_VAR2',
    custom3: 'V_VAR3',
    custom4: 'V_VAR4',
    custom5: 'V_VAR5',
    window_shade_up: 'V_UP',
    window_shade_down: 'V_DOWN',
    window_shade_stop: 'V_STOP',
    ir_send: 'V_IR_SEND',
    ir_receive: 'V_IR_RECEIVE',
    water_flow: 'V_FLOW',
    volume: 'V_VOLUME',
    lock: 'V_LOCK_STATUS',
    dust_level: 'V_DUST_LEVEL',
    voltage: 'V_VOLTAGE',
    current: 'V_CURRENT'
};


internals.boolSensorTypes = [
    'V_LIGHT',
    'V_IMPEDANCE',
    'V_ARMED',
    'V_TRIPPED',
    'V_SCENE_ON',
    'V_SCENE_OFF',
    'V_HEATER_SW',
    'V_UP',
    'V_DOWN',
    'V_STOP',
    'V_LOCK_STATUS'
];