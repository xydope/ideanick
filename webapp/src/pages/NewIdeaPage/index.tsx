import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        nick: z
          .string()
          .min(1, 'Nick is required')
          .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
        description: z.string().min(1),
        text: z.string().min(100, 'Text should be at least 100 characters long'),
      })
    ),
    onSubmit: async (values) => {
      await createIdea.mutate(values)
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
        />
        <Input
          name="nick"
          label="Nick"
          error={formik.errors.nick}
          onChange={handleChange}
          value={formik.values.nick}
          onBlur={handleBlur}
        />
        <Input
          name="description"
          label="Description"
          error={formik.errors.description}
          onChange={handleChange}
          value={formik.values.description}
          onBlur={handleBlur}
        />
        <TextArea
          name="text"
          label="Text"
          error={formik.errors.text}
          onChange={handleChange}
          value={formik.values.text}
          onBlur={handleBlur}
        />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
