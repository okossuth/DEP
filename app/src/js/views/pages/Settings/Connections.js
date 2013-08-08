define(['views/pages/PageBase', '_features/Switcher', '_features/facebook', 'ovivo'], function(PageBase, Switcher, facebook) {
  var _processors;
  _processors = {
    'facebook': facebook
  };
  return PageBase.extend({
    el: '.page.page-settings .connections-view',
    name: 'connections',
    events: {},
    keys: ['facebook'],
    types: [0],
    variants: [[true, false]],
    _valueHandlerCreator: function(key, processor) {
      var _func;
      _func = function(value) {
        return processor._set('status', value);
      };
      return _.bind(_func, this);
    },
    _valueHandlerSetCreator: function(key) {
      var _connect, _disconnect, _func;
      _connect = this.$(".options-" + key + " .option-connect");
      _disconnect = this.$(".options-" + key + " .option-disconnect");
      _func = function(value) {
        if (value === true) {
          _connect.html(gettext('Connected'));
          _disconnect.html(gettext('Disconnect'));
        } else {
          _connect.html(gettext('Connect'));
          _disconnect.html(gettext('Disconnected'));
        }
        return this.switchers[key].setValue(value);
      };
      return _.bind(_func, this);
    },
    initialize: function() {
      var _this = this;
      this.switchers = {};
      _.each(this.keys, function(key, i) {
        var _processor, _switcher;
        _switcher = _this.switchers[key] = new Switcher(_this.$('.options-' + key), _this.variants[_this.types[i]]);
        _processor = _processors[key];
        _processor.initialize();
        _processor.on('change:status', _this._valueHandlerSetCreator(key));
        return _switcher.on('value', _this._valueHandlerCreator(key, _processor));
      });
      return true;
    }
  });
});
