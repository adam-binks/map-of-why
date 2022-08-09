import { initializeApp } from "firebase/app"
import { getFirestore, collection, setDoc, getDoc, doc, addDoc } from 'firebase/firestore/lite'
import { toast } from "react-toastify"

// some concats included to reduce scraping
const firebaseConfig = {
    apiKey: "AIzaS" + "yDSca3qVB" + "kCgTig3S" + "zrbEvNbx" + "uY0YnMmGQ", // eslint-disable-line no-useless-concat
    authDomain: "goal-tracker" + "-adam-binks.firebaseapp.com", // eslint-disable-line no-useless-concat
    projectId: "goal-tracker" + "-adam-binks", // eslint-disable-line no-useless-concat
    storageBucket: "goal-tracker" + "-adam-binks.appspot.com", // eslint-disable-line no-useless-concat
    messagingSenderId: "143223897365", // eslint-disable-line no-useless-concat
    appId: "1:143223897365" + ":web:aeb3487a60d820c7637d1c", // eslint-disable-line no-useless-concat
    measurementId: "G-43XXBKS2R9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const projects = collection(db, 'projects')

export async function createFirebaseProject(nodes) {
    try {
        const docRef = await addDoc(projects, { "nodes": nodes.present })
        return docRef
    } catch (e) {
        toast.error("Error creating project: " + e)
    }
}

export async function updateFirebaseProject(projectId, nodes) {
    if (nodes === "loading" || nodes?.present === "loading") {
        return;
    }
    try {
        await setDoc(doc(db, "projects", projectId), { "nodes": nodes.present, "lastModified": new Date().toISOString() })
    } catch (e) {
        toast.error("Error saving project: " + e)
    }
}

export async function getFirebaseProject(projectId) {
    const docRef = doc(db, "projects", projectId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        if (!docSnap.data().nodes) {
            toast.error(`Missing root node on project id ${projectId}`)
            return undefined
        }
        return docSnap.data().nodes
    } else {
        toast.error(`Project does not exist with id ${projectId}`)
        return undefined
    }
}