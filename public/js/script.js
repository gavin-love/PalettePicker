
const generateColorPalette = e => {
  if (e.which === 32) {

    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

    for (let i = 0; i <= 4; i++) {
      const color = randomColor()

      if (!$(`.palette_${i + 1}`).hasClass('isLocked')) {
        $(`.palette_${i + 1}`).css("background-color", color);
        $(`.palette_${i + 1}`).children('p').text(color);
      }
    }
  }
}

const getHexCode = () => {
  let hexCodes = [];
  $('article p').each((index, article) => {
    hexCodes.push(article.innerText);
  })
  return hexCodes;
}

const projectPost = async (data) => {
  const url = '/api/v1/projects';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const retrievedData = await response.json();
    return retrievedData;
  } catch (error) {
    console.log(error)
  }
}

const palettesPost = async (data) => {
  const url = '/api/v1/palettes';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const retrievedData = await response.json()
    return retrievedData
  } catch (error) {
    console.log(error)
  }
}

const projectsGetAll = async () => {
  const url = '/api/v1/projects';

  try {
    const response = await fetch(url)
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const projectGetByName = async (projectName) => {
  const url = `/api/v1/projects/${projectName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

const palettesGetAll = async () => {
  const url = "/api/v1/palettes";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

const saveColorPalette = async (e) => {
  e.preventDefault();

  const projectName = $(e.target).children('select').val();
  const project = await projectGetByName(projectName);
  const id = project[0].id

  const paletteName = $(e.target).children('input').val();
  const paletteColors = getHexCode();
  const data = { title: paletteName, color_one: paletteColors[0], color_two: paletteColors[1], color_three: paletteColors[2], color_four: paletteColors[3], color_five: paletteColors[4], project_id: id }

  await palettesPost(data);
  retrieveProjectsWithPalettes();
}

const saveNewProject = e => {
  e.preventDefault();
  const projectName = $(e.target).children('input').val();
  const data = { title: projectName };

  $('select').append(`<option value="${projectName}">${projectName}</option>`);
  projectPost(data)
}

const lockColorSwatch = e => {
  e.preventDefault();

  let article = $(e.target).closest('article');
  article.toggleClass('isLocked');
  $(e.target).toggleClass('toggleButtonStyle');
}

const displayPalette = (id, palettes) => {
  palettes.forEach(palette => {
    if (id === palette.project_id) {
      $(`#${id} ul`).append(`
    <li class="list_one" style="background-color: ${palette.color_one}"></li>
    <li class="list_two" style="background-color: ${palette.color_two}"></li>
    <li class="list_three" style="background-color: ${palette.color_three}"></li>
    <li class="list_four" style="background-color: ${palette.color_four}"></li>
    <li class="list_five" style="background-color: ${palette.color_five}"></li>
      `);
    };
  });
};

const displayProjects = (projects, palettes) => {

  projects.forEach(project => {
    $('.projects_container').append(`
    <article id="${project.id}" class="small_palettes">
    <h2>${project.title}</h2>
    <ul></ul>
    </article>
  `)
    displayPalette(project.id, palettes)
  })
}

const retrieveProjectsWithPalettes = async () => {
  $('.projects_container').empty();

  const projects = await projectsGetAll();
  const palettes = await palettesGetAll();

  displayProjects(projects, palettes);
}

$(window).on('keypress', generateColorPalette);
$('.save_palette_form').on('submit', saveColorPalette);
$('.save_project_form').on('submit', saveNewProject);
$('.lock_button').on('click', lockColorSwatch);
$(window).ready(retrieveProjectsWithPalettes());
