// Generated by CoffeeScript 1.6.2
define(['views/resources/ResourceBase', 'views/period/GroupSectionBase', 'ovivo'], function(ResourceBase, GroupSectionBase) {
  return ResourceBase.extend(_.extend({}, GroupSectionBase, {
    common: {},
    MIN_BLOCK_HEIGHT: 100,
    tagName: 'li',
    className: 'time-group',
    template: Handlebars.templates['resourceNeedTimeGroup'],
    groupTemplate: Handlebars.templates['resourceNeedTimeGroup_group'],
    preventChangeRender: true,
    events: {
      'click': 'processClick'
    },
    processClick: function() {},
    clearScroll: function() {
      this._clearFolding();
      this.timeRange.style.height = '';
      return true;
    },
    processScroll: function(obj, val) {
      var _val;

      _val = Math.min(obj.height - this.MIN_BLOCK_HEIGHT, val);
      this.timeRange.style.height = "" + (obj.height - _val) + "px";
      if (obj.last === true) {
        return;
      }
      return this._animateFolding(_val, val);
    },
    addBlock: function(block) {},
    postRender: function() {
      var _this = this;

      this.resourceNeedWeeks = this.$('.resource-needs-rows');
      this.timeRange = this.$('.time-range')[0];
      this.addResourcNeedWeeks(this.model.resourceNeedWeeks.map(function(rnw) {
        return rnw;
      }));
      this.model.resourceNeedWeeks.on('add', this.addResourcNeedWeeks, this);
      return this.renderDef.resolve();
    },
    addResourcNeedWeeks: function(rnws) {
      return this._addViewSorted(this.resourceNeedWeeks, this.model.resourceNeedWeeks, rnws);
    },
    initialize: function() {
      this.renderDef = new $.Deferred();
      this.proxyCall('initialize', arguments);
      return true;
    }
  }));
});