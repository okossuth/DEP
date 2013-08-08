define(['_features/transition', 'models/Page', 'ovivo'], function(transition, Model) {
  return Backbone.Collection.extend({
    model: Model,
    addPage: function(Page, name, options) {
      var _model;
      _model = new Model({}, {
        Page: Page,
        name: name,
        options: options
      });
      this.add(_model);
      return _model;
    },
    transition: function(source, target, _args) {
      var _sourceView, _targetView,
        _this = this;
      _sourceView = source.page.view;
      _targetView = target.page.view;
      _.each([_sourceView, _targetView], function(page) {
        page.showEl();
        return true;
      });
      _sourceView.transitionStart.apply(_sourceView, ['exit'].concat(_args));
      _targetView.transitionStart.apply(_targetView, ['enter'].concat(_args));
      transition.transit(_sourceView.el, _targetView.el, 'enter', 'exit', false).done(function() {
        _sourceView.transitionComplete.apply(_sourceView, ['exit'].concat(_args));
        _targetView.transitionComplete.apply(_targetView, ['enter'].concat(_args));
        return true;
      });
      return true;
    },
    processShow: function(page) {
      var _args;
      _args = Array.prototype.slice.call(arguments, 1);
      ovivo.desktop.sideBar.setPage(page.page.name);
      if (this.current !== page) {
        if ((this.current !== void 0) && (page.page.popup !== true)) {
          this.transition(this.current, page, _args);
        } else {
          page.page.view.showEl();
        }
        this.current = page;
      }
      return true;
    },
    resizeHandler: function() {
      return this.each(function(page) {
        return page.page.view.updateScrollProcessors();
      });
    },
    initialize: function() {
      this.on('show', this.processShow, this);
      $(window).on('resize', _.bind(this.resizeHandler, this));
      return true;
    }
  });
});
