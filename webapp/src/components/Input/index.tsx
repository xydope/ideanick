type InputProps = {
  name: string
  label: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({ name, label, onChange, value, error }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input type="text" onChange={onChange} value={value} name={name.toLowerCase()} id={name.toLowerCase()} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
