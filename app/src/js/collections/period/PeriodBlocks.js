// Generated by CoffeeScript 1.6.2
define(['collections/period/Blocks', 'models/period/PeriodBlock', '_common/CachableCollection', 'ovivo'], function(Blocks, Model, CachableCollection) {
  return Blocks.extend(_.extend({}, CachableCollection.get(['pk', 'skill', 'groups', 'date', 'code']), {
    model: Model,
    initialize: function(models, options) {
      this.View = options.View;
      this._initialize();
      return true;
    }
  }));
});