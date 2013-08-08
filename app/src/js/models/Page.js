define(['ovivo'], function() {
  return Backbone.Model.extend({
    forwardEvent: function() {
      var _args;
      _args = Array.prototype.slice.call(arguments, 0);
      _args.splice(1, 0, this);
      return this.trigger.apply(this, _args);
    },
    initialize: function(attrs, options) {
      this.page = new options.Page({
        name: options.name
      }, options.options);
      this.name = options.name;
      ovivo.desktop.pages[this.name] = this.page;
      this.page.on('all', this.forwardEvent, this);
      return true;
    }
  });
});
