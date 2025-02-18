import { getDocuments } from "./firebaseconect.js";
import { activities } from "./script.js";

async function login(username, password){
    const users = await getDocuments('user');
    var idUser = undefined;

    users.forEach(element => {
        console.log('element: ', element.data());
        if(element.data().userName == username && element.data().password == password)
            idUser = element.id;
    });

    if(idUser != undefined){
        console.log(idUser)
        activities(idUser);
        localStorage.setItem("loggedUser", JSON.stringify({ idUser }));
        window.location.href = './index.html';
    }else
        alert('El usuario y/o la contraseña son incorrectas, intente nuevamente');
    
}

export function access(){

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(`Se ingreso el usuario ${username} con la constraseña ${password}`);

    login(username, password);
}