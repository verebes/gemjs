import { Point } from './point';
import { Segment } from './segment';

export interface Polygon {
    getPoints(): Array<Point>;
    getSegments(): Array<Segment>
}

export class Centroid {
    centroid: Point = null;
    static getCentroid(polygon: Polygon) {
        let x = 0;
        let y = 0;
        let z = 0;
        let points = polygon.getPoints();
        points.forEach(p => {
            x += p.x;
            y += p.y;
            z += p.z;
        });
        return new Point( x / points.length, y / points.length, z / points.length  );
    }
}

export class GeneralPolygon implements Polygon {
    private points: Array<Point> = [];

    contructor() {

    }

    getPoints(): Array<Point> {
        return this.points;
    }

    getSegments(): Array<Segment> {
        let result = [];
        for (let i = 0; i < this.points.length; ++i) {
            result.push(new Segment(this.points[i], this.points[(i + 1) % this.points.length]));
        }
        return result;
    }

    addPoint(point: Point) {
        this.points.push(point);
    }
}