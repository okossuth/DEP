define(['models/resources/ResourceBase', 'views/VoiceRecognition', '_features/voiceRecognitionGrammar', 'srgs-parser', 'ovivo'], function(ResourceBase, View, voiceRecognitionGrammar, parser) {
  return ResourceBase.extend({
    _gettersNames: ['processing', 'show'],
    changeProcessing: function() {
      var _val;
      _val = this.processing();
      if (_val === false) {
        this.set('show', false);
        return;
      }
      if (_val === true) {
        this._recognition.start();
      }
      return true;
    },
    _applyGrammar: function(str) {
      return parser.parse(str.split(/\s+/), voiceRecognitionGrammar, voiceRecognitionGrammar.$root).treesForRule(voiceRecognitionGrammar.$root);
    },
    _analyseSpeech: (function() {
      return function(str) {
        var _tree;
        if ((_tree = this._applyGrammar(str)[0]) == null) {
          return false;
        }
        switch (_tree.data.type) {
          case 'open':
            ovivo.desktop.pages[_tree.data.target].show();
        }
        return true;
      };
    })(),
    processStart: function() {
      return this.view.processStart();
    },
    processEnd: function() {
      this.view.processEnd();
      return this.set('processing', false);
    },
    processResult: function(e) {
      var _this = this;
      this.view.processResult(_.flatten(_.map(e.originalEvent.results, function(res) {
        return _.map(res, function(res) {
          var _flag;
          _flag = _this._analyseSpeech(res.transcript);
          return {
            text: res.transcript,
            flag: _flag
          };
        });
      })));
      return true;
    },
    processError: function() {
      return this.view.processError();
    },
    initialize: function() {
      if (window.webkitSpeechRecognition === void 0) {
        return;
      }
      this._recognition = new webkitSpeechRecognition();
      this._recognition.lang = ovivo.config.LANG;
      $(this._recognition).on('start', _.bind(this.processStart, this));
      $(this._recognition).on('end', _.bind(this.processEnd, this));
      $(this._recognition).on('result', _.bind(this.processResult, this));
      $(this._recognition).on('error', _.bind(this.processError, this));
      this.on('change:processing', this.changeProcessing, this);
      this.View = View;
      return this.proxyCall('initialize', arguments);
    }
  });
});
