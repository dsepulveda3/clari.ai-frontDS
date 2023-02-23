import home from "../translations/home"
import main from "../translations/main"
import landing from "../translations/landing"

const dicts = {
  home,
  main,
  landing
}

export default function useTranslate(lang = "en", dictionary) {
  function translator(element) {
    if (typeof window !== 'undefined') {
      const initialStateRaw = localStorage.getItem("state")
      const initialState = initialStateRaw ? JSON.parse(initialStateRaw) : {}
      const official_lang = initialState.lang || lang
      return element[official_lang]
    }
    const official_lang = lang
    return element[official_lang]
  }
  return [dicts[dictionary], translator]
}