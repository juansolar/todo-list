import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import { firebaseConfig } from '/config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export async function getDocuments(collectionPath){
    try{
        const data = await getDocs(collection(database, collectionPath));

        data.forEach(element => {
            console.log(`id => ${element.id}`);
            console.log(element.data());
        });

    }catch(error){
        console.error(error)
    }
}

// getDocuments("user/eJVIgIPYSemHeshPKwTC/activities/e9E1uKk9hRXs8jwreevP/lists/qHpvhTMJqDD0bAWRKFNX/tasks");

console.log("database conected");