import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import Cookies from 'js-cookie'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../hooks/useForm'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { z } from 'zod'
import { zSignUpTrpcInput } from '@ideanick/backend/src/router/auth/signUp/input'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
    },
    showValidationAlert: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.setFieldTouched(e.target.name)
  }
  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input
            name="nick"
            label="Nick"
            error={formik.errors.nick}
            onChange={handleChange}
            value={formik.values.nick}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
            autoComplete="username"
          />
          <Input
            name="password"
            label="Password"
            error={formik.errors.password}
            onChange={handleChange}
            value={formik.values.password}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
            type="password"
            autoComplete="new-password"
          />
          <Input
            name="passwordAgain"
            label="Password Again"
            error={formik.errors.passwordAgain}
            onChange={handleChange}
            value={formik.values.passwordAgain}
            onBlur={handleBlur}
            disabled={formik.isSubmitting}
            type="password"
            autoComplete="current-password"
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
