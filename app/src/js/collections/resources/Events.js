define(['_features/localStorageCache', 'collections/resources/CachableCollection', 'collections/CollectionBase', 'models/resources/Event', 'ovivo'], function(localStorageCache, CachableCollection, CollectionBase, Event) {
  return CachableCollection.extend(_.extend({}, CollectionBase, {
    model: Event,
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/events/";
    },
    template: Handlebars.templates['events'],
    comparator: function(event) {
      return new Date(event.start_date());
    },
    _getQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        return "" + memo + "&" + key + "=" + value;
      }), '');
    },
    _getTypeQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        if (value === true) {
          return "" + memo + "&type=" + key;
        } else {
          return memo;
        }
      }), '');
    },
    _fetch: function(data) {
      var _callObj, _def, _queryStringFinal,
        _this = this;
      _queryStringFinal = (this._getQueryString(data) + this._getTypeQueryString(this.type)).slice(1);
      if (this.def.state() === 'resolved') {
        this.def = new $.Deferred();
      }
      _def = new $.Deferred();
      _callObj = {
        update: true,
        remove: false,
        data: _queryStringFinal,
        success: function(col, response) {
          _this.def.resolve(response);
          _def.resolve(response);
          return true;
        },
        error: function() {
          _this.def.reject();
          _def.reject();
          return true;
        }
      };
      if (this._ready === true) {
        this.fetch(_callObj);
      } else {
        this._calls.push(_callObj);
      }
      return this.def;
    },
    fetchMonth: function(month, year) {
      var _def,
        _this = this;
      _def = new $.Deferred();
      if (typeof this.monthCache["" + year + "-" + month] !== 'undefined') {
        _def.resolve();
      } else {
        this.monthCache["" + year + "-" + month] = true;
        (this._fetch({
          month: month + 1,
          year: year
        })).then(function() {
          _def.resolve();
          return true;
        });
      }
      return _def;
    },
    fetchWeek: function(number, year, date) {
      return this.fetchMonth(date.getMonth(), year);
    },
    fetchBetween: function(start_pk, end_pk) {
      return this._fetch({
        start_pk: start_pk,
        end_pk: end_pk
      });
    },
    fetchNext: function(limit) {
      var _this = this;
      if (limit == null) {
        limit = 10;
      }
      return this._fetch((function() {
        var _obj, _ref;
        _obj = {
          start_pk: (_ref = _this.last()) != null ? _ref.pk() : void 0,
          limit: limit
        };
        if (_obj.start_pk == null) {
          delete _obj.start_pk;
        }
        return _obj;
      })());
    },
    clear: function() {
      this.monthCache = {};
      this.dateCache = {};
      this.reset();
      return true;
    },
    initFetch: function() {
      var _this = this;
      this._ready = true;
      _.each(this._calls, function(callObj) {
        return _this.fetch(callObj);
      });
      this._calls = [];
      return true;
    },
    renderGroup: function(views) {
      var _DOM, _hash;
      _hash = {};
      views = _.filter(views, function(view) {
        if (_hash[view.model.id] !== true) {
          _hash[view.model.id] = true;
          return true;
        } else {
          return false;
        }
      });
      _DOM = $(this.template({
        events: views
      }));
      return _.each(views, function(view) {
        var _elements;
        _elements = $('#event-view-' + view.model.pk(), _DOM);
        view.$el.children().remove();
        view.$el.append(_elements.children());
        view.postRender();
        return true;
      });
    },
    cache: function() {},
    initialize: function(models, options) {
      this._ready = false;
      this._calls = [];
      this.type = {
        'open': true,
        'open-responses': true,
        'closed': true
      };
      _.extend(this, options);
      this.on('change', this.cache, this);
      this.def = new $.Deferred();
      this.monthCache = {};
      this.initCache();
      return true;
    }
  }));
});
