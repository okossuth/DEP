define(['models/resources/Comment', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "events/" + this.event.id + "/comments/";
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.initResource();
      return true;
    }
  }));
});
