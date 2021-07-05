import left_g from './left-00ff00.svg'
import left_r from './left-ff0000.svg'
import left_y from './left-ffd700.svg'

import right_g from './right-00ff00.svg'
import right_r from './right-ff0000.svg'
import right_y from './right-ffd700.svg'

import straight_g from './straight-00ff00.svg'
import straight_r from './straight-ff0000.svg'
import straight_y from './straight-ffd700.svg'


import circle_g from './circle-00ff00.svg'
import circle_r from './circle-ff0000.svg'
import circle_y from './circle-ffd700.svg'

const arrowType:{[name:string]:string} = {
  'Left_00ff00':left_g,
  'Left_ff0000':left_r,
  'Left_ffd700':left_y,

  'Right_00ff00':right_g,
  'Right_ff0000':right_r,
  'Right_ffd700':right_y,

  'Straight_00ff00':straight_g,
  'Straight_ff0000':straight_r,
  'Straight_ffd700':straight_y,
}

const circleType:{[name:string]:string} = {
  'circle_00ff00':circle_g,
  'circle_ff0000':circle_r,
  'circle_ffd700':circle_y,
}
export default {arrowType,circleType}
