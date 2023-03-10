import { render, screen } from "@testing-library/react";
import { SetStateAction } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

describe("Tests", () => {
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

  it("renders edit button", () => {
    render(
      <Router>
        <Edit editDescription={false} setEditDescription={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } }/>
      </Router>
    );
    const button = screen.getByRole("button", {name: 'Update Hotel'});
    expect(button).toBeInTheDocument();
  });

});