define(['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-help',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {});
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function(type) {
      this.proxyCall('transitionComplete', arguments);
      if ((type === 'enter') && (this.loaded === false)) {
        this.iframe.src = ovivo.config.HELP_URL;
      }
      return true;
    },
    iframeLoad: function() {
      return this.loaded = true;
    },
    initialize: function() {
      this.loaded = false;
      this.iframe = this.$('iframe')[0];
      this.iframe.onload = _.bind(this.iframeLoad, this);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
