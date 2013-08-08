define(['models/resources/WorkingHour', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    url: "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/working-hours/",
    comparator: function(workingHour) {
      return Date.parse(workingHour.start_date()).valueOf();
    },
    processRange: function(start, end) {
      return this.reduce((function(arr, workingHour) {
        return arr.concat(workingHour.processRange(start, end));
      }), []);
    },
    _ignoreChange: ['start_date_obj', 'end_date_obj', 'deltaHours'],
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});
