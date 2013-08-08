define(['models/resources/Inactivity', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    url: "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/inactivity/",
    comparator: function(inactivity) {
      return Date.parse(inactivity.start()).valueOf();
    },
    processRange: function(start, end) {
      return this.reduce((function(arr, inactivity) {
        return arr.concat(inactivity.processRange(start, end));
      }), []);
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});
