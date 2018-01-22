const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const Book = require('../models/book')
const config = require('../config')
const _ = require('lodash')

// src + dbは既に存在する前提

module.exports = {
  async init () {

    let books = await Book.find()

    for (let book of books) {

      console.log(`Started convertment: ${book.title}`)

      let images = _.filter(fs.readdirSync(path.join(config.dir.src, book.uuid)), n => {
        return /\.(jpe?g|png)$/.test(n)
      })

      await createThumbnail(book, images[0])

      if (!fs.existsSync(path.join(config.dir.small, book.uuid))) fs.mkdirSync(path.join(config.dir.small, book.uuid))
      if (!fs.existsSync(path.join(config.dir.big, book.uuid))) fs.mkdirSync(path.join(config.dir.big, book.uuid))

      for (let image of images) {
        await createSmallImage(book, image)
        await createBigImage(book, image)
      }
    }

    return true
  }
}

function createThumbnail (book, image) {
  return writeImage(
    path.join(config.dir.src, book.uuid, image), // read
    path.join(config.dir.thumbnail, book.uuid + '.jpg'), // write
    config.size.thumbnail, // size
    50) // quality
}

function createSmallImage (book, image) {
  return writeImage(
    path.join(config.dir.src, book.uuid, image), // read
    path.join(config.dir.small, book.uuid, image), // write
    config.size.small, // size
    90) // quality
}

function createBigImage (book, image) {
  return writeImage(
    path.join(config.dir.src, book.uuid, image), // read
    path.join(config.dir.big, book.uuid, image), // write
    config.size.big, // size
    90) // quality
}

function writeImage (readFile, writeFile, size, quality) {
  let convert = spawn('convert', [readFile, '-resize', `${size.width}x${size.height}`, '-quality', quality, writeFile])

  convert.stdout.on('data', data => {
    return Promise.resolve(data)
  })

  convert.stderr.on('data', data => {
    return Promise.reject(err)
  })

  convert.on('close', code => {
    if (code === 1) return Promise.reject('convert command exited with code 1.')
  })
}
