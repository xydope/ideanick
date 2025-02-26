import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems/index'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { TextArea } from '../../../components/TextArea'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../hooks/useForm'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/ideas/createIdea/input'

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation()
  const { formik, buttonProps, alertProps, handleChange, handleBlur } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Idea created',
    showValidationAlert: true,
  })
  
  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input
            name="name"
            label="Name"
            error={formik.errors.name}
            onChange={handleChange}
            value={formik.values.name}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Input
            name="nick"
            label="Nick"
            error={formik.errors.nick}
            onChange={handleChange}
            value={formik.values.nick}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Input
            name="description"
            label="Description"
            maxWidth={500}
            error={formik.errors.description}
            onChange={handleChange}
            value={formik.values.description}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <TextArea
            name="text"
            label="Text"
            error={formik.errors.text}
            onChange={handleChange}
            value={formik.values.text}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
