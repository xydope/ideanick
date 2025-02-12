import { Link } from 'react-router-dom'
import css from './index.module.scss'
import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError } = trpc.getIdeas.useQuery()
  
  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1 className={css.title}>All Ideas</h1>
      <div className={css.ideas}>
        {data?.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
