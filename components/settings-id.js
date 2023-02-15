class SettingsId extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
              <div
                class="flex justify-between items-center bg-red-200s py-2"
              >
                <div id="id-copy-clickarea" class="text-block rounded-md w-full">
                  <div class="flex items-center">
                    <div class="text-md font-black">Share</div>
                    <span
                    id="copy-button"
                      class="rounded-full px-2.5 py-0.5 text-emerald-700 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>


                    </span>
                  </div>
                  <div id="link-label" class="text-sm">${app.link()}</div>
                </div>
                <div
                id="refresh-link"
                  class="flex cursor-pointer items-center justify-center bg-yellow-200 p-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </div>
              </div>`

    document.querySelector("#copy-button").onclick = () =>
      app.helpers.copy(app.link())

    document.querySelector("#refresh-link").onclick = () => {
      app.nocket = Nocket()
      app.id = () => app.nocket.id
      app.link = () => `https://pastely.toolbomber.com/?${app.id()}`
      document.querySelector("#link-label").innerHTML = app.link()
      app.loadRemoteFile()
      history.pushState({}, "", `?${app.id()}`)
      app.render()
    }
  }
}

customElements.define("settings-id", SettingsId)
