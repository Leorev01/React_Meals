import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import {useRef, useState} from "react";

function App() {

  const [items, setItems] = useState([]);

  const dialog = useRef();

  function addItem(item){
    setItems(prevItems => 
      [...prevItems, {...item, amount: 1}]);
  }

  function removeItem(item) {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.id === item.id);
  
      const updatedItems = [...prevItems];
  
      if (updatedItems[itemIndex].amount > 1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          amount: updatedItems[itemIndex].amount - 1,
        };
      } else {
        updatedItems.splice(itemIndex, 1);
      }
  
      return updatedItems;
    });
  }

  return (
    <>
    <Modal items={items} ref={dialog} addItem={addItem} removeItem={removeItem}/>
    <Header items={items} showModal={() => dialog.current.open()}/>
      <Meals addItem={addItem}/>
    </>
  );
}

export default App;
