import { useState } from 'react'

/**
* Personal notes:
* 1.12 Random anecdote button:
*  - length of array
*  - random number within the length of the array
*  - button: set selected to random number
* 
* 1.13 Vote button
*  - votesArray with 0's acodring to length of anecdotes array
*  - button to vote +1 on the votes array location of anecdotes current array
* 
* 1.14 Most votes
*  - find value with most votes in votesArray
*  - dispaly that location of anecdotes array
*/


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  let current = selected;
  let [mostVoted, setmostVoted] = useState(0)  
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));



  const setRandomAnecdote = () => {
    let randomAnecdote;

    //make shure the same number is not repeated
    do {randomAnecdote = Math.floor(Math.random() * anecdotes.length) 
    } while (randomAnecdote === current);
    
    current = randomAnecdote
    
    return (
      setSelected(randomAnecdote)
      )
    }
    


    const vote = (current) => () => {
      const newPoints = [...points];
      newPoints[current] += 1;
      setPoints(newPoints);
      if (newPoints[current] > newPoints[mostVoted]) {setmostVoted(current)}
      //console.log(points, newPoints)
    }
  

    
    return (
      <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[current]} votes</p>

      <Button
      handleClick = {vote(current)} 
      text = "vote"/>


      <Button
      handleClick = {setRandomAnecdote} 
      text = "Random anecdote"/>
      
      <h2>Anecdote with the most votes</h2>
      <p>(has {points[mostVoted]} votes)</p>
      <p>{anecdotes[mostVoted]}</p>


      </div>
      
      )
    }
    
    export default App