define(['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', '_common/ResourceEditCommon', '_common/InactivityEdit', 'ovivo'], function(PageBase, PageStandaloneAnimation, ResourceEditCommon, InactivityEdit) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, ResourceEditCommon.get(PageBase.prototype.events), InactivityEdit, {
    el: '.page.page-edit-inactivity',
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.initializeEdit();
      return true;
    }
  }));
});
