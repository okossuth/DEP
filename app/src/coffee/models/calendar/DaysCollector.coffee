define [
  'ovivo'
], (PeriodBlocks) ->
  firstDate: () -> @_firstDate
  
  show: () -> @view.show()
  hide: () -> @view.hide()

  _initPeriods: (start, end) ->
    ovivo.desktop.resources.frames.addFrame start, end

  initResources: () ->
    _start = do =>
      _i = 0

      while @days[_i].disabled is true 
        _i += 1

      @days[_i]
      
    _end = do =>
      _i = @days.length - 1

      while @days[_i].disabled is true 
        _i -= 1

      @days[_i]

    _start = new Date _start.year, _start.month, _start.date
    _end = new Date _end.year, _end.month, _end.date

    ovivo.desktop.resources.periods.def.done _.bind _.partial(@_initPeriods, _start, _end), @

    true

  initDays: () -> 
    @collection.days.initElements @view.dayElements, @days

    @initResources()

    true

  removeLoading: () -> @view.removeLoading()

  _initialize: (attrs, options) ->
    @on 'rendered', @initDays, @

    true