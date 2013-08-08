define(['_common/ToolsBase', 'ovivo'], function(ToolsBase) {
  var _Base;
  _Base = Backbone.View.extend(_.extend({}, ToolsBase, {
    _render: function() {
      this.$el.html(this.template(this));
      if (this.model.view == null) {
        this.model.view = this;
      }
      if (this.postRender != null) {
        this.postRender();
      }
      this.model.trigger('rendered');
      return true;
    },
    highlight: function() {
      return this.$el.addClass('highlight');
    },
    removeHighlight: function() {
      return this.$el.removeClass('highlight');
    },
    events: {},
    processRemove: function() {
      return this.model.destroy();
    },
    exposeAttrs: ToolsBase.once('exposeAttrs', function() {
      var _this = this;
      return _.each(this.model._gettersNames, function(name) {
        if (_this.constructor.prototype[name] == null) {
          return _this.constructor.prototype[name] = function() {
            return this.model[name]();
          };
        }
      });
    }),
    render: ToolsBase.throttleGroup('render', 'renderGroup', 50),
    _renderOnChange: function() {
      var _changed;
      if ((this._ignoreRender != null) && ((_changed = _.keys(this.model.changed)).length > 0) && (_.intersection(this._ignoreRender, _changed).length > 0)) {
        return;
      }
      return this.render.apply(this, arguments);
    },
    renderGroup: function(views) {
      var _DOM, _hash;
      views = _.pluck(views, 'ctx');
      _hash = {};
      views = _.filter(views, function(view) {
        if (_hash[view.cid] !== true) {
          _hash[view.cid] = true;
          return true;
        } else {
          return false;
        }
      });
      _DOM = $(this.groupTemplate({
        elements: views
      }));
      _.each(views, function(view) {
        var _elements;
        _elements = $('#element-view-' + view.model.pk() + '-' + view.cid, _DOM);
        view.$el.children().remove();
        view.$el.append(_elements.children());
        if (view.model.view == null) {
          view.model.view = this;
        }
        if (view.postRender != null) {
          view.postRender();
        }
        view.model.trigger('rendered');
        return true;
      });
      if (this.groupRenderComplete != null) {
        return this.groupRenderComplete();
      }
    },
    stopPropagation: function(e) {
      e.stopPropagation();
      return false;
    },
    _processRemove: function() {
      return this.remove();
    },
    initialize: function() {
      this.exposeAttrs();
      this.render();
      this.model.on('change', this._renderOnChange, this);
      this.model.on('remove', this._processRemove, this);
      return true;
    }
  }));
  _Base.prototype._base = _Base;
  return _Base;
});
