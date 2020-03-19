import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  //MEMORY
  const [cards, setCards] = useState([])
  const [cardsPairs, setCardsPairs] = useState([])
  const [cardsVisible, setCardsVisible] = useState([])
  const [isStart, setStart] = useState(false)
  //WIN
  const [win, setWin] = useState(false)
  // ESSAIS
  const [essais, setEssais] = useState(0)
  // TIMER
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleStart = async () => {
    let copyCards = []
    await setCardsVisible([])
    await setCardsPairs([])
    await setEssais(0)
    setWin(false)
    setSeconds(0)
    setIsActive(true)

    for (let i = 1; i <= 9; i++) {
      copyCards.push({
        value: i,
        visible: false
      })
      copyCards.push({
        value: i,
        visible: false
      })
    }
    for (let i = copyCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyCards[i], copyCards[j]] = [copyCards[j], copyCards[i]];
    }
    setCards(copyCards)
    setStart(true)
  }

  const handleShowCard = (card, key) => {
    const copyCards = [...cards]
    let copyCardsVisible = [...cardsVisible]
    if (copyCardsVisible.length < 2 && copyCards[key].visible === false) {
      copyCards[key].visible = copyCards[key].visible = true

      copyCardsVisible.push(card)

      if (copyCardsVisible.length >= 2 && isStart) {
        if (copyCardsVisible.length >= 2 && copyCardsVisible[0].value === copyCardsVisible[1].value) {
          setCardsPairs([...cardsPairs, copyCardsVisible])
          setEssais(essais => essais + 1)
          console.log('essais')
          copyCardsVisible = []
        }
        if (copyCardsVisible.length >= 2 && copyCardsVisible[0].value !== copyCardsVisible[1].value) {
          setTimeout(() => {
            copyCardsVisible[0].visible = !copyCardsVisible[0].visible
            copyCardsVisible[1].visible = !copyCardsVisible[1].visible
            copyCardsVisible = []
            setEssais(essais => essais + 1)
            setCardsVisible(copyCardsVisible)
          }, 500)
        }
      }
      
      setCards(copyCards)
      setCardsVisible(copyCardsVisible)
    }
  }

  useEffect(() => {
    if (cardsPairs.length === 9) {
      setWin(true)
      setIsActive(false)
    }

    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    } 
    return () => clearInterval(interval)
  }, [cardsPairs.length, cardsPairs, isActive])

  return (
    <>
      <div className='top-bar'>
        <h1>MEMORY</h1>
      </div>
        
        {win && <div>Win</div>}

      <div className='container'>
        {isStart ?
              <div className='under-topbar'>
                <div>
                  <div className='chrono'>Temps : {seconds}s</div>
                </div>
                <div>
                  <button className='restart' onClick={handleStart}>Recommencer une partie</button>
                </div>
                <div>
                  <div className='essais'>{essais} essais</div>
                </div>
              </div>
              
            :
              <button className='start' onClick={handleStart}>Commencer une partie</button>
        }
        <div className='grid'>
          {
            cards.map((card, key) => (
              <div key={key} onClick={() => handleShowCard(card, key)}>
                <div className='card hover'>
                  {card.value}
                  {card.visible ? null : <div className='cache' />}
                </div>
              </div>
            ))
          }
          {!isStart && (
            <>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
              <div className='card'>
                <div className='cache' />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
