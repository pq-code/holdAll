
import {
    union
} from '@turf/turf'

export const mergePolygonFn = (polygonsToMerge) => {
    polygonsToMerge.map(e => {

    })
}

// export const mergePolygonFn = (line, pointCollection) => {
//     let coords = getCoords(line)
//     featureEach(pointCollection, (point, index) => {
//         let isOnLine = isPointOnLine(point, line, {
//             ignoreVertices: true
//         })
//         if (isOnLine.bool) {
//             coords.splice(isOnLine.index + 1, 0, getCoord(point))
//         }
//     })
// }
