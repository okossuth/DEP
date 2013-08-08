define(['_common/ToolsBase', '_features/transition', 'ovivo'], function(ToolsBase, transition) {
  var _Base;
  _Base = Backbone.View.extend(_.extend({}, ToolsBase, {
    show: function() {
      this.model.trigger.apply(this.model, ['show'].concat(Array.prototype.slice.call(arguments, 0)));
      return true;
    },
    events: {
      'click .no-selection': 'clearSelection',
      'click .button-close': 'close'
    },
    clearSelection: function() {
      if (window.getSelection != null) {
        if (window.getSelection().empty != null) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges != null) {
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection != null) {
        document.selection.empty();
      }
      return true;
    },
    close: function() {
      return this.hideEl();
    },
    showEl: function() {
      return this.$el.removeClass('hide');
    },
    hideEl: function() {
      return this.$el.addClass('hide');
    },
    transitionStart: function() {},
    transitionComplete: function(type) {
      if (type === 'exit') {
        this.hideEl();
      }
      if (type === 'enter') {
        this.showSubView(this.subView());
      }
      return true;
    },
    showSubView: function(name) {
      var _subView;
      if (name == null) {
        return;
      }
      _subView = this.subViews[name];
      _.each(_.without(this.subViews, this.subViews[name]), function(subView) {
        return this.$("." + subView.name + "-only").hide();
      });
      this.$("." + name + "-only").show();
      this.model.set('subView', name);
      this.processContentScrollBind.process(_subView.el);
      return _subView.trigger('show');
    },
    subView: function() {
      return this.model.get('subView');
    },
    transition: function(source, target) {
      var _this = this;
      _.each([source, target], function(page) {
        page.showEl();
        return true;
      });
      return transition.transit(source.el, target.el, 'enter', 'exit', false).done(function() {
        source.hideEl();
        return true;
      });
    },
    processSubView: function(page) {
      var _subView, _subViewName,
        _this = this;
      _subViewName = this.subView();
      _subView = this.subViews[_subViewName];
      if (_subView != null) {
        if (this.prevSubView != null) {
          this.transition(this.prevSubView, _subView).done(function() {
            _this.trigger('subViewChange', _subViewName);
            return _this.prevSubView = _subView;
          });
        } else {
          _subView.showEl();
          this.trigger('subViewChange', _subViewName);
          this.prevSubView = _subView;
        }
      }
      return true;
    },
    _initSubView: function() {
      var _subViewName;
      if ((_subViewName = this.subView()) == null) {
        this.model.set('subView', this.defaultSubView);
      } else {
        this.processSubView();
      }
      return true;
    },
    processContentScrollBind: (function() {
      var _cache, _checkScrollBottom, _checkScrollTop, _func, _initialHandler, _usualHandler;
      _checkScrollTop = function() {
        var _scrollTop;
        _scrollTop = this.el.scrollTop;
        if (_scrollTop !== 0) {
          if (!(this.$el.hasClass('scrolled-top'))) {
            this.$el.addClass('scrolled scrolled-top');
          }
        } else {
          this.$el.removeClass('scrolled-top');
          if (!this.$el.hasClass('scrolled-bottom')) {
            this.$el.removeClass('scrolled');
          }
        }
        return true;
      };
      _checkScrollBottom = function() {
        var _scrollTop;
        _scrollTop = this.el.scrollTop;
        if ((this.offsetHeight + _scrollTop) !== this.scrollHeight) {
          if (!(this.$el.hasClass('scrolled-bottom'))) {
            this.$el.addClass('scrolled scrolled-bottom');
          }
        } else {
          this.$el.removeClass('scrolled-bottom');
          if (!this.$el.hasClass('scrolled-top')) {
            this.$el.removeClass('scrolled');
          }
        }
        return true;
      };
      _usualHandler = function() {
        _checkScrollTop.call(this);
        _checkScrollBottom.call(this);
        return true;
      };
      _initialHandler = function(manualFlag) {
        this.offsetHeight = this.el.offsetHeight;
        this.scrollHeight = this.el.scrollHeight;
        if (manualFlag !== true) {
          this.handler = _usualHandler;
        }
        return _usualHandler.call(this);
      };
      _cache = [];
      _func = function($el, el) {
        var _ctx, _handler;
        _ctx = {
          handler: _initialHandler,
          el: el,
          $el: $el
        };
        _cache.push(_ctx);
        _handler = function() {
          _ctx.handler();
          return true;
        };
        _handler.update = function() {
          return _ctx.handler = _initialHandler;
        };
        return _handler;
      };
      _func.process = function(el) {
        var _ctx;
        if (!$(el).hasClass('scrollable')) {
          el = $('.scrollable', el)[0];
        }
        if (el == null) {
          return true;
        }
        _ctx = _.find(_cache, function(ctx) {
          return ctx.el === el;
        });
        if (_ctx != null) {
          _ctx.handler(true);
        }
        return true;
      };
      return _func;
    })(),
    updateScrollProcessors: function() {
      _.each(this.scrollProcessors, function(processor) {
        return processor.update();
      });
      return this.showSubView(this.subView());
    },
    initialize: function() {
      var _this = this;
      this.model.on('change:subView', this.processSubView, this);
      this.content = this.$('div.content');
      this.scrollProcessors = this.$('.scrollable').map(function(i, el) {
        var _processor;
        _processor = _this.processContentScrollBind(_this.$el, el);
        $(el).on('scroll', _processor);
        return _processor;
      });
      this.subViews = [];
      _.each(this.SubViews, function(SubView) {
        var _subView;
        _subView = new SubView();
        _subView.baseView = _this;
        _this.subViews[_subView.name] = _subView;
        return _this.subViews.push(_subView);
      });
      this._initSubView();
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});
