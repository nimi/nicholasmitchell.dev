import pathParser from './pathParser'
import pathEncoder from './pathEncoder'
import pathTransform from './pathTransform'
import absoluteTransformer from './pathTransformerAbsolute'
import shortToLongTransformer from './pathTransformerShortToLong'
import hvzToLineTransformer from './pathTransformerHvzToLine'
import lineToCurveTransformer from './pathTransformerLineToCurve'
import arcToCurveTransformer from './pathTransformerArcToCurve'
import * as pathShape from './pathShape'
import { createElement, getProperty, setProperty } from './svgUtils'

export function shapesToPaths(element) {
  const shapeMap = {
    line(shapeElement) {
      return pathShape.line(
        getProperty(shapeElement, 'x1'),
        getProperty(shapeElement, 'y1'),
        getProperty(shapeElement, 'x2'),
        getProperty(shapeElement, 'y2'),
      )
    },

    polyline(shapeElement) {
      return pathShape.polyline(...shapeElement.points)
    },

    polygon(shapeElement) {
      return pathShape.polygon(...shapeElement.points)
    },

    rect(shapeElement) {
      return pathShape.rectangle(
        getProperty(shapeElement, 'x'),
        getProperty(shapeElement, 'y'),
        getProperty(shapeElement, 'width'),
        getProperty(shapeElement, 'height'),
        getProperty(shapeElement, 'rx'),
        getProperty(shapeElement, 'ry'),
      )
    },

    ellipse(shapeElement) {
      return pathShape.ellipse(
        getProperty(shapeElement, 'cx'),
        getProperty(shapeElement, 'cy'),
        getProperty(shapeElement, 'rx'),
        getProperty(shapeElement, 'ry'),
      )
    },

    circle(shapeElement) {
      return pathShape.circle(
        getProperty(shapeElement, 'cx'),
        getProperty(shapeElement, 'cy'),
        getProperty(shapeElement, 'r'),
      )
    },
  }

  const shapeElements = element.querySelectorAll(Object.keys(shapeMap).join(','))

  for (let shapeElement of shapeElements) {
    const shapeName = shapeElement.tagName.toLowerCase()

    if (shapeName in shapeMap) {
      const path = shapeMap[shapeName](shapeElement)
      const pathString = pathEncoder(path)
      const attributes = { d: pathString }

      for (let attribute of Array.from(shapeElement.attributes) as any) {
        const name = attribute.nodeName
        const value = attribute.nodeValue

        // Avoid dimensional properties
        if (!/^(x|y|x1|y1|x2|y2|width|height|r|rx|ry|cx|cy|points|d)$/.test(name)) {
          attributes[name] = value
        }
      }

      const pathElement = createElement('path', attributes)
      shapeElement.parentNode.replaceChild(pathElement, shapeElement)
    }
  }
}

export function preparePaths(pathStrings, curveType = 'q') {
  // const pathElements = Array.from(element.querySelectorAll('path'))

  pathStrings.forEach((pathString, i) => {
    // let pathString = getProperty(pathElement, 'd')
    let path = pathParser(pathString)

    path = pathTransform(path, absoluteTransformer())
    path = pathTransform(path, shortToLongTransformer())
    path = pathTransform(path, hvzToLineTransformer())
    path = pathTransform(path, lineToCurveTransformer(curveType))
    path = pathTransform(path, arcToCurveTransformer())

    pathString = pathEncoder(path)

    pathStrings[i] = pathString
  })

  return pathStrings
}
