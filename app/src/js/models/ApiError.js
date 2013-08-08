define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    _gettersNames: ['resp', 'obj', 'method', 'url'],
    localStorageOnly: true,
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
