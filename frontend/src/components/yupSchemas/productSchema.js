import * as yup from 'yup'
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png']
const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product Name Required!')
    .min(3, 'Too Short !')
    .max(100, 'Too Long !'),
  price: yup
    .string()
    .required('Product Price Required!')
    .matches(/^\d*(\.\d{1,2})?$/, 'Must Be Digit or Decimal')
    .max(6, 'Price Too High!'),
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
    .max(1000, 'Too Long !'),
  image: yup
    .mixed()
    .test('fileSize', 'File more than 1 MB not Allowed', (value) =>
      value ? value.size <= 1000000 : true
    )
    .test('fileFormat', 'Unsupported Format', (value) =>
      value ? SUPPORTED_FORMATS.includes(value.type) : true
    ),
})
export default productSchema
