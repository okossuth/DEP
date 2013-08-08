define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'municipality', 'pk'],
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
