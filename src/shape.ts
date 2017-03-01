import { Polygon } from './polygon';

export interface Shape {
    getSides(): Array<Polygon>;
}
