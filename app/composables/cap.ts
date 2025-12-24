import Cap from '@cap.js/widget'
import wasmUrl from '@cap.js/wasm/browser/cap_wasm.js?url'

let caper: Cap | null = null

export const useCap = async () => {
  if (!caper) {
    window.CAP_CUSTOM_WASM_URL = wasmUrl
    caper = new Cap({ apiEndpoint: '/api/cap/' })
    caper.addEventListener('progress', (event) => {
      console.log(`Solving... ${event.detail.progress}% done`)
    })
  }
  return await caper.solve()
}
