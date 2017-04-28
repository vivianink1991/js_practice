// 手写bind函数
if (!Function.prototype.bind) {
    Function.prototype.bind = function(scope) {
        if (typeof this !== 'function') {
            throw new TypeError("not a function");
        }
        var fn = this; //调用bind的方法
        var fNOP = function() {}; //避免直接修改fn原型
        var args = Array.prototype.slice.call(arguments, 1);

        var fBound = function() {
            return fn.apply(this instanceof fNOP ? this : scope || this, args.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP(); //绑定后的函数和原函数处于同一原型链，适用于绑定构造函数

        return fBound;
    }
}

//数组去重
// 方法一
function uniqueArray1(arr) {

    if (Array.isArray(arr) && arr.length > 0) {
        var ret = [];
        var records = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var _item = arr[i];
            if (!records.hasOwnProperty(_item)) {
                ret.push(_item);
            } else {
                records[_item] = true;
            }
        }

        return ret;  
    }
}

//方法二
function uniqueArray2(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
        var ret = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            var _item = arr[i];
            if (ret.indexOf(_item) === -1) {
                ret.push(_item);
            }
        }
        return ret;
    }
}

//方法三 es6
function uniqueArray3(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
        let records = new Map();
        return arr.filter(item => !records.has(item) && records.set(item, true));
    }
}

//方法四 es6
function uniqueArray4(arr) {
    return Array.from(new Set(arr));
}


