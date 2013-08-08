define(['views/popups/Popup', '_common/ResourceEditCommon', 'ovivo'], function(Popup, ResourceEditCommon) {
  return Popup.extend(ResourceEditCommon.get(Popup.prototype.events));
});
