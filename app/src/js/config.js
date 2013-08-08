if (window.ovivo == null) {
  window.ovivo = {};
}

if (!window.ovivo.config) {
  window.ovivo.config = {};
}

ovivo.config.API_URL_PREFIX = '/api/1.0/';

ovivo.config.API_URL_PREFIX_REGEXP = '\\/api\\/1\\.0';

ovivo.config.MONTHS = [gettext('January'), gettext('February'), gettext('March'), gettext('April'), gettext('May'), gettext('June'), gettext('July'), gettext('August'), gettext('September'), gettext('October'), gettext('November'), gettext('December')];

ovivo.config.DAYS = [gettext('Sunday'), gettext('Monday'), gettext('Tuesday'), gettext('Wednesday'), gettext('Thursday'), gettext('Friday'), gettext('Saturday'), gettext('Sunday')];

ovivo.config.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

ovivo.config.HELP_URL = 'http://ovivo.desk.com';

ovivo.config.VALIDATION_REGEXP_TIME = /^(((\d\d):(\d\d))|((\d\d)\.(\d\d))|((\d\d)(\d\d)))$/;

ovivo.config.ANIMATION_END = (function() {
  var _animation;
  if ((_animation = Modernizr.prefixed('animation')) === false) {
    return false;
  }
  if (_animation === 'animation') {
    return 'animationend';
  }
  return (_animation + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");
})();

if (ovivo._config != null) {
  ovivo.config = _.extend(ovivo.config, ovivo._config);
}
