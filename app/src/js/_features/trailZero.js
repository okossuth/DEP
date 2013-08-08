define([], function() {
  return function(str) {
    return ("0" + str).slice(-2);
  };
});
