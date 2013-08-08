define(['_features/trailZero', 'ovivo'], function(trailZero) {
  return {
    fields: ['start_time', 'end_time', 'available', 'start_date', 'end_date', 'repeat'],
    types: {
      'start_time': String,
      'end_time': String,
      'available': ovivo.parseBoolean,
      'start_date': String,
      'end_date': String,
      'repeat': Number
    },
    modes: ['edit', 'create', 'create-single', 'edit-single'],
    startDateChangeHandler: function() {
      var _date, _day;
      _date = new Date(Date.parse(this.start_date()));
      this.set('end_date', this.start_date());
      _day = _date.getDay();
      if (_day === 0) {
        _day = 7;
      }
      return this.set('weekdays', _day.toString());
    },
    attachHandlers: function(mode) {
      if (mode.match(/single/) !== null) {
        this.model.on('change:start_date', this.startDateChangeHandler, this.model);
        return this.startDateChangeHandler.call(this.model);
      }
    },
    detachHandlers: function(mode) {
      return this.model.off('change:start_date', this.startDateChangeHandler);
    },
    createNew: function(obj, mode) {
      var _end, _now, _start;
      if (obj == null) {
        obj = {};
      }
      _now = Date.today();
      _now.moveToFirstDayOfMonth();
      _start = new Date(_now);
      _now.moveToLastDayOfMonth();
      _end = new Date(_now);
      return this.setModel(new this.collection.model(_.extend({
        start_date: "" + (_start.getFullYear()) + "-" + (trailZero(_start.getMonth() + 1)) + "-" + (trailZero(_start.getDate())),
        end_date: "" + (_end.getFullYear()) + "-" + (trailZero(_end.getMonth() + 1)) + "-" + (trailZero(_end.getDate())),
        start_time: '09:00',
        end_time: '17:00',
        available: true,
        repeat: 1,
        weekdays: '1,2,3,4,5,6,7'
      }, obj)), mode);
    },
    initializeEdit: function() {
      this.collection = ovivo.desktop.resources.workingHours;
      this.$('.datepicker').pickadate({
        format: 'd. mmmm',
        formatSubmit: 'yyyy-mm-dd',
        firstDay: 1
      });
      return true;
    }
  };
});
