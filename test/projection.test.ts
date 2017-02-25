import { assert } from 'chai';
import * as chai from 'chai';

import {Point} from '../src/point';
import {Vector} from '../src/vector';
import {Plane} from '../src/plane';
import {Project} from '../src/projection';

describe('Projection methods', () => {
    it( 'Should project point on plane to the same point', () => {
        let point = new Point(0,0,0);

        let planePoint = new Point(0,0,0);
        let planeNormal = new Vector(0,1,0);

        let plane = new Plane(planePoint, planeNormal)
        let projectedPoint = Project.pointToPlane(point, plane);

        console.log('xx projectedPoint: ' + JSON.stringify( projectedPoint ));
        console.log('xx point: ' + JSON.stringify( point ));
 
        assert.deepEqual(projectedPoint, point, 'the projected point on the plane remains the same point');
    })

    it( 'Should project point on plane simple plane', () => {
        let point = new Point(0,1,0);
        let expectedPoint = new Point(0,0,0);

        let planePoint = new Point(0,0,0);
        let planeNormal = new Vector(0,1,0);

        let plane = new Plane(planePoint, planeNormal)
        let projectedPoint = Project.pointToPlane(point, plane);

        assert.deepEqual(projectedPoint, expectedPoint, 'the projected point is sholud be the expected');
    })

    it( 'Should project point on plane generic plane', () => {

        // http://www.nabla.hr/CG-LinesPlanesIn3DB5.htm

        let point = new Point(5,-6,3);
        let expectedPoint = new Point(-1,-2,1);
                
        let planePoint = new Point(0,0,2) ;
        let planeNormal = Vector.norm(new Vector(3,-2,1));

        let plane = new Plane(planePoint, planeNormal)
        let projectedPoint = Project.pointToPlane(point, plane);
        
        assert.approximately( projectedPoint.x, expectedPoint.x, Vector.epsilon, 'the projected point on the plane remains the same point');
        assert.approximately( projectedPoint.y, expectedPoint.y, Vector.epsilon, 'the projected point on the plane remains the same point');
        assert.approximately( projectedPoint.z, expectedPoint.z,  Vector.epsilon, 'the projected point on the plane remains the same point');
        // assert.equal( JSON.stringify(projectedPoint), JSON.stringify(expectedPoint), 'the projected point on the plane remains the same point');
    })

    it ('Should return zero vecor for zero vector input', () => {
        let v = new Vector(0,0,0);
        let orthogonalVector = Project.orthogonalVector(v);

        assert.isTrue( orthogonalVector.isZero(), 'orthogonalVector should return zero vector for zero vector input');
    })

    it ('Should return an orthogonal vecor', () => {
        let cases = [ [1,0,0], [0,1,0], [0,0,1], [1,1,0], [1,1,1], [2,0,0] ];
        
        
        cases.forEach( (a) => {
            let v = Vector.fromArray(a);
            let orthogonalVector = Project.orthogonalVector(v);

            assert.isFalse( orthogonalVector.isZero(), 'orthogonalVector should return non zero vector for non zero vector input');
            let dotProduct = Vector.dot( v, orthogonalVector );
            assert.approximately( dotProduct, 0, Vector.epsilon, 'dot product should be zero' );
        });
    })


})