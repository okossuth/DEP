// Generated by CoffeeScript 1.6.2
define(['models/period/GroupFilter', 'ovivo'], function(Model) {
  return Backbone.Collection.extend({
    model: Model,
    addGroup: function(model) {
      return console.log('Group was added');
    },
    removeGroup: function(model) {
      return console.log('Group was removed');
    },
    initialize: function(models, options) {
      this.periodGroups = options.periodGroups;
      this.periodGroups.on('add', this.addGroup, this);
      this.periodGroups.on('remove', this.removeGroup, this);
      return true;
    }
  });
});
