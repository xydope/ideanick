import { type ViewIdeaRouteParams, getEditIdeaRoute } from '../../lib/routes'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import css from './index.module.scss'
import { format } from 'date-fns'
import { trpc } from '../../lib/trpc'
import { useMe } from '../../lib/ctx'
import { useParams } from 'react-router-dom'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  const { data, isLoading } = trpc.getIdea.useQuery({ ideaNick })

  const me = useMe()

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!data || !data.idea) {
    return <span>Idea not found</span>
  }

  const idea = data.idea

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {idea.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      {me?.id == idea.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}
