type InputProps = {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({ name, label, onChange, value }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input type="text" onChange={onChange} value={value} name={name.toLowerCase()} id={name.toLowerCase()} />
    </div>
  )
}
