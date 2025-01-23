import { getDocuments } from "./firebaseconect.js";
import { activities } from "./script.js";

async function login(user){
    const users = await getDocuments('user');
    var idUser = undefined;

    users.forEach(element => {
        if(element.data().userName == user)
            idUser = element.id;
    });

    if(idUser != undefined){
        console.log(idUser)
        activities(idUser);
        localStorage.setItem("loggedUser", JSON.stringify({ idUser }));
        window.location.href = './index.html';
    }
    
}

export function access(){
    login("user1");
}