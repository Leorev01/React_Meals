import ErrorComponent from "./ErrorComponent";

export default function Checkout({total, errormsg}){


    return(
        <>
            <h2>Checkout</h2>
            <p>Total Amount: {total}</p>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required/>
            <label htmlFor="email">E-Mail Address</label>
            <input type="email" id="email" required/>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" required/>
            <div className="control-row">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="text" id="postal-code" required/>
                <label htmlFor="city">City</label>
                <input type="text" id="city" required/>
            </div>
            {errormsg.hasError && <ErrorComponent message={errormsg.message}/>}
        </>
    )
}