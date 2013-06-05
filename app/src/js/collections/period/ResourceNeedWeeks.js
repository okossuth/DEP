// Generated by CoffeeScript 1.6.2
define(['models/period/ResourceNeedWeek', '_common/CachableCollection', 'ovivo'], function(Model, CachableCollection) {
  return Backbone.Collection.extend(_.extend({}, CachableCollection.get(['pk']), {
    model: Model,
    addModel: function(obj) {
      var _model;

      _model = new Model(obj);
      this.add(_model);
      return _model;
    },
    getScrollData: function() {
      return this.map(function(model) {
        return {
          el: model.view.el,
          top: model.view.el.offsetTop,
          height: model.view.el.offsetHeight
        };
      });
    },
    initialize: function() {
      this.initCacheProcessors();
      return true;
    }
  }));
});
