define(['views/calendar/Day', 'views/resources/ResourceBase', 'ovivo'], function(Day, ResourceBase) {
  return ResourceBase.extend(_.extend({}, Day, {}));
});
