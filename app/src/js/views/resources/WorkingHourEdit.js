define(['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'working-hour element',
    template: Handlebars.templates['workingHourEdit'],
    groupTemplate: Handlebars.templates['workingHourEdit_group'],
    events: {
      'click li.weekday': 'weekdayClick',
      'click .edit-button': 'edit',
      'click .remove-button': 'processRemove'
    },
    weekdayClick: function(e) {
      var _i, _item;
      _item = $(e.target).closest('.weekday');
      _i = _item.index();
      return this.model.processWeek(_i, this.model.weekdaysHash[_i]);
    },
    edit: function() {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.popups.editPopupWorkingHour.show();
      return ovivo.desktop.popups.editPopupWorkingHour.edit(this.model, _mode);
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase().slice(0, 3));
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
    _repeatStrs: [gettext('Every other week').toLowerCase(), gettext('Every second week').toLowerCase(), gettext('Every third week').toLowerCase(), gettext('Every fourth week').toLowerCase()],
    repeat: function() {
      return this._repeatStrs[this.model.repeat() - 1];
    },
    postRender: function() {
      var _this = this;
      return this.$('.columns.weekdays > li').each(function(i, elem) {
        if (_this.model.weekdaysHash[i] === true) {
          return $(elem).addClass('checked');
        } else {
          return $(elem).removeClass('checked');
        }
      });
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.weekDays = this.$('ul.weekdays');
      return true;
    }
  });
});
