define(['models/resources/Event', 'ovivo'], function(Event) {
  var _Router;
  _Router = Backbone.Router.extend({
    routes: {
      'events/:pk/': 'showEvent'
    },
    showEvent: function(pk) {
      var _def, _model;
      _model = ovivo.desktop.resources.events.get(pk);
      _def = (function() {
        if (_model === void 0) {
          _model = new Event({
            pk: pk
          });
          _model.url = "" + ovivo.config.API_URL_PREFIX + "users/" + ovivo.config.USER_ID + "/events/" + pk + "/";
          return _model.fetch({
            fetching: true
          });
        } else {
          return true;
        }
      })();
      return $.when(_def).then(function() {
        ovivo.desktop.resources.events.add(_model);
        _model.createDetailsView();
        ovivo.desktop.pages.eventDetails.set('event', _model);
        return ovivo.desktop.pages.eventDetails.view.showEl();
      });
    },
    initialize: function() {
      return true;
    }
  });
  return new _Router();
});
