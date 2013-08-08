define(['models/resources/ResourceBase', 'collections/resources/Comments', 'views/resources/Event', 'views/resources/EventDetails', '_features/notificationMessage', 'ovivo'], function(ResourceBase, Comments, View, DetailsView, notificationMessage) {
  return ResourceBase.extend({
    typeName: 'event',
    _gettersNames: ['pk', 'comment', 'start_time', 'has_applied', 'skill', 'group', 'num_comments', 'response_deadline', 'end_time', 'type', 'start_date', 'deltaHours', 'pub_date', 'creator_name', 'start_time_hours', 'start_time_minutes', 'end_time_hours', 'end_time_minutes'],
    start_time_hours: function() {
      var _ref;
      return (_ref = this.start_time()) != null ? _ref.split(':')[0] : void 0;
    },
    start_time_minutes: function() {
      var _ref;
      return (_ref = this.start_time()) != null ? _ref.split(':')[1] : void 0;
    },
    end_time_hours: function() {
      var _ref;
      return (_ref = this.end_time()) != null ? _ref.split(':')[0] : void 0;
    },
    end_time_minutes: function() {
      var _ref;
      return (_ref = this.end_time()) != null ? _ref.split(':')[1] : void 0;
    },
    getKey: function() {
      var date, month, year, _ref, _ref1;
      if (this.key != null) {
        return this.key;
      } else {
        _ref = this.start_date().split('-'), year = _ref[0], month = _ref[1], date = _ref[2];
        _ref1 = [parseInt(year), parseInt(month) - 1, parseInt(date)], year = _ref1[0], month = _ref1[1], date = _ref1[2];
        return this.key = "" + year + "-" + month + "-" + date;
      }
    },
    setDeltaHours: (function() {
      var _getMinutes;
      _getMinutes = function(str) {
        var hours, minutes, _ref, _ref1;
        _ref = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(str)).slice(-2), hours = _ref[0], minutes = _ref[1];
        _ref1 = [parseInt(hours), parseInt(minutes)], hours = _ref1[0], minutes = _ref1[1];
        return hours * 60 + minutes;
      };
      return function() {
        var _delta, _end, _start;
        _end = _getMinutes(this.end_time());
        _start = _getMinutes(this.start_time());
        if (_start <= _end) {
          _delta = (_end - _start) / 60;
        } else {
          _delta = (_end - _start) / 60 + 24;
        }
        return this.set('deltaHours', Math.round(_delta));
      };
    })(),
    switchType: function() {
      this.set('has_applied', !this.has_applied());
      return true;
    },
    createDetailsView: function() {
      if (this.detailsView == null) {
        this.detailsView = new DetailsView({
          model: this
        });
        this.comments.initFetch();
      }
      return true;
    },
    changeApplicationStatus: function(model, flag, obj) {
      if ((this.previous('has_applied') !== void 0) && (obj.fetching !== true) && (obj.socket_io !== true) && (obj.cache_update !== true)) {
        return this.save();
      }
    },
    processSync: function(event, events, options) {
      var _text;
      _text = event.has_applied() === true ? gettext('Your bid has now been received') : gettext('Your bid has been removed');
      if (options.fetching !== true) {
        return notificationMessage.post(ovivo.desktop.pages.calendar.view.$el, _text);
      }
    },
    initialize: function(attrs, options) {
      this.comments = new Comments([], {
        event: this
      });
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.on('change:has_applied', this.changeApplicationStatus, this);
      this.on('sync', this.processSync, this);
      return true;
    }
  });
});
