
import {
    center,
    booleanWithin
} from '@turf/turf'

// 框选
export const boxCheckFn = (boxCheck, overlays) => {
    let polygon = []
    overlays.map(e => {
        let centers = center(e.toGeoJSON())// 获取中心点
        if (booleanWithin(centers, boxCheck)) {
            polygon.push(e)
        }
    })
    return polygon
}
