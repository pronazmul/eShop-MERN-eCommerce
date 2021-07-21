import * as yup from 'yup'

const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product Name Required!')
    .min(3, 'Too Short !')
    .max(30, 'Too Long !'),
  price: yup
    .string()
    .required('Product Price Required!')
    .matches(/^[0-9]+$/, 'Must Be Digit Only')
    .max(6, 'Price Too High!'),
  image: yup.string().required('Image Must not be Empty'),
  brand: yup
    .string()
    .required('Brand Must not be Empty')
    .min(2, 'Too Short !')
    .max(15, 'Too Long !'),
  category: yup
    .string()
    .required('Category Must not be Empty')
    .min(2, 'Too Short !')
    .max(15, 'Too Long !'),
  countInStock: yup
    .string()
    .required('Quantity Required!')
    .matches(/^[0-9]+$/, 'Must Be Digit Only')
    .max(4, 'Too High!'),
  description: yup
    .string()
    .required('Description Must not be Empty')
    .min(5, 'Too Short !')
    .max(150, 'Too Long !'),
})
export default productSchema
