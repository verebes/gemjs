import { assert } from 'chai';
import * as chai from 'chai';
import { GeneralPolygon } from '../src/polygon';
import { Point } from '../src/point';

describe('General polygons are set of vertices and edges connecting the vertices', () => {
    it('should create a general polygon with three points', () => {
        let polygon = new GeneralPolygon();
        polygon.addPoint( new Point(0,0,0 ));
        polygon.addPoint( new Point(1,0,0 ));
        polygon.addPoint( new Point(2,0,0 ));
        let points = polygon.getPoints();
        let segments = polygon.getSegments();
        assert.equal( points.length , 3); 
        assert.equal( segments.length, 3);
    });
});