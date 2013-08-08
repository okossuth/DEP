define(['_features/trailZero', 'ovivo'], function(trailZero) {
  var NORMAL_DATE_RANGE, TIME_TITLES;
  TIME_TITLES = [[-10800000, gettext('just now')], [0, gettext('just now')], [1000, gettext('a second ago')], [60000, gettext('a minute ago')], [180000, gettext('few minutes ago')], [3600000, gettext('an hour ago')], [7200000, gettext('few hours ago')]];
  NORMAL_DATE_RANGE = 10800000;
  return function(date) {
    var delta, returnValue;
    if ((date instanceof Date) !== true) {
      date = new Date(Date.parse(date));
    }
    delta = (new Date()) - date + date.getTimezoneOffset() * 60 * 1000 + ovivo.config.TIMEZONE_OFFSET;
    if (delta > NORMAL_DATE_RANGE) {
      return "" + (ovivo.config.DAYS[date.getDay()].toLowerCase().slice(0, 1)) + ". " + (date.getDate()) + ". " + ovivo.config.MONTHS[date.getMonth()] + " " + (date.getFullYear()) + " " + (trailZero(date.getHours())) + ":" + (trailZero(date.getMinutes()));
    } else {
      returnValue = '';
      _.each(TIME_TITLES, function(title) {
        if (delta > title[0]) {
          return returnValue = title[1];
        }
      });
      return returnValue;
    }
  };
});
