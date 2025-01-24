import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import { firebaseConfig } from '/config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

console.log("database conected");

//READ
export async function getDocuments(collectionPath){
    try{
        const data = await getDocs(collection(database, collectionPath));

        // data.forEach(element => {
        //     console.log(`id => ${element.id}`);
        //     console.log(element.data());
        // });
        return data;

    }catch(error){
        console.error(error)
    }
}

// getDocuments("user/eJVIgIPYSemHeshPKwTC/activities/e9E1uKk9hRXs8jwreevP/lists/qHpvhTMJqDD0bAWRKFNX/tasks");

//CREATE
export async function addDocumment(collectionPath, document){
    try {
        const docID = await addDoc(collection(database, collectionPath),document);
        console.log('Documento creado con id: ', docID.id);
        return docID.id;
    } catch (error) {
        console.error("Error al crear el documento: ", error)
    }
}

// addDocumment('user', {
//     userName: "Packo",
//     password: "12345"
// }).then( id=>{ console.log('El nuevo id del documento es: ', id);});