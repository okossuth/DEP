define(['views/pages/PageBase', 'ovivo'], function(PageBase) {
  return PageBase.extend({
    el: '.page.page-settings .availability-view',
    name: 'availability',
    events: {
      'click .button-add-new': 'addNew'
    },
    addNew: function() {
      ovivo.desktop.popups.editPopupWorkingHour.show();
      ovivo.desktop.popups.editPopupWorkingHour.create();
      return true;
    },
    addWorkingHour: function(workingHour) {
      return this.workingHours.append(workingHour.editView.el);
    },
    updateScrollers: function() {
      return this.baseView.updateScrollProcessors();
    },
    initialize: function() {
      var _this = this;
      this.workingHours = this.$('.working-hours');
      ovivo.desktop.resources.workingHours.on('add', this.addWorkingHour, this);
      ovivo.desktop.resources.workingHours.def.done(function() {
        ovivo.desktop.resources.workingHours.on('add', _this.updateScrollers, _this);
        return ovivo.desktop.resources.workingHours.on('remove', _this.updateScrollers, _this);
      });
      return true;
    }
  });
});
