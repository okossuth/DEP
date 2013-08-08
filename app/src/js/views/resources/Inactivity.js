define(['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'inactivity',
    template: Handlebars.templates['inactivity'],
    groupTemplate: Handlebars.templates['inactivity_group'],
    events: {
      'click': 'processClick'
    },
    processClick: function(e) {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.pages.editInactivity.view.showEl();
      ovivo.desktop.pages.editInactivity.view.edit(this.model, _mode);
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
    start: function() {
      var _start;
      if ((_start = this.model.start()) != null) {
        return this._getDateStr(new Date(Date.parse(_start)));
      } else {
        return '';
      }
    },
    end: function() {
      var _end;
      if ((_end = this.model.end()) != null) {
        return this._getDateStr(new Date(Date.parse(_end)));
      } else {
        return '';
      }
    },
    approved: function() {
      var _approved;
      if ((_approved = this.model.approved()) != null) {
        if (_approved === true) {
          return gettext('Approved');
        } else {
          return gettext('Not approved');
        }
      } else {
        return gettext('Pending');
      }
    },
    isReason: function() {
      var _reason;
      return ((_reason = this.reason()) != null) && (_reason !== '');
    },
    postRender: function() {
      return this.$el.addClass(this.itemType);
    },
    initialize: function(options) {
      this.itemType = options.itemType;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
