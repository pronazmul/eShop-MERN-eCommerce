import * as yup from 'yup'
const PasswordRegEx =
  /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too Short !')
    .max(30, 'Too Long !')
    .required('Required !'),
  email: yup.string().email('Enter a Vaid Email').required('Email is Required'),
  password: yup
    .string()
    .required('Enter Your Password')
    .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
    .min(8, 'Password Should be minimum 8 character')
    .max(50, 'Too long'),
})
export default registrationSchema
