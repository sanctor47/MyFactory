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

const orderCollectionRef = collection(db, "orders");
class OrderDataService {
  addOrders = (newOrder) => {
    return addDoc(orderCollectionRef, newUser);
  };

  updateOrder = (id, updatedUser) => {
    const orderDoc = doc(db, "orders", id);
    return updateDoc(orderDoc, updatedUser);
  };

  deleteOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return deleteDoc(orderDoc);
  };

  getAllOrders = () => {
    return getDocs(orderCollectionRef);
  };

  getOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return getDoc(orderDoc);
  };
}

export default new OrderDataService();