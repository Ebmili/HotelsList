import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";

import { AddHotelType } from "../types/hotel";
import { app } from "./firebase";

export const firestore = getFirestore(app);

export const hotelsCollection = collection(firestore, "hotels");

export const addHotel = async (hotelData: AddHotelType) => {
  const newHotel = await addDoc(hotelsCollection, { ...hotelData });
  console.log(`The new hotel was created at ${newHotel.path}`);
};

export const deleteHotel = async (
  id: string | undefined,
  navigate: NavigateFunction
) => {
  const document = doc(firestore, `hotels/${id}`);
  await deleteDoc(document);
  console.log(`The hotel has now been deleted`);
  navigate("/");
};

export const updateHotel = async (id: string | undefined, docData: any) => {
  const getHotel = doc(firestore, `hotels/${id}`);
  await setDoc(getHotel, docData, { merge: true });
  console.log("The value has been written to the database");
};