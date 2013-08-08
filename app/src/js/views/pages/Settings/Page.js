define(['views/pages/PageBase', 'views/pages/Settings/General', 'views/pages/Settings/Notifications', 'views/pages/Settings/Availability', 'views/pages/Settings/Timeoff', 'views/pages/Settings/Connections', 'ovivo'], function(PageBase, GeneralView, NotificationsView, AvailabilityView, TimeoffView, ConnectionsView) {
  return PageBase.extend({
    el: '.page.page-settings',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click .sections-menu-item': 'menuClick',
        'click .button-save': 'save'
      });
    },
    menuRegExp: /\bsections-menu-item-(.+)\b/,
    menuClick: function(e) {
      var _item;
      _item = $(e.target).closest('.sections-menu-item');
      return this.showSubView(this.menuRegExp.exec(_item[0].className)[1]);
    },
    save: function() {
      return this.subViews[this.subView()].trigger('action:save');
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      return true;
    },
    changeName: function() {
      return this.$('header span.title').html(ovivo.desktop.resources.user.first_name() + ' ' + ovivo.desktop.resources.user.last_name());
    },
    initialize: function() {
      this.SubViews = [GeneralView, NotificationsView, AvailabilityView, TimeoffView, ConnectionsView];
      this.defaultSubView = 'general';
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.user.on('change:first_name', this.changeName, this);
      ovivo.desktop.resources.user.on('change:last_name', this.changeName, this);
      return true;
    }
  });
});
