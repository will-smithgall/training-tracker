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
const { getCurrentUser } = require("@/lib/firestore/Users");

export async function getExercises() {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();
    console.log("got current user", { user });

    if (!user) {
        console.log("no user");
        return;
    }

    const q = query(collection(db, "users", user, "Exercises"));

    const snapshot = await getDocs(q);
    return snapshot;
}

export async function getExerciseData(exercise) {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();
    console.log("got current user", { user });

    if (!user) {
        console.log("no user");
        return;
    }

    const q = query(
        collection(db, "users", user, "Exercises"),
        where("__name__", "==", exercise),
        limit(1)
    );

    const snapshot = await getDocs(q);
    return snapshot;
}
