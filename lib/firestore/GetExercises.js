const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    where,
    getDocs,
    Timestamp,
} = require("firebase/firestore");

export async function getExercises() {
    const db = getFirestore(firebaseApp);

    const q = query(collection(db, "Exercises"));

    const snapshot = await getDocs(q);
    return snapshot;
}
