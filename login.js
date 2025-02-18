import { getDocuments, addDocumment} from "./firebaseconect.js";

validateSession();

async function login(username, password){
    const users = await getDocuments('user');
    var idUser = undefined;

    users.forEach(element => {
        if(element.data().userName == username && element.data().password == password)
            idUser = element.id;
    });

    if(idUser != undefined){
        localStorage.setItem("loggedUser", JSON.stringify({ idUser }));
        window.location.href = './index.html';
    }else
        alert('El usuario y/o la contraseña son incorrectas, intente nuevamente');
    
}

async function registerBD(username, password){
    const users = await getDocuments('user');
    var userExists = false;

    users.forEach(element => {
        if(element.data().userName == username)
            userExists = true;
    });

    if(!userExists){
        var idUser = 0;
        await addDocumment(`user`,{
            'userName': username,
            'password': password
        }).then(docId => {idUser = docId});

        if(idUser != 0){
            localStorage.setItem("loggedUser", JSON.stringify({ idUser }));
            window.location.href = './index.html';
        }else
            alert('¡Ups, ocurrio un error al registar el usuario, intentelo nuevamente!')

    }else
        alert("Lo siento, este nombre de usuario ya se encuentra registrado.")
}

export function access(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username.value == "" || password == "")
        alert("¡Existen campos sin registrar!");
    else
        login(username, password);
    
}

export function registerUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username.value == "" || password == "")
        alert("¡Existen campos sin registrar!");
    else
        registerBD(username, password);
}


function validateSession(){
    if(localStorage.getItem('loggedUser')){
        window.location.href = './index.html';
    }
}

















