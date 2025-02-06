import { getDocuments, addDocumment, deleteDocument, updateDocument} from './firebaseconect.js';

//global attributes
var userActivities = [];
var userList = [];

//activitys attributes
const buttonCreateActivity = document.getElementById('create_activity');
const buttonUpdateActivity = document.getElementById('update_activity');
var idActivityUpdate = 0;

//list attributes
var currentActivity = 0;
const buttonCreateList = document.getElementById('create_list');
const buttonUpdateList = document.getElementById('update_list');
var idListUpdate = 0;

//task attributes
var TaskIdUpdate = 0;
var currentList = 0;


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

    await canAddActivity();

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
    edit_option.setAttribute('onclick',`import('./script.js').then(m=> m.editActivity('${id}'))`);
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

export async function deleteActivity(ActivityId){
    var wasDelete = false;
    if(confirm("¿Estás seguro de eliminar esta actividad?")){
        await deleteDocument(`user/${idUser}/activities/`,ActivityId).then(flag => wasDelete = flag)
        if(!wasDelete)
            alert("¡Ups, ocurrio un error al momento de elimninar la actividad!, intente nuevamente");
        else
            document.getElementById(ActivityId).remove();
    }
    else
        alert("Eliminación cancelada");

    canAddActivity();
}

export function editActivity(id){
    
    idActivityUpdate = id;

    const activity = document.getElementById(id);
    const name = activity.querySelector('.main__activities-nameitem').textContent;
    document.getElementById('nameActivity').value = name;

    buttonCreateActivity.style.display = 'none';
    buttonUpdateActivity.style.display = 'block';

    active_new_project();
}

export async function updateActivity(name){

    const wasUpdated = await updateDocument(`/user/${idUser}/activities`,idActivityUpdate, {"activityName":name});

    const activity = document.getElementById(idActivityUpdate);
    activity.querySelector('.main__activities-nameitem').textContent = name;

    if(wasUpdated)
        alert("Se actulizo el nombre del actividad");
    else
        alert("Ups, el nombre de la actividad no se puedo actualizar.");

    // clear attributes
    const addActivity = document.getElementById('add_activity'); 
    addActivity.style.display = 'none';
    buttonCreateActivity.style.display = 'block';
    buttonUpdateActivity.style.display = 'none';
    document.getElementById('nameActivity').value = "";
}

