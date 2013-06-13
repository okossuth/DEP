// Generated by CoffeeScript 1.6.2
define(['views/resources/ResourceBase', 'views/period/GroupSectionBase', 'ovivo'], function(ResourceBase) {
  return ResourceBase.extend(_.extend, {}, GroupSectionBase, {
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
      this.el.style.opacity = '';
      this.$el.removeClass('folding');
      if (ovivo.config.TRANSFORM !== false) {
        this.el.style[ovivo.config.TRANSFORM] = '';
      }
      return true;
    },
    processScroll: function(obj, val) {
      var _height, _val;

      _height = obj.height - this.MIN_BLOCK_HEIGHT;
      _val = Math.min(obj.height - this.MIN_BLOCK_HEIGHT, val);
      this._animateHeader(_val, val);
      this._animateFolding(_val, val);
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
