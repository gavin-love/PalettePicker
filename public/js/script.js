const generateColorPalette = e => {
  if (e.which === 32) {

    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    for (let i = 0; i <= 4; i++) {
      $(`.palette_${i + 1}`).css("background-color", `${randomColor()}`)
    }
  }
}

$(window).on('keypress', generateColorPalette);


