define([], function() {
  return {
    _attachHandlers: (function() {
      var _animationEnd;
      _animationEnd = function($el) {
        var _handler;
        _handler = function() {
          return $el.off(ovivo.config.ANIMATION_END, _handler);
        };
        return _handler;
      };
      return function($el) {
        return $el.on(ovivo.config.ANIMATION_END, _animationEnd($el));
      };
    })(),
    _attachHandler: function(handler) {
      return this.$el.on(ovivo.config.ANIMATION_END, this._wrapHanlder(handler, this.$el));
    },
    _wrapHanlder: function(handler) {
      var _argsOutter, _handler;
      _argsOutter = Array.prototype.slice.call(arguments, 1);
      return _handler = function() {
        var _args;
        _args = Array.prototype.slice.call(arguments, 0);
        return handler.apply(this, [_handler].concat(_argsOutter).concat(_args));
      };
    }
  };
});
