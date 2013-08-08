define(['models/resources/ResourceBase', 'views/resources/Notification', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['timestamp', 'link', 'summary', 'event_id', 'read', 'last', 'pk'],
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
