define(['views/resources/Event', 'ovivo'], function(Event) {
  return Event.extend({
    tagName: 'div',
    doNotThrottleGroup: true,
    events: _.extend({}, Event.prototype.events, {
      'click .switcher': 'changeType'
    }),
    render: function() {
      var _comments;
      _comments = this.$('ul.comments').children();
      this.proxyCall('render', arguments);
      this.$('ul.comments').append(_comments);
      return true;
    },
    template: Handlebars.templates['eventDetails']
  });
});
