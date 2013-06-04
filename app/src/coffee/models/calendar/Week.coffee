define [
  'models/resources/ResourceBase',
  'models/calendar/DaysCollector',

  'views/calendar/Week',

  'ovivo'
], (ResourceBase, DaysCollector, View) ->
  ResourceBase.extend _.extend {}, DaysCollector,
    _gettersNames: [
      'number'
      'month'
      'year'
      'pk'
    ]

    getDaysArr: () ->
      _arr = []

      _date = new Date(@_firstDate)
      _date.moveToDayOfWeek(1, -1)

      _.each [1..7], (i) ->
        _arr.push
          date: _date.getDate()
          month: _date.getMonth()
          year: _date.getFullYear()
          week_number: _date.getWeek()
          disabled: false

        _date.setDate _date.getDate() + 1

      _arr

    initialize: (attrs, options) ->
      @_initialize()

      @View = View

      @set 'pk', "#{attrs.year}-#{attrs.number}"

      @_firstDate = Date.today()

      @_firstDate.setFullYear attrs.year
      @_firstDate.setWeek attrs.number
      @_firstDate.moveToDayOfWeek(4)

      @set 'month', @_firstDate.getMonth()

      @days = @getDaysArr()

      _def = ovivo.desktop.resources.events.fetchWeek(attrs.number, attrs.year, @_firstDate)

      @proxyCall 'initialize', arguments

      _def.done _.bind @removeLoading, @

      true