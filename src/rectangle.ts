import { Point } from './point';
import { Segment } from './segment';
import { Polygon } from './polygon';
import { Vector } from './vector';

export class Rectangle implements  Polygon  {
    constructor(    public point: Point,
                    public width: number,
                    public height: number ) {

     }

     getPoints(): Array<Point> {
         let vWidth =  new Vector( this.width, 0, 0) ;
         let vHeight =  new Vector(0, this.height, 0) ;
         let p = this.point;
         return [
             p,
             p.addVector(vWidth),
             p.addVector(vWidth).addVector(vHeight),
             p.addVector(vHeight)
         ];
     }

     getSegments(): Array<Segment> {
         let points = this.getPoints();
         return points.map( (p,i) => new Segment(points[i], points[(i+1) % 4]));
     }
}