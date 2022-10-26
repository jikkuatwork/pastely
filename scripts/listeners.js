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

  app.notifierCancel.onclick = () => {
    app.state.ui.notifier.visibility = false

    app.render()
  }

  app.deleteButton.onclick = () => {
    app.state.ui.notifier.visibility = true

    app.render()
  }

  app.notifierConfirm.onclick = () => {
    app.state.ui.notifier.visibility = false
    app.db.payload.clipboard = []
    app.nocket.write(app.db)

    app.render()
  }
})()
