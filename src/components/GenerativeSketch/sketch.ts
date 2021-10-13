import * as tome from 'chromotome'
// import * as dat from 'dat.gui'
import tilesets from './tiles'

const opts = {
  cellScale: 100,
  cellPadding: 15,
  gridSize: 5,
  paletteName: 'olympia',
  strokeWeight: 0,
}

const tileOpts = {
  mode: 'geometry',
  filled: true,
  diagonals: true,
  halves: true,
  circles: true,
  smallCircles: true,
  quarterCircles: true,
  halfCircles: true,
  donuts: false,
}

const canvasOptions = {
  width: 800,
  height: 800,
}

let canvasTargetElement: any = null

let sketch = function (p) {
  let THE_SEED
  let palette
  let tiles

  let cellScale
  let cellPadding
  let gridSize

  let paddedCellScale
  let paddingX
  let paddingY

  let colorGrid

  const initialFrameRate = 30
  let frameRate = initialFrameRate

  p.setup = function () {
    p.createCanvas(canvasOptions.width, canvasOptions.height)
    THE_SEED = p.floor(p.random(9999999))
    p.randomSeed(THE_SEED)
    p.frameRate(frameRate)
    p.strokeJoin(p.ROUND)
  }

  p.draw = function () {
    if (frameRate === initialFrameRate) {
      p.frameRate(0.35)
    }

    updateProps()
    drawTiles()
  }

  p.windowResized = function () {
    const rect = canvasTargetElement.getBoundingClientRect()

    canvasOptions.width = rect.width
    canvasOptions.height = rect.height

    p.resizeCanvas(rect.width, rect.height)
  }

  function updateProps() {
    palette = tome.get(opts.paletteName)
    tiles = getTiles()

    cellPadding = opts.cellPadding
    cellScale = opts.cellScale
    gridSize = opts.gridSize

    paddedCellScale = cellPadding + cellScale
    paddingX = (canvasOptions.width - paddedCellScale * gridSize + cellPadding) / 2
    paddingY = (canvasOptions.height - paddedCellScale * gridSize + cellPadding) / 2

    colorGrid = getColorGrid()
  }

  function getColorGrid() {
    const colorGrid = []
    for (let y = 0; y < gridSize + 1; y++) {
      const row = []
      for (let x = 0; x < gridSize + 1; x++) {
        row.push(palette.colors[p.floor(p.random() * palette.size)])
      }
      colorGrid.push(row)
    }
    return colorGrid
  }

  function getTiles() {
    if (tileOpts.mode === 'crosses') return tilesets.crosses
    if (tileOpts.mode === 'arrows') return tilesets.arrows
    if (tileOpts.mode === 'zigzags') return tilesets.zigzags
    if (tileOpts.mode === 'squigglies') return tilesets.twoQuarters
    if (tileOpts.mode === 'geometry') {
      let tiles = [].concat(
        tileOpts.filled ? tilesets.fills : [],
        tileOpts.halves ? tilesets.halves : [],
        tileOpts.diagonals ? tilesets.diagonals : [],
        tileOpts.circles ? tilesets.circles : [],
        tileOpts.smallCircles ? tilesets.smallCircles : [],
        tileOpts.halfCircles ? tilesets.halfCircles : [],
        tileOpts.quarterCircles ? tilesets.quarterCircles : [],
        tileOpts.donuts ? tilesets.donuts : [],
      )

      return tiles.length === 0 ? tilesets.fills : tiles
    }
    return []
  }

  function drawTiles() {
    p.strokeWeight(opts.strokeWeight)
    // p.stroke(palette.stroke)
    p.background(palette.background)
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const xpos = paddingX + x * paddedCellScale
        const ypos = paddingY + y * paddedCellScale
        const cols = [
          colorGrid[y][x],
          colorGrid[y][x + 1],
          colorGrid[y + 1][x + 1],
          colorGrid[y + 1][x],
        ]
        drawRandomTile(xpos, ypos, cellScale, cols)
      }
    }
  }

  function drawRandomTile(x, y, dim, cols) {
    let selectedColors =
      tileOpts.mode === 'arrows' || tileOpts.mode === 'zigzags'
        ? cols
        : p.shuffle(palette.colors).slice(0, 3)
    let tileFunction = tiles[p.floor(p.random() * tiles.length)]

    tileFunction(p, x, y, dim, ...selectedColors)
  }
}

// Setup the sketch
async function renderSketch(element: HTMLElement, options = {}) {
  const rect = element.getBoundingClientRect()
  // element.innerHTML = ''

  canvasTargetElement = element

  canvasOptions.width = rect.width
  canvasOptions.height = rect.height

  Object.assign(opts, options)

  try {
    const p5 = await import('p5')
    const canvas = element.querySelector('canvas')

    if (canvas) element.removeChild(canvas)

    new p5.default(sketch, element)
  } catch (err) {
    console.log('Could not initialize p5. If this is using SSR or prerender, that is normal')
  }
}

export default renderSketch
