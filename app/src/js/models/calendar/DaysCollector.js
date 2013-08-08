define(['ovivo'], function() {
  return {
    firstDate: function() {
      return this._firstDate;
    },
    show: function() {
      return this.view.show();
    },
    hide: function() {
      return this.view.hide();
    },
    initResources: function() {
      var _end, _start,
        _this = this;
      _start = (function() {
        var _i;
        _i = 0;
        while (_this.days[_i].disabled === true) {
          _i += 1;
        }
        return _this.days[_i];
      })();
      _end = (function() {
        var _i;
        _i = _this.days.length - 1;
        while (_this.days[_i].disabled === true) {
          _i -= 1;
        }
        return _this.days[_i];
      })();
      _start = new Date(_start.year, _start.month, _start.date);
      _end = new Date(_end.year, _end.month, _end.date);
      this.collection.days.processWorkingHours(_start, _end);
      this.collection.days.processInactivities(_start, _end);
      return true;
    },
    initDays: function() {
      this.collection.days.initElements(this.view.dayElements, this.days);
      this.initResources();
      return true;
    },
    removeLoading: function() {
      return this.view.removeLoading();
    },
    _initialize: function(attrs, options) {
      this.on('rendered', this.initDays, this);
      return true;
    }
  };
});
