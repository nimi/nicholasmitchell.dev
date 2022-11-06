import { shapesToPaths, preparePaths } from './svgNormalize'
import { getProperty, setProperty } from './svgUtils'
import pathParser from './pathParser'
import pathEncoder from './pathEncoder'
import { euclideanDistance } from './pathInterpolate'
import warpTransform from './transform'
import warpInterpolate from './interpolate'
// import warpExtrapolate from './warp/extrapolate'

export default class Warp {
  path: string
  element: SVGElement
  paths: any

  constructor(path, curveType = 'q') {
    // this.element = element
    this.path = path

    // shapesToPaths(path)
    this.path = preparePaths([path], curveType)

    const pathElements = [path]

    this.paths = pathElements.map((pathString) => {
      // const pathString = getProperty(pathElement, 'd')
      const pathData = pathParser(pathString)

      return { pathElement: null, pathData }
    })
  }

  update() {
    let newPaths = []
    for (let { pathElement, pathData } of this.paths) {
      newPaths.push(pathEncoder(pathData))
    }
    return newPaths
  }

  transform(transformers) {
    transformers = Array.isArray(transformers) ? transformers : [transformers]

    for (let path of this.paths) {
      path.pathData = warpTransform(path.pathData, transformers)
    }

    return this.update()
  }

  interpolate(threshold) {
    let didWork = false

    function deltaFunction(points) {
      const linearPoints = [points[0].slice(0, 2), points[points.length - 1].slice(0, 2)]

      const delta = euclideanDistance(linearPoints)
      didWork = didWork || delta > threshold

      return delta
    }

    for (let path of this.paths) {
      path.pathData = warpInterpolate(path.pathData, threshold, deltaFunction)
    }

    return didWork
  }

  // extrapolate(threshold) {
  //   let didWork = false

  //   function deltaFunction(points) {
  //     const linearPoints = [points[0].slice(0, 2), points[points.length - 1].slice(0, 2)]

  //     const delta = euclideanDistance(linearPoints)
  //     didWork = didWork || delta <= threshold

  //     return delta
  //   }

  //   for (let path of this.paths) {
  //     path.pathData = warpExtrapolate(path.pathData, threshold, deltaFunction)
  //   }

  //   return didWork
  // }

  preInterpolate(transformer, threshold) {
    let didWork = false

    function deltaFunction(points) {
      const linearPoints = [points[0].slice(0, 2), points[points.length - 1].slice(0, 2)]

      const delta = euclideanDistance(linearPoints)
      didWork = didWork || delta > threshold

      return delta
    }

    for (let path of this.paths) {
      const transformed = warpTransform(path.pathData, function (points) {
        const newPoints = transformer(points.slice(0, 2))
        newPoints.push(...points)

        return newPoints
      })

      const interpolated = warpInterpolate(transformed, threshold, deltaFunction)

      path.pathData = warpTransform(interpolated, (points) => points.slice(2))
    }

    return didWork
  }

  // preExtrapolate(transformer, threshold) {
  //   let didWork = false

  //   function deltaFunction(points) {
  //     const linearPoints = [points[0].slice(0, 2), points[points.length - 1].slice(0, 2)]

  //     const delta = euclideanDistance(linearPoints)
  //     didWork = didWork || delta <= threshold

  //     return delta
  //   }

  //   for (let path of this.paths) {
  //     const transformed = warpTransform(path.pathData, function (points) {
  //       const newPoints = transformer(points.slice(0, 2))
  //       newPoints.push(...points)

  //       return newPoints
  //     })

  //     const extrapolated = warpExtrapolate(transformed, threshold, deltaFunction)

  //     path.pathData = warpTransform(extrapolated, (points) => points.slice(2))
  //   }

  //   return didWork
  // }
}
