import {Plane} from './plane';
import {Point} from './point';
import {Vector} from './vector';

export class Camera {
    private plane: Plane;

    constructor ( 
        public look: Point,
        public eye: Point,
        public up: Vector,
        public width: Number,
        public height: Number
    ) {
        
    }


}