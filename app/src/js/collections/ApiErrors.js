define(['models/ApiError', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    localStorageOnly: true,
    initializeEmpty: true,
    url: "/API-errors/",
    addError: function(url, model, resp, method, options) {
      if ((method === 'update') || (method === 'create')) {
        return this.add({
          obj: model.toJSON(),
          method: method,
          resp: resp,
          url: url
        });
      }
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});
