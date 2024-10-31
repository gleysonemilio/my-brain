
import { PagesInterface } from '@/components/SeachBook'
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
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setCookie } from 'cookies-next';
import { firebaseapp } from './initializeApp';


const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)
const userCollectionRef = collection(db, 'user')
const pageCollectionRef = collection(db, 'page')
const provider = new GoogleAuthProvider()

export interface UpdatePageInterface {
    id: string
    idUser: string
    title: string
    subtitle: string
    content?: string | null
    emoji?: string
}

const signInWithPopupFirebase = async () => {
    await signInWithPopup(auth, provider).then((data) => {
        const { uid, email, displayName, photoURL } = data.user

        setCookie('uid', uid)
        setCookie('email', email)
        setCookie('photoURL', photoURL)
        setCookie('displayName', displayName)

        return uid
        // const filterDataUser = ['uid', 'email', 'displayName', 'photoURL']
        // // const newArrayData = Object.keys(data.user).filter((key) => filterDataUser.includes(key))

        // // setCookie('photoURL', data.user['photoURL'])
        // filterDataUser.map((value: string) =>
        //     setCookie(value, data.user[value])
        // )
    })
}

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
    return user
}

const createPage = async ({ idUser, title, subtitle, emoji }: PagesInterface) => {
    const page = await addDoc(pageCollectionRef, {
        content: '<h1>About what are you thinking?🤔 </h1>',
        idUser: idUser || null,
        title: title || null,
        subtitle: subtitle || null,
        emoji: emoji || null
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

const updatePageOfUser = async ({ id, idUser, title, subtitle, content }: UpdatePageInterface) => {
    const page = doc(db, 'page', id)

    await updateDoc(page, {
        content: content || null,
        idUser: idUser || null,
        title: title || null,
        subtitle: subtitle || null
    })

    return page
}

export { getUser, createUser, deleterUser, updateUser, getPagesOfUser, getPageId, createPage, updatePageOfUser, signInWithPopupFirebase }