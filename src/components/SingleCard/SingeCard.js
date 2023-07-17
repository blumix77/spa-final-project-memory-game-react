import "./SingleCard.css"

export default function SingleCard({card, cover, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }

    }
    return(
        <div className="card">
        <div className={`${flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}>
            <img className="front" src={card.src} alt="card-front" />
            <img className="back"
            src={cover} 
            onClick={handleClick} 
            alt="card-back" />
        </div>
        </div>
    )
}