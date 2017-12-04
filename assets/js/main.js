/* global responsiveVoice */
$(() => {

  responsiveVoice.speak('Killersamus', 'US English Female', {
    'pitch': 1,
    'onend': () => responsiveVoice.speak('es una pasada de hombre... que no! es un polluelo', 'Spanish Female')
  });
});