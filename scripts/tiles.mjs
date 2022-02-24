const filled = (p, x, y, dim, c1, c2) => {
  p.fill(c1)
  p.rect(x, y, dim, dim)
}

const verticalHalf = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.rect(x, y, dim / 2, dim)
}

const horizontalHalf = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.rect(x, y, dim, dim / 2)
}

const diagonalAsc = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.beginShape()
  p.vertex(x, y)
  p.vertex(x + dim, y + dim)
  p.vertex(x, y + dim)
  p.endShape(p.CLOSE)
}

const diagonalDesc = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.beginShape()
  p.vertex(x + dim, y)
  p.vertex(x + dim, y + dim)
  p.vertex(x, y + dim)
  p.endShape(p.CLOSE)
}

const circle = (p, x, y, dim, c1, c2) => {
  const center = dim / 2
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.ellipse(x + center, y + center, dim, dim)
}

const smallCircle = (p, x, y, dim, c1, c2) => {
  const center = dim / 2
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.ellipse(x + center, y + center, dim / 2, dim / 2)
}

const outlineCircle = (p, x, y, dim, c1, c2) => {
  const center = dim / 2
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.ellipse(x + center, y + center, dim, dim)
  p.fill(c2)
  p.ellipse(x + center, y + center, dim / 2, dim / 2)
}

const northwestQuarterCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x, y, dim * 2, dim * 2, 0, p.HALF_PI, p.PIE)
}

const northeastQuarterCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim, y, dim * 2, dim * 2, p.HALF_PI, p.PI, p.PIE)
}

const southeastQuarterCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim, y + dim, dim * 2, dim * 2, p.PI, 3 * p.HALF_PI, p.PIE)
}

const southwestQuarterCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x, y + dim, dim * 2, dim * 2, 3 * p.HALF_PI, p.TWO_PI, p.PIE)
}

const northHalfCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim / 2, y, dim, dim, 0, p.PI, p.PIE)
}
const eastHalfCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim, y + dim / 2, dim, dim, p.HALF_PI, 3 * p.HALF_PI, p.PIE)
}
const southHalfCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim / 2, y + dim, dim, dim, p.PI, p.TWO_PI, p.PIE)
}
const westHalfCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x, y + dim / 2, dim, dim, 3 * p.HALF_PI, p.HALF_PI, p.PIE)
}

const w = 50
const twoQuarterCircleStrokeAsc = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x + dim, y, dim + w, dim + w, p.HALF_PI, p.PI, p.PIE)
  p.fill(c2)
  p.arc(x + dim, y, dim - w, dim - w, p.HALF_PI, p.PI, p.PIE)
  p.fill(c1)
  p.arc(x, y + dim, dim + w, dim + w, -p.HALF_PI, 0, p.PIE)
  p.fill(c2)
  p.arc(x, y + dim, dim - w, dim - w, -p.HALF_PI, 0, p.PIE)
}

const twoQuarterCircleStrokeDesc = (p, x, y, dim, c1, c2) => {
  p.fill(c2)
  p.rect(x, y, dim, dim)
  p.fill(c1)
  p.arc(x, y, dim + w, dim + w, 0, p.HALF_PI, p.PIE)
  p.fill(c2)
  p.arc(x, y, dim - w, dim - w, 0, p.HALF_PI, p.PIE)
  p.fill(c1)
  p.arc(x + dim, y + dim, dim + w, dim + w, -p.PI, -p.HALF_PI, p.PIE)
  p.fill(c2)
  p.arc(x + dim, y + dim, dim - w, dim - w, -p.PI, -p.HALF_PI, p.PIE)
}

const fourQuarterCircle = (p, x, y, dim, c1, c2) => {
  p.fill(c1)
  p.rect(x, y, dim, dim)
  p.fill(c2)
  p.arc(x, y, dim - w, dim - w, 0, p.HALF_PI, p.PIE)
  p.arc(x + dim, y + dim, dim - w, dim - w, -p.PI, -p.HALF_PI, p.PIE)
  p.arc(x + dim, y, dim - w, dim - w, p.HALF_PI, p.PI, p.PIE)
  p.arc(x, y + dim, dim - w, dim - w, -p.HALF_PI, 0, p.PIE)
}

const tiltedCross = (p, x, y, dim, c1, c2) => {
  const u = dim / 5
  p.fill(c1)
  p.beginShape()
  p.vertex(x, y)
  p.vertex(x + 2 * u, y + -1 * u)
  p.vertex(x + 3 * u, y + 1 * u)
  p.vertex(x + 5 * u, y + 0 * u)
  p.vertex(x + 6 * u, y + 2 * u)
  p.vertex(x + 4 * u, y + 3 * u)
  p.vertex(x + 5 * u, y + 5 * u)
  p.vertex(x + 3 * u, y + 6 * u)
  p.vertex(x + 2 * u, y + 4 * u)
  p.vertex(x + 0 * u, y + 5 * u)
  p.vertex(x + -1 * u, y + 3 * u)
  p.vertex(x + 1 * u, y + 2 * u)
  p.endShape(p.CLOSE)
}

