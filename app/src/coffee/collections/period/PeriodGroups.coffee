define [
  'models/period/PeriodGroup',

  '_features/binarySearch',

  'ovivo'
], (Model, binarySearch) ->
  Backbone.Collection.extend _.extend {},
    model: Model

    addModel: (obj) ->
      _model = new Model obj

      @add _model

      _model

    _scrollComparator: (obj, val) ->
      return -1 if obj.start >= val 

      return 1 if obj.end < val 

      return 0

    processScroll: (val, height) ->
      _res = binarySearch @_scrollData, val, @_scrollComparator

      if _res isnt null
        _delta = val - _res.start

        _res.model.processScroll _res, _delta
        _res.model.timeGroups.processScroll _delta + 48, height

      if _res is @_prev then return

      if @_prev isnt null then @_prev.model.clearScroll()

      console.log @_prev = _res

    calcScrollData: () ->
      if @_prev? then @_prev.model.clearScroll()

      @_prev = null

      @_scrollData = @map (model) ->
        _h = model.view.el.offsetHeight
        _t = model.view.el.offsetTop

        model.timeGroups.calcScrollData()

        el: model.view.el
        model: model
        start: _t
        end: _t + _h
        height: _h

    initialize: () ->
      
      true