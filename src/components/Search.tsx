import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { title } from "process";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Search() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [search, setSearch] = useState([]);

  useEffect(
    () =>
    onSnapshot(hotelsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setHotels(
        snapshot.docs

      .filter((item) => item.hotelName.includes(search))
      .map((doc) => {
          return {
            id: doc.id
,
            ...doc.data(),
          };
        })

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate.push(`/search?title=${search}`)
    setSearch("");
  };

  return (
    <div className="card">
      <div>
        <form onSubmit={handleSubmit}>
    <input value={title} type="text" placeholder="Search for the hotel" onChange={(e) => setSearch(e.target.value)}
    />
    </form>
    </div>
    
      {hotels && hotels.length ? (
        <div>
          {hotels?.map(hotel => (
            <Information key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <h2 className="no-hotels">There is no such hotel.</h2>
      )}
    </div>
  );
}

export default Search;