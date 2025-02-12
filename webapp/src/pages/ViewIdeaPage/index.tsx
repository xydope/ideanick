import type { ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { useParams } from 'react-router-dom'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  const { data, isLoading, isError, error } = trpc.getIdea.useQuery({ ideaNick })

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data || !data.idea) {
    return <span>Idea not found</span>
  }

  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>{data.idea.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </div>
  )
}
