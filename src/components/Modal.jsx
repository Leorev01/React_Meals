import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderStatus from './OrderStatus';
import {useCart} from "../contexts/CartContext";

const Modal = forwardRef(function Modal(props, ref) {
  const { items, addItem, removeItem, clearItems } = useCart();
  const dialog = useRef();
  const formRef = useRef();

  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    message: '',
  });
  const [orderCompleted, setOrderCompleted] = useState(false);

  function goToCheckout(){
    setCheckout(true);
  }
  async function createOrder(event){

    event.preventDefault();
    
    const order = {
        customer: {
            name: formRef.current.name.value,
            email: formRef.current.email.value,
            street: formRef.current.street.value,
            'postal-code': formRef.current['postal-code'].value,
            city: formRef.current.city.value,

        },
        items: items
    }

    console.log(order);
    setError({hasError: false, message: ''});
    try{
        const result = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            body: JSON.stringify({order: order}),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(!result.ok){
            throw new Error("Unable to process order");
        }
        setOrderCompleted(true);
        clearItems();
        const data = await result.json();
        return data.message;
    }
    catch(error){
        console.log(error);
        setError({hasError: true, message: 'Unable to process order'});
    }
    
} 

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    }
  }));

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {orderCompleted && <OrderStatus title="Order Completed" message="Thank you for your order!"/>}
      {(!orderCompleted && !checkout) && <Cart items={items} addItem={addItem} removeItem={removeItem} setTotal={setTotal} total={total}/>}
      {(!orderCompleted && checkout) && <form id="form" className="control" ref={formRef} onSubmit={createOrder}>
            <Checkout total={total} errormsg={error}/>
        </form>}
        <div className="modal-actions">
          <button className="text-button" onClick={() => (dialog.current.close(), setCheckout(false), setOrderCompleted(false))}>
            Close
          </button>
          {(checkout && !orderCompleted) && <button className="button" type="submit" form="form">Submit Order</button>}
          {(!checkout && items.length===0) ?
          <button className="button" disabled>Checkout</button>:
          (!checkout && !orderCompleted) && <button className="button" onClick={goToCheckout}>Checkout</button>}
        </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
