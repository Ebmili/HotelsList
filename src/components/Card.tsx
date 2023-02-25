import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Card() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [search, setSearch] = useState("")

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
      <div className="search">
        <input className="search-input" 
        value={search} type="text" placeholder="Search for the hotel" onChange={(e) => setSearch(e.target.value)}
        />
    </div>
    {!!hotels? (
      <div>
    {hotels?.filter((item:NewHotelType) => {
          if (search === "" && !search.length) {
            return item;
          }
          return item?.title === search;
        })
        ?.map((hotel:NewHotelType) => (<Information key={hotel.id} hotel={hotel}
        /> 
        ))}
        </div>
    ):(
      <h2 className="no-hotels">There are no hotels</h2>
    )}
    </div>
  );
}

export default Card;
