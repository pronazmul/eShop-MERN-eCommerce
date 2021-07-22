import * as yup from 'yup'
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png']
const PasswordRegEx =
  /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const updateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too Short !')
    .required('Should Not Be Empty')
    .max(30, 'Too Long !'),
  email: yup
    .string()
    .required('Should Not Be Empty')
    .email('Enter a Vaid Email'),
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
  avatar: yup
    .mixed()
    .test('fileSize', 'File more than 1 MB not Allowed', (value) =>
      value ? value.size <= 1000000 : true
    )
    .test('fileFormat', 'Unsupported Format', (value) =>
      value ? SUPPORTED_FORMATS.includes(value.type) : true
    ),
})
export default updateSchema
