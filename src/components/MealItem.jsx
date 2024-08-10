export default function MealItem({meal, addItem}){
    const source=`../../backend/public/${meal.image}`;
    return (
        <article className="meal-item">
            <img src={source} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <button className="button meal-item-actions" onClick={()=>addItem(meal, meal.id)}>Add To Cart</button>
        </article>
    )

}