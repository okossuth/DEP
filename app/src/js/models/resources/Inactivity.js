define(['models/resources/ResourceBase', 'views/resources/Inactivity', 'views/resources/InactivityEdit', 'ovivo'], function(ResourceBase, View, EditView) {
  return ResourceBase.extend({
    typeName: 'inactivity',
    _gettersNames: ['start', 'end', 'reason', 'approved', 'municipality', 'type', 'pk'],
    isSingle: function() {
      return this.start() === this.end();
    },
    validate: function(attrs) {
      if ((attrs.start != null) && (attrs.end != null) && (attrs.municipality != null)) {
        return void 0;
      } else {
        return gettext('Params are missing');
      }
    },
    processRange: function(start, end) {
      var _arr, _end, _i, _start, _type;
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
        _type = [];
        if ((_i - _start) === 0) {
          _type.push('first');
        }
        if ((_i - _end) === 0) {
          _type.push('last');
        }
        if (((_i - _start) !== 0) && ((_i - _end) !== 0)) {
          _type.push('none');
        }
        _arr.push({
          date: new Date(_i),
          model: this,
          itemType: _type.join(' ')
        });
        _i.setDate(_i.getDate() + 1);
      }
      return _arr;
    },
    getView: function(obj) {
      return new this.View({
        model: this,
        itemType: obj.itemType
      });
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.proxyCall('initialize', arguments);
      this.editView = new EditView({
        model: this
      });
      return true;
    }
  });
});
