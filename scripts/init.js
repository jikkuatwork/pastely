;(function () {
  window.app = {}
  const app = window.app
  app.name = "Pastely"
  app.nocket = Nocket(location.search.replace("?", "").split("=")[0])
  app.id = () => app.nocket.id
  app.link = () => `https://pastely.as/${app.id()}`
  app.helpers = {}
  app.state = {
    ui: {
      actionSheet: { visibility: false },
      password: { visibility: false },
      overlay: { visibility: false },
    },
  }

  app.pasteButton = document.querySelector("#paste-button")
  app.deleteButton = document.querySelector("#delete-button")
  app.pasteArea = document.querySelector("#shadow-paste")
  app.clipBoard = document.querySelector("#clipboard")
  app.clip = document.querySelector(".clip-item")
  app.actionSheet = document.querySelector("#action-sheet")
  app.moreButton = document.querySelector("#more-button")
  app.iconMore = document.querySelector("#icon-more")
  app.iconClose = document.querySelector("#icon-close")
  app.passwordInput = document.querySelector("#input-encrypt")
  app.toggleEncrypt = document.querySelector("#toggle-encrypt")
  app.overlay = document.querySelector("#overlay")
  app.settingsId = document.querySelector("#as-id")
  app.notifierSlot = document.querySelector("#notifier-slot")

  app.render = () => {
    const toggleVisibility = (element, state) => {
      if (state) {
        element.classList.remove("hidden")
      } else {
        element.classList.add("hidden")
      }
    }

    toggleVisibility(app.actionSheet, app.state.ui.actionSheet.visibility)
    toggleVisibility(app.iconMore, !app.state.ui.actionSheet.visibility)
    toggleVisibility(app.iconClose, app.state.ui.actionSheet.visibility)
    toggleVisibility(app.passwordInput, app.state.ui.password.visibility)
    toggleVisibility(app.overlay, app.state.ui.overlay.visibility)

    app.clipBoard.innerHTML = ""

    app.db.payload.clipboard.forEach(item => {
      let _clip = app.clip.cloneNode()
      _clip.innerHTML = item.value
      _clip.classList.add("block")
      _clip.classList.remove("hidden")

      app.clipBoard.append(_clip)
    })
  }

  app.deleteEverything = () => {
    app.intializeRemoteDB()

    app.render()
  }

  app.addClip = t => {
    const _t = t.trim()

    if (_t == "") {
      return
    }

    // TODO:
    // read encrypted
    // decrypt to data
    // push
    // encrypt back
    const paste = { date: Date.now(), value: app.helpers.clean(_t) }
    app.db.payload.clipboard.push(paste)

    app.db.meta.updated = Date.now()
    app.nocket.write(app.db)

    app.render()
  }

  app.intializeRemoteDB = () => {
    app.db = {
      error: null,
      meta: { encrypted: false, updated: -1 },
      payload: { clipboard: [] },
    }

    app.nocket.write(app.db)
  }

  history.pushState({}, "", `?${app.id()}`)
})()
