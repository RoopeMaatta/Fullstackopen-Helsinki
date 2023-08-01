import { useState, useEffect } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = (props, text) => {
  <p>{text} {props}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allClicks, setAll] = useState([]) 
  
  const pressButton = (stateVariable, setStateVariable) => () => {
    console.log("value before click", stateVariable)
    
    //update empty array with clicked
    //setAll(allClicks)

    setStateVariable(stateVariable + 1)
    // // The below should be better but seems to function similarly to the above
    // const updatedVariable = stateVariable + 1 
    // setStateVariable(updatedVariable)
    
    // console.log("value after click", stateVariable)
    //^ doesn't work due to async rendering -> useEffect can be set to run/log after variable changes
  }
  
  // runs after render has been commited -> cant use stateVariable
  // hooks should be at top level of react functions
  useEffect(() => {
    console.log("value after click/render", good, neutral, bad)
  }, [good, neutral, bad]) // <-- this effect runs whenever `stateVariable` changes
  
  return (
    <div>
    <h1>Give feedback</h1>
    
    <Button 
    handleClick= {pressButton(good, setGood)}
    text="Good"
    />
    <Button 
    handleClick= {pressButton(neutral, setNeutral)}
    text="Neutral"
    />
    <Button 
    handleClick= {pressButton(bad, setBad)}
    text="Bad"
    />
  
    <h2>Statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    </div>
    )
  }
  
  export default App