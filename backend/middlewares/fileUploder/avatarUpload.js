const singleImageUploader = require('../../utilities/singleImageUploader')

const avatarUpload = (req, res, next) => {
  // Multer Upload Object
  const upload = singleImageUploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    'Only jpg, jpeg and png format allawed!'
  )

  //   Multer upload Error Handler
  upload.any()(req, res, (error) => {
    if (error) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: error.message,
          },
        },
      })
    } else {
      next()
    }
  })
}

// Module Export
module.exports = avatarUpload
