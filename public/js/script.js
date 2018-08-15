const generateColorPalette = e => {
  if (e.which === 32) {

    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    for (let i = 0; i <= 4; i++) {
      const color = randomColor()

      if (!$(`.palette_${i + 1}`).hasClass('isLocked')) {
        $(`.palette_${i + 1}`).css("background-color", color);
        $(`.palette_${i + 1}`).html(color);
      }
    }
    $('section article').addClass('hexcode_style');
  }
}

const getHexCode = () => {
  hexCodes = [];
  $('.palette_container article').each((index, palette) => {
    hexCodes.push(palette.innerText);
  })
  return hexCodes;
}

const saveColorPalette = e => {
  e.preventDefault();

  let project = $(e.target).children('select').val()
  let paletteName = $(e.target).children('input').val()
  let paletteColors = getHexCode();

  console.log(project, paletteName, paletteColors);
}

const saveNewProject = e => {
  e.preventDefault();

  let projectName = $(e.target).children('input').val()
  $('select').append(`<option value="${projectName}">${projectName}</option>`)
}

const lockColorSwatch = e => {
  e.preventDefault();

  let article = $(e.target).closest('article');
  article.toggleClass('isLocked');
}

$(window).on('keypress', generateColorPalette);
$('.save_palette_form').on('submit', saveColorPalette);
$('.save_project_form').on('submit', saveNewProject);
$('.lock_button').on('click', lockColorSwatch);


