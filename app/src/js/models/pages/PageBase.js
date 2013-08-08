define(['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.Model.extend(_.extend({}, ToolsBase, {
    show: function() {
      return this.view.show.apply(this.view, Array.prototype.slice.call(arguments, 0));
    },
    processChange: function() {
      var _localStorage;
      if ((_localStorage = window.localStorage) != null) {
        _localStorage[this.id] = JSON.stringify(this.toJSON());
      }
      return true;
    },
    _getFromLocalStorage: function() {
      var _localStorage, _objStr;
      if (((_localStorage = window.localStorage) != null) && ((_objStr = _localStorage[this.id]) != null)) {
        this.set(JSON.parse(_objStr));
      }
      return true;
    },
    toJSON: function() {
      return {
        subView: this.get('subView')
      };
    },
    initialize: function(attrs, options) {
      var _obj;
      this.name = attrs.name;
      this.on('change:subView', this.processChange, this);
      this.id = "page-" + this.name;
      this._getFromLocalStorage();
      _obj = {
        model: this
      };
      if ((options != null ? options.el : void 0) != null) {
        _obj.el = options.el;
      }
      this.view = new this.View(_obj);
      return true;
    },
    clear: function() {
      if (this.view.clear != null) {
        return this.view.clear();
      }
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});
