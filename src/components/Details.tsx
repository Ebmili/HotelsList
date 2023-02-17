import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../lib/controller";
import Information from "./Information";

function Details() {
  const { id } = useParams();
  const getHotel = doc(firestore, `hotels/${id}`);
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    const fetchHotelData = async () => {
      const docSnap = await getDoc(getHotel);
      if (docSnap.exists()) {
        const newHotelObj = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        setHotel(newHotelObj);
      } else {

        console.log("No such document");
      }
    };
    fetchHotelData();
  }, );

  return (
    <div className="hotel-details">
      {Object.keys(hotel) && Object.keys(hotel).length ? (
        <Information hotel={hotel} detailsPage />
      ) : null}
    </div>
  );
}

export default Details;