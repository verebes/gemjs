import {Point} from './point';
import {Segment} from './segment';
import {Rectangle} from './rectangle';
import {Project} from './projection';
import {GeneralPolygon} from './polygon';
import {Camera} from './camera';

interface Facade {
    Point: typeof Point;
    Segment: typeof Segment;
    Rectangle: typeof Rectangle;
    Project: typeof Project;
    GeneralPolygon: typeof GeneralPolygon;
    Camera: typeof Camera;
}

function InitGem( parent: any ) {
    if ( parent == undefined || parent == null ) {
        parent = {};
    }
    parent = (<any>Object).assign(parent, {
       Point: Point,
       Segment: Segment,
       Rectangle: Rectangle,
       Project: Project,
       GeneralPolygon: GeneralPolygon,
       Camera: Camera
    });
}

interface GemWindow extends Window {
    InitGem: any;
}

declare var window: GemWindow;
window.InitGem = InitGem;

