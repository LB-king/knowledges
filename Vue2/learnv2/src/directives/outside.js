export default {
  bind(el, binding, vnode, oldVnode) {
    console.log('el', el)
    console.log('binding', binding)
    console.log('vnode', vnode)
    console.log('oldVnode', oldVnode)
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el._vueVueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind(el, binding) {
    document.removeEventListener('click', el._vueVueClickOutside)
  }
}
