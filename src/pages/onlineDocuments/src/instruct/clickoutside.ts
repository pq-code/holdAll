export default {
  beforeMount(el: any, binding: any) {
    document.addEventListener(
      "click",
      (e: any) => {
        if (el.contains(e.target)) {
          return false;
        }
        binding.value();
      },
      false
    );
  },
  unmounted() {
    document.removeEventListener("click", () => {});
  },
};
