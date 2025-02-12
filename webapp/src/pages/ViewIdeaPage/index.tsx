import { useParams } from 'react-router-dom'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams()

  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>Description</p>
      <div>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <p>Paragraph 3</p>
      </div>
    </div>
  )
}
