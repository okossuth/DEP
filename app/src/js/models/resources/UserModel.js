// Generated by CoffeeScript 1.6.2
define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    _gettersNames: ['first_name', 'last_name', 'groups', 'skills', 'email', 'email_confirmed', 'mobile_phone_prefix', 'mobile_phone'],
    name: function() {
      return this.first_name() + ' ' + this.last_name();
    },
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});