;(function () {
  app.pasteButton.onclick = () =>
    navigator.clipboard.readText().then(app.addClip)

  app.moreButton.onclick = () => {
    const visibility = app.state.ui.actionSheet.visibility
    app.state.ui.actionSheet.visibility = !visibility

    app.render()
  }

  app.toggleEncrypt.onchange = event => {
    app.state.ui.password.visibility = event.target.checked

    app.render()
  }

  app.deleteButton.onclick = () => {
    app.notify("Delete everything?", "confirmation", app.deleteEverything)

    app.render()
  }

  app.passwordSetButton.onclick = () => {
    const password = app.passwordInput.value
    const decryptedText = decrypt(app.db.payload, password)

    if (!!decryptedText) {
      app.password = password
    }

    app.render()
  }
})()
