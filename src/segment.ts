import { Point } from './point';

export class Segment {
    constructor(public p1: Point, public p2: Point) {
    }

    length(): number {
        return Point.distance(this.p1,this.p2);
    }
}
