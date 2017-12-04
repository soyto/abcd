/* global responsiveVoice */
$(() => {

  var _inputText = document.getElementsByClassName('input-text')[0];
  var _playButton = document.getElementsByClassName('play-button')[0];

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

    var $$p = Promise.resolve();

    $$p = $$p.then(() => _playText(_text));

    _text.split('').forEach($$character => {
      if($$character != ' ') {
        $$p = $$p.then(() => _playText($$character));
      }
    });

    $$p = $$p.then(() => _playText(_text));
  }


  function _playText(text) {
    var _utterance = new SpeechSynthesisUtterance(text);

    var $$promise = new Promise(($$resolve, $$reject) => {

      _utterance.onend = ($$evt) => {
        console.log('[%s] stopped {%o}', text, $$evt);
        $$resolve();
      };

      _utterance.onerror = ($$evt) => {
        console.log('[%s] error {%o}', text, $$evt);
        $$resolve();
      };

      setTimeout(() => $$resolve(), 2000);
    });

    console.log('playing [%s]', text);
    window.speechSynthesis.speak(_utterance);

    return $$promise;
  }
});