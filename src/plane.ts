import { Vector } from './vector';
import { Point } from './point';
import {Line} from './line';
import {Polygon} from './polygon';

export class Plane {
    constructor( public point: Point, public normal: Vector) {
        
    }

    isPointOnPlane( point: Point ): boolean {
        let v = Vector.minus( this.point.toVector(), point.toVector() );
        if ( Math.abs(Vector.mag(v)) < Vector.epsilon   ) {
            return true;
        }

        let angle = Vector.dot( Vector.norm(v) , this.normal)
        return Math.abs(angle) < Vector.epsilon;
    }

    isLineOnPlane( line: Line): boolean {
        return this.isPointOnPlane(line.p1) && this.isPointOnPlane( line.p2);
    }

    ifPolygonOnPlane( polygon: Polygon): boolean {
        return polygon.getPoints().every( this.isPointOnPlane );
    }
}