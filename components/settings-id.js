class SettingsId extends HTMLElement {
  connectedCallback() {
    const pageId = eval(this.attributes.pageId.value)

    this.innerHTML = `
              <div
                class="flex justify-between items-center bg-red-200s py-2"
              >
                <div class="text-block bg-yellow-100 rounded-md bg-opacity-50 w-full cursor-pointer">
                  <div class="text-md font-black">Id</div>
                  <div class="text-sm">https://pastely.com/?${pageId()}</div>
                </div>
                <div
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
  }
}

customElements.define("settings-id", SettingsId)
