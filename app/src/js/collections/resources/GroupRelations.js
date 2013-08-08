define(['models/resources/GroupRelation', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/groups/";
    },
    postProcess: function() {
      var _allowed;
      _allowed = this.pluck('pk');
      return _.each(ovivo.desktop.resources.groups.each(function(group) {
        var _value;
        _value = _allowed.indexOf(group.id) === -1 ? false : true;
        return group.set('allowed', _value);
      }));
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.initResource();
      $.when(this.def, ovivo.desktop.resources.groups.def).then(_.bind(this.postProcess, this));
      return true;
    }
  }));
});
