const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const { getFirestore, collection, setDoc, doc } = require("firebase/firestore");
const { getCurrentUser } = require("@/lib/firestore/Users");

export async function addExerciseNameFirestore(name) {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();
    console.log("got current user", { user });

    if (!user) {
        console.log("no user");
        return;
    }

    const collectionRef = collection(db, "users", user, "Exercises");
    const documentRef = doc(collectionRef, name);

    await setDoc(documentRef, { name: name });
}
