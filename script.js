;(function () {
  app.pasteButton.onclick = () =>
    navigator.clipboard.readText().then(app.addClip)

  app.moreButton.onclick = () => {
    const visibility = app.state.ui.actionSheet.visibility
    app.state.ui.actionSheet.visibility = !visibility

    app.render()
  }

  app.loadRemoteFile = () => {
    app.nocket
      .read()
      .then(r => r.json())
      .then(j => (app.db = j))
      .catch(_ => {
        app.intializeRemoteDB()
      })
      .finally(() => app.render())
  }

  app.loadRemoteFile()
})()
