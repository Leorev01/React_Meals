import MealItem from "./MealItem";
import { nanoid } from "nanoid";
import {useState, useEffect} from "react";

export default function Meals({addItem}){

    const [meals, setMeals] = useState([]);

    useEffect(()=>{
        async function getMeals(){
            try{
                const result = await fetch('http://localhost:3000/meals');
                const data = await result.json();
                setMeals(data);
            }catch(error){
                console.log(error);
            }
        }
        getMeals();
    }, [])
    

    
    return(
        <div id="meals">
            {meals.length===0 ?
            <p>Loading Menu...</p>:
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