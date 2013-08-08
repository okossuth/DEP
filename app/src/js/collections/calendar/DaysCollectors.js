define(['_common/ToolsBase', 'collections/calendar/Days', 'ovivo'], function(ToolsBase, Days) {
  var _Base;
  _Base = Backbone.Collection.extend(_.extend({}, ToolsBase, {
    comparator: function(elem) {
      return elem.firstDate();
    },
    addElement: function(obj) {
      var _elem;
      _elem = new this.model(obj, {
        collection: this
      });
      this.add(_elem);
      return _elem;
    },
    show: function(elem) {
      if (this.prevElem != null) {
        this.prevElem.hide();
        this.trigger('hide', this.prevElem);
      }
      elem.show();
      this.trigger('show', elem);
      return this.prevElem = elem;
    },
    initialize: function(models, options) {
      _.extend(this, options);
      this.days = new Days([], {
        model: this.DayModel
      });
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});
