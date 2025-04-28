import { Alert } from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { Input } from '../../../components/Input'
import { Link } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import css from './index.module.scss'
import { getViewIdeaRoute } from '../../../lib/routes'
import { layoutContentElRef } from '../../../components/Layout'
import { trpc } from '../../../lib/trpc'
import { useDebounceValue } from 'usehooks-ts'
import { useForm } from '../../../hooks/useForm'
import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input'

export const AllIdeasPage = () => {
  const { formik, handleChange } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })

  const [search] = useDebounceValue(formik.values.search, 500)

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 5,
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title={'All Ideas'}>
      <div className={css.filter}>
        <Input
          maxWidth={'100%'}
          label="Search"
          name="search"
          onChange={handleChange}
          value={formik.values.search || ''}
        />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data?.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
