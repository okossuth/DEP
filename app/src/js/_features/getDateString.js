define(['_features/trailZero'], function(trailZero) {
  return function(date) {
    return "" + (date.getFullYear()) + "-" + (trailZero(date.getMonth() + 1)) + "-" + (trailZero(date.getDate()));
  };
});
