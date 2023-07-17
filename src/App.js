import { useEffect, useState } from 'react';
import './App.css';
import cover from "./components/img/cover.jpg"
import buchfink from "./components/img/buchfink.jpg";
import eisvogel from "./components/img/eisvogel.jpg";
import elster from "./components/img/elster.jpg";
import ente from "./components/img/ente.jpg";
import eule from "./components/img/eule.jpg";
import rotkehlchen from "./components/img/rotkehlchen.jpg";
import sperling from "./components/img/sperling.jpg";
import storch from "./components/img/storch.jpg";
import SingleCard from './components/SingleCard/SingeCard';

const cardImages = [
  { src: buchfink, birdName: "Buchfink", matched:false},
  { src: eisvogel, birdName: "Eisvogel", matched:false},
  { src: elster, birdName: "Elster", matched:false},
  { src: ente, birdName: "Ente", matched:false},
  { src: eule, birdName: "Eule", matched:false},
  { src: rotkehlchen, birdName: "Rotkehlchen", matched:false},
  { src: sperling, birdName: "Sperling", matched:false},
  { src: storch, birdName: "Storch", matched:false}
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // Zum Ausgeben des Vogelnamens (bei einem Match) brauchen wir einen useState
  const [birdName, setBirdName] = useState('');

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    // um beim Laden der Seite defaultmässig ein Aufdecken zu verhindern
    setChoiceOne(null);
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setBirdName(null)
  }
/* 
  console.log(cards, turns) */

  //handle a choice
  const handleChoice = (card) => {
    // wenn es bekannt ist, ist es false; wenn es unbekannt ist, dann true; updaten des ersten Zuges und des zweiten Zuges
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
    // hier wird ein useEffect benötigt, um auf den vorherigen Zustand des ziehens einer Karte reagieren zu können. Erst wird gezogen und dann wird sich auf den vorherigen Zug bezogen --> siehe folgende useEffect Fkt.
    // Anzeigen des Vogelnamens bei der Auswahl -- Test
    // setBirdName(card.birdName)
    // Zurücksetzen des Vogelnamens bei jeder neuen auswahl, damit der Vogelname nur bei einem Match angezeigt wird
    setBirdName('')
  }

  // compare 2 selected cards; wird erst gemountet und bezieht sich dann auf den dependency change
  useEffect(() => {
    // erst checken, ob in choiceOne UND in choiceTwo ein Value ist
    if (choiceOne && choiceTwo) {
        // nachdem 2 Karten aufgedeckt wurden, werden alle übrigen Karten in ihrem Clickverhalten disabled
      setDisabled(true)
      // checken, ob die Quellen von choiceOne === choiceTwo ist
      if (choiceOne.src === choiceTwo.src) {
        console.log('Those cards match');
        // Wenn die Quelle der beiden Karten gleich sind, sollen diese in ein neues Object gemapt werden, mit matched: true
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        // Setzen des Vogelnamens bei einem Match
        setBirdName(choiceOne.birdName)
        // dann wieder die Auswahl zurücksetzen durch aufrufen der resetTurn Funktion 
        resetTurn()
      } else {
        console.log('Those cards do not match');
        // setTimeOut, um das Umdrehen bei 2 unmatched cards einen geschmeidigen Effekt zu geben, damit man sich die Position für zukünftige Züge besser merken kann
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    // Zählt die Spielzüge durch berücksichtigung des vorherigen Zugs 
    setTurns(prevTurns => prevTurns + 1)
    // sobald ein neuer Zug beginnt ist das disabled Clickverhalten wieder auf false gesetzt und es kann wieder geclickt werden!
    setDisabled(false)
  }

  // Automatischer Spielstart 
  useEffect(() => {
    shuffleCards();
  },[])


  return (
    <div className="App">
      <h1>Memory Game </h1>
      <button onClick = { shuffleCards }>New Game</button>
        {/* Ausgabe der Spielzüge */}
        <p>Turns: {turns}</p>
      <div className="bird-name">
      {birdName && <p>{birdName}</p>}
      </div>
      <div className ="card-grid">
        {cards.map(card => (
          <SingleCard card={card} 
          cover={cover} 
          key={card.id} 
          handleChoice={handleChoice}
          //handeln des flips der Cards
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          // Verhindern das mehr als 2 Karten für eine kurze zeit gleichzeitig aufgedeckt werden können, wird zu handleClick Fkt durchgegeben und dort dann bearbeitet/operiert
          disabled={disabled}
          />
        ))}
      </div>
    </div> 
  );
}

export default App;
  