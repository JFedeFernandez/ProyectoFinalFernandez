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
    writeBatch,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
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