import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import { useState } from 'react'

export const NewIdeaPage = () => {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <Input name="name" label="Name" onChange={handleChange} value={state.name} />
        <Input name="nick" label="Nick" onChange={handleChange} value={state.nick} />
        <Input name="description" label="Description" onChange={handleChange} value={state.description} />
        <TextArea name="text" label="Text" onChange={handleChange} value={state.text} />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
