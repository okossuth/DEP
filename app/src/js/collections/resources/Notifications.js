define(['models/resources/Notification', '_common/ResourceManagerBase', 'ovivo'], function(Model, ResourceManagerBase) {
  return Backbone.Collection.extend(_.extend({}, ResourceManagerBase, {
    model: Model,
    url: "" + ovivo.config.API_URL_PREFIX + "notifications/",
    comparator: function(notification) {
      return -Date.parse(notification.timestamp()).valueOf();
    },
    unreadLength: function() {
      return this.filter(function(model) {
        return model.read() === false;
      }).length;
    },
    isLast: function() {
      if ((this.length === 0) || ((this.find(function(notification) {
        return notification.last() === true;
      })) != null)) {
        return true;
      } else {
        return false;
      }
    },
    loadMore: function() {
      var _lastId;
      _lastId = this.last().id;
      return this._fetch({
        'start_pk': _lastId
      });
    },
    readAll: function() {
      var _jsonArr, _unread;
      _unread = this.filter(function(notification) {
        return notification.read() === false;
      });
      _jsonArr = [];
      _.each(_unread, function(notification) {
        notification.set('read', true);
        _jsonArr.push(notification.toJSON());
        return true;
      });
      ovivo.desktop.sideBar.updateNotifications();
      if (_jsonArr.length > 0) {
        return $.ajax({
          url: this.url,
          type: 'PUT',
          data: JSON.stringify(_jsonArr),
          contentType: 'application/json'
        });
      } else {
        return true;
      }
    },
    initialize: function() {
      this.initResource();
      return true;
    }
  }));
});
