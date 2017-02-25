import { Plane } from './plane';
import { Point } from './point';
import { Segment } from './segment';
import { Vector } from './vector';
import { Matrix } from './matrix';
import { Polygon, GeneralPolygon } from './polygon';


export class Project {

    static orthogonalVector(v: Vector) {
        let ov = new Vector(-v.y, v.x, 0);
        if (ov.isZero()) {
            ov = new Vector(0, -v.z, v.y);
        }
        return ov;
    }

    static pointToPlane(p: Point, plane: Plane): Point {
        let v = Vector.minus(p.toVector(), plane.point.toVector());
        let d = Vector.dot(v, plane.normal);
        let s = Vector.times(d, plane.normal);
        let result = Vector.minus(p.toVector(), s);
        return Point.fromVector(result);
    }

    static plygonToPlane(polygon: Polygon, plane: Plane): GeneralPolygon {
        let result = new GeneralPolygon();
        polygon.getPoints()
            .map(p => { return Project.pointToPlane(p, plane) })
            .forEach(result.addPoint);
        return result;
    }

    static pointToPlane3(p: Point, plane: Plane): Point {

        // https://www.khanacademy.org/math/precalculus/precalc-matrices/finding-inverse-matrix-with-determinant/v/inverse-of-a-2x2-matrix

        let v1 = Vector.norm(this.orthogonalVector(plane.normal));
        let v2 = Vector.norm(Vector.cross(plane.normal, v1));

        let trAA = [Vector.dot(v1, v1), Vector.dot(v1, v2), Vector.dot(v2, v1), Vector.dot(v2, v2)];
        let detTrAA = trAA[0] * trAA[3] - trAA[1] * trAA[2];
        let scale = 1 / detTrAA;

        let invTrAA = [trAA[3], -1 * trAA[1], -1 * trAA[2], trAA[3]].map((v) => scale * v);

        let AinvTrAA = [v1.x * invTrAA[0] + v2.x * invTrAA[2], v1.x * invTrAA[1] + v2.x * invTrAA[3],
        v1.y * invTrAA[0] + v2.y * invTrAA[2], v1.y * invTrAA[1] + v2.y * invTrAA[3],
        v1.z * invTrAA[0] + v2.z * invTrAA[2], v1.z * invTrAA[1] + v2.z * invTrAA[3]
        ];

        let P = new Matrix([
            AinvTrAA[0] * v1.x + AinvTrAA[1] * v2.x, AinvTrAA[0] * v1.y + AinvTrAA[1] * v2.y, AinvTrAA[0] * v1.z + AinvTrAA[1] * v2.z,
            AinvTrAA[2] * v1.x + AinvTrAA[3] * v2.x, AinvTrAA[2] * v1.y + AinvTrAA[3] * v2.y, AinvTrAA[2] * v1.z + AinvTrAA[3] * v2.z,
            AinvTrAA[4] * v1.x + AinvTrAA[5] * v2.x, AinvTrAA[4] * v1.y + AinvTrAA[5] * v2.y, AinvTrAA[4] * v1.z + AinvTrAA[5] * v2.z
        ]);


        let projectedIntersection = Matrix.multiplyByVector(P, plane.point.toVector());
        let translation = Vector.minus(plane.point.toVector(), projectedIntersection);

        let result = Matrix.multiplyByVector(P, p.toVector());

        return Point.fromVector(Vector.plus(translation, result));
    }

    static pointToPlane2(p: Point, plane: Plane): Point {
        // https://www.khanacademy.org/math/linear-algebra/alternate-bases/orthogonal-projections/v/lin-alg-a-projection-onto-a-subspace-is-a-linear-transforma
        // Projv(x) = A * inv( transpose(A) * A ) * trasnpose(A) * x

        let v1 = plane.normal;
        let v2 = this.orthogonalVector(v1);
        let v3 = Vector.cross(v1, v2);

        let M = Matrix; // abreviation of Matrix
        let A = Matrix.fromHorizontalVectors(v1, v2, v3);

        let trA = M.transpose(A);
        let P = M.multiply(M.multiply(A, M.inverse(M.multiply(trA, A))), trA);
        let result = Point.fromVector(Matrix.multiplyByVector(P, p.toVector()));
        return result;
    }

    static segmentToPlane( s: Segment, plane: Plane): Segment {
        return new Segment( this.pointToPlane(s.p1, plane), this.pointToPlane(s.p2, plane) );
    }

}