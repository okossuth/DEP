requirejs(['_features/indicator', '_features/localStorageCache'], function(indicator, localStorageCache) {
  return (function() {
    var _callbackCreatorCreator, _callsCounter, _errorCreator, _postProcess, _processFlag, _processLocalStorageCache, _processReadSuccess, _queue, _queueRules, _successCreator, _sync;
    _sync = Backbone.sync;
    _callsCounter = 0;
    _processFlag = false;
    _queue = {
      'read': [],
      'update': [],
      'delete': [],
      'create': []
    };
    _queueRules = {
      'read': false,
      'update': true,
      'delete': false,
      'create': false
    };
    _callbackCreatorCreator = function(action, done) {
      return function(originalCallback, method, model, options) {
        return function(model, resp) {
          var _curObj, _nextObj, _res;
          _callsCounter -= 1;
          if (typeof (_res = action(options._url, model, resp, method, options)) === 'object') {
            resp = _res;
          }
          if (_queueRules[method] === true) {
            _curObj = _queue[method].shift();
            _nextObj = _queue[method][0];
            if (model._syncStamp !== _curObj.stamp) {
              resp = {};
            }
            if (_queue[method].length > 0) {
              _sync.apply(_nextObj.context, _nextObj.args);
            }
          }
          if (_callsCounter === 0) {
            done();
          }
          return originalCallback != null ? originalCallback.apply(this, Array.prototype.slice.call(arguments, 0)) : void 0;
        };
      };
    };
    _processReadSuccess = function(url, model, resp, options) {
      if (model.preProcessJSON != null) {
        resp = model.preProcessJSON(resp);
      }
      localStorageCache.cache(resp, url);
      if ((model instanceof Backbone.Collection) && (resp instanceof Array)) {
        if (model.fullResponse === true) {
          _.each(_.without.apply(_, [model.pluck('pk')].concat(_.pluck(resp, 'pk'))), function(pk) {
            var _model;
            _model = model.get(pk);
            return model.remove(_model);
          });
        }
        _.each(resp, function(obj, i) {
          var _model;
          if ((_model = model.get(obj.pk)) != null) {
            _model.set(obj, {
              cache_update: true
            });
            return delete resp[i];
          }
        });
        resp = _.compact(resp);
      }
      return resp;
    };
    _successCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      if (method === 'read') {
        return _processReadSuccess(url, model, resp, options);
      }
    }), indicator.success);
    _errorCreator = _callbackCreatorCreator((function(url, model, resp, method, options) {
      ovivo.desktop.resources.apiErrors.addError(url, model, resp, method, options);
      return indicator.errorAction();
    }), indicator.error);
    _postProcess = function(method, model, options) {
      if (((method === 'update') || (method === 'delete')) && typeof model.url === 'function') {
        model.url = model.url() + '/';
        model.url = model.url.replace('//', '/');
      }
      if (method === 'delete') {
        options.data = ' ';
      }
      return true;
    };
    _processLocalStorageCache = function(model, options) {
      var _ref;
      if (localStorageCache.allowed() === true) {
        if (localStorageCache.reset(model, options._url, options) === true) {
          if ((_ref = model.def) != null) {
            _ref.resolve(options.resp);
          }
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    return Backbone.sync = function(method, model, options) {
      var _args, _call, _flag, _resp,
        _this = this;
      if (model.localStorageOnly !== true) {
        _callsCounter += 1;
      }
      _args = Array.prototype.slice.call(arguments, 0);
      options._url = ((function() {
        if (typeof model.url === 'function') {
          return model.url();
        } else {
          return model.url;
        }
      })()) + ((options.data != null) && (options.data !== '') ? "?" + options.data : '');
      _flag = method === 'read' ? _processLocalStorageCache(model, options) : model.localStorageOnly === true ? (_resp = model.toJSON(), method === 'create' ? _resp.pk = Date.now().valueOf() : void 0, options.success(model, _resp, options), model.trigger('sync', model, _resp, options), false) : true;
      _call = function() {
        var _stamp;
        _stamp = (new Date()).valueOf().toString() + _callsCounter.toString();
        model._syncStamp = _stamp;
        options.success = _successCreator.apply(null, [options.success].concat(_args));
        options.error = _errorCreator.apply(null, [options.error].concat(_args));
        _postProcess.apply(this, _args);
        indicator.start();
        if (_queueRules[method] === true) {
          _queue[method].push({
            stamp: _stamp,
            context: this,
            args: _args
          });
        }
        if ((_queueRules[method] === true) && (_queue[method].length === 1) || (_queueRules[method] === false)) {
          return _sync(method, model, options);
        } else {
          return true;
        }
      };
      if (model.localStorageOnly !== true) {
        if (_flag === true) {
          return _call.call(this);
        } else {
          return setTimeout((function() {
            return _call.call(_this);
          }), 300);
        }
      }
    };
  })();
});
