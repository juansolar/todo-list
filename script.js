function active_new_project(){
    const addActivity = document.getElementById('add'); 
    addActivity.style.display = 'flex';
}

//Create new project
function create_project(){
    const new_project = document.createElement('div');
    new_project.classList.add('main__activities-item');

    //name project
    const new_name_project = document.createElement('p');
    const name_project = document.getElementById('nameActivity').value;
    new_name_project.textContent = name_project;
    new_name_project.classList.add('main__activities-nameitem');

    //options section
    const options_project = document.createElement('div');
    options_project.classList.add('main__activities-options');

    const delete_option = document.createElement('img');
    delete_option.classList.add('main__activities-edit');
    delete_option.src = './assets/edit.png';
    options_project.appendChild(delete_option);

    const edit_option = document.createElement('img');
    edit_option.classList.add('main__activities-delete');
    edit_option.src = './assets/delete.png';
    options_project.appendChild(edit_option);

    //add tag to the node
    new_project.appendChild(new_name_project);
    new_project.appendChild(options_project);

    //add new node to the html
    const dad_grid = document.getElementById('activities');
    const brother_node = document.querySelector('.main__activities-add');

    dad_grid.insertBefore(new_project,brother_node);

    //clear nodes
    const addActivity = document.getElementById('add'); 
    addActivity.style.display = 'none';
    document.getElementById('nameActivity').value = '';
}