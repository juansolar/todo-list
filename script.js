import { getDocuments, addDocumment, deleteDocument } from './firebaseconect.js';

//global attributes
var identificadorLista = 1;
var global = {};
var userActivities = [];
var userList = [];

export function active_new_project(){
    const addActivity = document.getElementById('add_activity'); 
    addActivity.style.display = 'flex';
}

// Test user to use
const idUser = JSON.parse(localStorage.getItem("loggedUser")).idUser;
activities(idUser);

export async function activities(user){
    userActivities = await getDocuments(`user/${user}/activities`);

    userActivities.forEach(element =>{
        create_activity(element.data().activityName, element.id)
    })
}

//Create new activity
export async function create_activity(name,id){

    //is new id ? 
    if(id == 0){
        await addDocumment(`user/${idUser}/activities`, {
            activityName: name,
        }).then(docID => {id = docID});
    }

    const new_project = document.createElement('div');
    new_project.classList.add('main__activities-item');
    new_project.id = id;
    // new_project.setAttribute("onclick",`import('./script.js').then(m => m.viewTasks('${id}'))`);
    
    //name project
    const new_name_project = document.createElement('p');
    const name_project = name;
    new_name_project.textContent = name_project;
    new_name_project.classList.add('main__activities-nameitem');
    new_name_project.setAttribute("onclick",`import('./script.js').then(m => m.viewTasks('${id}'))`);

    //options section
    const options_project = document.createElement('div');
    options_project.classList.add('main__activities-options');

    const delete_option = document.createElement('img');
    delete_option.classList.add('main__activities-delete');
    delete_option.src = './assets/delete.png';
    delete_option.setAttribute("onclick",`import('./script.js').then(m => m.deleteActivity('${id}'))`);
    options_project.appendChild(delete_option);

    const edit_option = document.createElement('img');
    edit_option.classList.add('main__activities-edit');
    edit_option.src = './assets/edit.png';
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

export async function deleteActivity(id){
    var wasDelete = false;
    if(confirm("¿Estás seguro de eliminar esta actividad?")){
        await deleteDocument(`user/${idUser}/activities/`,id).then(flag => wasDelete = flag)
        if(!wasDelete)
            alert("¡Ups, ocurrio un error al momento de elimninar la actividad!, intente nuevamente");
        else
            location.reload();
    }
    else
        alert("Eliminación cancelada");
}

//active new list
export function active_new_taskList(){
    const addList = document.getElementById('add_list');
    addList.style.display = 'flex';
}

//view lists
export async function viewTasks(id){

    userActivities.forEach(async element =>{
        if(element.id == id){
            //lists
            userList = await getDocuments(`user/${idUser}/activities/${element.id}/lists`);
            userList.forEach( async list =>{
                create_list(list.data().listName, list.id);
                const userTask = await getDocuments(`user/${idUser}/activities/${element.id}/lists/${list.id}/tasks`);
                userTask.forEach(task =>{
                    addTask(task.data().nameTask, list.id, task.data().state, task.id);
                })
            })
        }
    })

    const activities = document.querySelector('.main__activities');
    activities.style.display = 'none';
    const list_task = document.querySelector('.main__todoList');
    list_task.style.display = 'flex';
}

//Create new list
export function create_list(name, id){
    
    if(id == 0){
        console.log("Es nuevo"); //Buscar un nuevo id para agregarle a la actividad y actualizar la variable global de actividades
    }

    const new_listTask = document.createElement('div');
    new_listTask.classList.add('main__list-item');
    new_listTask.id = id;

    //title and options list task
    const principal = document.createElement('div');
    principal.classList.add('main__list-principal');

    //name list
    const list_name = document.createElement('p');
    const name_input = name;
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
    input_task.id = `task${id}`;
    const button_add = document.createElement('button');
    button_add.classList.add('main__list-addTask');
    button_add.innerHTML = 'Add';
    button_add.setAttribute('onclick',`addTask(document.getElementById('task${id}').value,${id},'Active',0)`)
    
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
export function backActivities(){

    const tasks = document.querySelectorAll('.main__list-item');
    tasks.forEach(task => {
        task.remove();
    })

    const activities = document.querySelector('.main__activities');
    activities.style.display = 'flex';
    const list_task = document.querySelector('.main__todoList');
    list_task.style.display = 'none';
}

function changeState(idTask){
    const stateNode = document.getElementById(idTask); 
    stateNode.classList.contains('task-active') 
        ? (stateNode.classList.remove('task-active'), stateNode.classList.add('task-closed'))
        : (stateNode.classList.remove('task-closed'), stateNode.classList.add('task-active'));
}

function addTask(nameTask, containerId, stateTask, idTask){

    // idTask asginar un id al crear la tarea

    console.log("El id de la lista es ", idTask);

    const task = document.createElement('div');
    task.classList.add('task');

    const task_details = document.createElement('div');
    task_details.classList.add('task_details');
    const state = document.createElement('div');
    state.classList.add('task_details-state');
    state.id = idTask;

    if(stateTask === 'Active')
        state.classList.add('task-active');
    else if(stateTask == 'Closed')
        state.classList.add('task-closed');

    state.setAttribute('onclick', `changeState(${idTask})`)

    const name = document.createElement('p');
    name.classList.add('task_details-name');
    name.textContent = nameTask;

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

    const granddad = document.getElementById(containerId);
    const dad = granddad.lastElementChild.lastElementChild;
    const brother_node = dad.lastElementChild;

    dad.insertBefore(task,brother_node);
}

export function cancelNewActivity(){
    const new_activity = document.querySelector('.new_activity');
    new_activity.style.display = 'none';
    document.getElementById('nameActivity').value = '';
}

export function cancelNewList(){
    const new_list = document.querySelector('.new_list');
    new_list.style.display = 'none';
    document.getElementById('namelist').value = '';
}

function getData(){
    return fetch('./testData.json')
        .then((data=>{
            if(!data.ok)
                console.log('Error with request to server');
            return data.json();
        })
    ).then((data) => {
        // console.log("Data interior: ", data);
        global = data;
        return data;
    }).catch((error) => {
        console.error('Error: ', error);
    })
}













