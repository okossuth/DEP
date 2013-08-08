define(['_features/dateFormatter', 'views/resources/ResourceBase', 'ovivo'], function(dateFormatter, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'notification',
    template: Handlebars.templates['notification'],
    groupTemplate: Handlebars.templates['notification_group'],
    name: function() {
      return this.model.summary().split(' ').slice(0, 2).join(' ');
    },
    summary: function() {
      return this.model.summary().split(' ').slice(2).join(' ');
    },
    timestamp: function() {
      return dateFormatter(this.model.timestamp());
    },
    postRender: function() {
      if (this.read() === true) {
        this.$el.addClass('visited');
      } else {
        this.$el.removeClass('visited');
      }
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
