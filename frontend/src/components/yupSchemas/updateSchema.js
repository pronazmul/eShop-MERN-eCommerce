import * as yup from 'yup'
const PasswordRegEx =
  /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const updateSchema = yup.object().shape({
  name: yup.string().min(3, 'Too Short !').max(30, 'Too Long !'),
  email: yup.string().email('Enter a Vaid Email'),
  password: yup
    .string()
    .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
    .min(8, 'Password Should be minimum 8 character')
    .max(50, 'Too long'),
  confirmPassword: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required() : field
    )
    .oneOf([yup.ref('password')], 'Password does not matched'),
})
export default updateSchema
