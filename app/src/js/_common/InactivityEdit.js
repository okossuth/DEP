define(['_features/trailZero', 'ovivo'], function(trailZero) {
  return {
    fields: ['start', 'end', 'reason'],
    types: {
      'start': String,
      'end': String,
      'reason': String
    },
    modes: ['edit', 'create', 'create-single', 'edit-single'],
    startDateChangeHandler: function() {
      return this.set('end', this.start());
    },
    attachHandlers: function(mode) {
      if (mode.match(/single/) !== null) {
        return this.model.on('change:start', this.startDateChangeHandler, this.model);
      }
    },
    detachHandlers: function(mode) {
      return this.model.off('change:start', this.startDateChangeHandler);
    },
    createNew: function(obj, mode) {
      var _end, _now, _start;
      if (obj == null) {
        obj = {};
      }
      _now = Date.today();
      _now.setWeek(_now.getWeek() + 1);
      _now.moveToDayOfWeek(1);
      _start = new Date(_now);
      _now.moveToDayOfWeek(5);
      _end = new Date(_now);
      return this.setModel(new this.collection.model(_.extend({
        start: "" + (_start.getFullYear()) + "-" + (trailZero(_start.getMonth() + 1)) + "-" + (trailZero(_start.getDate())),
        end: "" + (_end.getFullYear()) + "-" + (trailZero(_end.getMonth() + 1)) + "-" + (trailZero(_end.getDate())),
        reason: '',
        municipality: ovivo.desktop.resources.municipalities.at(0).id
      }, obj)), mode);
    },
    initializeEdit: function() {
      var _min;
      this.collection = ovivo.desktop.resources.inactivities;
      _min = Date.today();
      _min.setDate(_min.getDate() + 1);
      this.$('.datepicker').pickadate({
        format: 'd. mmmm',
        formatSubmit: 'yyyy-mm-dd',
        firstDay: 1,
        min: 1,
        max: false
      });
      return true;
    }
  };
});
