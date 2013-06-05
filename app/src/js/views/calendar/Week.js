// Generated by CoffeeScript 1.6.2
define(['views/calendar/DaysCollector', 'views/resources/ResourceBase', 'collections/period/ResourceNeedWeeks', 'ovivo'], function(DaysCollector, ResourceBase, ResourceNeedWeeks) {
  return ResourceBase.extend(_.extend({}, DaysCollector, {
    common: {},
    template: Handlebars.templates['calendarWeek'],
    groupTemplate: Handlebars.templates['calendarWeek_group'],
    events: {},
    processScroll: function(val, height) {
      if (this._scrollDataFlag === false) {
        this._calcScrollData();
      }
      return console.log(this.number(), val, height, this._offsetHeight);
    },
    _calcScrollData: function() {
      console.log('Offset height', this._offsetHeight = this.el.offsetHeight);
      console.log('RN scroll data', this._RNScrollData = this.resourceNeedWeeks.getScrollData());
      this._scrollDataFlag = true;
      return true;
    },
    days: function() {
      return this.model.days;
    },
    addBlocks: function(arr) {
      var _this = this;

      return _.each(arr, function(block) {
        return _this.addBlock(block);
      });
    },
    removeBlocks: function(arr) {
      var _this = this;

      return _.each(arr, function(block) {
        return _this.removeBlock(block);
      });
    },
    addBlock: function(block) {
      var _rn;

      _rn = this.resourceNeedWeeks.getBy('pk', block.resourceNeed().pk())[0];
      if (_rn == null) {
        _rn = this.resourceNeedWeeks.addModel({
          resourceNeed: block.resourceNeed()
        });
      }
      return _rn.addBlock(block);
    },
    removeBlock: function(block) {
      var _rn;

      _rn = this.resourceNeedWeeks.getBy('pk', block.resourceNeed().pk())[0];
      if (_rn != null) {
        return _rn.removeBlock(block);
      }
    },
    _initFrame: function() {
      this.addBlocks(this.model.frame.periodBlocks.map(function(b) {
        return b;
      }));
      this.model.frame.periodBlocks.on('add', this.addBlock, this);
      this.model.frame.periodBlocks.on('remove', this.removeBlock, this);
      this.container = this.$('.resource-needs-rows');
      return this.frameInitDef.resolve();
    },
    addResourceNeed: function(model) {
      var _this = this;

      return this.frameInitDef.done(function() {
        return _this.container.append(model.view.$el);
      });
    },
    initialize: function() {
      this.frameInitDef = new $.Deferred();
      this._scrollDataFlag = false;
      this.resourceNeedWeeks = new ResourceNeedWeeks();
      this.resourceNeedWeeks.on('add', this.addResourceNeed, this);
      this.model.on('rendered', this._initFrame, this);
      this.proxyCall('initialize', arguments);
      this.model.frame.periodBlocks.on('updateScroll', this._calcScrollData, this);
      return true;
    }
  }));
});
