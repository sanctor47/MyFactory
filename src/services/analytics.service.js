import { db } from "../firebaseConfig"

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const logCollectionRef = collection(db, "users");
class LogDataService {

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

}

export default new UserDataService();