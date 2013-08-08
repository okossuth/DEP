define(['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-settings .timeoff-view',
    name: 'timeoff',
    events: {
      'click .button-add-new': 'addNew'
    },
    addNew: function() {
      ovivo.desktop.popups.editPopupTimeoff.show();
      ovivo.desktop.popups.editPopupTimeoff.create();
      return true;
    },
    addInactivity: function(inactivity) {
      return this.inactivities.append(inactivity.editView.el);
    },
    updateScrollers: function() {
      return this.baseView.updateScrollProcessors();
    },
    initialize: function() {
      var _this = this;
      this.inactivities = this.$('.inactivities');
      ovivo.desktop.resources.inactivities.on('add', this.addInactivity, this);
      ovivo.desktop.resources.inactivities.def.done(function() {
        ovivo.desktop.resources.inactivities.on('add', _this.updateScrollers, _this);
        return ovivo.desktop.resources.inactivities.on('remove', _this.updateScrollers, _this);
      });
      return true;
    }
  });
});
