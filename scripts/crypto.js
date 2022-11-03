const encrypt = (message, key = null) => {
  return new Promise((resolve, reject) => {
    if (key == null) {
      resolve(message)
      return
    }

    resolve(CryptoJS.AES.encrypt(message, key).toString())
  })
}

const decrypt = (cipher, key) => {
  if (key == null) {
    return cipher
  } else {
    try {
      return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
    } catch {
      console.log("Decryption failed")
    }
  }
}
