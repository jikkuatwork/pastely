;(function () {
  app.helpers.copy = text => {
    const textArea = document.createElement("textarea")
    textArea.value = text

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand("copy")
    } catch (err) {
      console.log("Error: Copying failed!")
    }

    document.body.removeChild(textArea)
  }
})()
