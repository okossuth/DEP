define(['models/resources/ResourceBase', 'views/resources/WorkingHour', 'views/resources/WorkingHourEdit', '_features/validators', 'ovivo'], function(ResourceBase, View, EditView, validators) {
  return ResourceBase.extend({
    typeName: 'workingHour',
    _gettersNames: ['weekdays', 'available', 'repeat', 'exclusions', 'groups', 'start_date', 'end_date', 'start_time', 'end_time', 'pk', 'start_date_obj', 'end_date_obj', 'deltaHours'],
    isSingle: function() {
      return this.start_date() === this.end_date();
    },
    _getTrueHash: function(hash) {
      return _.compact(_.map(_.pairs(hash), function(arr) {
        if (arr[1] === true) {
          return parseInt(arr[0]) + 1;
        } else {
          return void 0;
        }
      }));
    },
    processWeek: function(num, value) {
      var _weeks;
      value = !value;
      this.weekdaysHash[num] = value;
      _weeks = this._getTrueHash(this.weekdaysHash);
      this.set('weekdays', _weeks.length > 0 ? _weeks.join(',') : null);
      return true;
    },
    processGroup: function(pk, value) {
      var _groups;
      value = !value;
      this.groupsHash[pk] = value;
      _groups = this._getTrueHash(this.groupsHash);
      this.set('groups', _.map(_groups, function(group) {
        return parseInt(group);
      }));
      return true;
    },
    groups: function() {
      var _groups;
      if ((_groups = this.get('groups')) != null) {
        return _groups;
      } else {
        return [];
      }
    },
    validate: function(attrs) {
      if ((attrs.available != null) && (attrs.start_date != null) && (attrs.start_time != null) && (attrs.end_time != null) && (attrs.weekdays != null) && attrs.repeat) {
        return void 0;
      } else {
        return gettext('Params are missing');
      }
    },
    validate: function(attrs) {
      var _this = this;
      return _.reduce([
        {
          name: 'start_time',
          value: attrs.start_time
        }, {
          name: 'end_time',
          value: attrs.end_time
        }
      ], (function(memo, obj) {
        if (typeof memo !== 'undefined') {
          return memo;
        } else {
          return validators.time(obj.name, obj.value);
        }
      }), void 0);
    },
    toJSON: function() {
      var _json;
      _json = Backbone.Model.prototype.toJSON.call(this);
      if ((_json.groups instanceof Array) && (_json.groups.length === 0)) {
        this.set('groups', null, {
          silent: true
        });
        _json.groups = null;
      }
      delete _json.start_date_obj;
      delete _json.end_date_obj;
      delete _json.deltaHours;
      return _json;
    },
    processRange: function(start, end) {
      var _arr, _day, _end, _i, _repeat, _start, _startMonday, _startWeek;
      _arr = [];
      _start = this.start_date_obj();
      _startWeek = _start.getWeek();
      _startMonday = new Date(_start);
      if (_startMonday.getDay() !== 1) {
        _startMonday.moveToDayOfWeek(1, -1);
      }
      _end = this.end_date_obj();
      _repeat = this.repeat();
      if (_start > start) {
        start = _start;
      }
      if ((_end != null) && (_end < end)) {
        end = _end;
      }
      _i = new Date(start);
      while (_i <= end) {
        _day = _i.getDay() - 1;
        if (_day < 0) {
          _day = 7 + _day;
        }
        if ((this.weekdaysHash[_day] === true) && ((_repeat === 1) || (((Math.floor((_i - _startMonday) / 86400000 / 7)) % _repeat) === 0))) {
          _arr.push({
            date: new Date(_i),
            model: this
          });
        }
        _i.setDate(_i.getDate() + 1);
      }
      return _arr;
    },
    setDeltaHours: (function() {
      var _getMinutes;
      _getMinutes = function(str) {
        var hours, minutes, _ref, _ref1;
        _ref = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(str)).slice(-2), hours = _ref[0], minutes = _ref[1];
        _ref1 = [parseInt(hours), parseInt(minutes)], hours = _ref1[0], minutes = _ref1[1];
        return hours * 60 + minutes;
      };
      return function() {
        var _delta, _end, _start;
        _end = _getMinutes(this.end_time());
        _start = _getMinutes(this.start_time());
        if (_start <= _end) {
          _delta = (_end - _start) / 60;
        } else {
          _delta = (_end - _start) / 60 + 24;
        }
        return this.set('deltaHours', Math.round(_delta));
      };
    })(),
    updateWeekdaysHash: function() {
      var _ref;
      return this.weekdaysHash = _.reduce((_ref = this.weekdays()) != null ? _ref.split(',') : void 0, (function(memo, elem) {
        memo[parseInt(elem) - 1] = true;
        return memo;
      }), {});
    },
    updateStartDate: function() {
      return this.set('start_date_obj', new Date(Date.parse(this.start_date())));
    },
    updateEndDate: function() {
      var _end_date;
      if ((_end_date = this.end_date()) != null) {
        return this.set('end_date_obj', new Date(Date.parse(_end_date)));
      } else {
        return this.set('end_date_obj', void 0);
      }
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.updateStartDate();
      this.updateEndDate();
      this.on('change:weekdays', this.updateWeekdaysHash, this);
      this.on('change:start_date', this.updateStartDate, this);
      this.on('change:end_date', this.updateEndDate, this);
      this.groupsHash = _.reduce(this.groups(), (function(memo, elem) {
        memo[elem] = true;
        return memo;
      }), {});
      this.updateWeekdaysHash();
      this.editView = new EditView({
        model: this
      });
      return true;
    }
  });
});
