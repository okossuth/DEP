define(['views/calendar/DaysCollector', 'views/resources/ResourceBase', 'ovivo'], function(DaysCollector, ResourceBase) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    common: {},
    template: Handlebars.templates['calendarWeek'],
    groupTemplate: Handlebars.templates['calendarWeek_group'],
    events: {},
    days: function() {
      return this.model.days;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});
