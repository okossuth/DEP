define(['ovivo'], function() {
  return {
    localStorageCacheFunc: function(funcName, func) {
      if (typeof window.localStorage === 'undefined') {
        return func;
      } else {
        return function() {
          var _args, _cached, _key, _res;
          _args = Array.prototype.slice.call(arguments, 0);
          _key = funcName + '-' + _.reduce(_args, (function(str, arg) {
            return str + '-' + arg;
          }), '').slice(1);
          if ((_cached = localStorage[_key]) != null) {
            return $.when(_cached);
          } else {
            _res = func.apply(this, _args);
            return $.when(_res).done(function(res) {
              return localStorage[_key] = res;
            });
          }
        };
      }
    },
    proxyCall: function(methodName, args) {
      var _args, _tail;
      _args = Array.prototype.slice.call(args, 0);
      _tail = Array.prototype.slice.call(arguments, 2);
      _args = _tail.concat(_args);
      return this._base.prototype[methodName].apply(this, _args);
    },
    once: function(funcName, func) {
      var _flagPropertyName;
      _flagPropertyName = "_callFlag-" + funcName;
      return function() {
        if (this[_flagPropertyName] !== true) {
          this[_flagPropertyName] = true;
          return func.apply(this, Array.prototype.slice.call(arguments, 0));
        } else {
          return void 0;
        }
      };
    },
    throttle: function(func, limit) {
      var _prevCall, _timeout;
      _prevCall = 0;
      _timeout = null;
      return function() {
        var _args, _this;
        _this = this;
        _args = Array.prototype.slice.call(arguments, 0);
        if (_timeout === null) {
          _timeout = setTimeout((function() {
            _timeout = null;
            return func.apply(_this, _args);
          }), limit);
        }
        return true;
      };
    },
    throttleGroup: function(funcName, groupFuncName, limit) {
      var _processGroupCall;
      _processGroupCall = function() {
        this[groupFuncName](this.common.calls);
        return delete this.common.timer;
      };
      return function() {
        var _args;
        _args = Array.prototype.slice.call(arguments, 0);
        if (this.doNotThrottleGroup === true) {
          return this["_" + funcName].apply(this, _args);
        } else if (typeof this.common.timer === 'undefined') {
          this["_" + funcName].apply(this, _args);
          this.common.calls = [];
          return this.common.timer = setTimeout(_.bind(_processGroupCall, this), 50);
        } else {
          return this.common.calls.push({
            ctx: this,
            args: _args
          });
        }
      };
    }
  };
});
