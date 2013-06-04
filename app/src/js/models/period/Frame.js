// Generated by CoffeeScript 1.6.2
define(['models/resources/ResourceBase', 'collections/period/PeriodBlocks', 'ovivo'], function(ResourceBase, PeriodBlocks) {
  return ResourceBase.extend({
    _gettersNames: ['start', 'end'],
    addPeriod: function(period) {
      var _blocks;

      _blocks = period.compile(this.start(), this.end());
      return this.periodBlocks.add(_blocks);
    },
    removePeriod: function(period) {
      var _this = this;

      return _.each(this.periodBlocks.getBy('pk', period.pk()), function(block) {
        return _this.periodBlocks.remove(block);
      });
    },
    changePeriod: function(period) {
      var _add, _curBlocks, _curCodes, _hash, _newBlocks, _newCodes, _remove,
        _this = this;

      _hash = {};
      _curBlocks = this.periodBlocks.getBy('pk', period.pk());
      _curCodes = _.map(_curBlocks, function(block) {
        return block.code();
      });
      _newBlocks = period.compile(this.start(), this.end());
      _newCodes = _.map(_newBlocks, function(block) {
        var _code;

        _code = block.code;
        _hash[_code] = block;
        return _code;
      });
      _remove = _.difference(_curCodes, _newCodes);
      _add = _.difference(_newCodes, _curCodes);
      _.each(_remove, function(code) {
        return _this.periodBlocks.remove(_this.periodBlocks.getBy('code', code));
      });
      return _.each(_add, function(code) {
        return _this.periodBlocks.add(_hash[code]);
      });
    },
    initialize: function(attrs, options) {
      this.proxyCall('initialize', arguments);
      this.periodBlocks = new PeriodBlocks([], options);
      return true;
    }
  });
});
