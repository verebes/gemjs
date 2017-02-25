import { Point } from './point';
import { Segment } from './segment';

export interface Polygon {
    getPoints(): Array<Point>;
    getSegments(): Array<Segment>
}

export class GeneralPolygon implements Polygon {
    private points: Array<Point>  = [];

    contructor() {

    }

    getPoints(): Array<Point> {
        return this.points;
    }

    getSegments(): Array<Segment> {
        let result =[];
        for ( let i = 0 ; i < this.points.length ; ++i ) {
            result.push( new Segment( this.points[i], this.points[(i+1) % this.points.length] ));
        }
        return result;
    }

    addPoint( point: Point ) {
        this.points.push(point);
    }
}