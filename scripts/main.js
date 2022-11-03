;(function () {
  app.loadRemoteFile = () => {
    app.nocket
      .read()
      .then(r => r.json())
      .then(j => {
        app.db = j

        if (app.db.meta.encrypted) {
          app.state.ui.actionSheet.visibility = true
        }
      })
      .catch(_ => {
        app.initializeRemoteDB()
      })
      .finally(() => app.render())
  }

  app.loadRemoteFile()
})()
