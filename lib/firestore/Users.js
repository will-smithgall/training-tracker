const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const { getFirestore, collection, setDoc, doc } = require("firebase/firestore");
const { getAuth, onAuthStateChanged } = require("firebase/auth");

export async function addUser(email) {
    const db = getFirestore(firebaseApp);
    const collectionRef = collection(db, "users");
    const documentRef = doc(collectionRef, email);

    await setDoc(documentRef, { email: email });
}

export async function getCurrentUser() {
    const auth = getAuth(firebaseApp);
    const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });

    return user ? user.email : null;
}
