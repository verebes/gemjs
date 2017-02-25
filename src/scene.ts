import {Point} from './point'
import {Segment} from './segment'
import {Polygon} from './polygon'
import {Camera} from './camera'

export class Scene {
    activeCamera: Camera;
    points: Array<Point> = [];
    segments: Array<Segment> = [];
    polygons: Array<Polygon> = [];

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

    setActiveCamera( camera: Camera) {
        this.activeCamera = camera;
    }

    getActiveCamera() {
        return this.activeCamera;
    }
}
