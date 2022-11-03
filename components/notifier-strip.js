class Notifier extends HTMLElement {
  connectedCallback() {
    const { message, type, onConfirm } = this.attributes

    this.innerHTML = `
          <div
            class="${
              type.value == "confirmation"
                ? "bg-red-500 text-black"
                : "bg-black text-yellow-300"
            } text-white px-4 py-1 flex justify-between"
          >
            <div class="text">${message.value}</div>
            <div class="controls flex">
              <div
                class="no mr-2 bg-black bg-opacity-20 rounded-sm cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div class="yes ${
                type.value == "confirmation" ? "" : "hidden"
              } bg-black bg-opacity-20 rounded-sm cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
    `

    app.notifier = document.querySelector("notifier-strip")

    document.querySelector("notifier-strip .no").onclick = () => {
      clearTimeout(app.state.ui.notifier.timeoutId)
      this.remove()
    }

    document.querySelector("notifier-strip .yes").onclick = () => {
      this.remove()
      eval(onConfirm.value)()
    }

    if (type.value != "confirmation") {
      app.state.ui.notifier.timeoutId = setTimeout(() => {
        this.remove()
      }, 4000)
    }
  }
}

app.notify = (message, type = "toast", onConfirm = () => null) => {
  app.notifier.classList.remove("hidden")
  app.notifier.attributes.message.value = message
  app.notifier.attributes.type.value = type
  app.notifier.attributes.onConfirm.value = onConfirm

  app.notifierSlot.append(app.notifier)
}

customElements.define("notifier-strip", Notifier)
