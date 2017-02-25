import { Vector } from './vector';

export class Matrix {

    constructor( public matrix: Array<number>  ) {

    }

    determinant(): number {
        let signs = [1,-1,1];
        let subMatrices = [ [4,5,7,8],[3,5,6,8],[3,4,6,7]];
        let m = this.matrix;
        let subMatrixDeterminants = subMatrices.map( (s,i) => (m[s[0]] * m[s[3]] - m[s[1]] * m[s[2]])); 
        return subMatrixDeterminants.reduce( (sum,value, idx) => sum += signs[idx] * m[idx] * value , 0);
    }

    static fromHorizontalVectors( v1: Vector, v2: Vector, v3: Vector) {
        return new Matrix ( v1.toArray().concat( v2.toArray()).concat( v3.toArray()));
    }

    static multiply ( left: Matrix, right: Matrix): Matrix {
        let l = left.matrix;
        let r = right.matrix;

        return new Matrix([
            l[0] * r[0] + l[1] * r[3] + l[2] * r[6],
            l[0] * r[1] + l[1] * r[4] + l[2] * r[7],
            l[0] * r[2] + l[1] * r[5] + l[2] * r[8],

            l[3] * r[0] + l[4] * r[3] + l[5] * r[6],
            l[3] * r[1] + l[4] * r[4] + l[5] * r[7],
            l[3] * r[2] + l[4] * r[5] + l[5] * r[8],  

            l[6] * r[0] + l[7] * r[3] + l[8] * r[6],
            l[6] * r[1] + l[7] * r[4] + l[8] * r[7],
            l[6] * r[2] + l[7] * r[5] + l[8] * r[8]
        ]);
    }

    static multiplyByVector ( left: Matrix, right: Vector): Vector {
        let m = left.matrix;
        return new Vector(
            m[0] * right.x + m[1] * right.y + m[2] * right.z,
            m[3] * right.x + m[4] * right.y + m[5] * right.z,
            m[6] * right.x + m[7] * right.y + m[8] * right.z
        );
    }

    static transpose( m: Matrix ): Matrix {
         return new Matrix([0,3,6,1,4,7,2,5,8].map( (i) => m.matrix[i] ));
    }

    static inverse( matrix: Matrix ): Matrix {
        let signs = [1,-1,1,-1,1,-1,1,-1,1];
        let subMatrices = [ [4,5,7,8],[3,5,6,8],[3,4,6,7],[1,2,7,8],[0,2,6,8],[0,1,6,7],[1,2,4,5],[0,2,3,5],[0,1,3,4] ];
        let det = matrix.determinant();
        let lambda =  1 / det;

        let m = matrix.matrix;
        let subMatrixDeterminants = subMatrices.map( (s,i) => (m[s[0]] * m[s[3]] - m[s[1]] * m[s[2]]));
        let temp = new Matrix( subMatrixDeterminants.map( (value, idx) => lambda * signs[idx] * value));

        return Matrix.transpose( temp );
    }    
 
}