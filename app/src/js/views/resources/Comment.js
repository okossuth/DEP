define(['_features/dateFormatter', 'views/resources/ResourceBase', 'ovivo'], function(dateFormatter, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'comment',
    template: Handlebars.templates['comment'],
    groupTemplate: Handlebars.templates['comment_group'],
    pub_date: function() {
      var _pub_date;
      if ((_pub_date = this.model.pub_date()) != null) {
        return dateFormatter(this.model.pub_date());
      } else {
        return '';
      }
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
