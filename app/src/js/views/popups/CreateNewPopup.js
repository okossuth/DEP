// Generated by CoffeeScript 1.6.2
define(['views/popups/Popup', 'ovivo'], function(Popup) {
  return Popup.extend({
    el: '.popup-create-new',
    events: _.extend({}, Popup.prototype.events, {
      'click .button-create-resource-need': 'createResourceNeed'
    }),
    createResourceNeed: function() {
      ovivo.desktop.pages.settings.show();
      ovivo.desktop.pages.settings.view.showSubView('resourceNeed');
      ovivo.desktop.popups.editPopupResourceNeed.createNew();
      ovivo.desktop.popups.editPopupResourceNeed.show();
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
