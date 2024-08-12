import ImageSRC from '../assets/logo.jpg'
import {useCart} from "../contexts/CartContext";

export default function Header({showModal}){
    const {items} = useCart();
    
    return(
        <header id="main-header">
            <div id="title">
                <img src={ImageSRC} alt="Logo Image" />
                <h1>React Meals</h1>
            </div>
            <button className="text-button" onClick={showModal}>Cart({items.length})</button> 
        </header>
        )
}