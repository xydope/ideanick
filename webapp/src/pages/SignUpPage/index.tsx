import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import Cookies from 'js-cookie'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllIdeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
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
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (err: unknown) {
        setSubmittingError((err as Error).message)
      }
    },
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
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
