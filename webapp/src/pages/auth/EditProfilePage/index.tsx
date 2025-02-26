import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../hooks/useForm'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { z } from 'zod'
import { zUpdatePasswordTrpcInput } from '@ideanick/backend/src/router/auth/updatePassword/input'
import { zUpdateProfileTrpcInput } from '@ideanick/backend/src/router/auth/updateProfile/input'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <Segment title="Edit Profile">
      <Segment title="General" size={2}>
        <General me={me} />
      </Segment>
      <Segment title="Update Password" size={2}>
        <Password />
      </Segment>
    </Segment>
  )
})

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps, handleChange, handleBlur } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated',
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input
          label="Old password"
          name="oldPassword"
          type="password"
          error={formik.errors.oldPassword}
          onChange={handleChange}
          value={formik.values.oldPassword}
          onBlur={handleBlur}
          disabled={formik.isSubmitting}
        />
        <Input
          label="New password"
          name="newPassword"
          type="password"
          error={formik.errors.newPassword}
          onChange={handleChange}
          value={formik.values.newPassword}
          onBlur={handleBlur}
          disabled={formik.isSubmitting}
        />
        <Input
          label="New password again"
          name="newPasswordAgain"
          type="password"
          error={formik.errors.newPasswordAgain}
          onChange={handleChange}
          value={formik.values.newPasswordAgain}
          onBlur={handleBlur}
          disabled={formik.isSubmitting}
        />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useContext()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps, handleChange, handleBlur } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  })

  return (
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
          type="text"
        />
        <Input
          name="name"
          label="Name"
          error={formik.errors.name}
          onChange={handleChange}
          value={formik.values.name}
          onBlur={handleBlur}
          disabled={formik.isSubmitting}
          type="text"
        />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}
