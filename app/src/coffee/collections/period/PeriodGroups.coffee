define [
  'models/period/PeriodGroup',

  'collections/period/GroupSectionsBase',

  '_common/CachableCollection',

  'ovivo'
], (Model, GroupSectionsBase, CachableCollection) ->
  Backbone.Collection.extend _.extend {}, GroupSectionsBase, CachableCollection.get(['root']),
    model: Model

    _itemsSelector: () -> @filter (m) -> m.visible() is true

    initialize: () ->
      @innerCollectionName = 'timeGroups'

      @initCacheProcessors()
      
      true