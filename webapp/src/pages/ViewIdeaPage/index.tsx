import { Segment } from '../../components/Segment'
import type { ViewIdeaRouteParams } from '../../lib/routes'
import css from './index.module.scss'
import { format } from 'date-fns'
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
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.createdAt}>Created At: {format(data.idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
