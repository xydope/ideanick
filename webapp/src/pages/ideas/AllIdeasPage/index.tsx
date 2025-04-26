import { Alert } from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import css from './index.module.scss'
import { getViewIdeaRoute } from '../../../lib/routes'
import { layoutContentElRef } from '../../../components/Layout'
import { trpc } from '../../../lib/trpc'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title={'All Ideas'}>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <InfiniteScroll
          threshold={250}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) {
              void fetchNextPage()
            }
          }}
          hasMore={hasNextPage}
          loader={<Loader type="section" />}
          getScrollParent={() => layoutContentElRef.current}
          useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
        >
          <div className={css.ideas}>
            {data?.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <div className={css.idea} key={idea.nick}>
                  <Segment
                    size={2}
                    description={idea.description}
                    title={
                      <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                        {idea.name}
                      </Link>
                    }
                  >
                    Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      )}
    </Segment>
  )
}
