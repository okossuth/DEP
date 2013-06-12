// Generated by CoffeeScript 1.6.2
define(['views/resources/ResourceBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend({
    common: {},
    MIN_BLOCK_HEIGHT: 148,
    tagName: 'li',
    className: 'period-group',
    template: Handlebars.templates['periodGroup'],
    groupTemplate: Handlebars.templates['periodGroup_group'],
    preventChangeRender: true,
    events: {
      'click': 'processClick'
    },
    processClick: function() {},
    clearScroll: function() {
      if (ovivo.config.TRANSFORM !== false) {
        this.header.style[ovivo.config.TRANSFORM] = '';
      } else {
        this.header.style.top = '';
      }
      if (ovivo.config.TRANSFORM !== false) {
        this.el.style[ovivo.config.TRANSFORM] = '';
      }
      return true;
    },
    processScroll: function(obj, val) {
      var _frac, _height, _val;

      _height = obj.height - this.MIN_BLOCK_HEIGHT;
      _val = Math.min(obj.height - this.MIN_BLOCK_HEIGHT, val);
      if (ovivo.config.TRANSFORM !== false) {
        this.header.style[ovivo.config.TRANSFORM] = "translate(0, " + _val + "px)";
      } else {
        this.header.style.top = "" + _val + "px";
      }
      if (_val !== val) {
        _frac = (val - _val) / this.MIN_BLOCK_HEIGHT;
        this.el.style.opacity = Math.pow(1 - _frac, 2);
        this.$el.addClass('folding');
        if (ovivo.config.TRANSFORM !== false) {
          this.el.style[ovivo.config.TRANSFORM] = "translate(0, " + (this.MIN_BLOCK_HEIGHT * _frac) + "px) scale(" + (1 - 0.05 * Math.pow(_frac, 2)) + ") rotateX(" + (60 * Math.pow(_frac, 2)) + "deg)";
        }
      } else {
        this.$el.removeClass('folding');
        this.el.style.opacity = '';
        if (ovivo.config.TRANSFORM !== false) {
          this.el.style[ovivo.config.TRANSFORM] = '';
        }
      }
      return true;
    },
    addBlock: function(block) {},
    _renderGroup: function() {
      return this.$('.group-name').html(ovivo.desktop.resources.groups.get(this.pk()).chainName());
    },
    postRender: function() {
      var _this = this;

      ovivo.desktop.resources.groups.def.done(_.bind(this._renderGroup, this));
      this.timeGroups = this.$('.time-groups');
      this.header = this.$('h1.title')[0];
      this.addTimeGroups(this.model.timeGroups.map(function(t) {
        return t;
      }));
      this.model.timeGroups.on('add', this.addTimeGroups, this);
      return this.renderDef.resolve();
    },
    addTimeGroups: function(timeGroups) {
      return this._addViewSorted(this.timeGroups, this.model.timeGroups, timeGroups);
    },
    initialize: function() {
      this.renderDef = new $.Deferred();
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
