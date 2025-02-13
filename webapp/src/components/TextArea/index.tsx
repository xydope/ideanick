import { InputHTMLAttributes, useState } from 'react'
import cn from 'classnames'
import css from './index.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  error,
  onBlur,
  ...otherProps
}) => {
  const [isTouched, setIsTouched] = useState(false)
  const invalid = error && isTouched

  return (
    <div
      className={cn({
        [css.field]: true,
        [css.disabled]: otherProps.disabled,
      })}
      style={{ marginBottom: 10 }}
    >
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
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
      {invalid && isTouched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
