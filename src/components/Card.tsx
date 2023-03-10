import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Card() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [search, setSearch] = useState("")
  const [sortState, setSortState] = useState("");

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
      <select className="select" defaultValue={""} onChange={(e) => setSortState(e.target.value)
      }
      >
        <option value="disabled">
        Filter By
        </option>
        <option value="name">
         Name
        </option>
        <option value="price">
         Price
        </option>
      </select>
      <div className="search">
        <input className="inputsearch" 
        value={search} type="text" placeholder="Search for the hotel" onChange={(e) => setSearch(e.target.value)}
        />
    </div>
    {hotels && hotels.length ? (
      <div>
    {hotels?.filter((item:NewHotelType) => {
          if (search === "" && !search.length) {
            return item;
          }
          return item?.title === search;
        })        
        .sort((a, b) => {
          if (sortState === "name") {
            if (a.title && b.title) return a.title.localeCompare(b.title
            );   
          }
          if (sortState === "price")
        {
          return Number(a.perNight) - Number(b.perNight);
        } return 0;
      } 
      )
        ?.map((hotel:NewHotelType) => (<Information key={hotel.id} hotel={hotel}
        /> 
        ))}
        </div>
    ) : (
      <div></div>
    )}
  </div>
);
}

export default Card;