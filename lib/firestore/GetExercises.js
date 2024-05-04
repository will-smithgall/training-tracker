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
    doc,
} = require("firebase/firestore");

export async function getExercises() {
    const db = getFirestore(firebaseApp);

    const q = query(collection(db, "Exercises"));

    const snapshot = await getDocs(q);
    return snapshot;
}

export async function getExerciseData(exercise) {
    const db = getFirestore(firebaseApp);

    const q = query(
        collection(db, "Exercises"),
        where("__name__", "==", exercise),
        limit(1)
    );

    const snapshot = await getDocs(q);
    return snapshot;
}
