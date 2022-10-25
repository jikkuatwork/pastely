;(function () {
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
