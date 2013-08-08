define(['collections/calendar/DaysCollectors', 'models/calendar/Month', 'models/calendar/MonthDay', 'ovivo'], function(DaysCollectors, Model, MonthDay) {
  return DaysCollectors.extend({
    model: Model,
    DayModel: MonthDay,
    initialize: function(models, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
