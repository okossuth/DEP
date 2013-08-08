define(['ovivo'], function() {
  var _getCookie, _handlers, _pathRegexp;
  _getCookie = function(name) {
    var _match;
    _match = document.cookie.match(new RegExp("" + name + "=(.*?)(;|$)"));
    if (_match !== null) {
      return _match[1];
    } else {
      return ovivo.config.TEST_SESSIONID_COOKIE;
    }
  };
  _pathRegexp = new RegExp("^" + ovivo.config.API_URL_PREFIX_REGEXP + "\\/(.*?)\\/(\\d+)\\/$");
  _handlers = {
    'connected': function() {
      return true;
    },
    'connect': function() {
      this._socket.emit('auth', this._sessionId);
      return true;
    },
    'data': function(msg) {
      msg = $.parseJSON(msg);
      this._processMessage(msg);
      return true;
    }
  };
  return {
    _initHandlers: function() {
      var _this = this;
      _.each(_handlers, function(func, name) {
        _this._socket.on(name, _.bind(func, _this));
        _this._socket.on(name, function() {
          console.log(name, arguments);
          return true;
        });
        return true;
      });
      return true;
    },
    _processMessage: function(msg) {
      var _id, _match, _model, _path, _ref, _target;
      msg = msg.data;
      _ref = msg.target.match(_pathRegexp), _match = _ref[0], _path = _ref[1], _id = _ref[2];
      if ((_target = ovivo.desktop.resources[_path]) != null) {
        _model = _target.get(parseInt(_id));
        switch (msg.action) {
          case 'create':
            _target.add(msg.data, {
              'socket_io': true
            });
            break;
          case 'update':
            if (_model != null) {
              _model.set(msg.data, {
                'socket_io': true
              });
            } else {
              _target.add(msg.data, {
                'socket_io': true
              });
            }
            break;
          case 'delete':
            _target.remove(_model);
        }
        playAlert('glass');
      } else {
        throw new Error('Socket.IO: wrong target');
      }
      return true;
    },
    init: function() {
      var _cookie,
        _this = this;
      if ((typeof io !== "undefined" && io !== null) && (io.connect != null)) {
        this._socket = io.connect(ovivo.config.SOCKET_IO_CONNECT_URL);
        this._sessionId = (_cookie = _getCookie('sessionid')) != null ? _cookie : ovivo.config.TEST_SESSIONID_COOKIE;
        this._initHandlers();
      } else {
        setTimeout((function() {
          return _this.init();
        }), 300);
      }
      return true;
    }
  };
});
