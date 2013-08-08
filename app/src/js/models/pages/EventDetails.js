define(['models/pages/PageBase', 'views/pages/EventDetails/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    popup: true,
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
