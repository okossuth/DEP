define(['models/resources/ResourceBase', '_common/ResourceManagerBase', 'ovivo'], function(ResourceBase, ResourceManagerBase) {
  return ResourceBase.extend(_.extend({}, ResourceManagerBase, {
    name: 'user',
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/";
    },
    standaloneModel: true,
    _gettersNames: ['first_name', 'last_name', 'groups', 'skills', 'email', 'email_confirmed', 'mobile_phone_prefix', 'mobile_phone'],
    toJSON: function() {
      var _json;
      _json = Backbone.Model.prototype.toJSON.call(this);
      delete _json.groups;
      delete _json.skills;
      return _json;
    },
    initialize: function(attrs, options) {
      this.initResource();
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});
