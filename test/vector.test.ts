import { assert } from 'chai';
import * as chai from 'chai';
import {Vector} from '../src/vector';


describe('Vector opearations', () => {
    it('isZero should return true for zero vectors', () => {
        assert.isTrue( new Vector(0,0,0).isZero() );
    })

    it('isZero should return false for non zero vectors', () => {
        assert.isFalse( new Vector(1,0,0).isZero() );
        assert.isFalse( new Vector(0,1,0).isZero() );
        assert.isFalse( new Vector(0,0,1).isZero() );
    })
    
})