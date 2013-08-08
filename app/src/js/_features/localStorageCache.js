define([], function() {
  return {
    _get: function(model, url) {
      var _str;
      if (typeof (_str = localStorage[url]) !== 'undefined') {
        return JSON.parse(localStorage[url]);
      } else {
        return null;
      }
    },
    allowed: function() {
      this.allowed = function() {
        return this._allowed;
      };
      this._allowed = typeof window.localStorage !== 'undefined';
      return this._allowed;
    },
    cache: function(model, url) {
      return localStorage[url] = JSON.stringify(((model instanceof Backbone.Model) || (model instanceof Backbone.Collection) ? model.toJSON() : model));
    },
    init: function(model, url) {
      if (model.initializeEmpty === true) {
        if (typeof localStorage[url] === 'undefined') {
          if (model instanceof Backbone.Model) {
            localStorage[url] = "{}";
          } else if (model instanceof Backbone.Collection) {
            localStorage[url] = "[]";
          }
        }
      }
      return true;
    },
    reset: function(model, url, options) {
      var _value;
      _value = this._get(model, url);
      if (_value !== null) {
        (model instanceof Backbone.Model ? model.set : model instanceof Backbone.Collection ? model.add : void 0).call(model, _value);
        options.resp = _value;
        return true;
      } else {
        return false;
      }
    }
  };
});
