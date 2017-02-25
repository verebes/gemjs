// import {assert, expect, to, deepEqual} from 'chai';
import { assert } from 'chai';
import * as chai from 'chai';
import { Point } from '../src/point'
import { Vector } from '../src/vector'

describe("Point class member functions", () => {

    it("should be created", () => {
        let P = new Point(1, 2, 3);
        assert(true);
    })

    it("should convert to a vector", () => {
        let P = new Point(1, 2, 3);
        let vExpected = new Vector(1, 2, 3);
        let vConverted = P.toVector();
        chai.expect(vConverted).to.deep.equal(vExpected);

    })

    it("should be created from a vector", () => {
        let v = new Vector(1, 2, 3);
        let expectedPoint = new Point(1, 2, 3);
        let newPoint = Point.fromVector(v);
        chai.expect(newPoint).to.deep.equal(expectedPoint);
    })

    it("should compute the distance of two points", () => {
        let p1 = new Point(0, 0, 0);
        let p2 = new Point(1, 0, 0);

        let distanceP1P2 = Point.distance(p1, p2);
        chai.expect(distanceP1P2).to.be.equal(1);

        let p3 = new Point(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        let distanceP1P3 = Point.distance(p1, p3);
        chai.expect(distanceP1P3).to.be.equal(1);

        let p4 = new Point(0, 3, 4);
        let distanceP1P4 = Point.distance(p1, p4);
        chai.expect(distanceP1P4).to.be.equal(5);
    })
})