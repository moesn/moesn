/**
 * Created by zhaohuaming.
 */
'use strict';

const _ = require('lodash');

function uuid() {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function replaceAll() {
    var str = arguments[0];
    _.chunk(_.drop(arguments), 2).forEach(function(arg) {
        str = str.replace(new RegExp(arg[0], 'g'), arg[1]);
    });
    return str;
};

module.exports = {
    uuid: uuid,
    replaceAll: replaceAll
};
