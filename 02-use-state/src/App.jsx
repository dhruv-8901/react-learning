import { useState } from "react";
import "./App.css";

function App() {
  const [booking, setBooking] = useState(10);

  const addBooking = () => {
    if (booking < 20) setBooking(booking + 1);
  };

  const deleteBooking = () => {
    if (booking > 0) setBooking(booking - 1);
  };

  return (
    <>
      <h1>King Maker</h1>
      <h2>Total booking - {booking}</h2>
      <button onClick={addBooking}>Add</button>
      <br />
      <button onClick={deleteBooking}>Delete</button>
    </>
  );
}

export default App;
