import { useState, useEffect } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const StatisticsLine = (text, value) => {
  return(
  <p>{text} {value}</p>
  )
}

const Statistics = ({feedbacks}) => {
 const allFeedbacks = Object.values(feedbacks).reduce((a, b) => a + b, 0)
 
 if (allFeedbacks === 0) {
  return (
  <>
  <p>No feedback given</p>
  </> 
  )
 } else {
  return (
    <>
    <p>Good {feedbacks["good"]}</p>
    <p>Neutral {feedbacks["neutral"]} </p>
    <p>Bad {feedbacks["bad"]}</p>
    <p>All {allFeedbacks}</p>
    <p>Average {
    ((feedbacks["good"] + (feedbacks["bad"] *(-1)))/
    allFeedbacks).toFixed(2)
    }</p>

    <p>Positive {((feedbacks["good"] / allFeedbacks )*100).toFixed(2)}% </p>
    </>
    )
  }
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

      <Statistics feedbacks = {feedbacks}  />
      </div>
      )
    }
    
    export default App