define([], function() {
  var _animationEndGen;
  _animationEndGen = function(_def, enterClass, exitClass) {
    var _func;
    _func = function(e) {
      $(this).addClass('post-animation');
      _def.resolve();
      $(this).off(ovivo.config.ANIMATION_END, _func);
      $(this).css('z-index', '');
      return true;
    };
    return _func;
  };
  return {
    transit: function(prev, next, enterClass, exitClass, reverse) {
      var _def, _defNext, _defPrev,
        _this = this;
      _defNext = $.Deferred();
      _defPrev = $.Deferred();
      if (reverse === true) {
        $(next).css('z-index', 0);
        $(prev).css('z-index', 1);
      } else {
        $(next).css('z-index', 1);
        $(prev).css('z-index', 0);
      }
      if ((ovivo.config.PAGE_TRANSITION_ANIMATION === true) && (ovivo.config.ANIMATION_END !== false)) {
        $(next).on(ovivo.config.ANIMATION_END, _animationEndGen(_defNext, enterClass, exitClass));
        $(prev).on(ovivo.config.ANIMATION_END, _animationEndGen(_defPrev, enterClass, exitClass));
        if (reverse === true) {
          $(next).addClass('back');
          $(prev).addClass('back');
        }
        $(next).addClass(enterClass).addClass('transition').addClass('next-page');
        $(prev).addClass(exitClass).addClass('transition').addClass('prev-page');
        return $.when(_defNext, _defPrev).done(function() {
          $(next).removeClass("" + enterClass + " transition back next-page post-animation");
          return $(prev).removeClass("" + exitClass + " transition back prev-page post-animation");
        });
      } else {
        $(prev).addClass('hide');
        $(next).removeClass('hide');
        _def = new $.Deferred();
        _def.resolve();
        return _def;
      }
    }
  };
});
