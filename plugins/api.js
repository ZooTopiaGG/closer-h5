import _api from '~/assets/js/api.js'
import _async from '~/assets/js/utils.js'

if (typeof window !== 'undefined') {
  window.$async = _async
  window.api = _api
} else {
  global.$async = _async
  global.api = _api
}
