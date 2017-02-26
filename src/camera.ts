import { Plane } from './plane';
import { Point } from './point';
import { Vector } from './vector';

export class Camera {
    private _look: Point;
    private _eye: Point;
    private _up: Vector;
    private _width: Number;
    private _height: Number;

    constructor(
    ) {
        this._look = new Point(0, 0, 0);
        this._eye = new Point(0, 0, 500);
        this._up = new Vector(0, 1, 0);
        this._width = 1000;
        this._height = 1000;
    }

    get lookPoint(): Point {
        return this._look;
    }

    set lookPoint(lookPoint: Point) {
        this._look = lookPoint;
    }

    get eyePoint(): Point {
        return this._eye;
    }

    set eyePoint(eyePoint: Point) {
        this._eye = eyePoint;
    }

    get upVector(): Vector {
        return this._up;
    }

    set upVector(upVector: Vector) {
        this._up = upVector;
    }

    get width(): Number {
        return this._width;
    }

    set width(width: Number) {
        this._width = width;
    }

    get height(): Number {
        return this._height;
    }

    set height(height: Number) {
        this._height = height;
    }

    get lookEyeVector(): Vector {
        return Vector.minus(this._look.toVector(), this._eye.toVector());
    }

    get plane(): Plane {
        let lookEye = Vector.norm( this.lookEyeVector );
        let plane = new Plane(this._look, lookEye);

        return plane;
    }

    rotate(axis: Vector, angle: Number, vector: Vector): Vector {
        let cosfi = Math.cos(angle.valueOf());
        let sinfi = Math.sin(angle.valueOf());

        axis = Vector.norm( axis );

        let ux = axis.x;
        let uy = axis.y;
        let uz = axis.z;

        let R = [
            cosfi + ux * ux * (1 - cosfi), ux * uy * (1 - cosfi) - uz * sinfi, ux * uz * (1 - cosfi) + uy * sinfi,
            uy * ux * (1 - cosfi) + uz * sinfi, cosfi + uy * uy * (1 - cosfi), uy * uz * (1 - cosfi) - ux * sinfi,
            uz * ux * (1 - cosfi) - uy * sinfi, uz * uy * (1 - cosfi) + ux * sinfi, cosfi + uz * uz * (1 - cosfi)
        ];

        let result = new Vector(
            R[0] * vector.x + R[1] * vector.y + R[2] * vector.z,
            R[3] * vector.x + R[4] * vector.y + R[5] * vector.z,
            R[6] * vector.x + R[7] * vector.y + R[8] * vector.z
        );

        return result;
    }


    roll(angle: Number) {
        let up = this._up;
        let lookEye = this.lookEyeVector;

        this._up = this.rotate( lookEye, angle, up );
    }

    pitch(angle: Number) {
        let up = this._up;
        let lookEye = this.lookEyeVector;

        let right = Vector.cross( up, lookEye );

        this._up = this.rotate( right, angle, up );
        lookEye = this.rotate( right, angle, lookEye );
        this._eye = Point.fromVector( Vector.minus( this._look.toVector(), lookEye ) );
    }

    yaw(angle: Number): void {
        let up = this._up;
        let lookEye = this.lookEyeVector;

        lookEye = this.rotate( up, angle, lookEye );
        this._eye = Point.fromVector( Vector.minus( this._look.toVector(), lookEye ) );
    }

}