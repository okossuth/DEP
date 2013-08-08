define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'pk'],
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
