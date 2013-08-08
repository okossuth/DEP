define(['ovivo'], function() {
  return Backbone.Collection.extend({
    _getCacheDateString: function(model) {
      var _day, _month, _ref, _year;
      _ref = model.start_date().split('-'), _year = _ref[0], _month = _ref[1], _day = _ref[2];
      return "" + (parseInt(_year)) + "-" + (parseInt(_month)) + "-" + (parseInt(_day));
    },
    addCacheHandler: function(model, collection) {
      var _hash;
      if (model.start_date() !== void 0) {
        _hash = this._getCacheDateString(model);
        if (typeof this.dateCache[_hash] === 'undefined') {
          this.dateCache[_hash] = [];
        }
        this.dateCache[_hash].push(model);
      }
      return true;
    },
    removeCacheHandler: function(model, collection) {
      var _array, _hash, _i;
      _hash = this._getCacheDateString(model);
      _array = this.dateCache[_hash];
      _i = _.indexOf(_array, model);
      if (_i !== -1) {
        _array.splice(_i, 1);
        if (_array.length === 0) {
          this.dateCache[_hash] = void 0;
        }
      }
      return true;
    },
    initCache: function() {
      this.dateCache = {};
      this.on('add', this.addCacheHandler, this);
      this.on('remove', this.removeCacheHandler, this);
      return true;
    }
  });
});
