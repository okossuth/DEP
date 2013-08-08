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
