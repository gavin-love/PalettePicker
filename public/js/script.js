
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

const paletteGetByProjectId = async (projectId) => {
  const url = `/api/v1/palettes/${projectId}`;

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

const displayProjectsWithPalettes = data => {
  console.log(data);
}

const retrieveProjectsWithPalettes = async () => {
  const projects = await projectsGetAll();
  const palettes = projects.map(async (project) => {
    const data = await paletteGetByProjectId(project.id);

    const projectsWithPalettes = {
      title: project.title,
      id: project.id,
      palettes: data
    }
    return projectsWithPalettes
  })
  const response = await Promise.all(palettes);
  displayProjectsWithPalettes(response);
}

$(window).on('keypress', generateColorPalette);
$('.save_palette_form').on('submit', saveColorPalette);
$('.save_project_form').on('submit', saveNewProject);
$('.lock_button').on('click', lockColorSwatch);
$(window).ready(retrieveProjectsWithPalettes());


