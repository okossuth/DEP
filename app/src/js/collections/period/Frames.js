// Generated by CoffeeScript 1.6.2
define(['models/period/Frame', 'ovivo'], function(Model) {
  return Backbone.Collection.extend({
    model: Model,
    doNotFetch: true,
    addFrame: function(start, end, options) {
      var _model;

      _model = new Model({
        start: start,
        end: end
      }, options);
      this.add(_model);
      return _model;
    },
    processFrameAdd: function(frame) {
      return ovivo.desktop.resources.periods.def.done(function() {
        return ovivo.desktop.resources.periods.each(function(period) {
          return frame.addPeriod(period);
        });
      });
    },
    processPeriodAdd: function(period) {
      return this.each(function(frame) {
        return frame.addPeriod(period);
      });
    },
    processPeriodRemove: function(period) {
      return this.each(function(frame) {
        return frame.removePeriod(period);
      });
    },
    processPeriodChange: function(period) {
      return this.each(function(frame) {
        return frame.changePeriod(period);
      });
    },
    initialize: function() {
      var _this = this;

      this.on('add', this.processFrameAdd, this);
      ovivo.desktop.resources.periods.def.done(function() {
        ovivo.desktop.resources.periods.on('add', _this.processPeriodAdd, _this);
        ovivo.desktop.resources.periods.on('remove', _this.processPeriodRemove, _this);
        return ovivo.desktop.resources.periods.on('updateFrames', _this.processPeriodChange, _this);
      });
      return true;
    }
  });
});