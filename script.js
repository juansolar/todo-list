function active_new_project(){
    const addActivity = document.getElementById('add_activity'); 
    addActivity.style.display = 'flex';
}

//Create new activity
function create_activity(){
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
    const addActivity = document.getElementById('add_activity'); 
    addActivity.style.display = 'none';
    document.getElementById('nameActivity').value = '';
}

//active new list
function active_new_taskList(){
    const addList = document.getElementById('add_list');
    addList.style.display = 'flex';
}

//Create new list
function create_list(){
    identificadorLista++;
    const new_listTask = document.createElement('div');
    new_listTask.classList.add('main__list-item');
    new_listTask.id = identificadorLista;

    //title and options list task
    const principal = document.createElement('div');
    principal.classList.add('main__list-principal');

    //name list
    const list_name = document.createElement('p');
    const name_input = document.getElementById('namelist').value;
    list_name.textContent = name_input;
    list_name.classList.add('main__list-nameitem');

    //options list
    const list_options = document.createElement('div');
    list_options.classList.add('main__list-options');
    const edit_list = document.createElement('img');
    edit_list.classList.add('main__list-edit');
    edit_list.src = './assets/settings_task.png';
    const delete_list = document.createElement('img');
    delete_list.classList.add('main__list-delete');
    delete_list.src = './assets/delete_todoList.png';

    list_options.appendChild(edit_list);
    list_options.appendChild(delete_list);
    principal.appendChild(list_name);
    principal.appendChild(list_options);

    //new task and task details
    const list_todo = document.createElement('div');
    list_todo.classList.add('main__list-todo');

    //newTask
    const new_task = document.createElement('div');
    new_task.classList.add('main__list-newTask');
    const input_task = document.createElement('input');
    input_task.classList.add('main__list-addname');
    input_task.type = 'text';
    input_task.placeholder = '¿What needs to be done?';
    const button_add = document.createElement('button');
    button_add.classList.add('main__list-addTask');
    button_add.innerHTML = 'Add';
    button_add.setAttribute('onclick','addTask(this)');
    console.log("nombre: ", button_add.value);
    
    new_task.appendChild(input_task);
    new_task.appendChild(button_add);
    list_todo.appendChild(new_task);

    // apend child details

    //task details
    const list_details = document.createElement('div');
    list_details.classList.add('main__list-details');

    // const task = document.createElement('div');
    // task.classList.add('task');

    const list_completed = document.createElement('button');
    list_completed.classList.add('main__list-completed');
    list_completed.innerHTML = 'Completed';

    // list_details.appendChild(task);
    list_details.appendChild(list_completed);
    list_todo.appendChild(list_details);

    //add children
    new_listTask.appendChild(principal);
    new_listTask.appendChild(list_todo);

   //add new node to the html
   const dad_grid = document.getElementById('list_task');
   const brother_node = document.querySelector('.main__list-add');

   dad_grid.insertBefore(new_listTask,brother_node);

   const addList = document.getElementById('add_list');
   addList.style.display = 'none';

    //clear node
    document.getElementById('namelist').value = '';
}

//back to activitues
function backActivities(){
    const activities = document.querySelector('.main__activities');
    activities.style.display = 'flex';
    const list_task = document.querySelector('.main__todoList');
    list_task.style.display = 'none';
}


function addTask(addElement){

    const container = addElement.closest('div[id]');
    const containerId = container.id;

    const task = document.createElement('div');
    task.classList.add('task');

    const task_details = document.createElement('div');
    task_details.classList.add('task_details');
    const state = document.createElement('div');
    state.classList.add('task_details-state');

    const name = document.createElement('p');
    name.classList.add('task_details-name');
    name.textContent = document.getElementById(containerId).querySelector('input').value
    console.log(name.textContent)

    task_details.appendChild(state);
    task_details.appendChild(name);
    
    const options = document.createElement('div');
    options.classList.add('task__options');
    const edit = document.createElement('img');
    edit.classList.add('task__options-edit');
    edit.src = 'assets/edit_task.png';
    edit.alt = 'icon edit';
    const deleteTask = document.createElement('img');
    deleteTask.classList.add('task__options-delete');
    deleteTask.src = 'assets/delete_task.png';
    deleteTask.alt = 'icon delete';
    options.appendChild(edit);
    options.appendChild(deleteTask);

    task.appendChild(task_details);
    task.appendChild(options);

    console.log(task)

    const granddad = document.getElementById(containerId);
    const dad = granddad.lastElementChild.lastElementChild;
    const brother_node = dad.lastElementChild;

    dad.insertBefore(task,brother_node);
}

function cancelNewActivity(){
    const new_activity = document.querySelector('.new_activity');
    new_activity.style.display = 'none';
    document.getElementById('nameActivity').value = '';
}

function cancelNewList(){
    const new_list = document.querySelector('.new_list');
    new_list.style.display = 'none';
    document.getElementById('namelist').value = '';
}

var identificadorLista = 1;















