import * as tome from 'chromotome'
import tilesets from './tiles.mjs'

const DEFAULT_PALETTE = 'tundra2'

let drawing = false

let tileOpts = {
  mode: 'geometry',
  filled: true,
  diagonals: true,
  halves: true,
  circles: true,
  smallCircles: true,
  quarterCircles: true,
  halfCircles: true,
  donuts: true,
}

let opts = {
  cellScale: 100,
  cellPadding: 15,
  gridPadding: 0,
  gridSize: 5,
  paletteName: DEFAULT_PALETTE,
  strokeWeight: 0,
  background: true,
  backgroundColor: null,
  tileOpts,
}

const canvasOptions = {
  width: 565,
  height: 565,
}

let canvasTargetElement = null

let sketch = function (p, onDraw) {
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
    let c = p.createCanvas(canvasOptions.width, canvasOptions.height)
    THE_SEED = p.floor(p.random(9999999))
    p.randomSeed(THE_SEED)
    p.frameRate(frameRate)
    p.strokeJoin(p.ROUND)

    setTimeout(() => {
      p.saveCanvas(c, 'generated-image', 'png').then((filename) => {
        console.log(`saved the canvas as ${filename}`)
      })
    }, 100)
  }

  p.draw = function () {
    updateProps()
    drawTiles()
  }

  function updateProps() {
    palette = tome.get(opts.paletteName) // tome.getRandom()
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
    // opts.background && p.background(opts.backgroundColor || palette.background)
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

  return p
}

export default sketch
