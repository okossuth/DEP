define(['models/resources/ResourceBase', 'models/calendar/DaysCollector', 'views/calendar/Week', 'ovivo'], function(ResourceBase, DaysCollector, View) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    _gettersNames: ['number', 'month', 'year', 'pk'],
    getDaysArr: function() {
      var _arr, _date;
      _arr = [];
      _date = new Date(this._firstDate);
      _date.moveToDayOfWeek(1, -1);
      _.each([1, 2, 3, 4, 5, 6, 7], function(i) {
        _arr.push({
          date: _date.getDate(),
          month: _date.getMonth(),
          year: _date.getFullYear(),
          week_number: _date.getWeek(),
          disabled: false
        });
        return _date.setDate(_date.getDate() + 1);
      });
      return _arr;
    },
    initialize: function(attrs, options) {
      this._initialize();
      this.View = View;
      this.set('pk', "" + attrs.year + "-" + attrs.number);
      this._firstDate = Date.today();
      this._firstDate.setFullYear(attrs.year);
      this._firstDate.setWeek(attrs.number);
      this._firstDate.moveToDayOfWeek(4);
      this.set('month', this._firstDate.getMonth());
      this.days = this.getDaysArr();
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.events.fetchWeek(this.number(), this.year(), this._firstDate).done(_.bind(this.removeLoading, this));
      return true;
    }
  }));
});