export async function canAddActivity(){

    const activitiesList = await getDocuments(`user/${idUser}/activities`);
    var answer = activitiesList.size > 9 ? false : true;

    if(answer)
        document.querySelector('.main__activities-add').style.display = 'flex';
    else
        document.querySelector('.main__activities-add').style.display = 'none';
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

            //The activity name is added to the task list screen
            document.querySelector('.main__todoList-projectName').textContent = 
            document.getElementById(id).querySelector('.main__activities-nameitem').textContent;

            //lists
            userList = await getDocuments(`user/${idUser}/activities/${element.id}/lists`);
            currentActivity = element.id;
            
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
export async function create_list(name, id){
    
    if(id == 0){
        await addDocumment(`user/${idUser}/activities/${currentActivity}/lists`,{
            'listName': name
        }).then(docID => id = docID);
    }

    await canAddList();

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
    edit_list.setAttribute('onclick',`import('./script.js').then(m => m.editlist('${id}'))`);

    const delete_list = document.createElement('img');
    delete_list.classList.add('main__list-delete');
    delete_list.src = './assets/delete_todoList.png';
    delete_list.setAttribute('onclick',`import('./script.js').then(m=>m.deleteList('${id}'))`)

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
    input_task.autocomplete = 'off'
    const button_add = document.createElement('button');
    button_add.classList.add('main__list-addTask');
    button_add.innerHTML = 'Add';
    button_add.setAttribute('onclick',`import('./script.js')
        .then(m => m.addTask(document.getElementById('task${id}').value, '${id}', 'Active', 0))`);
    
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
    list_completed.setAttribute('onclick',`import('./script.js').then(m => m.completed('${id}'))`);

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
    document.getElementById('listName').value = '';
}

export async function completed(listId){

    var isCompleted = true;
    const tasks = await getDocuments(`user/${idUser}/activities/${currentActivity}/lists/${listId}/tasks`);

    tasks.forEach(task =>{
        if(task.data().state == 'Active')
            isCompleted = false;
    });

    if(!isCompleted){
        alert("No se puede completar la lista ya que existen tareas pendiente aún");
    }else{
        const wasDeleted = await deleteDocument(`user/${idUser}/activities/${currentActivity}/lists`, listId);

        if(wasDeleted){
            document.getElementById(listId).remove();
            alert("Felicitaciones, la lista de tareas fue completada");
        }else
            alert('¡Ups, la app tuvo problemas al intentar completar la lista! intentalo nuevamente');
    }
}


//Delete list
export async function deleteList(listId){
    
    const wasDeleted = await deleteDocument(`user/${idUser}/activities/${currentActivity}/lists`, listId);

    if(wasDeleted){
        canAddList();
        document.getElementById(listId).remove();
    }
    else
        alert('¡Ups, la app tuvo problemas al intentar eliminar la tarea! intentalo nuevamente');

}

//Edit list
export function editlist(id){

    idListUpdate = id;

    const list = document.getElementById(id);
    const listName = list.querySelector('.main__list-nameitem').textContent;
    document.getElementById('listName').value = listName;

    buttonCreateList.style.display = 'none';
    buttonUpdateList.style.display = 'block';

    active_new_taskList();
}

//Update list
export async function updateList(listName) {

    const wasUpdated = await updateDocument(`/user/${idUser}/activities/${currentActivity}/lists`,idListUpdate, {"listName": listName});

    const list = document.getElementById(idListUpdate);
    list.querySelector('.main__list-nameitem').textContent = listName;

    if(wasUpdated)
        alert("Se actualizó el nombre de la lista")
    else
        alert("Ups, el nombre de la lista no se puedo actualizar.");
        
    // clear attributes
    const addList = document.getElementById('add_list');
    addList.style.display = 'none';
    buttonCreateList.style.display = 'block';
    buttonUpdateList.style.display = 'none';
    document.getElementById('listName').value = "";
}

export async function canAddList(){
    
    const taskList = await getDocuments(`user/${idUser}/activities/${currentActivity}/lists`);

    var answer = taskList.size > 3 ? false : true;

    if(answer)
        document.querySelector('.main__list-add').style.display = 'flex';
    else
        document.querySelector('.main__list-add').style.display = 'none';
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

// Create Task
export async function addTask(nameTask, listId, stateTask, taskId){

    if(taskId == '0'){
        await addDocumment(`user/${idUser}/activities/${currentActivity}/lists/${listId}/tasks`, {
            "nameTask": nameTask,
            "state": stateTask
        }).then(docID => taskId = docID)
    }

    const task = document.createElement('div');
    task.classList.add('task');
    task.id = taskId;

    const task_details = document.createElement('div');
    task_details.classList.add('task_details');
    const state = document.createElement('div');
    state.classList.add('task_details-state');

    if(stateTask === 'Active')
        state.classList.add('task-active');
    else if(stateTask == 'Closed')
        state.classList.add('task-closed');

    state.setAttribute('onclick', `import('./script.js').then(m => m.changeState('${taskId}','${listId}'))`);


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
    edit.setAttribute('onclick',`import('./script.js').then(m => m.editTask('${taskId}','${listId}'))`);

    const deleteTask = document.createElement('img');
    deleteTask.classList.add('task__options-delete');
    deleteTask.src = 'assets/delete_task.png';
    deleteTask.alt = 'icon delete';
    deleteTask.setAttribute('onclick', `import('./script.js').then(m => m.deleteTask('${taskId}','${listId}'))`);

    options.appendChild(edit);
    options.appendChild(deleteTask);

    task.appendChild(task_details);
    task.appendChild(options);

    const granddad = document.getElementById(listId);
    const dad = granddad.lastElementChild.lastElementChild;
    const brother_node = dad.lastElementChild;

    dad.insertBefore(task,brother_node);
}

// Delete Task
export async function deleteTask(taskId, listId){

    if(confirm('¿Está seguro de eliminar esta tarea?')){
        const wasDeleted = await deleteDocument(`user/${idUser}/activities/${currentActivity}/lists/${listId}/tasks`, taskId);
        if(wasDeleted)
            document.getElementById(taskId).remove();
        else
            alert("¡Ups, ocurrio un error en la eliminación! intente nuevamente");
    }else
        alert("Elimación cancelada");
    
}

export async function changeState(taskId, listId){

    const task = document.getElementById(taskId);
    const stateNode = task.querySelector('.task_details-state');
    const taskState = stateNode.classList.contains('task-active') ? 'Active' : 'Closed';

    const wasUpdated = await updateDocument(
        `user/${idUser}/activities/${currentActivity}/lists/${listId}/tasks`,
        taskId,
        {"state": taskState == 'Active' ? 'Closed' : 'Active'}
    );

    if(!wasUpdated){
        alert("¡Ups, ocurrio una problema la intentar cambiar el estado! intente nuevamente")
    }else{
        taskState == 'Active' 
        ? (stateNode.classList.remove('task-active'), stateNode.classList.add('task-closed'))
        : (stateNode.classList.remove('task-closed'), stateNode.classList.add('task-active'));
    }
}

export function editTask(taskId, listId){
    
    const task = document.getElementById(taskId);
    const name = task.querySelector('.task_details-name').textContent;
    document.getElementById('taskName').value = name;
    TaskIdUpdate = taskId;
    currentList = listId;

    document.getElementById('edit_task').style.display = 'flex';
}

export async function updateTask(taskName) {

    const wasUpdated = await updateDocument(
        `user/${idUser}/activities/${currentActivity}/lists/${currentList}/tasks`,
        TaskIdUpdate,
        {"nameTask": taskName}
    );

    if(wasUpdated)
        alert("El nombre fue actualizado correctamente")
    else
    alert("Ups, el nombre de la tarea no se puedo actualizar.");

    document.getElementById(TaskIdUpdate).querySelector('.task_details-name').textContent = taskName;
    document.getElementById('edit_task').style.display = 'none';

    // const wasUpdated = await updateDocument(`user/${idUser}/activities/${currentActivity}/lists/${}`);
}

export function cancelUpdateTask(){
    document.getElementById('edit_task').style.display = 'none';
}

export function cancelNewActivity(){
    const new_activity = document.querySelector('.new_activity');
    new_activity.style.display = 'none';
    document.getElementById('nameActivity').value = '';

    buttonCreateActivity.style.display = 'block';
    buttonUpdateActivity.style.display = 'none';

}

export function cancelNewList(){
    const new_list = document.querySelector('.new_list');
    new_list.style.display = 'none';
    document.getElementById('listName').value = '';

    buttonCreateList.style.display = 'block';
    buttonUpdateList.style.display = 'none';
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













