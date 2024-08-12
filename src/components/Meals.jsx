import MealItem from "./MealItem";
import { nanoid } from "nanoid";
import {useState, useEffect} from "react";
import ErrorComponent from "./ErrorComponent";

export default function Meals({addItem}){

    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        async function getMeals(){
            try{
                setError(false);
                const result = await fetch('http://localhost:3000/meals');
                const data = await result.json();
                if(!result.ok){
                    throw new Error("Unable to load menu");
                }
                setMeals(data);
            }catch(error){
                setError(true);
                console.log(error);
            }
        }
        getMeals();
    }, [])
    
    if(error){
        return <ErrorComponent message="Unable to load menu"/>
    }
    
    return(
        <div id="meals">
            {meals.length===0 ?
            <p style={{textAlign: 'center'}}>Loading Menu...</p>:
            meals.map((meal) => (
                <MealItem
                key={nanoid()}
                meal={meal}
                addItem={addItem}
                />
            ))}
        </div>
    )
}