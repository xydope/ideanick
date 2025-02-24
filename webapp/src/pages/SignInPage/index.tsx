import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { useState } from 'react'
import { withZodSchema } from 'formik-validator-zod'
import { zSignInTrpcInput } from '@ideanick/backend/src/router/signIn/input'

export const SignInPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await signIn.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
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
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Thanks for sign up!</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
