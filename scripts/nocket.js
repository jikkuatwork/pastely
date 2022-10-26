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

  const _id = getId(id)
  const url = `https://textdb.dev/api/data/${id}`

  const read = () => fetch(url)

  const write = data => {
    const value = JSON.stringify(data)

    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    })
  }

  return { id: _id, read: read, write: write }
}
