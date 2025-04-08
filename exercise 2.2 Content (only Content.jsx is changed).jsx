import Part from './Part'

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <strong>Total of {total} exercises</strong>
    </div>
  )
}

export default Content

