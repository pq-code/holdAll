export const generateRectangleMeta = (startPos: [number, number], w: number, h: number) => {
    if (
        startPos &&
        Array.isArray(startPos) &&
        startPos.length >= 2 &&
        typeof w === 'number' &&
        typeof h === 'number'
    ) {
        const [a0, b0] = startPos;
        const a1 = a0 + w;
        const b1 = b0 + h;
        return {
            startPos,
            w,
            h,
            endPos: [a1, b1],
            pos: [
                [a0, b0],
                [a1, b0],
                [a1, b1],
                [a0, b1],
            ],
        };
    } else {
        throw new Error('Please pass in the correct parameters');
    }
};

import { onMounted, onUnmounted } from 'vue';

export function useEventListener(
    target: HTMLElement | Window,
    event: keyof HTMLElementEventMap,
    callback: (this: HTMLElement, ev: any) => any
) {
    onMounted(() => target.addEventListener(event, callback));
    onUnmounted(() => target.removeEventListener(event, callback));
}

import { ref } from 'vue';

export function useMouse(target: HTMLElement | Window, callback?: (x: number, y: number) => void) {
    const x = ref(0);
    const y = ref(0);

    useEventListener(target, 'mousemove', event => {
        const { pageX, pageY } = event;
        x.value = pageX;
        y.value = pageY;
        callback && callback(pageX, pageY);
    });

    return { x, y };
}
