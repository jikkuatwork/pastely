;(function () {
  window.app = {}
  const app = window.app
  app.name = "Pastely"
  app.password = null
  app.nocket = Nocket(location.search.replace("?", "").split("=")[0])
  app.id = () => app.nocket.id
  app.link = () => `https://pastely.toolbomber.com/?${app.id()}`
  app.helpers = {}
  app.state = {
    ui: {
      actionSheet: { visibility: false },
      password: { visibility: false },
      overlay: { visibility: false },
      delete: { visibility: true },
      notifier: { timeoutId: 0 },
    },
  }

  app.pasteButton = document.querySelector("#paste-button")
  app.deleteButton = document.querySelector("#delete-button")
  app.passwordSetButton = document.querySelector("#password-set")
  app.pasteArea = document.querySelector("#shadow-paste")
  app.clipBoard = document.querySelector("#clipboard")
  app.clip = document.querySelector(".clip-item")
  app.actionSheet = document.querySelector("#action-sheet")
  app.moreButton = document.querySelector("#more-button")
  app.iconMore = document.querySelector("#icon-more")
  app.iconClose = document.querySelector("#icon-close")
  app.passwordControl = document.querySelector("#input-encrypt")
  app.deleteControl = document.querySelector("#as-delete-all")
  app.passwordInput = document.querySelector("#input-encrypt input")
  app.toggleEncrypt = document.querySelector("#toggle-encrypt")
  app.passwordSwitch = document.querySelector("#password-switch")
  app.overlay = document.querySelector("#overlay")
  app.settingsId = document.querySelector("#as-id")
  app.notifierSlot = document.querySelector("#notifier-slot")
  app.lockSplash = document.querySelector("#lock-splash")

  app.render = () => {
    const toggleVisibility = (element, state) => {
      if (state) {
        element.classList.remove("hidden")
      } else {
        element.classList.add("hidden")
      }
    }

    toggleVisibility(app.actionSheet, app.state.ui.actionSheet.visibility)
    toggleVisibility(app.deleteControl, !app.db.meta.encrypted || app.password)
    toggleVisibility(app.iconMore, !app.state.ui.actionSheet.visibility)
    toggleVisibility(app.iconClose, app.state.ui.actionSheet.visibility)

    toggleVisibility(
      app.passwordControl,
      app.state.ui.password.visibility || app.db.meta.encrypted
    )
    toggleVisibility(app.passwordSwitch, !app.password || app.db.meta.encrypted)
    toggleVisibility(app.overlay, app.state.ui.overlay.visibility)

    if (!app.password && app.db.meta.encrypted) {
      app.toggleEncrypt.checked = "checked"
    }

    app.clipBoard.innerHTML = ""

    if (app.db.meta.encrypted && !app.password) {
      app.lockSplash.classList.add("block")
      app.lockSplash.classList.remove("hidden")

      app.clipBoard.append(app.lockSplash)
    } else {
      const payload = JSON.parse(decrypt(app.db.payload, app.password))

      payload.clipboard.forEach(item => {
        let _clip = app.clip.cloneNode()
        _clip.innerHTML = item.value
        _clip.classList.add("block")
        _clip.classList.remove("hidden")

        app.clipBoard.append(_clip)
      })
    }
  }

  app.deleteEverything = () => {
    app.initializeRemoteDB()

    app.render()
  }

  app.addClip = t => {
    const _t = t.trim()

    if (_t == "") {
      return
    }

    const paste = { date: Date.now(), value: app.helpers.clean(_t) }
    const payload = JSON.parse(decrypt(app.db.payload, app.password))
    payload.clipboard.push(paste)
    encrypt(JSON.stringify(payload), app.password).then(c => {
      app.db.payload = c
      app.db.meta.updated = Date.now()
      app.nocket.write(app.db)

      app.render()
    })
  }

  app.initializeRemoteDB = () => {
    app.db = {
      error: null,
      meta: { encrypted: false, updated: -1 },
      payload: JSON.stringify({ clipboard: [] }),
    }

    app.nocket.write(app.db)
  }

  history.pushState({}, "", `?${app.id()}`)
})()
