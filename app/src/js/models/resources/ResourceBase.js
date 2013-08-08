define(['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.Model.extend(_.extend({}, ToolsBase, {
    idAttribute: 'pk',
    createGetters: ToolsBase.once('createGetters', function() {
      var _this = this;
      return _.each(this._gettersNames, function(name) {
        if (_this.constructor.prototype[name] == null) {
          return _this.constructor.prototype[name] = function() {
            return this.get(name);
          };
        }
      });
    }),
    addDay: function(day) {
      return this.calendarDays[day.cid] = day;
    },
    addDays: function(days) {
      return this.calendarDays = this.calendarDays.concat(days);
    },
    removeDay: function(day) {
      return delete this.calendarDays[day.cid];
    },
    getView: function() {
      return new this.View({
        model: this
      });
    },
    highlight: function() {
      var _this = this;
      return _.each(_.values(this.calendarDays), function(day) {
        return day.highlight(_this);
      });
    },
    removeHighlight: function() {
      var _this = this;
      return _.each(_.values(this.calendarDays), function(day) {
        return day.removeHighlight(_this);
      });
    },
    initialize: function(attrs, options) {
      this.calendarDays = {};
      this.createGetters();
      if (this.View != null) {
        this.view = new this.View({
          model: this
        });
      }
      return true;
    },
    setValue: function(name, value) {
      return this.set(name, value);
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});
