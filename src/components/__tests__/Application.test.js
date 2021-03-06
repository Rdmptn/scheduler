import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";



describe("Application", () => {
  
  afterEach(cleanup);
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    

     waitForElement(() => getByText("Monday")).then(() => {        
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);
    
    console.log("Container?", container);
    console.log("{Container?}", {container});
    
    waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
      
      fireEvent.click(getByAltText(appointment, "Add"));

      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      
      waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")).then(() => {
        const day = getAllByTestId(container, "day").find(day =>
          queryByText(day, "Monday")
        );
        
        expect(getByText(day, "no spots remaining")).toBeInTheDocument();
      });
    });
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    waitForElement(() => getByText(container, "Archie Cohen")).then(() => {

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    waitForElement(() => getByAltText(appointment, "Add")).then(() => {

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );

      expect(getByText(day, "2 spots remaining")).toBeInTheDocument
      });
    });
  });
    
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      
      // 3. Click the "Edit" button on the booked appointment.
      fireEvent.click(queryByAltText(appointment, "Edit"));
      
      // 4. Edit something?
      fireEvent.click(queryByAltText(appointment, "Sylvia Palmer"));
      
      // 5. Save
      fireEvent.click(queryByText(appointment, "Confirm"));
     
      // 6. Check saving
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      
      // 7. Wait until the appointment shows up again
      waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    
        // 8. Check that the name/interviewer has changed
        const day = getAllByTestId(container, "day").find(day =>
          queryByText(day, "Monday")
        );
        
        expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
        expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
      });
    });
  });
    
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    
    waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      
      fireEvent.click(queryByAltText(appointment, "Edit"));
      
      fireEvent.click(queryByAltText(appointment, "Sylvia Palmer"));
      
      fireEvent.click(queryByText(appointment, "Confirm"));
      
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      waitForElement(() => getByText(appointment, "Error")).then(() => {
    
        expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
      });
    }); 
  });
  
  it("shows the delete error when failing to delete an appointment", () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    
    waitForElement(() => getByText(container, "Archie Cohen")).then(() => {
    
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      
      fireEvent.click(queryByAltText(appointment, "Delete"));
      
      expect(getByText(appointment, "Confirm")).toBeInTheDocument();
      
      fireEvent.click(queryByText(appointment, "Confirm"));
      
      waitForElement(() => getByText(appointment, "Error")).then(() => {
    
        expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
      });
    });
  });
  
});