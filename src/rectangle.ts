import { Point } from './point';
import { Segment } from './segment';
import { Polygon } from './polygon';
import { Vector } from './vector';

export class Rectangle implements Polygon {

    private right: Vector;

    constructor(public point: Point,
        public width: number,
        public height: number,
        public normal: Vector = new Vector(0, 0, 1),
        public up: Vector = new Vector(0, 1, 0)) {

        this.right = Vector.cross(up, normal);
    }

    getPoints(): Array<Point> {

        let vWidth = Vector.times( this.width, this.right);
        let vHeight= Vector.times( this.height, this.up);

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
        return points.map((p, i) => new Segment(points[i], points[(i + 1) % 4]));
    }
}