define [
  'models/period/PeriodGroup',

  'ovivo'
], (Model) ->
  Backbone.Collection.extend _.extend {},
    model: Model

    addModel: (obj) ->
      _model = new Model obj

      @add _model

      _model

    getScrollData: () -> []
      # @map (model) ->
      #   _h = model.view.el.offsetHeight
      #   _t = model.view.el.offsetTop

      #   el: model.view.el
      #   model: model
      #   start: _t
      #   end: _t + _h
      #   height: _h

    initialize: () ->
      
      true