define(['views/pages/PageBase', '_common/ResourceEditCommon', 'ovivo'], function(PageBase, ResourceEditCommon) {
  return PageBase.extend(_.extend({}, ResourceEditCommon.get({}), {
    el: '.page.page-settings .general-view',
    name: 'general',
    fields: ['first_name', 'last_name', 'mobile_phone', 'email'],
    types: {
      'first_name': String,
      'last_name': String,
      'mobile_phone': String,
      'email': String
    },
    saveHandler: function() {
      return this.save();
    },
    close: function() {},
    show: function() {
      var _this = this;
      return ovivo.desktop.resources.user.def.done(function() {
        return _this.setModel(ovivo.desktop.resources.user);
      });
    },
    initialize: function() {
      this.on('action:save', this.saveHandler, this);
      this.on('show', this.show, this);
      return true;
    }
  }));
});
