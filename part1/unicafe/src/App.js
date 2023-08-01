import { useState, useEffect } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const StatisticsLine = (text, value) => {
  <p>{text} {value}</p>
}


const App = () => {
  // save clicks of each button to its own state
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)
  //const [allClicks, setAll] = useState({good: 0, neutral: 0, bad: 0}) 
  

  //single use state for all answers collectively
  const [feedbacks, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const pressButton = (type) => () => {
    console.log("value before click", feedbacks)
    setFeedback({
      ...feedbacks,
      [type]: feedbacks[type]+1
    })
  }
  
    useEffect(() => {
     console.log("value after click/render", feedbacks)
   }, [pressButton]) // <-- this effect runs whenever `stateVariable` changes
  

  return (
    <div>
    <h1>Give feedback</h1>
    
    <Button 
    handleClick= {pressButton("good")}
    text="Good"
    />
    <Button 
    handleClick= {pressButton("neutral")}
    text="Neutral"
    />
    <Button 
    handleClick= {pressButton("bad")}
    text="Bad"
    />
  
    <h2>Statistics</h2>
    <p>good {feedbacks["good"]}</p>
    <p>neutral {feedbacks["neutral"]} </p>
    <p>bad {feedbacks["bad"]}</p>
    </div>
    )
  }
  
  export default App