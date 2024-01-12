require('dotenv').config()
const crypto = require('crypto')

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

const algo = 'aes-256-cbc'

function encrypt(plainText) {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algo, key, iv)

    let encryptedText = cipher.update(plainText, 'utf8', 'hex')
    encryptedText += cipher.final('hex')

    return iv.toString('hex') + ':' + encryptedText
}

function decrypt(input) {
    const parts = input.split(':')

    const iv = Buffer.from(parts[0], 'hex')

    const encryptedText = parts[1]

    const decipher = crypto.createDecipheriv(algo, key, iv)
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8')
    decryptedText += decipher.final('utf8')

    return decryptedText
}

module.exports = { encrypt, decrypt }