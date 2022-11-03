;(function () {
  app.pasteButton.onclick = () =>
    navigator.clipboard.readText().then(app.addClip)

  app.moreButton.onclick = () => {
    const visibility = app.state.ui.actionSheet.visibility
    app.state.ui.actionSheet.visibility = !visibility

    app.render()
  }

  app.toggleEncrypt.onchange = event => {
    if (app.password) {
      app.toggleEncrypt.checked = "checked"

      app.notify("Remove password protection?", "confirmation", () => {
        app.toggleEncrypt.checked = ""
        app.passwordInput.value = ""
        app.db.meta.encrypted = false
        app.state.ui.password.visibility = false
        app.db.payload = decrypt(app.db.payload, app.password)
        app.password = null
        app.nocket.write(app.db)

        app.render()
        return
      })
    } else {
      // app.toggleEncrypt.checked = !event.target.checked
      app.state.ui.password.visibility = !app.state.ui.password.visibility

      app.render()
      return
    }

    // if (event.target.checked == "checked") {
    //   app.state.ui.password = false
    // } else {
    //   app.state.ui.password = true
    // }
  }

  app.deleteButton.onclick = () => {
    app.notify("Delete everything?", "confirmation", app.deleteEverything)

    app.render()
  }

  app.passwordSetButton.onclick = () => {
    const password = app.passwordInput.value.trim()

    if (password === "") {
      return
    }

    if (app.db.meta.encrypted) {
      const decryptedText = decrypt(app.db.payload, password)

      if (!!decryptedText) {
        app.password = password
        app.render()
      }
    } else {
      encrypt(app.db.payload, password).then(cipher => {
        app.db.payload = cipher
        app.db.meta.encrypted = true
        app.password = password
        app.nocket.write(app.db)
        app.render()
      })
    }
  }
})()
