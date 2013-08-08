define(['views/popups/EditPopup', '_common/WorkingHoursEdit', 'ovivo'], function(EditPopup, WorkingHoursEdit, trailZero) {
  return EditPopup.extend(_.extend(WorkingHoursEdit, {
    el: '.popup-working-hour',
    initialize: function() {
      this.initializeEdit();
      return this._initialize();
    }
  }));
});
