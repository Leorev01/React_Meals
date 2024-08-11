import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import Cart from "./Cart";
import Checkout from "./Checkout";

const Modal = forwardRef(function Modal({ items, addItem, removeItem }, ref) {
  const dialog = useRef();
  const formRef = useRef();

  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);

  function goToCheckout(){
    setCheckout(true);
  }
  async function createOrder(){
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
        const data = await result.json();
        return data.message;
    }
    catch(error){
        console.log(error);
    }
    
} 

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    }
  }));

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {!checkout && <Cart items={items} addItem={addItem} removeItem={removeItem} setTotal={setTotal} total={total}/>}
      {checkout && <form id="form" className="control" ref={formRef} onSubmit={createOrder}>
            <Checkout total={total}/>
        </form>}
        <div className="modal-actions">
          <button className="text-button" onClick={() => (dialog.current.close(), setCheckout(false))}>
            Close
          </button>
          {checkout && <button className="button" type="submit" form="form">Submit Order</button>}
          {(!checkout && items.length===0) ?
          <button className="button" disabled>Checkout</button>:
          (!checkout) && <button className="button" onClick={goToCheckout}>Checkout</button>}
        </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
