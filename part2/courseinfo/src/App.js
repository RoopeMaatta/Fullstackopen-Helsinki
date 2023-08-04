const Header = ({ course }) => <h2>{course}</h2>

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
  
  return (
    course.map( course =>
      <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.map(part=>part.exercises)} />
      </div>
      )
      )
    }
    
    
    
    const App = () => {
      const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
      
      return (
        <>
        <h1>WebDev Curriculum</h1>
        <Course course={courses} />
        </>
      )
    }
    
    export default App
    
    