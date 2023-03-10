import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

describe("Navbar", () => {
  it("renders the correct links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const allHotelsLink = screen.getByText("All Hotels");
    const newHotelLink = screen.getByText("New Hotel");

    expect(allHotelsLink).toBeInTheDocument();
    expect(newHotelLink).toBeInTheDocument();
  });

  it("renders NotFound component", () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    const notFound = screen.getByText("NotFound");
    expect(notFound).toBeInTheDocument();
  });
});