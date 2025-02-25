import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import pick from 'lodash/pick'
import { trpc } from '../../lib/trpc'
import { useForm } from '../../hooks/useForm'
import { withPageWrapper } from '../../lib/pageWrapper'
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
    return {
      idea,
    }
  },
})(({ idea }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      navigate(getViewIdeaRoute({ ideaNick: values.nick }))
    },
    successMessage: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldTouched(e.target.name)
  }

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input
            label="Name"
            name="name"
            error={formik.errors.name}
            onChange={handleChange}
            value={formik.values.name}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Input
            label="Nick"
            name="nick"
            error={formik.errors.nick}
            onChange={handleChange}
            value={formik.values.nick}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            error={formik.errors.description}
            onChange={handleChange}
            value={formik.values.description}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <TextArea
            label="Text"
            name="text"
            error={formik.errors.text}
            onChange={handleChange}
            value={formik.values.text}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Edit Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
