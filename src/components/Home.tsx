import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { hotelsCollection } from "../lib/controller";
import { NewHotelType } from "../types/hotel";
import Information from "./Information";

function Home() {
  const [hotels, setHotels] = useState<NewHotelType[]>([]);
  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () =>
      onSnapshot(hotelsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setHotels(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
        setIsLoading(false)
      }),
    []
  );

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="card">
      <select
        className="select"
        defaultValue={""}
        onChange={(e) => setSortState(e.target.value)}
      >
        <option value="disabled">Sort By</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <div className="search">
        <input
          className="inputsearch"
          value={search}
          type="text"
          placeholder="Search for the hotel"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {hotels && hotels.length ? (
        <div>
          {hotels
            ?.filter((item: NewHotelType) => {
              if (search === "" && !search.length) {
                return item;
              }
              return item?.title === search;
            })
            .sort((a, b) => {
              if (sortState === "name") {
                if (a.title && b.title) return a.title.localeCompare(b.title);
              }
              if (sortState === "price") {
                return Number(a.perNight) - Number(b.perNight);
              }
              return 0;
            })
            ?.map((hotel: NewHotelType) => (
              <Information key={hotel.id} hotel={hotel} id={""} isFavorite={false} />
            ))}
        </div>
      ) : (
        <h2 className="no-hotels">There are no hotels. Please add one</h2>
      )}
    </div>
  );
}

export default Home;