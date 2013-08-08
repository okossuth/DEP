define(['views/pages/Calendar/DaysCollectorPage', 'views/pages/PageBase', 'collections/calendar/Weeks', 'ovivo'], function(DaysCollectorPage, PageBase, Weeks) {
  return PageBase.extend(_.extend({}, DaysCollectorPage, {
    el: '.page.page-calendar .week-view',
    name: 'week',
    Collectors: Weeks,
    events: {},
    _getKey: function(year, number) {
      return "" + year + "-" + number;
    },
    _getObj: function(year, number) {
      return {
        year: year,
        number: number
      };
    },
    prev: function() {
      this.current.moveToDayOfWeek(4, -1);
      return this.navigate(this.current.getFullYear(), this.current.getWeek());
    },
    next: function() {
      this.current.moveToDayOfWeek(4, 1);
      return this.navigate(this.current.getFullYear(), this.current.getWeek());
    },
    today: function() {
      var _now;
      _now = Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      this.current = _now;
      return this.navigate(_now.getFullYear(), _now.getWeek());
    },
    _isToday: function(year, number) {
      var _now;
      _now = Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      return (_now.getFullYear() === year) && (_now.getWeek() === number);
    },
    processCollectorShow: function(collector) {
      return this.title.html(gettext('Week') + ' ' + collector.number() + '. ' + ovivo.config.MONTHS[collector.month()] + ' ' + collector.year());
    },
    processCollectorHide: function(month) {},
    initialize: function() {
      var _now;
      this.current = _now = new Date.today();
      _now.setWeek(_now.getWeek());
      _now.moveToDayOfWeek(4);
      this._initialize();
      this.title = $('.page.page-calendar header span.title.week-title');
      this.collectorsList = this.$('.weeks-list');
      this.todayButton = $('.page.page-calendar header .week-today');
      this.navigate(_now.getFullYear(), _now.getWeek());
      return true;
    }
  }));
});
