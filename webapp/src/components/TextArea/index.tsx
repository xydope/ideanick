import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<InputProps> = ({ name, label, onChange, value, error, onBlur, ...otherProps }) => {
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
        {...otherProps}
      />
      {error && isTouched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
