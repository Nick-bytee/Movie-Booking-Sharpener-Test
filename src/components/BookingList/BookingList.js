import React from "react";
import { Button } from "react-bootstrap";

const BookingList = (props) => {

    const deleteBookingHandler = (index) => {
        const updatedBookings = [...props.booking.slice(0, index), ...props.booking.slice(index + 1)]
        props.onDelete(updatedBookings)
    }

    const editBookingHandler = (index) => {
        props.onEdit(index)
    }

    const filteredBookings = props.booking.filter(booking => {
        return booking.seat.toString().includes(props.searchValue);
    });
       
    return (
        <ul className="mt-5">
            {filteredBookings.length>0 ? (
  filteredBookings.length >= 1 ? (
    filteredBookings.map((booking, index) => (
      <li key={index}>
        <div className="d-flex">
          <h3>{`${booking.name} ${booking.seat}`}</h3>
          <Button onClick={() => editBookingHandler(index)} className="btn btn-primary" id="btn">Edit</Button>
          <Button onClick={() => deleteBookingHandler(index)} className="btn btn-danger" id="btn">Delete</Button>
        </div>
      </li>
    ))
  ) : (
    ''
  )
) : (
  props.booking.length >= 1 ? (
    props.booking.map((booking, index) => (
      <li key={index}>
        <div className="d-flex">
          <h3>{`${booking.name} ${booking.seat}`}</h3>
          <Button onClick={() => editBookingHandler(index)} className="btn btn-primary" id="btn">Edit</Button>
          <Button onClick={() => deleteBookingHandler(index)} className="btn btn-danger" id="btn">Delete</Button>
        </div>
      </li>
    ))
  ) : <h3>Nothing Present</h3>
)}

        </ul>
    )

}

export default BookingList