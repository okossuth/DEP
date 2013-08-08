define(['ovivo'], function() {
  return {
    navigate: function() {
      var _collector, _key;
      _key = this._getKey.apply(this, Array.prototype.slice.call(arguments, 0));
      if (this._isToday.apply(this, Array.prototype.slice.call(arguments, 0)) === true) {
        this.processToday();
      } else {
        this.processNotToday();
      }
      if ((_collector = this.collectors.get(_key)) == null) {
        _collector = this.collectors.addElement(this._getObj.apply(this, Array.prototype.slice.call(arguments, 0)));
      }
      this.collectors.show(_collector);
      return true;
    },
    processToday: function() {
      return this.todayButton.addClass('disabled');
    },
    processNotToday: function() {
      return this.todayButton.removeClass('disabled');
    },
    processCollectorAdd: function(collector, collectors) {
      return this.collectorsList.append(collector.view.el);
    },
    _initialize: function() {
      this.collectors = new this.Collectors();
      this.collectors.on('add', this.processCollectorAdd, this);
      this.collectors.on('show', this.processCollectorShow, this);
      this.collectors.on('hide', this.processCollectorHide, this);
      return true;
    }
  };
});
