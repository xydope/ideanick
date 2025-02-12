type InputProps = {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<InputProps> = ({ name, label, onChange, value }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea onChange={onChange} value={value} name={name.toLowerCase()} id={name.toLowerCase()} />
    </div>
  )
}
