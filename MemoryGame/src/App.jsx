import { useState, useEffect } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";

export default function App() {
  const initialFormData = {
    category: "",
    number: 10,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prev) => [...prev, ...selectedCards]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards]);

  function handleFormChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  }

  async function startGame(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/${formData.category}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);

      setEmojisData(emojisArray);

      setIsGameOn(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  }

  async function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);
    return randomIndices.map((index) => data[index]);
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];
    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }
    return pairedEmojisArray;
  }

  function turnCard(index, name) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setMatchedCards([]);
    setSelectedCards([]);
    setAreAllCardsMatched(false);
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <main>
      <h1>* Memory Game *</h1>
      {!isGameOn && !isError && (
        <Form handleSubmit={startGame} handleChange={handleFormChange} />
      )}
      {areAllCardsMatched && <GameOver handleClick={resetGame}></GameOver>}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
      {isError && <ErrorCard handleClick={resetError}></ErrorCard>}
    </main>
  );
}
