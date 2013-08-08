if (typeof window.ovivo === 'undefined') {
  window.ovivo = {};
}

if (typeof window.ovivo.desktop === 'undefined') {
  window.ovivo.desktop = {};
}

Date.parse = (function() {
  var _parse, _processors;
  _parse = Date.parse;
  _processors = [
    {
      regExp: /^\s*(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).*Z\s*$/,
      processor: function(str) {
        var date, month, parts;
        parts = str.match(this.regExp);
        date = new Date(NaN);
        month = +parts[2];
        date.setUTCFullYear(parts[1], month - 1, parts[3]);
        date.setUTCHours(parts[4]);
        date.setUTCMinutes(parts[5]);
        date.setUTCSeconds(parts[6]);
        if (month !== date.getMonth() + 1) {
          date.setTime(NaN);
        }
        return date;
      }
    }, {
      regExp: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      processor: function(str) {
        var day, match, month, year, _ref;
        _ref = str.match(this.regExp), match = _ref[0], year = _ref[1], month = _ref[2], day = _ref[3];
        return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      }
    }, {
      regExp: /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d\d\d\d\d\d)$/,
      processor: function(str) {
        var _day, _hours, _milliseconds, _minutes, _month, _ref, _ref1, _seconds, _year;
        _ref = str.match(this.regExp).slice(1), _year = _ref[0], _month = _ref[1], _day = _ref[2], _hours = _ref[3], _minutes = _ref[4], _seconds = _ref[5], _milliseconds = _ref[6];
        _ref1 = [parseInt(_year), parseInt(_month), parseInt(_day), parseInt(_hours), parseInt(_minutes), parseInt(_seconds), parseInt(_milliseconds)], _year = _ref1[0], _month = _ref1[1], _day = _ref1[2], _hours = _ref1[3], _minutes = _ref1[4], _seconds = _ref1[5], _milliseconds = _ref1[6];
        return new Date(_year, _month - 1, _day, _hours, _minutes, _seconds, _milliseconds);
      }
    }
  ];
  return function(str) {
    var _obj;
    _obj = _.find(_processors, function(obj) {
      return obj.regExp.test(str);
    });
    if (typeof _obj !== 'undefined') {
      return _obj.processor(str);
    } else {
      return _parse(str);
    }
  };
})();

Handlebars.registerHelper('i18n', function(value, options) {
  var _plural, _ref, _singular, _value;
  if (value === void 0) {
    value = options;
  }
  if (typeof value === 'function') {
    _value = value.call(this);
    _ref = options.fn().split('|'), _singular = _ref[0], _plural = _ref[1];
    return ngettext(_singular, _plural, _value);
  } else {
    return gettext(value.fn());
  }
});

ovivo.Y = function(f) {
  return (function(g) {
    return function(a, b) {
      return f(g(g))(a, b);
    };
  })(function(g) {
    return function(a, b) {
      return f(g(g))(a, b);
    };
  });
};

window.onerror = function() {
  return window.localStorage.clear();
};

ovivo.parseBoolean = function(str) {
  if (typeof str === 'boolean') {
    return str;
  }
  if (typeof str !== 'string') {
    return Boolean(str);
  }
  str = str.toLowerCase();
  if (str === 'false') {
    return false;
  }
  if (str === 'true') {
    return true;
  }
  return Boolean(str);
};

