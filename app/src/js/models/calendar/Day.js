define(['ovivo'], function() {
  return {
    _gettersNames: ['date', 'disabled', 'month', 'week_number', 'year', 'dateObj'],
    addEvent: function(model) {
      var _view;
      _view = model.getView();
      return this.view.addEvent(_view, model);
    },
    removeEvent: function(model) {
      return this.view.removeEvent(model);
    },
    addWorkingHour: function(model) {
      var _view;
      _view = model.getView();
      return this.view.addWorkingHour(_view, model);
    },
    removeWorkingHour: function(model) {
      return this.view.removeWorkingHour(model);
    },
    addInactivity: function(model, obj) {
      var _view;
      _view = model.getView(obj);
      return this.view.addInactivity(_view, model);
    },
    removeInactivity: function(model) {
      return this.view.removeInactivity(model);
    },
    checkToday: function() {
      var _now;
      if (this.collection.todayFound !== true) {
        _now = Date.today();
        if ((_now - this.dateObj()) === 0) {
          this.view.setToday();
          return this.collection.todayFound = true;
        }
      }
    },
    highlight: function(model) {
      return this.view.highlight(model);
    },
    removeHighlight: function(model) {
      return this.view.removeHighlight(model);
    },
    initialize: function(attrs, options) {
      var _this = this;
      this.proxyCall('initialize', arguments);
      this.set('pk', "" + (this.year()) + "-" + (this.month()) + "-" + (this.date()) + (this.disabled() === true ? '-disabled' : ''));
      this.set('dateObj', new Date(this.year(), this.month(), this.date()));
      this.view = new this.View({
        model: this,
        el: options.el
      });
      this.checkToday();
      _.each(ovivo.desktop.resources.events.dateCache["" + (this.year()) + "-" + (this.month() + 1) + "-" + (this.date())], function(event) {
        return _this.addEvent(event);
      });
      return true;
    }
  };
});
