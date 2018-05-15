import _async from '~/assets/js/utils.js'

if (typeof window !== 'undefined') {
  window.$async = _async
} else {
  global.$async = _async
}
