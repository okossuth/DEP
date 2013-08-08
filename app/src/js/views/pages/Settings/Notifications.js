define(['views/pages/PageBase', '_common/ResourceEditCommon', '_features/Switcher', 'ovivo'], function(PageBase, ResourceEditCommon, Switcher) {
  return PageBase.extend(_.extend({}, ResourceEditCommon.get({}), {
    el: '.page.page-settings .notifications-view',
    name: 'notifications',
    fields: [
      {
        name: 'notify_email',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'notify_sms',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'activity_digest',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'response_confirmation',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'event_reminders',
        init: '_initSwitcher',
        setValue: '_setValue'
      }, {
        name: 'event_urgent_within',
        init: '_initSwitcher',
        setValue: '_setValue'
      }
    ],
    types: [0, 0, 0, 0, 0, 1],
    variants: [[true, false], [3, 7, 14, null]],
    _initSwitcher: function(key, i) {
      var _switcher;
      _switcher = this.switchers[key] = new Switcher(this.$('.options-' + key), this.variants[this.types[i]]);
      return _switcher.on('value', this._valueHandlerCreator(key));
    },
    _setValue: function(name, value) {
      return this.switchers[name].setValue(value);
    },
    _valueHandlerCreator: function(key) {
      var _header, _this;
      _this = this;
      _header = this.$('.options-' + key).closest('.settings-item').children('.header');
      return function(value) {
        if (value === _this.original[key]()) {
          _header.removeClass('changed');
        } else {
          _header.addClass('changed');
        }
        return _this.model.set(key, value);
      };
    },
    saveHandler: function() {
      return this.save();
    },
    close: function() {},
    show: function() {
      var _this = this;
      return ovivo.desktop.resources.communication.def.done(function() {
        return _this.setModel(ovivo.desktop.resources.communication);
      });
    },
    initialize: function() {
      this.switchers = {};
      this.on('action:save', this.save, this);
      this.on('show', this.show, this);
      this.show();
      return true;
    }
  }));
});