const northArrow = (p, x, y, dim, c1, c2, c3, c4) => {
  verticalHalf(p, x, y, dim, c4, c3)
  p.fill(c1)
  p.arc(x, y, dim, dim, 0, p.HALF_PI, p.PIE)
  p.fill(c2)
  p.arc(x + dim, y, dim, dim, p.HALF_PI, p.PI, p.PIE)
}

const southArrow = (p, x, y, dim, c1, c2, c3, c4) => {
  verticalHalf(p, x, y, dim, c1, c2)
  p.fill(c4)
  p.arc(x, y + dim, dim, dim, 3 * p.HALF_PI, p.TWO_PI, p.PIE)
  p.fill(c3)
  p.arc(x + dim, y + dim, dim, dim, p.PI, 3 * p.HALF_PI, p.PIE)
}

const eastArrow = (p, x, y, dim, c1, c2, c3, c4) => {
  horizontalHalf(p, x, y, dim, c1, c4)
  p.fill(c2)
  p.arc(x + dim, y, dim, dim, p.HALF_PI, p.PI, p.PIE)
  p.fill(c3)
  p.arc(x + dim, y + dim, dim, dim, p.PI, 3 * p.HALF_PI, p.PIE)
}

const westArrow = (p, x, y, dim, c1, c2, c3, c4) => {
  horizontalHalf(p, x, y, dim, c2, c3)
  p.fill(c1)
  p.arc(x, y, dim, dim, 0, p.HALF_PI, p.PIE)
  p.fill(c4)
  p.arc(x, y + dim, dim, dim, 3 * p.HALF_PI, p.TWO_PI, p.PIE)
}

const northZig = (p, x, y, dim, c1, c2, c3, c4) => {
  verticalHalf(p, x, y, dim, c4, c2)
  p.fill(c1)
  p.arc(x, y, dim, dim, 0, p.HALF_PI, p.PIE)
  p.fill(c3)
  p.arc(x + dim, y + dim, dim, dim, p.PI, 3 * p.HALF_PI, p.PIE)
}

const southZig = (p, x, y, dim, c1, c2, c3, c4) => {
  verticalHalf(p, x, y, dim, c1, c3)
  p.fill(c4)
  p.arc(x, y + dim, dim, dim, 3 * p.HALF_PI, p.TWO_PI, p.PIE)
  p.fill(c2)
  p.arc(x + dim, y, dim, dim, p.HALF_PI, p.PI, p.PIE)
}

const eastZig = (p, x, y, dim, c1, c2, c3, c4) => {
  horizontalHalf(p, x, y, dim, c1, c3)
  p.fill(c2)
  p.arc(x + dim, y, dim, dim, p.HALF_PI, p.PI, p.PIE)
  p.fill(c4)
  p.arc(x, y + dim, dim, dim, 3 * p.HALF_PI, p.TWO_PI, p.PIE)
}

const westZig = (p, x, y, dim, c1, c2, c3, c4) => {
  horizontalHalf(p, x, y, dim, c2, c4)
  p.fill(c1)
  p.arc(x, y, dim, dim, 0, p.HALF_PI, p.PIE)
  p.fill(c3)
  p.arc(x + dim, y + dim, dim, dim, p.PI, 3 * p.HALF_PI, p.PIE)
}

const fills = [filled]
const halves = [verticalHalf, horizontalHalf]
const diagonals = [diagonalAsc, diagonalDesc]

const circles = [circle]
const smallCircles = [smallCircle]
const donuts = [outlineCircle]

const quarterCircles = [
  northwestQuarterCircle,
  northeastQuarterCircle,
  southeastQuarterCircle,
  southwestQuarterCircle,
]
const halfCircles = [northHalfCircle, eastHalfCircle, southHalfCircle, westHalfCircle]

const crosses = [tiltedCross]
const arrows = [northArrow, southArrow, westArrow, eastArrow]
const zigzags = [northZig, southZig, westZig, eastZig]

const twoQuarters = [twoQuarterCircleStrokeAsc, twoQuarterCircleStrokeDesc, fourQuarterCircle]

export default {
  fills,
  halves,
  diagonals,
  circles,
  smallCircles,
  donuts,
  quarterCircles,
  halfCircles,
  twoQuarters,
  arrows,
  zigzags,
  crosses,
}
