define(['models/resources/ResourceBase', '_common/ResourceManagerBase', 'ovivo'], function(ResourceBase, ResourceManagerBase) {
  return ResourceBase.extend(_.extend({}, ResourceManagerBase, {
    name: 'communication',
    url: function() {
      return "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/communication/";
    },
    standaloneModel: true,
    _gettersNames: ['event_urgent_within', 'activity_digest', 'response_confirmation', 'send_event_compilation_at', 'event_reminders', 'notify_sms', 'notify_email'],
    initialize: function(attrs, options) {
      this.initResource();
      this.proxyCall('initialize', arguments);
      this.id = 1;
      return true;
    }
  }));
});
