define(['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'working-hour element',
    template: Handlebars.templates['workingHour'],
    groupTemplate: Handlebars.templates['workingHour_group'],
    events: {
      'mouseenter': 'processMouseEnter',
      'mouseleave': 'processMouseLeave',
      'click': 'processClick'
    },
    processMouseEnter: function() {
      return this.model.highlight();
    },
    processMouseLeave: function() {
      return this.model.removeHighlight();
    },
    processClick: function(e) {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.pages.editWorkingHours.view.showEl();
      ovivo.desktop.pages.editWorkingHours.view.edit(this.model, _mode);
      e.stopPropagation();
      return false;
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase().slice(0, 3)) + " " + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase());
      } else {
        return '';
      }
    },
    start_date: function() {
      var _start_date;
      if ((_start_date = this.model.start_date()) != null) {
        return this._getDateStr(new Date(Date.parse(_start_date)));
      } else {
        return '';
      }
    },
    end_date: function() {
      var _end_date;
      if (this.model.end_date() === this.model.start_date()) {
        return '';
      } else if ((_end_date = this.model.end_date()) != null) {
        return " – " + (this._getDateStr(new Date(Date.parse(_end_date))));
      } else {
        return ' – \u221E';
      }
    },
    available: function() {
      if (this.model.available() === true) {
        return gettext('Available');
      } else {
        return gettext('Unavailable');
      }
    },
    postRender: function() {
      var _className;
      _className = this.model.available() === true ? 'available' : 'unavailable';
      return this.$('.element-container').removeClass('available unavailable').addClass(_className);
    },
    initialize: function() {
      this.model.setDeltaHours();
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
