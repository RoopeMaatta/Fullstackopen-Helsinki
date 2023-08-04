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
        
      <div key = {course.id} >
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.map(part=>part.exercises)} />
      </div>
      )
      )
    }
    

export default Course