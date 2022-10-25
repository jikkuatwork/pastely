;(function () {
  window.app = {}
  const app = window.app
  app.name = "Pastely"
  app.nocket = Nocket(location.search.replace("?", "").split("=")[0])
  app.id = () => app.nocket.id
  app.state = {
    ui: {
      actionSheet: { visibility: false },
    },
  }

  app.pasteButton = document.querySelector("#paste-button")
  app.pasteArea = document.querySelector("#shadow-paste")
  app.clipBoard = document.querySelector("#clipboard")
  app.clip = document.querySelector(".clip-item")
  app.actionSheet = document.querySelector("#action-sheet")
  app.moreButton = document.querySelector("#more-button")
  app.iconMore = document.querySelector("#icon-more")
  app.iconClose = document.querySelector("#icon-close")

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

    app.clipBoard.innerHTML = ""

    app.db.payload.clipboard.forEach(item => {
      let _clip = app.clip.cloneNode()
      _clip.innerHTML = item
      _clip.classList.add("block")
      _clip.classList.remove("hidden")

      app.clipBoard.append(_clip)
    })
  }

  app.addClip = t => {
    const _t = t.trim()

    if (_t == "") {
      return
    }

    app.db.payload.clipboard.push(_t)
    app.nocket.write(app.db)
    app.render()
  }

  app.intializeRemoteDB = () => {
    app.db = { error: null, payload: { clipboard: [] } }

    app.nocket.write(app.db)
  }

  history.pushState({}, "", `?${app.id()}`)
})()
