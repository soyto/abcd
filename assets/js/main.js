/* global responsiveVoice */
$(() => {

  const CURRENT_LETTER_CLASS_NAME = 'current-letter';

  var _inputText = document.getElementsByClassName('input-text')[0];
  var _playButton = document.getElementsByClassName('play-button')[0];
  var _textResult = document.getElementsByClassName('result-text')[0];

  _inputText.focus();

  _inputText.addEventListener('blur', () => {
    _inputText.focus();
  });

  _inputText.addEventListener('keydown', $$evt => {
    if($$evt['keyCode'] === 13) {
      _play();
    }
  });

  _playButton.addEventListener('click', _play);


  function _play() {
    var _text = _inputText.value;

    _removeAllChildNodes(_textResult);

    _text.split('').forEach($$character => {
      var _spanNode = document.createElement('span');
      _spanNode.textContent = $$character;

      _textResult.append(_spanNode);
    });

    var $$p = Promise.resolve();

    $$p = $$p.then(() => _playText(_text));

    _text.split('').forEach( ($$character, $$index) => {

      $$p = $$p.then(() => {

        console.log($$index);

        if($$index > 0) {
          _textResult.children[$$index - 1].classList.remove(CURRENT_LETTER_CLASS_NAME);
        }

        _textResult.children[$$index].classList.add(CURRENT_LETTER_CLASS_NAME);

        if($$character != ' ') {
          return _playText($$character);
        }
        else {
          return Promise.resolve();
        }

      });


    });

    $$p = $$p.then(() => {

      _textResult.children[_textResult.children.length - 1].classList.remove(CURRENT_LETTER_CLASS_NAME)
      return _playText(_text);
    });
  }

  //Play this text and return a promise when is finished.. (Or hope so)
  function _playText(text) {
    var _utterance = new SpeechSynthesisUtterance(text);
    var _hasFinished = false;

    var $$promise = new Promise(($$resolve, $$reject) => {

      _utterance.onend = ($$evt) => {
        _hasFinished = true;
        console.log('[%s] stopped {%o}', text, $$evt);
        $$resolve();
      };

      _utterance.onerror = ($$evt) => {
        _hasFinished = true;
        console.log('[%s] error {%o}', text, $$evt);
        $$resolve();
      };

      setTimeout(() => { if(!_hasFinished) { $$resolve(); } }, 2000);
    });

    console.log('playing [%s]', text);
    window.speechSynthesis.speak(_utterance);

    return $$promise;
  }

  function _removeAllChildNodes(node) {
    while(node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
});