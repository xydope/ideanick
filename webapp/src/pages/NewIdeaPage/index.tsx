import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { useState } from 'react'
import { withZodSchema } from 'formik-validator-zod'
import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input'


export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error) {
        setSubmittingError((error as Error).message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldTouched(e.target.name)
  }
  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
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
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Idea created!</Alert>}
        <Button loading={formik.isSubmitting}>Create Idea</Button>
      </form>
    </Segment>
  )
}
