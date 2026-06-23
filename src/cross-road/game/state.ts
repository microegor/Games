import type { Car } from "./cars";
import type { River } from "./rivers";

export interface State {
  chickenX: number;
  chickenY: number;
  score: number;
  targetX: number;
  targetY: number;
  isMapMoving: boolean;
  isMoving: boolean;
  cars: Car[];
  rivers: River[];
  grassY: number;
  lastLaneY: number;
  gameOver: boolean;
}

export const state: State = {
  chickenX: 250,
  chickenY: 400,
  score: 0,
  targetX: 250,
  targetY: 400,

  isMapMoving: false,
  isMoving: false,
  cars: [],
  rivers: [],
  grassY: 0,
  lastLaneY: 0,
  gameOver: false,
};