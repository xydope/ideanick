import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import { useFormik } from 'formik'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name.trim()) {
        errors.name = 'Name is required'
      }
      if (!values.nick.trim()) {
        errors.nick = 'Nick is required'
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        errors.nick = 'Nick may contain only lowercase letters, numbers and dashes'
      }
      if (!values.description.trim()) {
        errors.description = 'Description is required'
      }
      if (!values.text.trim()) {
        errors.text = 'Text is required'
      } else if (values.text.length < 100) {
        errors.text = 'Text should be at least 100 characters long'
      }
      return errors
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
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
