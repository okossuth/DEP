define(['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', '_common/ResourceEditCommon', '_common/WorkingHoursEdit', 'ovivo'], function(PageBase, PageStandaloneAnimation, ResourceEditCommon, WorkingHoursEdit) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, ResourceEditCommon.get(PageBase.prototype.events), WorkingHoursEdit, {
    el: '.page.page-edit-working-hours',
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.initializeEdit();
      return true;
    }
  }));
});
