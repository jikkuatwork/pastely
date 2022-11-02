const encrypt = (message, key) => CryptoJS.AES.encrypt(message, key).toString()

const decrypt = (cipher, key) =>
  CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
