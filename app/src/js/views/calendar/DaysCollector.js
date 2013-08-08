define(['ovivo'], function() {
  return {
    tagName: 'li',
    show: function() {
      return this.$el.removeClass('hide');
    },
    hide: function() {
      return this.$el.addClass('hide');
    },
    removeLoading: function() {
      return this.$('.overlay').remove();
    },
    loaderUrl: function() {
      return ovivo.config.LOADER_URL;
    },
    postRender: function() {
      this.dayElements = this.$('.days-container .week-row > td');
      return this.hide();
    }
  };
});
