import { InputHTMLAttributes, useState } from 'react'
import cn from 'classnames'
import css from './index.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  value: string
  error?: string
  maxWidth?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({ name, label, onChange, value, error, onBlur, maxWidth, ...otherProps }) => {
  const [isTouched, setIsTouched] = useState(false)
  const invalid = error && isTouched

  return (
    <div
      className={cn({
        [css.field]: true,
        [css.disabled]: otherProps.disabled,
      })}
    >
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        style={{ maxWidth }}
        type="text"
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
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
