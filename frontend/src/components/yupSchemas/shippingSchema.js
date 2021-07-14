import * as yup from 'yup'

const shippingSchema = yup.object().shape({
  address: yup.string().min(3, 'Too Short!').required('Address is Required!'),
  city: yup.string().min(2, 'Too Short!').required('City name is Required'),
  postalCode: yup
    .string()
    .required('Postal Code is Required!')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(4, 'Must be exactly 4 digits')
    .max(4, 'Must be exactly 4 digits'),
  country: yup.string().min(3, 'Too Short!').required('Country is Required'),
})
export default shippingSchema
