const fs = require('fs-extra')
const converter = require('./image-converter')
const { Admin } = require('../models')
const config = require('../config')

async function init () {
  let admin = await Admin.findOne()

  if (!admin) {
    admin = await new Admin().save()
  }

  if (admin.is_converting) {
    console.log('Converting already started. Exit.')
    process.exit(1)
  }

  await admin.update({ is_converting: true })

  await Promise.all(Object.values(config.dir).map((dir) => {
    return fs.ensureDir(dir)
  }))

  await converter.init()

  await admin.update({ is_converting: false })

  return true
}

init()
  .then(() => {
    console.log('converting completed.')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    Admin.update({ is_converting: false })
      .then(() => {
        process.exit(1)
      })
      .catch(err => {
        console.warn(err)
      })
  })
