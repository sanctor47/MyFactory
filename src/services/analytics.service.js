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

const logCollectionRef = collection(db, "machine/smartvac1");
class LogDataService {

  getAllLogs = () => {
    return getDocs(logCollectionRef);
  };

}

export default new LogDataService();