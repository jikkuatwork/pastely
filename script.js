;(function () {
  window.app = {}
  const app = window.app
  app.name = "Pastely"
  app.remoteDB = () => `https://textdb.dev/api/data/${app.id}`
  app.intializeRemoteDB = () => {
    const data = { error: null, payload: { clipboard: [] } }
    app.db = data

    write(app.remoteDB(), data)
  }

  const write = (url, data) => {
    const value = JSON.stringify(data)

    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    })
  }

  const getRandomId = () => {
    const randomChar = () =>
      String.fromCharCode(97 + Math.floor(26 * Math.random()))
    return [1, 1, 1]
      .map(_ => {
        return [1, 1, 1].map(randomChar).join("")
      })
      .join("-")
  }

  const getId = function (queryString) {
    let _id = queryString.replace("?", "").split("=")[0]

    if (_id == "") {
      _id = getRandomId()
      history.pushState({}, "", `?${_id}`)
    }

    return _id
  }

  queryString = location.search
  app.id = getId(queryString)

  console.log(queryString)

  app.pasteButton = document.querySelector("#paste-button")
  app.pasteArea = document.querySelector("#shadow-paste")
  app.clipBoard = document.querySelector("#clipboard")
  app.clip = document.querySelector(".clip-item")

  app.render = () => {
    app.clipBoard.innerHTML = ""

    app.db.payload.clipboard.forEach(item => {
      let _clip = app.clip.cloneNode()
      _clip.innerHTML = item
      _clip.classList.add("block")
      _clip.classList.remove("hidden")

      app.clipBoard.append(_clip)
    })
  }

  app.addItem = t => {
    app.db.payload.clipboard.push(t)
    write(app.remoteDB(), app.db)
    app.render()
  }

  app.pasteButton.onclick = () => {
    navigator.clipboard.readText().then(app.addItem)
  }

  app.loadRemoteFile = url => {
    fetch(url)
      .then(r => r.json())
      .then(j => (app.db = j))
      .catch(_ => {
        app.intializeRemoteDB()
      })
      .finally(() => app.render())
  }

  app.loadRemoteFile(app.remoteDB())
})()
