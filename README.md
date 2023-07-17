## memory-game-react

all used pictures are taken from [Unsplash](https://unsplash.com/) and are free to use! 
thanks to 

#how the code works

- imported the img-files and in an array of objects with the img-file for every bird and their names and setting matched as false in default

- the shuffle card function: 
    - load twice the object in the function via spread operator in these function, because for memory wie need two pairs of the same picture
    - with the sort-method and Math.random, we mix the pictures randomly
    - afterwards wie map them the cards for each card
    - there are various state hooks:
        - setChoiceOne and setChoiceTwo defined first of all as "null", to hide all cards
        - setTurns is at the beginning "0", because it is a counter to count all turns during the game
        - setBirdName is also "null" at the beginning, these hook is responsable to show the name of the bird, when two cards are matched

- the handleChoice function:
    - first: check if there was a first choice to allow the second choice
    - the useEffect, which is connected to this function; it has a hook, that disables to unhide more than two cards on the same time to avoid cheating; it is true, when 2 cards are flipped
    - the matching method between two cards works with a comparison between the source of the image-file, if they are equal = match (setCards --> matched:true); the Name of the bird will be showed

- the resetTurn function:
    - after 1 round it sets choiceOne and choiceTwo to "null"
    - iterates the counter +1 
    - enables to flip new cards by setting the disabled hook to false