import { Vector } from './vector';

export class Point {
    constructor(public x: number, public y: number, public z: number) {
    }

    toVector(): Vector {
        return new Vector(this.x, this.y, this.z );
    }

    addVector( v:Vector ):Point {
        return Point.addVector(this, v);
    }

    static addVector ( p: Point, v: Vector ): Point {
        let newPVector = Vector.plus( p.toVector(), v )
        return Point.fromVector(newPVector);
    }

    static fromVector(v: Vector): Point {
        return new Point(v.x, v.y, v.z);
    }

    static distance(p1: Point, p2: Point): number {
            return Vector.minus( p1.toVector(), p2.toVector() ).mag();
    }
}

