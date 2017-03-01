import {Point} from './point';
import {Segment} from './segment';
import {Polygon} from './polygon';
import {Shape} from './shape';
import {Camera} from './camera';

export class Scene {
    activeCamera: Camera;
    points: Array<Point> = [];
    segments: Array<Segment> = [];
    polygons: Array<Polygon> = [];
    shapes: Array<Shape> = [];

    constructor() {
    }

    addPoint(p: Point): void {
        this.points.push(p);
    }

    addSegment(s: Segment) {
        this.segments.push(s);
    }

    addPolygon( polygon: Polygon) {
        this.polygons.push(polygon);
    }    

    addShape( shape: Shape ) {
        this.shapes.push(shape);
    }

    setActiveCamera( camera: Camera) {
        this.activeCamera = camera;
    }

    getActiveCamera() {
        return this.activeCamera;
    }
}
