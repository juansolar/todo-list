function active_new_project(){
    const addActivity = document.getElementById('add'); 
    addActivity.style.display = 'flex';
}

//Crear new project
function create_project(){
    const new_project = document.createElement('div');
    new_project.classList.add('main__activities-item');

    const new_name_project = document.createElement('p');
    const name_project = document.getElementById('nameActivity').value;
    new_name_project.textContent = name_project;
    new_name_project.classList.add('main__activities-nameitem');

    new_project.appendChild(new_name_project);

    const dad_grid = document.getElementById('activities');
    const brother_node = document.querySelector('.main__activities-add');

    dad_grid.insertBefore(new_project,brother_node);

    //clear nodes
    const addActivity = document.getElementById('add'); 
    addActivity.style.display = 'none';
}