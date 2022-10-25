const Nocket = id => {
  const getId = function (_id) {
    const getRandomId = () => {
      const randomChar = () =>
        String.fromCharCode(97 + Math.floor(26 * Math.random()))
      return [1, 1, 1]
        .map(_ => {
          return [1, 1, 1].map(randomChar).join("")
        })
        .join("-")
    }

    if (_id == "") {
      _id = getRandomId()
    }

    return _id
  }

  return { id: getId(id) }
}
