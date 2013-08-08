define(['models/resources/ResourceBase', 'views/resources/Comment', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['commenter', 'pub_date', 'comment', 'reply_to', 'pk'],
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
