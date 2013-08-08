define(['views/popups/Popup', 'ovivo'], function(Popup) {
  return Popup.extend({
    el: '.popup-create-new',
    events: _.extend({}, Popup.prototype.events, {
      'click .button-create-time': 'createTime',
      'click .button-create-timeoff': 'createTimeoff'
    }),
    createTime: function() {
      var _obj;
      if (this.date != null) {
        _obj = {
          start_date: this.date,
          end_date: this.date
        };
      } else {
        _obj = {};
      }
      if (this.date == null) {
        ovivo.desktop.pages.settings.show();
        ovivo.desktop.pages.settings.view.showSubView('availability');
      }
      ovivo.desktop.popups.editPopupWorkingHour.create(_obj, this.mode);
      ovivo.desktop.popups.editPopupWorkingHour.show();
      return this.close();
    },
    createTimeoff: function() {
      var _obj;
      if (this.date != null) {
        _obj = {
          start: this.date,
          end: this.date
        };
      } else {
        _obj = {};
      }
      if (this.date == null) {
        ovivo.desktop.pages.settings.show();
        ovivo.desktop.pages.settings.view.showSubView('timeoff');
      }
      ovivo.desktop.popups.editPopupTimeoff.create(_obj, this.mode);
      ovivo.desktop.popups.editPopupTimeoff.show();
      return this.close();
    },
    show: function(singleFlag, date) {
      this.date = date;
      if (singleFlag === true) {
        this.mode = 'create-single';
      } else {
        this.mode = 'create';
      }
      return Popup.prototype.show.call(this);
    },
    initialize: function() {
      this._initialize();
      return true;
    }
  });
});
