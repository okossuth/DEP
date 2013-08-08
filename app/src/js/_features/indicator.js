define([], function() {
  return {
    start: function() {
      $(document.body).addClass('loading loading-running');
      return true;
    },
    success: function() {
      $(document.body).removeClass('loading');
      setTimeout((function() {
        return $(document.body).removeClass('loading-running error');
      }), 400);
      return true;
    },
    errorAction: function(url) {
      $(document.body).addClass('error');
      if (typeof url === 'function') {
        url = url();
      }
      return true;
    },
    error: function() {
      $(document.body).addClass('error');
      setTimeout((function() {
        return $(document.body).removeClass('loading');
      }), 800);
      setTimeout((function() {
        return $(document.body).removeClass('loading-running error');
      }), 1200);
      return true;
    }
  };
});
