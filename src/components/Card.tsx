import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Card() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);

  useEffect(
    () =>
      onSnapshot(hotelsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setHotels(
          snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }),
    []
  );

  return (
    <div className="card">
      <div>
        <form >
    <input className="inputsearch" placeholder="search for the hotel"
    />
    <button className="inputsearch">Search</button>
    </form>
    </div>
    
      {hotels && hotels.length ? (
        <div>
          {hotels?.map(hotel => (
            <Information key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <h2 className="no-hotels">There are no hotels. Please add one</h2>
      )}
    </div>
  );
}

export default Card;
