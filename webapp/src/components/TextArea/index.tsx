import { useState } from 'react'

type InputProps = {
  name: string
  label: string
  value: string
  error?: string
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<InputProps> = ({ name, label, onChange, value, error, onBlur }) => {
  const [isTouched, setIsTouched] = useState(false)

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={onChange}
        value={value}
        name={name.toLowerCase()}
        id={name.toLowerCase()}
        onBlur={(e) => {
          if (!isTouched) {
            setIsTouched(true)
          }
          if (onBlur) {
            onBlur(e)
          }
        }}
      />
      {error && isTouched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
