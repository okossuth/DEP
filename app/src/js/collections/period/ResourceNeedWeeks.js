// Generated by CoffeeScript 1.6.2
define(['models/period/ResourceNeedWeek', 'ovivo'], function(Model) {
  return Backbone.Collection.extend(_.extend({}, {
    model: Model,
    addModel: function(obj) {
      var _model;

      _model = new Model(obj);
      this.add(_model);
      return _model;
    },
    getScrollData: function() {},
    initialize: function() {
      return true;
    }
  }));
});
