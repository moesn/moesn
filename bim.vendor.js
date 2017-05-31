'use strict';

require('./bower_components/jquery/dist/jquery');
require('./bower_components/angular/angular');
require('./bower_components/angular-ui-router/release/angular-ui-router');
require('./bower_components/angular-resource/angular-resource');
require('./bower_components/angular-sanitize/angular-sanitize');
require('./bower_components/moment/moment');
require('./bower_components/underscore/underscore');
require('./bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker');
require('./bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min');

require('./bower_components/crop/ng-img-crop');
require('./bower_components/ng-file-upload/ng-file-upload.min');
require('./bower_components/cryptojs/rollups/tripledes');

require('./_work/static/js/bootstrap.min');
require('./_work/static/js/unslider.min');
require('./_work/static/js/popover');
require('./_work/static/js/jquery.md5');

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    if (len) {
        if (radix)
            for (i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        else {
            for (i = 0; i < len; i++)
                uuid[i] = 4;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        }
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('').toLowerCase();
};

var arrToTree = function (array, idkey, pidkey, pid, parent, tree) {
    tree = tree ? tree : [];
    parent = parent ? parent : {};

    if (pid !== null) parent[idkey] = angular.copy(pid, parent[idkey]);

    var children = us.filter(array, function (child) {
        return child[pidkey] == parent[idkey];
    });

    if (!us.isEmpty(children)) {
        if (parent[idkey] == pid) {
            tree = children;
        } else {
            parent['children'] = children;
        }
        us.each(children, function (child) {
            arrToTree(array, idkey, pidkey, null, child);
        });
    }

    return tree;
};

Math.arrayToTree = function (array, idkey, pidkey, pids) {
    if (us.isString(pids) || us.isNumber(pids))
        return arrToTree(array, idkey, pidkey, pids);

    var tree = [];
    pids = us.isArray(pids) ? pids : us.difference(us.uniq(us.pluck(array, pidkey)), us.pluck(array, idkey));

    us.each(pids, function (pid) {
        tree = us.union(tree, arrToTree(array, idkey, pidkey, pid));
    });

    return tree;
};

Math.encrypt = function (value) {
    var encrypted = cs.DES.encrypt(value.toString(), 'Bim Secret');
    return encrypted.toString();
};

Math.decrypt = function (value) {
    var decrypted = cs.DES.decrypt(value, 'Bim Secret');
    return decrypted.toString(cs.enc.Utf8);
};

window.location.params = function () {
    var url = window.location.search ? window.location.search : window.location.hash;
    if (url.indexOf('?') != -1)
        url = url.substring(url.indexOf('?') + 1);
    var params = url.split('&'), result = {};
    for (var i = 0; i < params.length; i++) {
        if (params[i].indexOf('=') > 0)
            result[params[i].split('=')[0]] = params[i].split('=')[1];
    }
    return result;
};
