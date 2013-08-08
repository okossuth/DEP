define(['views/pages/PageBase', 'views/pages/PageStandaloneAnimation', 'models/resources/Comment', 'ovivo'], function(PageBase, PageStandaloneAnimation, Comment) {
  return PageBase.extend(_.extend({}, PageStandaloneAnimation, {
    el: '.page.page-event-details',
    events: function() {
      return _.extend({}, PageBase.prototype.events, {
        'click .post-comment': 'postComment',
        'keyup .comment-input': 'keyCommentInput'
      });
    },
    headerTemplate: Handlebars.templates['eventDetailsHeader'],
    transitionStart: function() {
      this.proxyCall('transitionStart', arguments);
      return true;
    },
    transitionComplete: function() {
      this.proxyCall('transitionComplete', arguments);
      return true;
    },
    postComment: function() {
      var _comment, _commentText;
      _commentText = this.$('.comment-input').val();
      if (_commentText !== '') {
        _comment = new Comment({
          comment: _commentText,
          reply_to: null
        });
        this.model.get('event').comments.add(_comment);
        _comment.save();
        this.clearInput();
      }
      return true;
    },
    keyCommentInput: function() {
      if (this.$('.comment-input').val() !== '') {
        this.$('footer').addClass('active');
      } else {
        this.clearInput();
      }
      return true;
    },
    clearInput: function() {
      this.$('footer').removeClass('active');
      return this.$('.comment-input').val('');
    },
    renderComments: function() {
      var _comments;
      _comments = this.model.get('event').comments;
      _comments.each(function(comment) {
        return this.$('ul.comments').append(comment.view.el);
      });
      return true;
    },
    addComment: function(comment) {
      this.$('ul.comments').append(comment.view.el);
      return true;
    },
    close: function() {
      ovivo.desktop.routers.main.navigate("/", {
        trigger: true
      });
      return this.hideEl();
    },
    changeEvent: function() {
      var _event, _eventDetailsView, _prevEvent,
        _this = this;
      this.clearInput();
      _event = this.model.get('event');
      _prevEvent = this.model.previous('event');
      _eventDetailsView = _event.detailsView;
      this.$('header span.title').html(_event.view.startDateFormated());
      this.$('.event-container').children().remove();
      this.$('.event-container').append(_eventDetailsView.el);
      _eventDetailsView.delegateEvents();
      _event.comments.on('add', this.addComment, this);
      if (_prevEvent != null) {
        _prevEvent.comments.off('add', this.addComment);
      }
      _event.comments.def.done(function() {
        return _this.renderComments();
      });
      return true;
    },
    initialize: function() {
      this.proxyCall('initialize', arguments);
      this.model.on('change:event', this.changeEvent, this);
      return true;
    }
  }));
});
