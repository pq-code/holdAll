
import {
    getType,
    booleanPointInPolygon,
    point,
    truncate,
    polygonToLine,
    lineIntersect,
    combine, lineSplit,
    featureCollection,
    polygonize,
    centroid,
    center,
    points,
    booleanWithin
    // featureEach,
    // difference
} from '@turf/turf'

// 筛选
const screen = (outerFrame, interiorLine) => {
    let lines = []
    interiorLine.features.map(line => {
        if (line.geometry.coordinates.length > 2) {
            let a = points([line.geometry.coordinates[0], line.geometry.coordinates[1]])
            let centers = center(a)// 获取中心点
            if (booleanWithin(centers, outerFrame)) {
                lines.push(line)
            }
        } else {
            let cente = center(line)// 获取中心点
            if (booleanWithin(cente, outerFrame)) {
                lines.push(line)
            }
        }
    })
    return lines
}

// 裁切
const cutting = (outerFrame, interiorLine) => {
    // 精度控制
    outerFrame = truncate(outerFrame, { precision: 10 })
    interiorLine = truncate(interiorLine, { precision: 10 })

    // 获取交点
    let intersection = lineIntersect(
        interiorLine,
        outerFrame
    )
    if (intersection.features.length < 2) {
        return null
    }
    let intersectionSet =
        combine(intersection).features[0]

    // 用点分割线
    let cutLine1 = lineSplit(
        outerFrame,
        intersectionSet
    )
    // 用点分割线
    let cutLine2 = lineSplit(
        interiorLine,
        intersectionSet
    )
    return {
        outerFrame: cutLine1,
        interiorLine: cutLine2
    }
}

export const polygonClipping = (line, splitter) => {
    if (!line) throw new Error('需要传入被裁切的线')
    if (!splitter) throw new Error('需要传入裁切的线')
    const lineType = getType(line)
    const splitterType = getType(splitter)

    if (lineType !== 'LineString') return console.error('line必须是LineString')
    if (splitterType === 'FeatureCollection') {
        return console.error('拆分器不能是FeatureCollection')
    }
    if (splitterType === 'GeometryCollection') {
        return console.error('拆分器不能是GeometryCollection')
    }
    if (lineType === 'LineString') {
        if (
            booleanPointInPolygon(
                point(line.geometry.coordinates[0]),
                splitter
            ) ||
            booleanPointInPolygon(
                point(
                    line.geometry.coordinates[line.geometry.coordinates.length - 1]
                ),
                splitter
            )
        ) {
            return console.error('起点和终点必须在多边形之外')
        }
    }

    // 裁切
    let firstCrop = cutting(polygonToLine(splitter), line)
    if (firstCrop == null) return null
    let outerFrame = firstCrop.outerFrame
    let interiorLines = firstCrop.interiorLine

    // 筛选出在矩形内部的线
    let interiorLine = screen(splitter, interiorLines)

    let interiorIntersectionSet = {
        features: [],
        type: 'FeatureCollection'
    }
    let interiorLineSet = {
        features: [],
        type: 'FeatureCollection'
    }
    // 用获取的焦点裁切线段
    for (let i = 0; i < interiorLine.length; i++) {
        for (let k = 0; k < interiorLine.length - 1 - i; k++) {
            var a = truncate(interiorLine[i], { precision: 7 })
            var b = truncate(interiorLine[i + 1 + k], { precision: 7 })
            if (a !== b) {
                let intersection = lineIntersect(a, b) // 获取焦点
                if (intersection.features.length > 0) {
                    interiorIntersectionSet.features.push(...intersection.features)
                }
            }
        }
    }

    // 拼接成多边形
    if (interiorIntersectionSet.features.length > 0) {
        // 合并交点
        interiorIntersectionSet =
            combine(interiorIntersectionSet).features[0]
        // 切割内部线
        interiorLine.map(e => {
            // 用点分割线
            let a = lineSplit(e, interiorIntersectionSet)
            interiorLineSet.features.push(...a.features)
        })
        // 拼接成多边形

        let pieceCollection = featureCollection(
            outerFrame.features.concat(interiorLineSet.features)
        )
        let polygonCollection = polygonize(pieceCollection)
        return polygonCollection
    } else {
        // 拼接成多边形
        let pieceCollection = featureCollection(
            outerFrame.features.concat(interiorLine)
        )
        let polygonCollection = polygonize(pieceCollection)
        return polygonCollection
        // 过滤外部多边形中的多边形
        // let innerPolygons = polygonCollection.features.filter(polygon => {
        //     let center = centroid(polygon) // 获取中心点
        //     return booleanWithin(center, splitter)
        // })
        // return innerPolygons
    }
}
