// Generated by CoffeeScript 1.6.2
define(['models/resources/Period', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    fullResponse: true,
    localStorageOnly: true,
    initializeEmpty: true,
    url: "" + ovivo.config.API_URL_PREFIX + "resource-needs/periods/",
    _processPeriodAdd: function(model) {
      var _id,
        _this = this;

      _id = model.id;
      return _.each(model.templates(), function(id) {
        return ovivo.desktop.resources.templates.get(id).addPeriod(_id);
      });
    },
    _processPeriodRemove: function(model) {
      var _id,
        _this = this;

      _id = model.id;
      return _.each(model.templates(), function(id) {
        return ovivo.desktop.resources.templates.get(id).removePeriod(_id);
      });
    },
    processPeriodAdd: function(model) {
      var _this = this;

      return ovivo.desktop.resources.templates.def.done(function() {
        return _this._processPeriodAdd(model);
      });
    },
    processPeriodRemove: function(model) {
      var _this = this;

      return ovivo.desktop.resources.templates.def.done(function() {
        return _this._processPeriodRemove(model);
      });
    },
    initialize: function() {
      this.initResource();
      this.on('add', this.processPeriodAdd, this);
      this.on('remove', this.processPeriodRemove, this);
      return true;
    }
  }));
});
