/* global responsiveVoice */
$(() => {

  responsiveVoice.speak('Hello world', 'US English Female', {
    'pitch': 1,
    'onend': () => responsiveVoice.speak('O lo, que es lo mismo, Hola mundo', 'Spanish Female')
  });
});