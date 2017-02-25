import {Scene} from './scene';
import {Polygon} from './polygon';
import {Point} from './point';
import {Segment} from './segment';
import {Project} from './projection';
import {Plane} from './plane';
import {Vector} from './vector';

export class Painter {

    static readonly svgNs:string = "http://www.w3.org/2000/svg";

    constructor() {
    }

    static addCircle(x: number, y: number): SVGCircleElement {
        let circle: SVGCircleElement = document.createElementNS(Painter.svgNs, "circle") as SVGCircleElement
        circle.setAttribute('cx', x.toString());
        circle.setAttribute('cy', y.toString());
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', 'blue');
        return circle;
    }

    static addLine(x0: number, y0: number, x1: number, y1: number): SVGLineElement {
        let segment: SVGLineElement =  document.createElementNS(Painter.svgNs, "line") as SVGLineElement;
        segment.setAttribute('x1', x0.toString());
        segment.setAttribute('y1', y0.toString());
        segment.setAttribute('x2', x1.toString());
        segment.setAttribute('y2', y1.toString());
        segment.setAttribute('fill', 'blue');
        segment.setAttribute('stroke', 'black');
        segment.setAttribute('stroke-width', '2');

        return segment;
    }

    static addPolygon( points: Array<Point>  ): SVGPolygonElement {
        let polygon: SVGPolygonElement = document.createElementNS(Painter.svgNs, "polygon") as SVGPolygonElement;
        polygon.setAttribute('points', points.map( p => { 
            return p.x.toString()+',' + p.y.toString(); 
        } ).join() );
        polygon.setAttribute('fill', 'blue');
        polygon.setAttribute('stroke', 'black');
        polygon.setAttribute('stroke-width', '2');
        polygon.setAttribute('fill-opacity', '0.4');

        return polygon;
    }

    static to2dPoint(p: Point, plane: Plane, up: Vector ): Point {
        let v = Vector.minus( p.toVector(), plane.point.toVector() );
        let x = Vector.dot( v, Vector.cross( Vector.norm(up), plane.normal) );
        let y = Vector.dot( v, up );
        return new Point(x, y, 0);
    }

    static to2dSegment( s: Segment, plane: Plane, up: Vector): Segment {
        return new Segment( Painter.to2dPoint(s.p1, plane, up), Painter.to2dPoint(s.p2, plane, up));
    }

    static paintPolygon( polygon: Polygon, element: SVGElement, angle: number ) {
        let origin = new Point(0,0,0);
        let n = Vector.norm( new Vector( Math.cos( angle *  Math.PI / 180 ) ,0, Math.sin(  angle * Math.PI / 180 ) ));
        let plane = new Plane( origin, n );
        let up = new Vector( 0, 1, 0);
        polygon.getPoints().map( p => Project.pointToPlane(p, plane) )
            .map (p => Painter.to2dPoint(p, plane, up ) )
            .map( p => element.appendChild( Painter.addCircle(p.x,p.y)));

        polygon.getSegments()
                .map( s=> Project.segmentToPlane(s, plane))
                .map( s=> new Segment( Painter.to2dPoint(s.p1, plane, up),  Painter.to2dPoint( s.p2, plane, up )))
                .map( s => element.appendChild(Painter.addLine( s.p1.x, s.p1.y, s.p2.x, s.p2.y )) );

        element.appendChild( Painter.addPolygon(
            polygon.getPoints()
                .map( p => Project.pointToPlane(p, plane) )
                .map (p => Painter.to2dPoint(p, plane, up ) )
        ) );
    }

    static clear(element: SVGElement) {
        while ( element.hasChildNodes() ) {
            element.removeChild(element.lastChild);
        }
    }

    static paint(scene: Scene, element: SVGElement, angle: number): void {
        let origin = new Point(0,0,0);
        let n = Vector.norm( new Vector( Math.cos( angle *  Math.PI / 180 ) ,0, Math.sin(  angle * Math.PI / 180 ) ));
        let plane = new Plane( origin, n );
        let up = new Vector( 0, 1, 0);

        scene.points
                .map( p => Project.pointToPlane(p, plane) )
                .map (p => Painter.to2dPoint(p, plane, up ) )
                .map( p => element.appendChild(Painter.addCircle(p.x,p.y)));

        scene.segments
        .map( s => Project.segmentToPlane(s, plane) )
        .map (s => Painter.to2dSegment(s, plane, up ) )
        .map(s => element.appendChild(Painter.addLine( s.p1.x, s.p1.y, s.p2.x, s.p2.y )) );

        scene.polygons.forEach( (polygon) => Painter.paintPolygon( polygon, element, angle ) );
    }

    static createScene(): Scene {
        return new Scene();
    }
}

interface GemWindow extends Window {
    Painter: Painter;
}

declare var window: GemWindow;
window.Painter = Painter;