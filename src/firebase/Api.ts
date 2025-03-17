
import { PagesInterface, SubPagesInterface } from '@/components/SeachBook'
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
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { setCookie } from 'cookies-next';
import { firebaseapp } from './initializeApp';
import { fetchSignInMethodsForEmail } from "firebase/auth";


const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)
const userCollectionRef = collection(db, 'user')
const pageCollectionRef = collection(db, 'page')
const subPageCollectionRef = collection(db, 'sub-page')
const subPageSharedPagesCollectionRef = collection(db, 'shared-pages')

const provider = new GoogleAuthProvider()

export interface UpdatePageInterface {
    id: string
    idUser?: string
    idPage?: string
    title: string
    subtitle?: string
    content?: string | null
    emoji?: string
    tableDb: string
}

export interface UpdateNamePageInterface {
    id: string
    title: string
    emoji: string
    tableDb: string
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

const signInWithOutPopupFirebase = async () => {
    await signOut(auth)
        .then(() => {
            console.log('Signed Out');
        })
        .catch(e => {
            console.error('Sign Out Error', e);
        });
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

const getPagesSharedByOtherUser = async (idUser: string) => {
    const searchPagesSharedByOtherUser = query(subPageSharedPagesCollectionRef, where("idUser", "==", idUser));
    const data = await getDocs(searchPagesSharedByOtherUser);

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getSubPage = async (idPage: string) => {
    const searchPageUser = query(subPageCollectionRef, where("idPage", "==", idPage));
    const data = await getDocs(searchPageUser);

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const getPageId = async (idPage: string) => {
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
    if (!title || !idUser) return null

    const page = await addDoc(pageCollectionRef, {
        content: '<h1>About what are you thinking?🤔 </h1>',
        idUser: idUser || null,
        title: title || null,
        subtitle: subtitle || null,
        emoji: emoji || '📑'
    })

    return page
}

const createSubPage = async ({ idPage, title, subtitle, emoji }: SubPagesInterface) => {
    if (!title || !idPage) return null

    const subPage = await addDoc(subPageCollectionRef, {
        content: '<h1>About what are you thinking?🤔 </h1>',
        idPage: idPage || null,
        title: title || null,
        subtitle: subtitle || null,
        emoji: emoji || '📑'
    })

    return subPage
}


const sharePageWirhFriend = async ({ idPage, idUser }: any) => {
    // if (!idUser || !idPage) return null
    // await getAuth(firebaseapp).getUserByEmail('gleysonemilio@gmail.com')
    //     .then((userRecord) => {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //     })
    //     .catch((error) => {
    //         console.log('Error fetching user data:', error);
    //     });
    // await fetchProvidersForEmail('gleysonemilio@gmail.com')
    //     .then(data => {
    //         console.log('auth', auth)
    //         console.log('data-->', data)

    //         if (data.length === 0) {

    //         } else {
    //             // has signed up
    //         }
    //         return ''
    //     })
}

const checkEmailExists = async (email: string) => {
    try {
        const authh = getAuth();

        // console.log('emai', email)
        // console.log('authh', authh)

        const signInMethods = await fetchSignInMethodsForEmail(authh, 'gleysons@ciandt.com');

        // console.log('=>', signInMethods)
        return signInMethods.length > 0; // Retorna true se o e-mail já estiver cadastrado
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        return false;
    }
};

async function deleterUser(id: string) {
    const userDoc = await doc(db, 'user', id)
    await deleteDoc(userDoc)
}

async function deleterPageOfUser(id: string) {
    const userDoc = await doc(db, 'page', id)
    await deleteDoc(userDoc)
}

async function deleterSubPage(id: string) {
    const userDoc = await doc(db, 'sub-page', id)
    await deleteDoc(userDoc)
}

async function updateUser(id: string, name: string, email: string) {
    const user = doc(db, 'user', id)

    await updateDoc(user, {
        name: name,
        address: email
    })
}

const updatePage = async ({ id, idUser, idPage, title, subtitle, content, tableDb }: UpdatePageInterface) => {
    if (!content || !id) return null

    const page = doc(db, tableDb, id)

    await updateDoc(page, {
        content: content || null,
        title: title || null,
        subtitle: subtitle || null,
        ...(idPage ? { idPage: idPage } : { idUser: idUser })
    })

    return page
}

const updateNamePage = async ({ id, title, emoji, tableDb }: UpdateNamePageInterface) => {
    if (!id && !title) return null

    const page = doc(db, tableDb, id)

    await updateDoc(page, {
        title: title,
        emoji: emoji
    })

    return page
}

export { getUser, createUser, deleterUser, updateUser, getPagesOfUser, getPageId, createPage, signInWithPopupFirebase, createSubPage, deleterPageOfUser, deleterSubPage, getSubPage, getPagesSharedByOtherUser, signInWithOutPopupFirebase, sharePageWirhFriend, checkEmailExists, updateNamePage, updatePage }