import * as tome from 'chromotome'
// import * as dat from 'dat.gui'
import tilesets from './tiles'

let p5: any

const opts = {
  cell_scale: 100,
  cell_padding: 15,
  grid_size: 5,
  palette_name: 'olympia',
  stroke_weight: 0,
}

const tile_opts = {
  mode: 'geometry',
  filled: true,
  diagonals: true,
  halves: true,
  circles: true,
  small_circles: true,
  quarter_circles: true,
  half_circles: true,
  donuts: false,
}

const canvasOptions = {
  width: 800,
  height: 800,
}

let canvasTargetElement: any = null

let sketch = function(p) {
  let THE_SEED
  let palette
  let tiles

  let cell_scale
  let cell_padding
  let grid_size

  let padded_cell_scale
  let paddingX
  let paddingY

  let color_grid

  const initialFrameRate = 30
  let frameRate = initialFrameRate

  p.setup = function() {
    p.createCanvas(canvasOptions.width, canvasOptions.height)
    THE_SEED = p.floor(p.random(9999999))
    p.randomSeed(THE_SEED)
    p.frameRate(frameRate)
    p.strokeJoin(p.ROUND)

    // const gui = new dat.GUI()
    // const f0 = gui.addFolder('General')
    // f0.open()
    // f0.add(opts, 'cell_scale', 50, 150, 10)
    // f0.add(opts, 'cell_padding', 0, 50, 5)
    // f0.add(opts, 'grid_size', 4, 14, 1)
    // f0.add(opts, 'palette_name', tome.getNames())
    // f0.add(opts, 'stroke_weight', 0, 10, 1)
    // const f1 = gui.addFolder('Tilesets')
    // f1.open()
    // f1.add(tile_opts, 'mode', ['crosses', 'arrows', 'zigzags', 'geometry', 'squigglies'])
    // f1.add(tile_opts, 'filled')
    // f1.add(tile_opts, 'diagonals')
    // f1.add(tile_opts, 'halves')
    // f1.add(tile_opts, 'circles')
    // f1.add(tile_opts, 'small_circles')
    // f1.add(tile_opts, 'half_circles')
    // f1.add(tile_opts, 'quarter_circles')
    // f1.add(tile_opts, 'donuts')
  }

  p.draw = function() {
    if (frameRate === initialFrameRate) {
      p.frameRate(0.35)
    }

    update_props()
    draw_tiles()
  }

  p.windowResized = function() {
    const rect = canvasTargetElement.getBoundingClientRect()

    canvasOptions.width = rect.width
    canvasOptions.height = rect.height

    p.resizeCanvas(rect.width, rect.height)
  }

  function update_props() {
    palette = tome.get(opts.palette_name)
    tiles = get_tiles()

    cell_padding = opts.cell_padding
    cell_scale = opts.cell_scale
    grid_size = opts.grid_size

    padded_cell_scale = cell_padding + cell_scale
    paddingX = (canvasOptions.width - padded_cell_scale * grid_size + cell_padding) / 2
    paddingY = (canvasOptions.height - padded_cell_scale * grid_size + cell_padding) / 2

    color_grid = get_color_grid()
  }

  function get_color_grid() {
    const color_grid = []
    for (let y = 0; y < grid_size + 1; y++) {
      const row = []
      for (let x = 0; x < grid_size + 1; x++) {
        row.push(palette.colors[p.floor(p.random() * palette.size)])
      }
      color_grid.push(row)
    }
    return color_grid
  }

  function get_tiles() {
    if (tile_opts.mode === 'crosses') return tilesets.crosses
    if (tile_opts.mode === 'arrows') return tilesets.arrows
    if (tile_opts.mode === 'zigzags') return tilesets.zigzags
    if (tile_opts.mode === 'squigglies') return tilesets.two_quarters
    if (tile_opts.mode === 'geometry') {
      let tiles = [].concat(
        tile_opts.filled ? tilesets.fills : [],
        tile_opts.halves ? tilesets.halves : [],
        tile_opts.diagonals ? tilesets.diagonals : [],
        tile_opts.circles ? tilesets.circles : [],
        tile_opts.small_circles ? tilesets.small_circles : [],
        tile_opts.half_circles ? tilesets.half_circles : [],
        tile_opts.quarter_circles ? tilesets.quarter_circles : [],
        tile_opts.donuts ? tilesets.donuts : [],
      )

      return tiles.length === 0 ? tilesets.fills : tiles
    }
    return []
  }

  function draw_tiles() {
    p.strokeWeight(opts.stroke_weight)
    p.stroke(palette.stroke)
    p.background(palette.background)
    for (let y = 0; y < grid_size; y++) {
      for (let x = 0; x < grid_size; x++) {
        const xpos = paddingX + x * padded_cell_scale
        const ypos = paddingY + y * padded_cell_scale
        const cols = [
          color_grid[y][x],
          color_grid[y][x + 1],
          color_grid[y + 1][x + 1],
          color_grid[y + 1][x],
        ]
        draw_random_tile(xpos, ypos, cell_scale, cols)
      }
    }
  }

  function draw_random_tile(x, y, dim, cols) {
    let selected_colors =
      tile_opts.mode === 'arrows' || tile_opts.mode === 'zigzags'
        ? cols
        : p.shuffle(palette.colors).slice(0, 3)
    let tile_function = tiles[p.floor(p.random() * tiles.length)]

    tile_function(p, x, y, dim, ...selected_colors)
  }
}

// Setup the sketch
async function renderSketch(element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  canvasTargetElement = element

  canvasOptions.width = rect.width
  canvasOptions.height = rect.height

  try {
    const p5 = await import('p5')
    new p5.default(sketch, element)
  } catch (err) {
    console.log('Could not initialize p5. If this is using SSR or prerender, that is normal')
  }
}

export default renderSketch
