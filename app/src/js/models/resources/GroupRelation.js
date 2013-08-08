define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['checked', 'parent', 'children', 'primary_department', 'pk'],
    initialize: function(attrs, options) {
      this.set('children', []);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
