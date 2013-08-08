define(['_features/localStorageCache', '_common/ToolsBase', 'ovivo'], function(localStorageCache, ToolsBase) {
  return {
    _fetchSuccess: function() {
      return true;
    },
    _fetchError: function() {
      return this.def.reject();
    },
    _syncHandler: function() {
      return this.def.resolve();
    },
    _getQueryString: function(data) {
      return _.reduce(data, (function(memo, value, key) {
        return "" + memo + "&" + key + "=" + value;
      }), '');
    },
    initFetch: function() {
      return this._fetch();
    },
    _fetch: function(data) {
      var _queryStringFinal;
      _queryStringFinal = (this._getQueryString(data)).slice(1);
      this.fetch({
        update: true,
        remove: false,
        data: _queryStringFinal,
        error: _.bind(this._fetchError, this),
        success: _.bind(this._fetchSuccess, this)
      });
      return this.def;
    },
    setValue: function(name, value) {
      var _model;
      if (this instanceof Backbone.Model) {
        this.set(name, value);
      } else if (this instanceof Backbone.Collection) {
        _model = this.get(parseInt(name.split('-')[1]));
        _model.set('checked', !value);
        _model.save();
      }
      return true;
    },
    processModelChange: function(model, obj) {
      if (this._checkIfIgnore(model) === true) {
        return true;
      }
      if ((model.editCopy !== true) && (model.url != null) && (model.changed.pk == null) && (model.id != null) && (obj.socket_io !== true) && (obj.cache_update !== true) && (obj.update !== true)) {
        model.save();
      }
      return true;
    },
    _checkIfIgnore: function(model) {
      var _changed, _i;
      if (this._ignoreChange instanceof Array) {
        _i = 0;
        _changed = _.keys(model.changed);
        while (_i < _changed.length) {
          if (_.indexOf(this._ignoreChange, _changed[_i]) === -1) {
            return false;
          }
          _i += 1;
        }
        return true;
      } else {
        return false;
      }
    },
    cache: function() {
      return localStorageCache.cache(this, this._url);
    },
    changeCacheHandler: function(model) {
      if ((this._checkIfIgnore(model) === true) || (model.editCopy === true)) {
        return true;
      }
      return localStorageCache.cache(this, this._url);
    },
    attachProcessors: function() {
      if (this instanceof Backbone.Model) {
        this.on('change', this.changeCacheHandler, this);
        this.on('change', this.processModelChange, this);
      } else if (this instanceof Backbone.Collection) {
        this.on('add', this.cache, this);
        this.on('remove', this.cache, this);
        this.on('change', this.changeCacheHandler, this);
        this.on('change', this.processModelChange, this);
      }
      return true;
    },
    initResource: function() {
      var _this = this;
      this._url = (function() {
        if (typeof _this.url === 'function') {
          return _this.url();
        } else {
          return _this.url;
        }
      })();
      this.def = new $.Deferred();
      this.def.done(function() {
        return _this.attachProcessors();
      });
      this.on('sync', this._syncHandler, this);
      if (localStorageCache.allowed() === true) {
        localStorageCache.init(this, this._url);
      }
      return true;
    }
  };
});
