define(['_common/CalendarBase', 'models/resources/ResourceBase', 'models/calendar/DaysCollector', 'views/calendar/Month', 'ovivo'], function(CalendarBase, ResourceBase, DaysCollector, View) {
  return ResourceBase.extend(_.extend({}, CalendarBase, DaysCollector, {
    _gettersNames: ['month', 'year', 'pk'],
    initialize: function(attrs, options) {
      this._initialize();
      this.View = View;
      this.set('pk', "" + (this.year()) + "-" + (this.month()));
      this._firstDate = new Date(this.year(), this.month(), 1);
      this.weeks = this.getWeeksArr(this.year(), this.month());
      this.days = this.getDaysArr(this.weeks);
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.events.fetchMonth(this.month(), this.year()).done(_.bind(this.removeLoading, this));
      return true;
    }
  }));
});
