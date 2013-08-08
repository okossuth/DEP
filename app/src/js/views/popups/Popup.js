define(['_common/AnimationControl', 'ovivo'], function(AnimationControl) {
  var _Popup, _counter, _overlayClickHandler;
  _counter = 0;
  _Popup = Backbone.View.extend(_.extend({}, AnimationControl, {
    events: {
      'click .close': 'close'
    },
    close: function() {
      return this.hide();
    },
    _addShownState: function() {
      return ovivo.desktop.popups.shown[this.cid] = this;
    },
    _removeShownState: function() {
      return delete ovivo.desktop.popups.shown[this.cid];
    },
    show: function() {
      _counter += 1;
      this._addShownState();
      this.$el.show();
      return $('.popup-overlay').show();
    },
    hide: function() {
      _counter -= 1;
      this._removeShownState();
      this.$el.hide();
      if (_counter === 0) {
        $('.popup-overlay').hide();
        return $('.popup-overlay').removeClass('exit enter');
      }
    },
    _handlerEnterEnd: function(handler, $el, e) {
      $el.removeClass('enter');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _handlerExitEnd: function(handler, $el, e) {
      _counter -= 1;
      $el.removeClass('exit');
      $el.hide();
      if (_counter === 0) {
        $('.popup-overlay').hide();
        $('.popup-overlay').removeClass('exit enter');
      }
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _animationShow: function() {
      this._addShownState();
      _counter += 1;
      this.$el.show();
      this._attachHandler(this._handlerEnterEnd);
      this.$el.addClass('enter');
      $('.popup-overlay').show();
      return $('.popup-overlay').removeClass('exit').addClass('enter');
    },
    _animationHide: function() {
      this._removeShownState();
      this._attachHandler(this._handlerExitEnd);
      this.$el.addClass('exit');
      if (_counter <= 1) {
        $('.popup-overlay').addClass('exit');
      }
      return true;
    },
    _initialize: function() {
      return true;
    }
  }));
  if (Modernizr.cssanimations === true) {
    _Popup.prototype.show = _Popup.prototype._animationShow;
    _Popup.prototype.hide = _Popup.prototype._animationHide;
  }
  _overlayClickHandler = function(e) {
    _.each(ovivo.desktop.popups.shown, function(popup) {
      return popup.hide();
    });
    return true;
  };
  this.$('.popup-overlay').on('click', _overlayClickHandler);
  return _Popup;
});
