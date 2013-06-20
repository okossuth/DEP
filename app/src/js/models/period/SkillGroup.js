// Generated by CoffeeScript 1.6.2
define(['collections/period/SkillEmployeeRows', 'models/resources/ResourceBase', 'views/period/SkillGroup', 'ovivo'], function(SkillEmployeeRows, ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['pk', 'group'],
    clearScroll: function() {
      return this.view.clearScroll();
    },
    processScroll: function(obj, val) {
      return this.view.processScroll(obj, val);
    },
    addBlock: function(block) {
      return this._blocksCounter += 1;
    },
    removeBlock: function(block) {
      console.log(this._blocksCounter -= 1);
      if (this._blocksCounter === 0) {
        return this.collection.remove(this);
      }
    },
    _initEmployees: function(pk, group) {
      var _this = this;

      return ovivo.desktop.resources.users.def.done(function() {
        var _arr;

        _arr = ovivo.desktop.resources.users.getBy({
          'skills': pk,
          'groups': group
        });
        if (!(_arr instanceof Array)) {
          return;
        }
        return _this.skillEmployeeRows.add(_.map(_arr, function(user) {
          return {
            user: user
          };
        }));
      });
    },
    initialize: function(attrs, options) {
      this.View = View;
      this.skillEmployeeRows = new SkillEmployeeRows();
      this._initEmployees(attrs.pk, attrs.group);
      this._blocksCounter = 0;
      this.proxyCall('initialize', arguments);
      return true;
    }
  });
});
