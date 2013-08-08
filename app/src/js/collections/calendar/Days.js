define(['ovivo'], function() {
  return Backbone.Collection.extend({
    comparator: function(day) {
      return day.dateObj();
    },
    initElements: function(elements, days) {
      var _this = this;
      return _.each(_.zip(elements, days), function(_arg) {
        var day, element;
        element = _arg[0], day = _arg[1];
        _this.add(day, {
          el: element
        });
        return _this;
      });
    },
    _addDayCache: function(day, cache, model) {
      var _arr, _key;
      _key = model.id;
      if ((_arr = cache[_key]) == null) {
        _arr = cache[_key] = [];
      }
      return _arr.push(day);
    },
    _getDaysCache: function(cache, model) {
      return cache[model.id];
    },
    _clearDayCache: function(cache, model) {
      return cache[model.id] = [];
    },
    processEventAdd: function(event) {
      var _day;
      _day = this.get(event.getKey());
      if (_day != null) {
        this._addDayCache(_day, this.eventsCache, event);
        _day.addEvent(event);
      }
      return true;
    },
    _rangeResultProcessor: function(rangeResult, hash, adderName) {
      var _this = this;
      return _.each(rangeResult, function(obj) {
        var _day, _key;
        _key = "" + (obj.date.getFullYear()) + "-" + (obj.date.getMonth()) + "-" + (obj.date.getDate());
        _day = _this.get(_key);
        if (_day != null) {
          _this._addDayCache(_day, hash, obj.model);
          return _day[adderName](obj.model, obj);
        }
      });
    },
    processWorkingHours: function(start, end) {
      return this._rangeResultProcessor(ovivo.desktop.resources.workingHours.processRange(start, end), this.workingHoursCache, 'addWorkingHour');
    },
    processInactivities: function(start, end) {
      return this._rangeResultProcessor(ovivo.desktop.resources.inactivities.processRange(start, end), this.inactivitiesCache, 'addInactivity');
    },
    processWorkingHourAdd: function(workingHour) {
      var end, start;
      start = this.first().dateObj();
      end = this.last().dateObj();
      return this._rangeResultProcessor(workingHour.processRange(start, end), this.workingHoursCache, 'addWorkingHour');
    },
    processInactivityAdd: function(workingHour) {
      var end, start;
      start = this.first().dateObj();
      end = this.last().dateObj();
      return this._rangeResultProcessor(workingHour.processRange(start, end), this.inactivitiesCache, 'addInactivity');
    },
    processEventRemove: function(model) {
      _.each(this._getDaysCache(this.eventsCache, model), function(day) {
        return day.removeEvent(model);
      });
      return this._clearDayCache(this.eventsCache, model);
    },
    processWorkingHourRemove: function(model) {
      _.each(this._getDaysCache(this.workingHoursCache, model), function(day) {
        return day.removeWorkingHour(model);
      });
      return this._clearDayCache(this.workingHoursCache, model);
    },
    processInactivityRemove: function(model) {
      _.each(this._getDaysCache(this.inactivitiesCache, model), function(day) {
        return day.removeInactivity(model);
      });
      return this._clearDayCache(this.inactivitiesCache, model);
    },
    processEventChange: function(model) {
      this.processEventRemove(model);
      return this.processEventAdd(model);
    },
    processWorkingHourChange: function(model) {
      this.processWorkingHourRemove(model);
      return this.processWorkingHourAdd(model);
    },
    processInactivityChange: function(model) {
      this.processInactivityRemove(model);
      return this.processInactivityAdd(model);
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.todayFound = false;
      this.workingHoursCache = {};
      this.eventsCache = {};
      this.inactivitiesCache = {};
      ovivo.desktop.resources.events.on('add', this.processEventAdd, this);
      ovivo.desktop.resources.workingHours.on('add', this.processWorkingHourAdd, this);
      ovivo.desktop.resources.inactivities.on('add', this.processInactivityAdd, this);
      ovivo.desktop.resources.events.on('remove', this.processEventRemove, this);
      ovivo.desktop.resources.workingHours.on('remove', this.processWorkingHourRemove, this);
      ovivo.desktop.resources.inactivities.on('remove', this.processInactivityRemove, this);
      ovivo.desktop.resources.events.on('change:type', this.processEventChange, this);
      ovivo.desktop.resources.workingHours.on('change', this.processWorkingHourChange, this);
      ovivo.desktop.resources.inactivities.on('change', this.processInactivityChange, this);
      return true;
    }
  });
});
