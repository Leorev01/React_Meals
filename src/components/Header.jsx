import ImageSRC from '../assets/logo.jpg'

export default function Header({items, showModal}){
    
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