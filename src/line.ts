import { Point } from './point'
import {Segment} from './segment'

export class Line {
    constructor( public p1: Point, public p2: Point) {

    }

    static fromSegment( s: Segment ): Line {
        return new Line(s.p1,  s.p2);
    }

}