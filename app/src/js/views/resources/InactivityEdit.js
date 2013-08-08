define(['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'element inactivity',
    events: {
      'click .edit-button': 'edit',
      'click .remove-button': 'processRemove'
    },
    template: Handlebars.templates['inactivityEdit'],
    groupTemplate: Handlebars.templates['inactivityEdit_group'],
    edit: function() {
      var _mode;
      if (this.model.isSingle() === true) {
        _mode = 'edit-single';
      } else {
        _mode = 'edit';
      }
      ovivo.desktop.popups.editPopupTimeoff.show();
      return ovivo.desktop.popups.editPopupTimeoff.edit(this.model, _mode);
    },
    _getDateStr: function(_date) {
      if (_date != null) {
        return "" + (_date.getDate()) + ". " + (ovivo.config.MONTHS[_date.getMonth()].toLowerCase().slice(0, 3));
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
    postRender: function() {
      var _approved;
      this.$el.removeClass('approved not-approved pending');
      return this.$el.addClass((_approved = this.model.approved()) != null ? _approved === true ? 'approved' : 'not-approved' : 'pending');
    },
    isReason: function() {
      var _reason;
      return ((_reason = this.reason()) != null) && (_reason !== '');
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
