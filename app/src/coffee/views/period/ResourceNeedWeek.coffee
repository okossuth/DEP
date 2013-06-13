define [
  'views/resources/ResourceBase',

  'views/period/GroupSectionBase',

  'ovivo'
], (ResourceBase, GroupSectionBase) ->
  ResourceBase.extend _.extend, {}, GroupSectionBase,
    common: {}

    MIN_BLOCK_HEIGHT: 100

    tagName: 'li'
    className: 'resource-need-row'

    template: Handlebars.templates['resourceNeedWeek']
    groupTemplate: Handlebars.templates['resourceNeedWeek_group']

    preventChangeRender: true

    events:
      'click .time-range': 'processClick'

    processClick: () ->
      ovivo.desktop.popups.editPopupResourceNeed.show()
      ovivo.desktop.popups.editPopupResourceNeed.edit @model.resourceNeed()

    clearScroll: () ->
      if ovivo.config.TRANSFORM isnt false
        @header.style[ovivo.config.TRANSFORM] = ''

      else
        @header.style.top = ''

      @el.style.opacity = ''

      @$el.removeClass 'folding'

      if ovivo.config.TRANSFORM isnt false
          @el.style[ovivo.config.TRANSFORM] = ''

      true

    processScroll: (obj, val) ->
      _height = obj.height - @MIN_BLOCK_HEIGHT
      _val = Math.min (obj.height - @MIN_BLOCK_HEIGHT), val

      @_animateHeader _val, val

      if obj.last is true then return

      @_animateFolding _val, val

      true

    addBlock: (block) ->
      $.when(block.view.renderDef, @renderDef).done () =>
        $(@headers.get(block.day)).append block.view.header
        $(@footers.get(block.day)).append block.view.footer
        $(@contents.get(block.day)).append block.view.content

    postRender: () ->
      @header = @$('.day-blocks.header')[0]

      @headers = @$('.day-blocks.header td.day-block')
      @contents = @$('.day-blocks.content td.day-block')
      @footers = @$('.day-blocks.footer td.day-block')

      @renderDef.resolve()

    startTimeChange: () ->
      @$('.start-time-value').html @start_time()

    endTimeChange: () ->
      @$('.end-time-value').html @end_time()

    initialize: () ->
      @renderDef = new $.Deferred()

      @proxyCall 'initialize', arguments

      @model.resourceNeed().on 'change:start_time', @startTimeChange, @
      @model.resourceNeed().on 'change:end_time', @endTimeChange, @

      true