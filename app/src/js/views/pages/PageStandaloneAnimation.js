define(['_common/AnimationControl', 'ovivo'], function(AnimationControl) {
  var _obj;
  _obj = _.extend({}, AnimationControl, {
    _handlerEnterEnd: function(handler, $el, e) {
      $el.removeClass('enter');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    _handlerExitEnd: function(handler, $el, e) {
      $el.removeClass('exit');
      $el.addClass('hide');
      return $el.off(ovivo.config.ANIMATION_END, handler);
    },
    showEl: function() {
      this.$el.removeClass('hide');
      this._attachHandler(this._handlerEnterEnd);
      return this.$el.addClass('enter');
    },
    hideEl: function() {
      this._attachHandler(this._handlerExitEnd);
      return this.$el.addClass('exit');
    }
  });
  if (Modernizr.cssanimations === true) {
    return _obj;
  } else {
    return {};
  }
});
