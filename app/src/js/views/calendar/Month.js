define(['views/calendar/DaysCollector', 'views/resources/ResourceBase', 'ovivo'], function(DaysCollector, ResourceBase) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    common: {},
    template: Handlebars.templates['calendarMonth'],
    groupTemplate: Handlebars.templates['calendarMonth_group'],
    events: {},
    month: function() {
      return ovivo.config.MONTHS[this.model.month()];
    },
    rows: function() {
      return _.map(this.model.weeks, function(week) {
        return {
          cells: week
        };
      });
    },
    postRender: function() {
      this.dayElements = this.$('.days-container .week-row > td');
      return this.hide();
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});
