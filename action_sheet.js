;(function () {
  const actionSheet = () => {
    const element = document.getElementById("#action-sheet")

    return {
      open: () => {
        element.classList.remove("hidden")
      },
      close: () => {
        element.classList.add("hidden")
      },
    }
  }

  app.actionSheet = actionSheet
})()
