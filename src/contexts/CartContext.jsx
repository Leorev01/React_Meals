import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item) => {
    setItems((prevItems) => [...prevItems, { ...item, amount: 1 }]);
  }, []);

  const removeItem = useCallback((item) => {
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
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearItems }}>
      {children}
    </CartContext.Provider>
  );
};

