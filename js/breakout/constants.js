'use strict';

const STARTING_GAME_STATE = 'PLAY';
const STARTING_LIVES = 3;
const STARTING_LEVEL = 1;
const STARTING_POINT_MODIFIER = 1;

const BALL_RADIUS = 10
const MOVE_UNIT_X = -3;
const MOVE_UNIT_Y = -3;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
const PADDLE_MOVE_UNIT = 5;

// L1 : row 2, column 3, padding = 15, offsetTop = 50, offsetLeft = 115
// L2 : row 2, column 5, padding = 10, offsetTop = 50, offsetLeft = 30
// L3 : row 3, column 5, padding = 10, offsetTop = 30, offsetLeft = 30
const DEFAULT_BRICK_ROW_COUNT = 2;
const DEFAULT_BRICK_COLUMN_COUNT = 3;
const DEFAULT_BRICK_WIDTH = 75;
const DEFAULT_BRICK_HEIGHT = 20;
const DEFAULT_BRICK_PADDING = 15;
const DEFAULT_BRICK_OFFSET_TOP = 50;
const DEFAULT_BRICK_OFFSET_LEFT = 115;

