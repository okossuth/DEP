define(['_features/indicator', 'ovivo'], function(indicator) {
  return _.extend({}, Backbone.Events, {
    _set: function(name, value) {
      if (this[name] !== value) {
        this[name] = value;
        return this.trigger("change:" + name, value);
      }
    },
    _get: function(name) {
      return this[name];
    },
    processFBLoginStatus: function(obj) {
      var _ref, _ref1;
      this.signedRequest = obj != null ? (_ref = obj.authResponse) != null ? _ref.signedRequest : void 0 : void 0;
      this._set('fb-status', obj.status);
      if (obj.status === 'connected') {
        if ((_ref1 = this.connectFBdef) != null) {
          _ref1.resolve();
        }
      }
      return true;
    },
    _setHandlers: function() {
      return this.on('change:status', this.linkFacebook, this);
    },
    processAuth: function(data, textStatus, jqXHR) {
      indicator.success();
      if (jqXHR.status === 204) {
        this._set('status', false);
      } else if (jqXHR.status === 200) {
        this._set('status', true);
      }
      this.trigger('_setHandlers');
      return true;
    },
    initFB: function() {
      FB.init({
        appId: ovivo.config.FB_APP_ID,
        status: true,
        cookie: true,
        xfbml: true
      });
      indicator.start();
      $.ajax({
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return FB.getLoginStatus(_.bind(this.processFBLoginStatus, this));
    },
    processFBLogin: function(obj) {
      return this.processFBLoginStatus(obj);
    },
    processFBLogout: function(obj) {
      return this.processFBLoginStatus(obj);
    },
    connectFB: function() {
      var _this = this;
      this.connectFBdef = new $.Deferred();
      FB.login(function() {
        return FB.getLoginStatus(_.bind(_this.processFBLogin, _this), {
          redirect_uri: 'http://ovivo-mobile.eur00t.com'
        });
      });
      return this.connectFBdef;
    },
    disconnectFB: function() {
      var _this = this;
      return FB.logout(function() {
        return FB.getLoginStatus(_.bind(_this.processFBLogout, _this));
      });
    },
    linkFB: function() {
      indicator.start();
      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          signed_request: this.signedRequest
        }),
        contentType: 'application/json',
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return true;
    },
    unlinkFB: function() {
      indicator.start();
      $.ajax({
        type: 'DELETE',
        data: ' ',
        url: '/api/1.0/authorize/connection/',
        success: _.bind(this.processAuth, this),
        error: indicator.error
      });
      return true;
    },
    linkFacebook: function() {
      var _FBStatus, _status,
        _this = this;
      _FBStatus = this._get('fb-status');
      _status = this._get('status');
      if (_FBStatus === 'connected') {
        if (_status === true) {
          this.linkFB();
        } else if (_status === false) {
          this.unlinkFB();
        }
      } else {
        if (_status === true) {
          this.connectFB().done(function() {
            return _this.linkFB();
          });
        } else if (_status === false) {
          this.unlinkFB();
          true;
        }
      }
      return false;
    },
    initialize: function() {
      var _this = this;
      this.once('_setHandlers', this._setHandlers, this);
      if (window.FB != null) {
        this.initFB();
      } else {
        window.fbAsyncInit = function() {
          return _this.initFB();
        };
      }
      return true;
    }
  });
});
