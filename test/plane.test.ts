import { assert } from 'chai';
import * as chai from 'chai';

import { Plane } from '../src/plane';
import { Vector } from '../src/vector';
import { Point } from '../src/point';
import { Line } from '../src/line';

import { Project } from '../src/projection';

describe('plane function check', () => {
    it('should return if the point is on the plane ', () => {
        let point = new Point(0,0,0);
        let normal = new Vector(0,0,1);
        let plane = new Plane(point, normal);

        assert.isTrue( plane.isPointOnPlane(point) );
        assert.isTrue( plane.isPointOnPlane( new Point( 1, 1, 0 )) );
        assert.isFalse( plane.isPointOnPlane( new Point( 1, 1, 1 )) );
    });

    it('should return if the point is on the plane ', () => {
        let point = new Point(1,2,3);
        let normal = Vector.norm( new Vector( Math.sqrt(3)/2, 0.5, 1/ Math.sqrt(2) ) );
        let plane = new Plane(point, normal);

        assert.isTrue( plane.isPointOnPlane(point) );

        let projected = Project.pointToPlane( new Point( 123,111,33 ), plane);
        assert.isTrue( plane.isPointOnPlane( projected ) );
        assert.isFalse( plane.isPointOnPlane( Point.fromVector( Vector.plus( projected.toVector(), new Vector( 0.2, 0, 0 )))));
    });

    it('should return if the line is on the plane', () => {
        let point = new Point(0,0,0);
        let normal = new Vector(0,0,1);
        let plane = new Plane(point, normal);

        let line = new Line( new Point( -1,2,0), new Point( 3,2,0));
        assert.isTrue( plane.isLineOnPlane(line));

        let lineNotOnPlane = new Line( new Point( -1,2,0), new Point( 3,2,0.2));
        assert.isFalse( plane.isLineOnPlane( lineNotOnPlane));
    });

    it('should return if the line is on the plane ', () => {
        let point = new Point(1,2,3);
        let normal = Vector.norm( new Vector( Math.sqrt(3)/2, 0.5, 1/ Math.sqrt(2) ) );
        let plane = new Plane(point, normal);

        let p1 = Project.pointToPlane( new Point( 122,33,222), plane );
        let p2 = Project.pointToPlane( new Point( -321,23, -44), plane );

        let line = new Line( p1, p2 );
        assert.isTrue( plane.isLineOnPlane(line));

        let lineNotOnPlane = new Line( p1, Point.fromVector( Vector.plus( p2.toVector(), new Vector(0,0,1) )));
        assert.isFalse( plane.isLineOnPlane(lineNotOnPlane) );
    });
    
});