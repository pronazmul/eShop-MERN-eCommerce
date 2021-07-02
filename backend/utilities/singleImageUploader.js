// External Modules
const createError = require('http-errors')
const multer = require('multer')
const path = require('path')

const singleImageUploader = (
  subfolderPath,
  allowedFileTypes,
  maxFileSize,
  errorMessage
) => {
  const uploadPath = `${__dirname}/../public/uploads/${subfolderPath}`

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname)
      const fileName =
        file.originalname.replace(fileExt, '').split(' ').join('-') +
        '-' +
        Date.now() +
        fileExt
      cb(null, fileName)
    },
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(errorMessage))
      }
    },
  })
  return upload
}

module.exports = singleImageUploader
