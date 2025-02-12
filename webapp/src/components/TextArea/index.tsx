type InputProps = {
  name: string
  label: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<InputProps> = ({ name, label, onChange, value, error }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea onChange={onChange} value={value} name={name.toLowerCase()} id={name.toLowerCase()} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
