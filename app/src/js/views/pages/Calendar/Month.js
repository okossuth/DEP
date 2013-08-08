define(['views/pages/Calendar/DaysCollectorPage', 'views/pages/PageBase', 'collections/calendar/Months', 'ovivo'], function(DaysCollectorPage, PageBase, Months) {
  return PageBase.extend(_.extend({}, DaysCollectorPage, {
    el: '.page.page-calendar .month-view',
    name: 'month',
    Collectors: Months,
    events: {},
    _getKey: function(year, month) {
      return "" + year + "-" + month;
    },
    _getObj: function(year, month) {
      return {
        year: year,
        month: month
      };
    },
    prev: function() {
      this.current.setMonth(this.current.getMonth() - 1);
      return this.navigate(this.current.getFullYear(), this.current.getMonth());
    },
    next: function() {
      this.current.setMonth(this.current.getMonth() + 1);
      return this.navigate(this.current.getFullYear(), this.current.getMonth());
    },
    today: function() {
      var _today;
      _today = Date.today();
      this.current.setMonth(_today.getMonth());
      this.current.setFullYear(_today.getFullYear());
      this.navigate(this.current.getFullYear(), this.current.getMonth());
      return this.moveToday();
    },
    _isToday: function(year, month) {
      var _today;
      _today = Date.today();
      return (_today.getFullYear() === year) && (_today.getMonth() === month);
    },
    processCollectorShow: function(collector) {
      return this.title.html(ovivo.config.MONTHS[collector.month()] + ' ' + collector.year());
    },
    processCollectorHide: function(collector) {},
    moveToday: function() {
      var _currentTop;
      _currentTop = this.$('.cell.current').position().top;
      return this.$el.animate({
        scrollTop: _currentTop
      });
    },
    initialize: function() {
      var _now;
      this.current = _now = Date.today().moveToFirstDayOfMonth();
      this._initialize();
      this.title = $('.page.page-calendar header span.title.month-title');
      this.collectorsList = this.$('.months-list');
      this.todayButton = $('.page.page-calendar header .month-today');
      this.navigate(_now.getFullYear(), _now.getMonth());
      setTimeout(_.bind(this.moveToday, this), 1000);
      return true;
    }
  }));
});
