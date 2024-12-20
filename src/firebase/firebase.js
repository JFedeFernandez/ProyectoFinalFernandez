// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    addDoc,
    updateDoc,
    writeBatch,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHW9LV8lfrR9kAq8zkgd3k1oe9FZZWyYM",
    authDomain: "lacelestina-67be1.firebaseapp.com",
    projectId: "lacelestina-67be1",
    storageBucket: "lacelestina-67be1.firebasestorage.app",
    messagingSenderId: "518580022152",
    appId: "1:518580022152:web:8b856346ee3022da6aa83d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Obtencion de un solo producto
export async function getSingleProduct(id) {
    const documentRef = doc(db, 'products', id);

    try {
        const snapshot = await getDoc(documentRef);
        if (snapshot.exists()) {
            return snapshot.data();
        } else {
            console.log('El documento no existe!');
        }
    } catch (error) {
        console.error('Error al obtener el documento: ', error);
    }
}

//Obtencion de todos los productos
export async function getProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (querySnapshot.size !== 0) {
            const productsList = querySnapshot.docs.map((docu) => {
            return {
                id: docu.id,
                ...docu.data(),
            };
        });
        return productsList;
        } else {
            console.log('Coleccion vacía !');
        }
    } catch (error) {
        console.error('Error al obtener la coleccion: ', error);
    }
}

//filtros de precio
export async function filterProductsByCategory(category) {
    try {
        const filteredQuery = query(
            collection(db, 'products'),
            where('category', '==', category)
        );
        const querySnapshot = await getDocs(filteredQuery);
        if (querySnapshot.size !== 0) {
            const productsList = querySnapshot.docs.map((docu) => {
            return {
                id: docu.id,
                ...docu.data(),
            };
        });
            return productsList;
        } else {
            console.log('Coleccion vacía !');
        }
    } catch (error) {
        console.error('Error al obtener el documento: ', error);
    }
}

//agregar una nueva orden de pedido
export async function sendOrder(order) {
    const ordersCollection = collection(db, 'orders');
    try {
        const docRef = await addDoc(ordersCollection, order);
        return docRef.id;
    } catch (error) {
        console.error('Error al agregar el documento nuevo ', error);
    }
}

export async function updateDocuments(updates) {
    const batch = writeBatch(db);

    updates.forEach(({ collection, id, data }) => {
        const docRef = doc(db, collection, id);
        batch.update(docRef, data);
    });

    try {
        await batch.commit();
    } catch (error) {
        console.error("Error al actualizar los documentos:", error);
    }
}

export async function getSingleOrders(id) {
    const documentRef = doc(db, 'orders', id);

    try {
        const snapshot = await getDoc(documentRef);
        if (snapshot.exists()) {
            return snapshot.data();
        } else {
            console.log('El documento no existe!');
        }
    } catch (error) {
        console.error('Error al obtener el documento: ', error);
    }
}