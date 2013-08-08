define(['models/resources/Group', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "groups/",
    postProcess: function() {
      var _this = this;
      return this.each(function(group) {
        var _parent;
        if ((_parent = group.parent()) != null) {
          _this.get(_parent).get('children').push(group);
        }
        return group.setChainName();
      });
    },
    _ignoreChange: ['chainName', 'children', 'allowed'],
    initialize: function() {
      this.initResource();
      this.def.then(_.bind(this.postProcess, this));
      return true;
    }
  }));
});
