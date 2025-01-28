import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

//DELETE
export async function deleteDocument(collectionPath, id){
    var wasDeleted = false;
    try {
        const docref = doc(database, collectionPath, id);
        await deleteDoc(docref);
        wasDeleted=  true;
    } catch (error) {
        console.log('Error al eliminar el documento: ', error);
    }
    return wasDeleted;
}

//Update
export async function updateActivityDB(collectionPath, id, newData){
    var wasUpdated = false;
    try {
        const docRef = doc(database, collectionPath, id);
        await updateDoc(docRef, newData);
        wasUpdated = true;
    } catch (error) {
        console.log('Error: ', error);
    }
    return wasUpdated;
}






