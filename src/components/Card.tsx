import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";


function Card(this: any) {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [search, setSearch] = useState("")
  const [sortState, setSortState] = useState("none");

  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: undefined },
    descending: { method: (a: number, b: number) => (a > b ? -1 : 1) },
  };

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

   
      <select className="select" defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>Filter By</option>
        <option value="ascending">per Name</option>
        <option value="descending">per Price</option>
      </select>
      <div>
        {hotels.sort(sortMethods[sortState].method).map((hotel, id) => (
          <Information key={hotel.id} hotel={hotel}
          /> 
        ))}
      </div>

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
        
        ?.map((hotel:NewHotelType) => (<Information key={hotel.id} hotel={hotel}
        /> 
        ))}
        </div>
    ):
    <h2 className="no-hotels">There are no hotels</h2>
}
    </div>
  );
}

export default Card;