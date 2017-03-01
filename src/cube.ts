import { Point } from './point';
import { Vector } from './vector';
import { Segment } from './segment';
import { Polygon } from './polygon';
import { Rectangle } from './rectangle';
import { Shape } from './shape';

export class Cube implements Shape {
    constructor(
        public point: Point,
        public width: number,
        public normal: Vector = new Vector(0,0,1),
        public up: Vector = new Vector(0,1,0)
    ) {
    }

    getSides(): Array<Polygon> {
        let x = Vector.cross(this.up, this.normal);
        let y = this.up;
        let z = this.normal;
        let p1 = this.point;
        let p2 = Point.fromVector(Vector.plus(p1.toVector(), Vector.times( this.width, z)));
        let p3 = Point.fromVector(Vector.plus(p2.toVector(), Vector.times( this.width, x)));
        let p4 = Point.fromVector(Vector.plus(p1.toVector(), Vector.times( this.width, x)));
        let p5 = Point.fromVector(Vector.plus(
            this.point.toVector(),
            Vector.plus(Vector.plus(Vector.times(this.width, x), Vector.times(this.width, y)),
                Vector.times(this.width, z))));

        return [
            new Rectangle(p1, this.width, this.width, z, y),
            new Rectangle(p2, this.width, this.width, x, y),
            new Rectangle(p3, this.width, this.width, Vector.times(-1, z), y),
            new Rectangle(p4, this.width, this.width, Vector.times(-1, x), y),
            new Rectangle(p1, this.width, this.width, y, x),
            new Rectangle(p5, this.width, this.width, Vector.times(-1, y), Vector.times(-1,z)),
        ];
    }

}