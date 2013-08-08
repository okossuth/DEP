define(['models/resources/PrimaryDepartment', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "departments/primary_departments/",
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});
