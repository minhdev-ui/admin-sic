export default {
    intervalBetweenKeyPress: 100, // если между нажатиями меньше 50 мс (у сканера примерно 25 мс),
    scanningEndTimeout: 200,  // нажатия прекратились ждем 200 мс, то ввод прекратился
    debug: true,
    ignoreOnInputs: true,
    historyLength: 5,
  }