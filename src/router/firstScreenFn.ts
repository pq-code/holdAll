import * as _ from 'lodash';
const firstArray = [{ path: '/firstScreen/home' }, { path: '/firstScreen/square' }];
let index;
const firstScreenFn = (to: any, from: any, next: any) => {
    index = _.random(0, 1);
    if (to.path == '/') {
        console.log(firstArray[index].path);
        next(firstArray[index].path);
    }
    next();
};

export default firstScreenFn;
