define(['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', 'ovivo'], function(PageBase, PageStandaloneAnimation) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, {
    el: '.page.page-notifications',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click div.done-button': 'list',
        'click .load-more-button': 'loadMoreClick'
      });
    },
    list: function() {
      ovivo.desktop.resources.notifications.readAll();
      return this.hideEl();
    },
    loadMoreClick: function() {
      return ovivo.desktop.resources.notifications.loadMore();
    },
    appendItem: function(item) {
      return this.$('.notifications-list').append(item);
    },
    prependItem: function(item) {
      return this.$('.notifications-list').prepend(item);
    },
    insertBefore: function(model, nextModel) {
      return nextModel.view.$el.before(model.view.$el);
    },
    checkLast: function() {
      if (ovivo.desktop.resources.notifications.isLast() === true) {
        return this.$('.load-more-button').hide();
      } else {
        return this.$('.load-more-button').show();
      }
    },
    resetHandler: function() {
      var _this = this;
      ovivo.desktop.resources.notifications.each(function(model) {
        return _this.appendItem(model.view.el);
      });
      this.checkLast();
      return true;
    },
    addHandler: function(model, collection, options) {
      var next, _i, _j;
      _i = collection.indexOf(model);
      _j = _i + 1;
      while (((next = collection.at(_j)) != null) && (next.inserted !== true)) {
        _j += 1;
      }
      if (next != null) {
        this.insertBefore(model, next);
      } else {
        this.appendItem(model.view.el);
      }
      this.checkLast();
      model.inserted = true;
      return true;
    },
    changeHandler: function() {
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      ovivo.desktop.resources.notifications.on('reset', this.resetHandler, this);
      ovivo.desktop.resources.notifications.on('add', this.addHandler, this);
      ovivo.desktop.resources.notifications.on('change', this.changeHandler, this);
      return true;
    }
  }));
});
