const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => 
<p> <strong>
  Number of exercises {sum.reduce((accumulator, current) => accumulator + current)}
</strong> </p>

const Part = ({ part }) => 
<p>
{part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
parts.map((part, i)=> 
  <Part
  key = {part.id}
  part = {parts[i]} 
  /> )
  
  
  const Course = ({course}) => {
    console.log(course.parts[0].exercises)
    return (
      <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.map(part=>part.exercises)} />
      </div>
      )
    }
    
    
    
    const App = () => {
      const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Personal testing',
            exercises: 0,
            id: 4
          }
        ]
      }
      
      return <Course course={course} />
    }
    
    export default App
    
    
    
    // const App = () => {
    //   const course = 'Half Stack application development'
    //   const parts = [
    //     {
    //       name: 'Fundamentals of React',
    //       exercises: 10
    //     },
    //     {
    //       name: 'Using props to pass data',
    //       exercises: 7
    //     },
    //     {
    //       name: 'State of a component',
    //       exercises: 14
    //     }
    //   ]
    
    //   return (
    //     <div>
    //       <Header course={course} />
    //       <Content parts={parts} />
    //       <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    //     </div>
    //   )
    // }
    
    // export default App