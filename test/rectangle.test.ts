import { assert } from 'chai';
import * as chai from 'chai';
import { Rectangle } from '../src/rectangle';
import { Point } from '../src/point';
import { Segment } from '../src/segment'

describe("getters of the Rectangle class", () => {
    it("should return the right vertices", () => {
        let p = new Point( 0, 0, 0);
        let r = new Rectangle(p, 100, 200);
        
        let expected = [
            new Point(0,0,0),
            new Point(100,0,0),
            new Point(100, 200, 0),
            new Point(0, 200, 0)
        ];        
        let vertices = r.getPoints();

        assert.deepEqual( vertices, expected, 'getPoints() should return with the expected vertices' );        
    });

    it("getSegments() should return the edges of the rectangle", () => {
        let p = new Point( 0, 0, 0);
        let r = new Rectangle(p, 100, 200);
        
        let p0 = new Point(0,0,0);
        let p1 = new Point(100,0,0);
        let p2 = new Point(100, 200, 0);
        let p3 = new Point(0, 200, 0);

        let expected = [
             new Segment(p0, p1),
             new Segment(p1, p2),
             new Segment(p2, p3),
             new Segment(p3, p0)
        ]
        let segments = r.getSegments();
        assert.deepEqual( segments, expected, 'getSegments() should return the edges of the rectangle ' );        
    });


});