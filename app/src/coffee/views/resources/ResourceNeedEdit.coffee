define [
  'views/resources/ResourceBase',

  'ovivo'
], (ResourceBase) ->
  ResourceBase.extend
    common: {}
    
    tagName: 'li'
    className: 'resource-need element'

    template: Handlebars.templates['resourceNeedEdit']
    groupTemplate: Handlebars.templates['resourceNeedEdit_group']

    events:
      'click li.weekday': 'weekdayClick'
      'click .edit-button': 'edit'
      'click .remove-button': 'processRemove'

    weekdayClick: (e) ->
      _item = $(e.target).closest('.weekday')
      _i = _item.index()

      @model.processWeek (_i), @model.weekdaysHash[_i]

    edit: () -> 
      ovivo.desktop.popups.editPopupResourceNeed.show()
      ovivo.desktop.popups.editPopupResourceNeed.setModel @model

    _getDateStr: (_date) ->
      if _date?
        "#{_date.getDate()}. #{ovivo.config.MONTHS[_date.getMonth()].toLowerCase().slice(0, 3)}"
      else ''

    renderSkill: () ->
      @$('.skill-value').html ovivo.desktop.resources.skills.get(@model.skill())?.name()

    postRender: () ->
      @$('.columns.weekdays > li').each (i, elem) =>
        if @model.weekdaysHash[i] is true
          $(elem).addClass 'checked'

        else
          $(elem).removeClass 'checked'

      ovivo.desktop.resources.skills.def.done _.bind @renderSkill, @

    initialize: () ->
      @proxyCall 'initialize', arguments

      @weekDays = @$('ul.weekdays')

      true