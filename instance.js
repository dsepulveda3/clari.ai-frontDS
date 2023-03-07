import axios from "axios"

// const isLocalhost = Boolean(
//   window.location.hostname.includes('localhost') ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.0/8 are considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// )

const isLocalhost = false

export const mainUrl = `https://clari-staging.herokuapp.com/api`

const instance = axios.create({
  baseURL: mainUrl,
  timeout: 30000,
})

let ip = ""
let cc = ""
let country = ""
let city = ""
const geo_url = isLocalhost ? 'http://geolocation-db.com/json/' : 'https://geolocation-db.com/json/'
axios.get(geo_url).then(res => {
  // console.log(res.data)
  ip = res.data.IPv4
  cc = res.data.country_code
  country = res.data.country_name
  city = res.data.city
})

let lang = "en"
// if (window.location.origin.includes("es.")) { lang = "es" }

instance.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers["ip"] = ip
  newConfig.headers["cc"] = cc
  newConfig.headers["country"] = country
  newConfig.headers["city"] = city
  newConfig.headers["lang"] = lang
  // newConfig.headers["Company-Id"] = companyId
  // newConfig.headers["Branch-Id"] = branch_id
  // newConfig.headers["Branch-Ids"] = branch_id
  return newConfig
})

// instance.interceptors.response.use(response => response,
//   () => store.getState().controller.snackbar('Error de conexión', { variant: 'error' }))

export default instance