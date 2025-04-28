import { Link } from 'react-router-dom'
import cn from 'classnames'
import css from './index.module.scss'

type ButtonColor = 'red' | 'green'

export type ButtonProps = { children: React.ReactNode; loading?: boolean; color?: ButtonColor }

export const Button = ({ children, loading = false, color = 'green' }: ButtonProps) => {
  return (
    <button
      className={cn({
        [css.button]: true,
        [css.disabled]: loading,
        [css.loading]: loading,
        [css[`color-${color}`]]: true,
      })}
      type="submit"
      disabled={loading}
    >
      <span className={css.text}>{children}</span>
    </button>
  )
}

export const LinkButton = ({ children, to, color = 'green' }: Omit<ButtonProps, 'loading'> & { to: string }) => {
  return (
    <Link className={cn({ [css.button]: true, [css[`color-${color}`]]: true })} to={to}>
      {children}
    </Link>
  )
}
