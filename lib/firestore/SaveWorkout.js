const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");

export async function saveWorkout(exercises, date) {
    const db = getFirestore(firebaseApp);

    let workout = {};
    exercises.forEach((exercise) => {
        workout[exercise.name] = {
            reps: exercise.reps,
            sets: exercise.sets,
            weight: exercise.weight,
            key: exercise.key,
        };
    });

    //add date object from formatted date
    workout["Date"] = new Date(date);

    const collectionRef = collection(db, "Workouts");
    const documentRef = doc(collectionRef, date);

    await setDoc(documentRef, workout);
}
