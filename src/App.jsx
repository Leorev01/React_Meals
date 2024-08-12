import React, { useRef } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const dialogRef = useRef();

  return (
    <CartProvider>
      <Modal ref={dialogRef} />
      <Header showModal={() => dialogRef.current.open()} />
      <Meals />
    </CartProvider>
  );
}

export default App;
