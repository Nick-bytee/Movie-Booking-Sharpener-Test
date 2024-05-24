import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import BookingList from "./components/BookingList/BookingList";

function App() {
  const [bookings, setBookings] = useState([])
  const [name, setName] = useState('')
  const [seat, setSeat] = useState('')
  const [total, setTotal] = useState(0)
  const [editFlag, setEditFlag] = useState(false)
  const [searchBooking, setSearchBooking] = useState('')

  const nameChangeHandler = (event) => {
    setName(event.target.value.trim())
  }

  const seatChangeHandler = (event) => {
    const input = event.target.value.trim();
    if (input === '' || isNaN(input)) {
      setSeat('');
    } else {
      setSeat(parseInt(input));
    }
  };

  const searchHandler = (event) => {
    setSearchBooking(event.target.value.trim())
  }

  const isSeatPresent = (seatNumber) => {
    if (editFlag.status) {
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].seat === seatNumber && i !== editFlag.index) {
          return true;
        }
      }
      return false;
    } else {
      return bookings.some(booking => booking.seat === seatNumber);
    }
  };
  
  const bookingHandler = (event) => {
    event.preventDefault();
    if (name.length > 2 && seat >= 1) {
      if (!isSeatPresent(seat) || editFlag.status) {
        if (editFlag.status) {
          if (!isSeatPresent(seat)) {
            const updatedBookings = bookings.map((booking, index) => {
              if (index === editFlag.index) {
                return { name: name, seat: seat };
              }
              return booking;
            });
            setBookings(updatedBookings);
            setName('');
            setSeat('');
            setEditFlag({ status: false, index: null });
          } else {
            window.alert('Seat is already booked');
          }
        } else {
          setBookings((prev) => [...prev, { name: name, seat: seat }]);
          setTotal((prevtotal) => prevtotal + 1);
          setName('');
          setSeat('');
          setEditFlag({ status: false, index: null });
        }
      } else {
        window.alert('Seat is already booked');
      }
    } else {
      window.alert('Form is not valid');
    }
  };

  const deleteHandler = (updatedBookings) => {
    setBookings(updatedBookings)
  }

  const editHandler = (index) => {
    setName(bookings[index].name)
    setSeat(bookings[index].seat)
    setEditFlag({ status: true, index: index })
  }

  return (
    <Container fluid className="mt-4">
      <h3 className="text-center">Movie Booking</h3>
      <h5 className="text-center">Total Bookings : {total}</h5>
      <form className="text-center mb-3">
        <label htmlFor="searchBox">Find Slot</label>
        <input value={searchBooking} onChange={searchHandler} type="text" id="searchBox" className="m-1"></input>
      </form>

      <Container>
        <form className="d-flex mt-5">
          <div style={{ marginRight: '2rem' }}>
            <label htmlFor="name">Enter Name</label>
            <input type="text" value={name} onChange={nameChangeHandler} id="name" className="m-1"></input>
          </div>
          <div style={{ marginRight: '1rem' }}>
            <label htmlFor="slot">Seat Number</label>
            <input type="text" id="slot" value={seat} onChange={seatChangeHandler} className="m-1"></input>
          </div>
          <Button onClick={bookingHandler} className="btn btn-success">Add</Button>
        </form>
      </Container>
      <BookingList searchValue={searchBooking} onDelete={deleteHandler} booking={bookings} onEdit={editHandler} />
    </Container>
  );
}

export default App;