requirejs(['_features/indicator', '_features/localStorageCache'], function(indicator, localStorageCache) {
  return (function() {
    var _callbackCreatorCreator, _callsCounter, _errorCreator, _postProcess, _processFlag, _processLocalStorageCache, _processReadSuccess, _queue, _queueRules, _successCreator, _sync;
    _sync = Backbone.sync;
    _callsCounter = 0;
    _processFlag = false;
    _queue = {
      'read': [],
      'update': [],
      'delete': [],
      'create': []
    };
    _queueRules = {
      'read': false,
      'update': true,
      'delete': false,
      'create': false
    };
    _callbackCreatorCreator = function(action, done) {
      return function(originalCallback, method, model, options) {
        return function(model, resp) {
          var _curObj, _nextObj, _res;
          _callsCounter -= 1;
          if (typeof (_res = action(options._url, model, resp, method, options)) === 'object') {
            resp = _res;
          }
          if (_queueRules[method] === true) {
            _curObj = _queue[method].shift();
            _nextObj = _queue[method][0];
            if (model._syncStamp !== _curObj.stamp) {
              resp = {};
            }
            if (_queue[method].length > 0) {
              _sync.apply(_nextObj.context, _nextObj.args);
            }
          }
          if (_callsCounter === 0) {
            done();
          }
          return originalCallback != null ? originalCallback.apply(this, Array.prototype.slice.call(arguments, 0)) : void 0;
        };
      };
    };
    _processReadSuccess = function(url, model, resp, options) {
      if (model.preProcessJSON != null) {
        resp = model.preProcessJSON(resp);
      }
      localStorageCache.cache(resp, url);
      if ((model instanceof Backbone.Collection) && (resp instanceof Array)) {
        if (model.fullResponse === true) {
          _.each(_.without.apply(_, [model.pluck('pk')].concat(_.pluck(resp, 'pk'))), function(pk) {
            var _model;
            _model = model.get(pk);
            return model.remove(_model);
          });
        }
        _.each(resp, function(obj, i) {
          var _model;
          if ((_model = model.get(obj.pk)) != null) {
            _model.set(obj, {
              cache_update: true
            });
            return delete resp[i];
          }
        });
        resp = _.compact(resp);
      }
      return resp;
    };
    _successCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      if (method === 'read') {
        return _processReadSuccess(url, model, resp, options);
      }
    }), indicator.success);
    _errorCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      ovivo.desktop.resources.apiErrors.addError(url, model, resp, method, options);
      return indicator.errorAction();
    }), indicator.error);
    _postProcess = function(method, model, options) {
      if (((method === 'update') || (method === 'delete')) && typeof model.url === 'function') {
        model.url = model.url() + '/';
        model.url = model.url.replace('//', '/');
      }
      if (method === 'delete') {
        options.data = ' ';
      }
      return true;
    };
    _processLocalStorageCache = function(model, options) {
      var _ref;
      if (localStorageCache.allowed() === true) {
        if (localStorageCache.reset(model, options._url, options) === true) {
          if ((_ref = model.def) != null) {
            _ref.resolve(options.resp);
          }
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    return Backbone.sync = function(method, model, options) {
      var _args, _call, _flag, _resp,
        _this = this;
      if (model.localStorageOnly !== true) {
        _callsCounter += 1;
      }
      _args = Array.prototype.slice.call(arguments, 0);
      options._url = ((function() {
        if (typeof model.url === 'function') {
          return model.url();
        } else {
          return model.url;
        }
      })()) + ((options.data != null) && (options.data !== '') ? "?" + options.data : '');
      _flag = method === 'read' ? _processLocalStorageCache(model, options) : model.localStorageOnly === true ? (_resp = model.toJSON(), method === 'create' ? _resp.pk = Date.now().valueOf() : void 0, options.success(model, _resp, options), model.trigger('sync', model, _resp, options), false) : true;
      _call = function() {
        var _stamp;
        _stamp = (new Date()).valueOf().toString() + _callsCounter.toString();
        model._syncStamp = _stamp;
        options.success = _successCreator.apply(null, [options.success].concat(_args));
        options.error = _errorCreator.apply(null, [options.error].concat(_args));
        _postProcess.apply(this, _args);
        indicator.start();
        if (_queueRules[method] === true) {
          _queue[method].push({
            stamp: _stamp,
            context: this,
            args: _args
          });
        }
        if ((_queueRules[method] === true) && (_queue[method].length === 1) || (_queueRules[method] === false)) {
          return _sync(method, model, options);
        } else {
          return true;
        }
      };
      if (model.localStorageOnly !== true) {
        if (_flag === true) {
          return _call.call(this);
        } else {
          return setTimeout((function() {
            return _call.call(_this);
          }), 300);
        }
      }
    };
  })();
});

if (window.ovivo == null) {
  window.ovivo = {};
}

if (!window.ovivo.config) {
  window.ovivo.config = {};
}

ovivo.config.API_URL_PREFIX = '/api/1.0/';

ovivo.config.API_URL_PREFIX_REGEXP = '\\/api\\/1\\.0';

ovivo.config.MONTHS = [gettext('January'), gettext('February'), gettext('March'), gettext('April'), gettext('May'), gettext('June'), gettext('July'), gettext('August'), gettext('September'), gettext('October'), gettext('November'), gettext('December')];

ovivo.config.DAYS = [gettext('Sunday'), gettext('Monday'), gettext('Tuesday'), gettext('Wednesday'), gettext('Thursday'), gettext('Friday'), gettext('Saturday'), gettext('Sunday')];

ovivo.config.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

ovivo.config.HELP_URL = 'http://ovivo.desk.com';

ovivo.config.VALIDATION_REGEXP_TIME = /^(((\d\d):(\d\d))|((\d\d)\.(\d\d))|((\d\d)(\d\d)))$/;

ovivo.config.ANIMATION_END = (function() {
  var _animation;
  if ((_animation = Modernizr.prefixed('animation')) === false) {
    return false;
  }
  if (_animation === 'animation') {
    return 'animationend';
  }
  return (_animation + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");
})();

if (ovivo._config != null) {
  ovivo.config = _.extend(ovivo.config, ovivo._config);
}
