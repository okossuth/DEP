define(['models/resources/ResourceBase', 'ovivo'], function(ResourceBase, View) {
  return ResourceBase.extend({
    _gettersNames: ['name', 'chainName', 'parent', 'primary_department', 'children', 'allowed', 'pk'],
    setChainName: function() {
      var _cur, _str;
      _str = this.name();
      _cur = this;
      while ((_cur = this.collection.get(_cur.parent())) != null) {
        _str = _cur.name() + ' → ' + _str;
      }
      this.set('chainName', _str);
      return true;
    },
    initialize: function(attrs, options) {
      this.set('children', []);
      this.proxyCall('initialize', arguments);
      this.setChainName();
      return true;
    }
  });
});
