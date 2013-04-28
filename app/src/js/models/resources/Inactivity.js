// Generated by CoffeeScript 1.6.2
define(['models/resources/ResourceBase', 'views/resources/Inactivity', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    typeName: 'inactivity',
    _gettersNames: ['start', 'end', 'reason', 'approved', 'municipality', 'type', 'pk'],
    validate: function(attrs) {
      if ((attrs.start != null) && (attrs.end != null) && (attrs.municipality != null)) {
        return void 0;
      } else {
        return gettext('Params are missing');
      }
    },
    processChange: function() {
      if (this.id != null) {
        return this.save();
      }
    },
    processRange: function(start, end) {
      var _arr, _end, _i, _start;

      _arr = [];
      _start = new Date(Date.parse(this.start()));
      _end = new Date(Date.parse(this.end()));
      if (_start > start) {
        start = _start;
      }
      if (_end < end) {
        end = _end;
      }
      _i = new Date(start);
      while (_i <= end) {
        _arr.push({
          date: new Date(_i),
          model: this
        });
        _i.setDate(_i.getDate() + 1);
      }
      return _arr;
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.on('change', this.processChange, this);
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
