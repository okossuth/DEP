define(['views/popups/EditPopup', '_common/InactivityEdit', 'ovivo'], function(EditPopup, InactivityEdit) {
  return EditPopup.extend(_.extend(InactivityEdit, {
    el: '.popup-timeoff',
    initialize: function() {
      this.initializeEdit();
      return this._initialize();
    }
  }));
});
