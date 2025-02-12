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
    onSubmit: (values) => {
      console.info('Submitted', values)
    }
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" onChange={handleChange} value={formik.values.name} />
        <Input name="nick" label="Nick" onChange={handleChange} value={formik.values.nick} />
        <Input name="description" label="Description" onChange={handleChange} value={formik.values.description} />
        <TextArea name="text" label="Text" onChange={handleChange} value={formik.values.text} />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
