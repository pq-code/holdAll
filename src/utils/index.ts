export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const debounce = (fn: any, delay = 300) => {
    let timer = 0;
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        fn();
    }, delay);
};
