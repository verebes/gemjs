import { Point } from './point';
import { Segment } from './segment';
import { Polygon } from './polygon';

export class Rectangle implements  Polygon  {
    constructor(    public p1: Point,
                    public p2: Point,
                    public p3: Point ) {

     }

     getPoints(): Array<Point> {
         return [this.p1, this.p2, this.p3];
     }

     getSegments(): Array<Segment> {
         return [
             new Segment( this.p1, this.p2),
             new Segment( this.p2, this.p3),
             new Segment( this.p3, this.p1)
         ];
     }
}