define(['ovivo'], function() {
  return Backbone.View.extend({
    el: '.side-bar',
    events: {
      'click .menu-item': 'processItemClick',
      'click .logo.title': 'showNotifications'
    },
    updateNotifications: function(model, collection, options) {
      var _unread,
        _this = this;
      _unread = ovivo.desktop.resources.notifications.unreadLength();
      this.$('.notifications-indicator-container').fadeOut(300).promise().then(function() {
        if (_unread !== 0) {
          _this.$('.notifications-indicator').html(_unread);
          return _this.$('.notifications-indicator-container').fadeIn(300);
        }
      });
      return true;
    },
    menuItemRegExp: /^menu-item-(.*)$/,
    showNotifications: function(e) {
      return ovivo.desktop.pages.notifications.view.showEl();
    },
    _processItem: function(item) {
      if (this.prev != null) {
        this.prev.removeClass('selected');
      } else {
        this.$('.selected').removeClass('selected');
      }
      item.addClass('selected');
      return this.prev = item;
    },
    processItemClick: function(e) {
      var _item;
      _item = $(e.target).closest('.menu-item');
      ovivo.desktop.pages[this.menuItemRegExp.exec(_item[0].id)[1]].show();
      this._processItem(_item);
      return true;
    },
    setPage: function(name) {
      var _item;
      _item = this.$('#menu-item-' + name);
      return this._processItem(_item);
    },
    initialize: function() {
      ovivo.desktop.resources.notifications.on('reset', this.updateNotifications, this);
      ovivo.desktop.resources.notifications.on('add', this.updateNotifications, this);
      return true;
    }
  });
});
