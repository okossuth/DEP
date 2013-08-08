define(['ovivo'], function() {
  return Backbone.View.extend({
    el: '#voice-recognition',
    processKey: function(e) {
      if (!((e.ctrlKey === true) && (e.shiftKey === true) && (e.keyCode === 19))) {
        return;
      }
      this.model.set('show', true);
      return this.model.set('processing', true);
    },
    resultsTemplate: Handlebars.templates['speechResults'],
    _clearState: function() {
      return this.$el.removeClass('initial processing result error');
    },
    changeShow: function() {
      var _this = this;
      if (this.model.show() === true) {
        this._clearState();
        this.$el.addClass('initial');
        this.$el.addClass('show');
      } else {
        setTimeout((function() {
          _this._clearState();
          return _this.$el.removeClass('show');
        }), 1000);
      }
      return true;
    },
    processStart: function() {
      this._clearState();
      return this.$el.addClass('processing');
    },
    processEnd: function() {},
    processResult: function(results) {
      var _this = this;
      this._clearState();
      this.$el.addClass('result');
      return this.$('.result').html(this.resultsTemplate({
        results: _.map(results, function(res) {
          return {
            status: res.flag === true ? 'success' : 'error',
            text: res.text
          };
        })
      }));
    },
    processError: function() {
      this._clearState();
      return this.$el.addClass('error');
    },
    initialize: function() {
      $(window).on('keypress', _.bind(this.processKey, this));
      this.model.on('change:show', this.changeShow, this);
      return true;
    }
  });
});
