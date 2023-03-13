export default {
  beforeMount(el: any, binding: any) {
    const documentHandler = (e: any) => {
      if (el.contains(e.target)) {
        return false;
      }
      binding.value();
    };
    el._vueClickOutside_ = documentHandler;
    document.addEventListener("click", el._vueClickOutside_, false);
  },
  unmounted(el: any) {
    document.removeEventListener("click", el._vueClickOutside_);
    delete el._vueClickOutside_;
  },
};
