const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");

export async function saveWorkout(exercises, date) {
    const db = getFirestore(firebaseApp);

    //Save data to 'Workout' collection
    let workout = {};
    exercises.forEach((exercise) => {
        if (exercise.cardio) {
            workout[exercise.name] = {
                time: exercise.time,
                calories: exercise.calories,
                key: exercise.key,
                cardio: exercise.cardio,
            };
        } else {
            workout[exercise.name] = {
                reps: exercise.reps,
                sets: exercise.sets,
                weight: exercise.weight,
                key: exercise.key,
                cardio: exercise.cardio,
            };
        }
    });

    //add date object from formatted date
    workout["Date"] = new Date(date);

    let collectionRef = collection(db, "Workouts");
    let documentRef = doc(collectionRef, date);

    await setDoc(documentRef, workout);

    //Save date + reps/weight to 'Exercises' collection for each exercise
    collectionRef = collection(db, "Exercises");

    exercises.forEach(async (exercise) => {
        documentRef = doc(collectionRef, exercise.name);

        let data = {};
        if (exercise.cardio) {
            data[date] = { time: exercise.time, calories: exercise.calories };
        } else {
            if (exercise.weight == 0) {
                //keep track of reps instead
                data[date] = { reps: exercise.reps };
            } else {
                //keep track of weight
                data[date] = { weight: exercise.weight };
            }
        }

        await setDoc(documentRef, data);
    });
}
