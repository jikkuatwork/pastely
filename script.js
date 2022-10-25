;(function () {
  KEY = "password"

  app.remoteDB = () => `https://textdb.dev/api/data/${app.id}`
  app.intializeRemoteDB = () => {
    app.db = { error: null, payload: { clipboard: [] } }

    write(app.remoteDB(), app.db)
  }

  const stripIGId = link => {
    if (link.match(/instagram.com/)) {
      const regex = /(reel|tv)\/(?<id>.*?)\//
      return link.match(regex)[2]
    } else {
      return link
    }
  }

  const write = (url, data) => {
    const value = JSON.stringify(data)

    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    })
  }

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
    const _t = stripIGId(t.trim())

    if (_t == "") {
      return
    }

    app.db.payload.clipboard.push(_t)
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
