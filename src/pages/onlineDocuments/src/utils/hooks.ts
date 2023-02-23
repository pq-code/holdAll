import { onMounted, ref } from "vue";
import Konva from "konva";

export function useInitBackKonva(
  container: string = "container",
  width: number = 500,
  height: number = 500
) {
  const stagea = ref();
  onMounted(() => {
    stagea.value = new Konva.Stage({
      container,
      width,
      height,
    });
  });

  return {
    stagea,
  };
}
