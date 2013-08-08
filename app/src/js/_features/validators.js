define([], function() {
  return {
    time: function(name, time) {
      var match, _hours, _minutes, _returnValue;
      _returnValue = void 0;
      match = _.compact(ovivo.config.VALIDATION_REGEXP_TIME.exec(time));
      if (match.length === 0) {
        _returnValue = name;
      } else {
        match = match.slice(1);
        _hours = parseInt(match[2]);
        if (!((_hours >= 0) && (_hours <= 24))) {
          _returnValue = name;
        } else {
          _minutes = parseInt(match[3]);
          if (!((_minutes >= 0) && (_minutes <= 60))) {
            _returnValue = name;
          }
        }
      }
      return _returnValue;
    }
  };
});
