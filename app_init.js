;(function () {
  window.app = {}
  const app = window.app
  app.name = "Pastely"
  app.id = Nocket(location.search.replace("?", "").split("=")[0]).id
  history.pushState({}, "", `?${app.id}`)
})()
