// origin: https://www.typescriptlang.org/play/index.html
export class Vector {

    constructor(public x: number, public y: number, public z: number) {
    }

    static epsilon = 0.00001;

    mag(): number {
        return Vector.mag(this);
    }

    toArray(): Array<number> {
        return [this.x, this.y, this.z];
    }

    isZero(): boolean {
        return this.toArray().every( (e) => Math.abs(e) < Vector.epsilon  )
    }

    static fromArray(a: Array<number>): Vector {
        return new Vector( a[0], a[1], a[2] );
    }

    static times(k: number, v: Vector) {
        return new Vector(k * v.x, k * v.y, k * v.z);
    }

    static minus(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    static plus(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    static mag(v: Vector) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    static norm(v: Vector) {
        let mag = Vector.mag(v);
        let div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }

    static cross(v1: Vector, v2: Vector) {
        return new Vector(v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x);
    }
}