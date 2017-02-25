import { assert } from 'chai';
import * as chai from 'chai';

import { Matrix } from '../src/matrix';
import { Vector } from '../src/vector';

describe('Matrix operations', () => {

    const epsilon = 0.00001;

    it('should be possible to create a new matrix from an array', () => {
        let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should transpose a matrix', () => {
        let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let expected = new Matrix([1, 4, 7, 2, 5, 8, 3, 6, 9]);
        let mTranspose = Matrix.transpose(m);
        assert.deepEqual(mTranspose, expected, 'the transposed matrix should be the expected');
    })

    it('should transpose identity matrix', () => {
        let m = new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        let mTranspose = Matrix.transpose(m);
        assert.deepEqual(mTranspose, m, 'the transposed matrix should be the expected');
    })

    it('should return the determinant of the identity matrix', () => {
        let m = new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        assert.equal(1, m.determinant(), 'the determinant of the identity matrix should be 1')
    });

    it('should return the determinant of a generic matrix', () => {
        let m = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        let d = m.determinant();
        assert.approximately(0, m.determinant(), epsilon, 'the determinant of the generic matrix should be the expected')
    });

    it('should multiply two identity matrices', () => {
        let m = new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        let result = Matrix.multiply(m, m);
        assert.deepEqual(m, result, 'the multiplied matrix should be the expected');
        //m.matrix.forEach( (v,i) => assert.equal( m.matrix[i], im.matrix[i], 'the inverse of the identity matrix should be the identity matrix' ));       
    });

    it('should calculate the inverse of the identity matrix', () => {
        let m = new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        let im = Matrix.inverse(m);
        m.matrix.forEach((v, i) => assert.equal(m.matrix[i], im.matrix[i], 'the inverse of the identity matrix should be the identity matrix'));
    });

    it('should calculate the inverse of the generic matrix', () => {
        let m = new Matrix([1, 2, 3, 1, 3, -2, -2, 1, 3]);
        let im = Matrix.inverse(m);

        let identity = new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        let result = Matrix.multiply(m, im)

        result.matrix.forEach((v, i) => assert.approximately(v, identity.matrix[i], epsilon, 'the inverse of the generic matrix multiplied by the original should be the identity matrix'));
    });

    it('should multiple matrix and vector', () => {
        let m = new Matrix([ 0,1,2,3,4,5,6,7,8 ]);
        let v = new Vector(1,2,3);

        let expected = new Vector(8, 26, 44);

        let mv = Matrix.multiplyByVector(m,v);
        assert.deepEqual(mv, expected );
    });
});

