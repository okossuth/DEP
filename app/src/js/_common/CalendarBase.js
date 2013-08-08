define([], function() {
  return {
    year: function() {
      return this.get('year');
    },
    month: function() {
      return this.get('month');
    },
    isLeap: function(year) {
      if ((year % 4) === 0) {
        if ((year % 100) === 0) {
          if ((year % 400) === 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    getNumberOfDaysInMonth: function(month, year) {
      if (month !== 1) {
        return ovivo.config.DAYS_IN_MONTH[month];
      } else if (this.isLeap(year)) {
        return 29;
      } else {
        return 28;
      }
    },
    setMonth: function(value) {
      value = value > 11 ? (this.setYear(this.year() + 1), value % 12) : value < 0 ? (this.setYear(this.year() - 1), value % 12 + 12) : value;
      return this.set('month', value);
    },
    setYear: function(value) {
      return this.set('year', value);
    },
    transformDayOfWeek: function(day) {
      return (day + 6) % 7;
    },
    _getWeekNumber: function(d) {
      var weekNo, yearStart;
      d = new Date(d);
      d.setHours(0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      yearStart = new Date(d.getFullYear(), 0, 1);
      return weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },
    getDaysArr: function(weeks) {
      return Array.prototype.concat.apply([], weeks);
    },
    getWeeksArr: function(year, month) {
      var _daysAfter, _daysBefore, _daysNum, _firstDayOfMonth, _i, _lastDayOfMonth, _month, _nextDaysNum, _nextMonth, _nextYear, _prevDaysNum, _prevMonth, _prevYear, _returnValue, _weeks, _year;
      _returnValue = [];
      _year = year != null ? year : this.year();
      _month = month != null ? month : this.month();
      _prevYear = _year;
      _nextYear = _year;
      _prevMonth = _month - 1;
      _nextMonth = _month + 1;
      if (_month === 0) {
        _prevYear = _year - 1;
        _prevMonth = 11;
      } else if (_month === 11) {
        _nextYear = _year + 1;
        _nextMonth = 0;
      }
      _prevDaysNum = this.getNumberOfDaysInMonth(_prevMonth, _prevYear);
      _nextDaysNum = this.getNumberOfDaysInMonth(_nextMonth, _nextYear);
      _daysNum = this.getNumberOfDaysInMonth(_month, _year);
      _weeks = [];
      _firstDayOfMonth = this.transformDayOfWeek((new Date(_year, _month, 1)).getDay());
      _lastDayOfMonth = this.transformDayOfWeek((new Date(_year, _month, _daysNum)).getDay());
      _daysBefore = _firstDayOfMonth;
      _daysAfter = 6 - _lastDayOfMonth;
      if (_daysBefore > 0) {
        _weeks = _weeks.concat((function() {
          var _j, _ref, _results;
          _results = [];
          for (_i = _j = _ref = _prevDaysNum - _daysBefore + 1; _ref <= _prevDaysNum ? _j <= _prevDaysNum : _j >= _prevDaysNum; _i = _ref <= _prevDaysNum ? ++_j : --_j) {
            _results.push({
              date: _i,
              month: _prevMonth,
              year: _prevYear,
              week_number: this._getWeekNumber(new Date(_prevYear, _prevMonth, _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      _weeks = _weeks.concat((function() {
        var _j, _results;
        _results = [];
        for (_i = _j = 1; 1 <= _daysNum ? _j <= _daysNum : _j >= _daysNum; _i = 1 <= _daysNum ? ++_j : --_j) {
          _results.push({
            date: _i,
            month: _month,
            year: _year,
            week_number: this._getWeekNumber(new Date(_year, _month, _i)),
            disabled: false
          });
        }
        return _results;
      }).call(this));
      if (_daysAfter > 0) {
        _weeks = _weeks.concat((function() {
          var _j, _results;
          _results = [];
          for (_i = _j = 1; 1 <= _daysAfter ? _j <= _daysAfter : _j >= _daysAfter; _i = 1 <= _daysAfter ? ++_j : --_j) {
            _results.push({
              date: _i,
              month: _nextMonth,
              year: _nextYear,
              week_number: this._getWeekNumber(new Date(_nextYear, _nextMonth, _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      if (_weeks.length === 35) {
        _weeks = _weeks.concat((function() {
          var _j, _results;
          _results = [];
          for (_i = _j = 1; _j <= 7; _i = ++_j) {
            _results.push({
              date: _daysAfter + _i,
              month: _nextMonth,
              year: _nextYear,
              week_number: this._getWeekNumber(new Date(_nextYear, _nextMonth, _daysAfter + _i)),
              disabled: true
            });
          }
          return _results;
        }).call(this));
      }
      _returnValue = (function() {
        var _j, _ref, _results;
        _results = [];
        for (_i = _j = 0, _ref = _weeks.length / 7; 0 <= _ref ? _j < _ref : _j > _ref; _i = 0 <= _ref ? ++_j : --_j) {
          _results.push(_weeks.slice(_i * 7, (_i + 1) * 7));
        }
        return _results;
      })();
      return _returnValue;
    }
  };
});
