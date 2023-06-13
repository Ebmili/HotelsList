import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteHotel } from "../lib/controller";
import Edit from "./Edit";
import { firestore } from "../lib/controller";

interface IProps {
  hotel?: any;
  detailsPage?: boolean;
  id: string;
  isFavorite: false;
}

interface IProps {
  hotel?: any;
  detailsPage?: boolean;
  id: string;
  isFavorite: false;
}

function Information({ hotel, detailsPage }: IProps) {
  const { id } = useParams();
  const getHotel = doc(firestore, `hotels/${id}`);
  const [editDescription, setEditDescription] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchHotelData = async () => {
      const docSnap = await getDoc(getHotel);
      if (docSnap.exists()) {
      } else {
        console.log("No such document");
      }
    };
    fetchHotelData();
  }, [getHotel]);

  const handleAddToFavorites = async () => {
    try {
      await updateDoc(getHotel, {
        favorites: arrayUnion(hotel.id),
      });
      console.log("Added to favorites");
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  return (
    <div className="hotel-preview">
      <div className="image-container">
        <img className="location-image" src={hotel.location} alt="Hotel" />
        <div className="highlights">
          <div className="highlights-text">
            <h2>{hotel.title}</h2>
            <p className="region">{hotel.region}</p>
          </div>
          <div className="highlights-price">
            <h2 className="per-night">PLN {hotel.perNight}</h2>
            <p>per night</p>
          </div>
        </div>
      </div>
      <div className="description">
        <span className="reviews">
          <strong className="review-number">{hotel.stars} stars</strong> (based
          on {hotel.review} reviews)
        </span>
        <hr />
        <span className="feature">{hotel?.feature}</span>
        {detailsPage ? (
          <>
            <div className="description-text">
              {hotel.description}{" "}
              <div
                className="edit-text"
                onClick={() => setEditDescription(!editDescription)}
              >
                Edit Description
              </div>
              {editDescription ? (
                <Edit
                  editDescription={editDescription}
                  setEditDescription={setEditDescription}
                  id={hotel.id}
                />
              ) : null}
            </div>
            <button className="hotel-details" onClick={() => deleteHotel(hotel.id, navigate)}>
              Delete Hotel
            </button>
            <button className="fav-button" onClick={handleAddToFavorites}>Add to Favorites</button>
          </>
        ) : (
          <Link to={`/hotels/${hotel.id}`}>
            <button className="moreinfo-btn">View More Information</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Information;