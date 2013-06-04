// Generated by CoffeeScript 1.6.2
define(['views/resources/ResourceBase', '_common/ToolsBase', 'ovivo'], function(ResourceBase, ToolsBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'table',
    template: Handlebars.templates['periodBlockWeek'],
    groupTemplate: Handlebars.templates['periodBlockWeek_group'],
    preventChangeRender: true,
    events: {},
    exposeAttrs: ToolsBase.once('exposeAttrs', function() {
      var _this = this;

      return _.each(this.model._gettersNames, function(name) {
        if (name instanceof Array) {
          name = name[0];
        }
        if (_this.constructor.prototype[name] == null) {
          return _this.constructor.prototype[name] = function() {
            return this.model[name]();
          };
        }
      });
    }),
    getTotalHours: function() {
      var _val;

      _val = (this.resourceNeed().endValue() - this.resourceNeed().startValue()) / 60 * this.num_employees();
      if ((_val * 100 - Math.floor(_val * 100)) !== 0) {
        _val = parseFloat(_val.toFixed(2));
      }
      return "" + _val + "h";
    },
    _renderSkill: function() {
      return this.model.set('skill_name', ovivo.desktop.resources.skills.get(this.skill()).name());
    },
    _processNum_employees: function() {
      return this.model.set('total_hours', this.getTotalHours());
    },
    _processStart_time: function() {
      return this.model.set('total_hours', this.getTotalHours());
    },
    _processEnd_time: function() {
      return this.model.set('total_hours', this.getTotalHours());
    },
    postRender: function() {
      this.header = this.$('.header .inner');
      this.content = this.$('.content .inner');
      this.footer = this.$('.footer .inner');
      return this.renderDef.resolve();
    },
    changeHanlder: function(resourceNeed) {
      var _changed,
        _this = this;

      _changed = _.keys(resourceNeed.changed);
      return _.each(_changed, function(field) {
        var _el, _method, _processMethod, _sel;

        _method = "_render" + (field.slice(0, 1).toUpperCase() + field.slice(1));
        _processMethod = "_process" + (field.slice(0, 1).toUpperCase() + field.slice(1));
        if (_this[_method] != null) {
          _this[_method]();
          return;
        }
        if (_this[_processMethod] != null) {
          _this[_processMethod]();
        }
        _sel = "." + field + "-value";
        if ((_el = _this.header.find(_sel)[0]) == null) {
          if ((_el = _this.content.find(_sel)[0]) == null) {
            if ((_el = _this.footer.find(_sel)[0]) == null) {
              return;
            }
          }
        }
        return $(_el).html(_this[field]());
      });
    },
    _setInitialValues: function() {
      ovivo.desktop.resources.skills.def.done(_.bind(this._renderSkill, this));
      return this._processNum_employees();
    },
    _attachHandlers: function() {
      this.model.off('rendered', this._attachHandlers);
      this.listenTo(this.resourceNeed(), 'change', this.changeHanlder);
      this.model.on('change', this.changeHanlder, this);
      return this._setInitialValues();
    },
    _detachHandlers: function() {
      this.stopListening(this.resourceNeed(), 'change', this.changeHanlder);
      return this.model.off('change', this.changeHanlder);
    },
    _processRemove: function() {
      this.header.remove();
      this.content.remove();
      this.footer.remove();
      return this._detachHandlers();
    },
    initialize: function() {
      this.model.on('rendered', this._attachHandlers, this);
      this.renderDef = new $.Deferred();
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});