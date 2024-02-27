import { auth, db, database, provider } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

async function Logger({ eventType, remarks = null }) {
  const postCollectionUser = collection(db, process.env.REACT_APP_ADMIN_USERS);

  const querySnapshot = await getDocs(
    query(postCollectionUser, where("email", "==", auth.currentUser.email))
  );

  const userDoc = querySnapshot.docs[0];
  const isAdmin = await userDoc.data().isAdmin;
  console.log(isAdmin);
  if (isAdmin) {
    return;
  }

  const postCollectionRef = collection(db, process.env.REACT_APP_ADMIN_LOG);

  try {
    await addDoc(postCollectionRef, {
      username: auth.currentUser.displayName,
      email: auth.currentUser.email,
      type: eventType,
      timestamp: new Date().toISOString(),
      remarks: remarks,
    });

    console.log("Value inserted successfully.");
  } catch (error) {
    console.error(`Error inserting value: ${error}`);
  }
}

export default Logger;
