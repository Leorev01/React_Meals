import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Cart({items, addItem , removeItem, setTotal, total}){

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const updatedItemList = [];
        let newTotal = 0;

        items.forEach((item) => {
        const existingItem = updatedItemList.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.amount += 1;
        } else {
            updatedItemList.push({ ...item, amount: 1 });
        }
        newTotal += parseFloat(item.price);
        });

        setItemList(updatedItemList);
        setTotal(newTotal);
    }, [items]);
 
    return(
        <div className="cart">
        <h2>Your Cart</h2>
        {itemList.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          itemList.map((item) => (
            <div className="cart-item-actions" key={nanoid()}>
                <p>
                {item.name} <strong>x{item.amount}</strong> ${item.price}
                </p>
                <button onClick={()=>removeItem(item)}>-</button>
                <button onClick={()=>addItem(item)}>+</button>
            </div>
          ))
        )}
        <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      </div>
    )
}