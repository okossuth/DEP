define(['models/calendar/Day', 'models/resources/ResourceBase', 'views/calendar/MonthDay', 'ovivo'], function(Day, ResourceBase, View) {
  return ResourceBase.extend(_.extend({}, Day, {
    View: View
  }));
});
