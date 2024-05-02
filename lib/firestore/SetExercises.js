const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const { getFirestore, collection, setDoc, doc } = require("firebase/firestore");

export async function addExerciseNameFirestore(name) {
    const db = getFirestore(firebaseApp);
    const collectionRef = collection(db, "Exercises");
    const documentRef = doc(collectionRef, name);

    await setDoc(documentRef, { name: name });
}
