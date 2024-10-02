

import { StateCreateNewPageInterface } from '@/components/NavBar'
import { initializeApp } from 'firebase/app'
import {
    collection,
    getFirestore,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    query,
    where
} from 'firebase/firestore'


const firebaseapp = initializeApp({
    apiKey: 'AIzaSyBCW1rGB8Z-CTYAez00hF3jsDk20b-E7UU',
    authDomain: 'my-brain-next.firebaseapp.com',
    projectId: 'my-brain-next'
    //   storageBucket: 'my-brain-next.appspot.com',
    //   messagingSenderId: '1055840379096',
    //   appId: '1:1055840379096:web:8807715fd8e17b637037ad',
    //   measurementId: 'G-92HV7GFHQW'
})



const db = getFirestore(firebaseapp)
const userCollectionRef = collection(db, 'user')
const pageCollectionRef = collection(db, 'page')


const getUser = async () => {
    const data = await getDocs(userCollectionRef)
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getPagesOfUser = async (idUser: string) => {
    const searchPageUser = query(pageCollectionRef, where("idUser", "==", idUser));
    const data = await getDocs(searchPageUser);

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}


const getPageId = async (idPage: string) => { //not use
    const data = await getDoc(doc(db, 'page', idPage))
    return data
}

async function createUser(name: string, email: string) {
    const user = await addDoc(userCollectionRef, {
        name: name,
        email: email
    })
}

const createPage = async ({ idUser, title, subtitle }: StateCreateNewPageInterface) => {
    const page = await addDoc(pageCollectionRef, {
        content: '<h1>About what are you thinking?🤔 </h1>',
        idUser: idUser || null,
        title: title || null,
        subtitle: subtitle || null
    })

    return page
}


async function deleterUser(id: string) {
    const userDoc = await doc(db, 'user', id)
    await deleteDoc(userDoc)
}

async function updateUser(id: string, name: string, email: string) {
    const user = doc(db, 'user', id)

    await updateDoc(user, {
        name: name,
        address: email
    })
}

const updatePageOfUser = async ({ id, idUser, title, subtitle, content }: any) => {
    const page = doc(db, 'page', id)

    await updateDoc(page, {
        content: content || null,
        idUser: idUser || null,
        title: title || null,
        subtitle: subtitle || null
    })

    return page
}


// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
// });


export { getUser, createUser, deleterUser, updateUser, getPagesOfUser, getPageId, createPage, updatePageOfUser }