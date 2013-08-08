define(['collections/calendar/DaysCollectors', 'models/calendar/Week', 'models/calendar/WeekDay', 'ovivo'], function(DaysCollectors, Model, WeekDay) {
  return DaysCollectors.extend({
    model: Model,
    DayModel: WeekDay,
    initialize: function(models, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
