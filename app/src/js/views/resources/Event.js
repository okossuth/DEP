define(['_features/trailZero', '_features/notificationMessage', '_common/ToolsBase', 'views/resources/ResourceBase', 'ovivo'], function(trailZero, notificationMessage, ToolsBase, ResourceBase) {
  return ResourceBase.extend({
    common: {},
    tagName: 'li',
    className: 'event element',
    template: Handlebars.templates['event'],
    groupTemplate: Handlebars.templates['event_group'],
    events: {
      'click': 'processClick',
      'click .type-button': 'changeType'
    },
    _ignoreRender: ['has_applied', 'type'],
    processClick: function(e) {
      ovivo.desktop.routers.main.navigate("/events/" + this.model.id + "/", {
        trigger: true
      });
      e.stopPropagation();
      return false;
    },
    groupRenderComplete: function() {},
    group: function() {
      var _ref;
      return (_ref = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref.name() : void 0;
    },
    groupChainName: function() {
      var _ref;
      return (_ref = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref.chainName() : void 0;
    },
    primaryDepartment: function() {
      var _ref, _ref1;
      return (_ref = ovivo.desktop.resources.primaryDepartments.get((_ref1 = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref1.primary_department() : void 0)) != null ? _ref.name() : void 0;
    },
    municipality: function() {
      var _ref, _ref1, _ref2;
      return (_ref = ovivo.desktop.resources.municipalities.get((_ref1 = ovivo.desktop.resources.primaryDepartments.get((_ref2 = ovivo.desktop.resources.groups.get(this.model.group())) != null ? _ref2.primary_department() : void 0)) != null ? _ref1.municipality() : void 0)) != null ? _ref.name() : void 0;
    },
    isClosed: function() {
      return this.type() === 'closed';
    },
    isOpen: function() {
      return this.type() === 'open';
    },
    isOpenResponses: function() {
      return this.type() === 'open-responses';
    },
    day: function() {
      return ovivo.config.DAYS[this.model.pub_date().getDay()].toLowerCase().slice(0, 1);
    },
    date: function() {
      return this.model.pub_date().getDate();
    },
    month: function() {
      return ovivo.config.MONTHS[this.model.pub_date().getMonth()];
    },
    year: function() {
      return this.model.pub_date().getFullYear();
    },
    time: function() {
      return this.model.pub_date().getHours() + ':' + this.model.pub_date().getMinutes();
    },
    creationTime: function() {
      var _date, _value;
      _value = this.model.pub_date();
      if (_value !== void 0) {
        _date = new Date(Date.parse(_value));
        return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase().slice(0, 1)) + ". " + (_date.getDate()) + ". " + ovivo.config.MONTHS[_date.getMonth()] + " " + (_date.getFullYear()) + " " + (trailZero(_date.getHours())) + ":" + (trailZero(_date.getMinutes()));
      } else {
        return '';
      }
    },
    startDateFormated: function() {
      var _date;
      _date = new Date(Date.parse(this.model.start_date()));
      return "" + (ovivo.config.DAYS[_date.getDay()].toLowerCase()) + ", " + (_date.getDate()) + ". " + ovivo.config.MONTHS[_date.getMonth()];
    },
    changeType: function(e) {
      if ((this._isActual() === true) && (this.type() !== 'closed')) {
        this.model.switchType();
      }
      return this.stopPropagation(e);
    },
    _isActual: function() {
      var _date, _now;
      _date = Date.parse(this.start_date());
      _now = new Date();
      _now = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
      if (_now > _date) {
        return false;
      } else {
        return true;
      }
    },
    _biddingClosed: function() {
      var _date, _now;
      _date = Date.parse(this.model.get('start_date'));
      _now = new Date();
      _now = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
      if ((_now > _date) && (this.model.get('type') !== 'closed')) {
        return true;
      } else {
        return false;
      }
    },
    hasComment: function() {
      var _comment;
      _comment = this.comment();
      return (typeof _comment === 'string') && (_comment !== '');
    },
    postRender: function() {
      this.$('.element-container').removeClass('open open-responses closed bidding-closed non-actual').addClass(this.type());
      if (this._biddingClosed() === true) {
        this.$('.element-container').addClass('bidding-closed');
      }
      if (this._isActual() !== true) {
        this.$('.element-container').addClass('non-actual');
      }
      return true;
    },
    processTypeChange: function() {
      return this.postRender();
    },
    initialize: function() {
      this.model.setDeltaHours();
      this.model.on('change:type', this.processTypeChange, this);
      this.biddingClosed = this._biddingClosed();
      this.proxyCall('initialize', arguments);
      if ((ovivo.desktop.resources.groups.def.state() !== 'resolved') || (ovivo.desktop.resources.municipalities.def.state() !== 'resolved') || (ovivo.desktop.resources.primaryDepartments.def.state() !== 'resolved')) {
        $.when(ovivo.desktop.resources.groups.def, ovivo.desktop.resources.municipalities.def, ovivo.desktop.resources.primaryDepartments.def).then(_.bind(this.render, this));
      }
      return true;
    }
  });
});
