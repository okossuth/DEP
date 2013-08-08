define(['models/pages/PageBase', 'views/pages/Calendar/Page', 'ovivo'], function(PageBase, View) {
  return PageBase.extend({
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
