define(['ovivo'], function() {
  var _template;
  _template = Handlebars.templates['notificationMessage'];
  return {
    post: function(selector, text) {
      var _message;
      _message = $(_template({
        text: text
      }));
      $(selector).append(_message);
      return setTimeout((function() {
        return _message.fadeOut(300, function() {
          return _message.remove();
        });
      }), 1000);
    }
  };
});
