import { Link } from "react-router-dom";

function Navbar() {
  
  return (
    <nav className="navbar">
    <h1>Dashboard</h1>
      <div className="links">
        <Link
          to="/"
          style={{
            padding: "10px",
            color: "white",
          }}
        >
          All Hotels
        </Link>
        <Link
          to="/create"
          style={{
            padding: "10px",
            color: "white",
          }}
        >
          New Hotel
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;