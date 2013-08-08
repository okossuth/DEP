define(['_features/Switcher', '_features/indicator', 'views/pages/PageBase', '_features/notificationMessage', 'ovivo'], function(Switcher, indicator, PageBase, notificationMessage) {
  return PageBase.extend({
    el: '.page.page-feedback',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click div.back-button': 'back',
        'click div.send-button': 'send',
        'keyup textarea': 'changeTextarea'
      });
    },
    back: function() {
      return ovivo.mobile.pages.options.show();
    },
    send: function() {
      if ((this.type !== null) && (this.text !== '')) {
        indicator.start();
        this.sendButton.addClass('disabled');
        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            category: this.type,
            feedback: this.text
          }),
          contentType: 'application/json',
          url: '/api/1.0/feedback/',
          success: _.bind(this.processSuccess, this),
          error: _.bind(this.processError, this)
        });
      }
      return true;
    },
    processSuccess: function() {
      indicator.success();
      ovivo.desktop.pages.calendar.show();
      notificationMessage.post(ovivo.desktop.pages.calendar.view.$el, gettext('Thanks for your feedback'));
      return true;
    },
    processError: function() {
      this.sendButton.removeClass('disabled');
      indicator.error();
      return true;
    },
    changeTextarea: function() {
      this.text = this.$('textarea').val();
      if (this.text === '') {
        return this.sendButton.addClass('disabled');
      } else if (this.type !== null) {
        return this.sendButton.removeClass('disabled');
      }
    },
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      this.clear();
      return true;
    },
    processType: function(value) {
      this.type = value;
      if (this.text !== '') {
        return this.sendButton.removeClass('disabled');
      }
    },
    clear: function() {
      this.typeSwitcher.clear();
      this.type = null;
      this.$('textarea').val('');
      this.text = '';
      return this.sendButton.addClass('disabled');
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.typeSwitcher = new Switcher(this.$('.switcher-feedback-type'), ['error', 'comment', 'suggestion']);
      this.typeSwitcher.on('value', this.processType, this);
      this.sendButton = this.$('.send-button');
      this.clear();
      return true;
    }
  });
});
