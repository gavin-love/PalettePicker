const generateColorPalette = e => {
  if (e.which === 32) {

    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    for (let i = 0; i <= 4; i++) {
      $('.palette_one').css("background-color", `${randomColor()}`)
      $('.palette_two').css("background-color", `${randomColor()}`)
      $('.palette_three').css("background-color", `${randomColor()}`)
      $('.palette_four').css("background-color", `${randomColor()}`)
      $('.palette_five').css("background-color", `${randomColor()}`)
    }
  }
}

$(window).on('keypress', generateColorPalette);


