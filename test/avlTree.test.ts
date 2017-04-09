import { assert } from 'chai';
import * as chai from 'chai';

import { AvlTree, IAvlTree } from '../src/avlTree';

describe('Binary Search Tree operations', () => {
    it('should create an empty AvlTree', () => {
        let avlTree = new AvlTree<number>();
    });

    it('should return 0 as the height of an empty AvlTree', () => {
        let avlTree = new AvlTree<number>();
        assert.equal(avlTree.height, 0);
    });

    it('should insert one element into the AvlTree', () => {
        let avlTree = new AvlTree<number>();
        avlTree.insert(1);
        assert.equal(avlTree.height, 1);
    });

    it('should insert smaller elements into the left child of the AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [3, 2, 1].forEach(e => avlTree.insert(e));

        let values = [2, 1, 3, null, null, null, null];
        let heights = [2, 1, 1, 0, 0, 0, 0];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should insert larger elements into the right child of the AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [1, 2, 3].forEach(e => avlTree.insert(e));

        let values = [2, 1, 3, null, null, null, null];
        let heights = [2, 1, 1, 0, 0, 0, 0];
        assertTreeEqual(avlTree, heights, values);

    });

    it('BST property should be kept when inserting a value ', () => {
        let avlTree = new AvlTree<number>();
        [2, 3, 1].forEach(e => avlTree.insert(e));

        let values = [2, 1, 3, null, null, null, null];
        let heights = [2, 1, 1, 0, 0, 0, 0];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should delete an element from the tree', () => {
        let avlTree = new AvlTree<number>();
        [3, 5, 1, 4].forEach(e => avlTree.insert(e));

        let values = [3, 1, 5, null, null, 4, null];
        let heights = [3, 1, 2, 0, 0, 1, 0];
        assertTreeEqual(avlTree, heights, values);

        [1, 3, 5, 4].forEach(e => assert.isTrue(avlTree.has(e)));
        [0, 2, 6].forEach(e => assert.isFalse(avlTree.has(e)));

        avlTree.delete(4);
        assert.isFalse(avlTree.has(4));
        avlTree.delete(3);
        assert.isFalse(avlTree.has(3));
        avlTree.delete(4);
        assert.isFalse(avlTree.has(4));
    });

    it('should keep the tree balanced LL case', () => {
        let avlTree = new AvlTree<number>();
        [3, 2, 1].forEach(e => avlTree.insert(e));

        let values = [2, 1, 3];
        let heights = [2, 1, 1];
        assertTreeEqual(avlTree, heights, values);

        [1, 2, 3].forEach(e => assert.isTrue(avlTree.has(e)));
    });


    it('should insert call rotateLR when inserting element into an AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [3, 6, 1, 4, 5].forEach(e => avlTree.insert(e));

        let heights = [3, 1, 2, 0, 0, 1, 1];
        let values = [3, 1, 5, null, null, 4, 6];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should insert call rotateRR when inserting element into an AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [13, 16, 9, 10, 11].forEach(e => avlTree.insert(e));

        let heights = [3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, null, null, null, null];
        let values = [13, 10, 16, 9, 11, null, null, null, null, null, null, null, null, null, null];
        assertTreeEqual(avlTree, heights, values);
    });


    it('should insert call rotateRL when inserting element into an AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [13, 16, 9, 11, 10].forEach(e => avlTree.insert(e));

        let heights = [3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, null, null, null, null];
        let values = [13, 10, 16, 9, 11, null, null, null, null, null, null, null, null, null, null];
        assertTreeEqual(avlTree, heights, values);
    });


    it('should insert call rotateLL when inserting element into an AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [13, 16, 11, 10, 9].forEach(e => avlTree.insert(e));

        let heights = [3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, null, null, null, null];
        let values = [13, 10, 16, 9, 11, null, null, null, null, null, null, null, null, null, null];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should insert call rotateLR when inserting element into an AvlTree', () => {
        let avlTree = new AvlTree<number>();
        [13, 16, 11, 9, 10].forEach(e => avlTree.insert(e));

        let heights = [3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, null, null, null, null];
        let values = [13, 10, 16, 9, 11, null, null, null, null, null, null, null, null, null, null];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should call rotateRR when deleting node', () => {
        let avlTree = new AvlTree<number>();
        [3, 1, 5, 6].forEach(e => avlTree.insert(e));
        let heights = [3, 1, 2, 0, 0, 0, 1];
        let values = [3, 1, 5, null, null, null, 6];
        assertTreeEqual(avlTree, heights, values);

        avlTree.delete(1);
        heights = [2, 1, 1];
        values = [5, 3, 6];
        assertTreeEqual(avlTree, heights, values);
    });

    it('should call rotateLL when deleting node', () => {
        let avlTree = new AvlTree<number>();
        [6,5,7,4].forEach(e => avlTree.insert(e));
        let heights = [3, 2, 1, 1, 0, 0, 0];
        let values = [6, 5, 7, 4, null, null, null];
        assertTreeEqual(avlTree, heights, values);

        avlTree.delete(7);
        heights = [2, 1, 1];
        values = [5, 4, 6];
        assertTreeEqual(avlTree, heights, values);
    });


    it('should call rotateRL when deleting node', () => {
        let avlTree = new AvlTree<number>();
        [3, 1, 5, 4].forEach(e => avlTree.insert(e));
        let heights = [3, 1, 2, 0, 0, 1, 0];
        let values = [3, 1, 5, null, null, 4, null];
        assertTreeEqual(avlTree, heights, values);

        avlTree.delete(1);
        heights = [2, 1, 1];
        values = [4, 3, 5];
        assertTreeEqual(avlTree, heights, values);
    });


    it('should delete the single element', () => {
        let avlTree = new AvlTree<number>();
        avlTree.insert(1);
        avlTree.delete(1);
        assertTreeEqual( avlTree, [0], [null] );
    });

    it('should delete the single element', () => {
        let avlTree = new AvlTree<number>();
        avlTree.insert(1);
        avlTree.insert(2);
        avlTree.delete(1);
        assertTreeEqual( avlTree, [1], [2] );
    });

    it('should delete the single element', () => {
        let avlTree = new AvlTree<number>();
        avlTree.insert(1);
        avlTree.insert(2);
        avlTree.delete(2);
        assertTreeEqual( avlTree, [1], [1] );
    });

    it('should delete the single element', () => {
        let avlTree = new AvlTree<number>();
        avlTree.insert(2);
        avlTree.insert(1);
        avlTree.delete(1);
        assertTreeEqual( avlTree, [1], [2] );
    });


    const CNT: number = 100000;
    let v: Array<number> ;
    let d: Array<number> ;
    function initArray() {
        v = new Array<number>(CNT);
        d = new Array<number>(CNT);
        for ( let i: number = 0 ; i < CNT; ++i ) {
            d[i] = i;
        }
        for ( let i: number = 0 ; i < CNT; ++i  ) {
            let n = Math.round(Math.random()*CNT);
            v[i] = n; 

            let r = Math.round( Math.random() * ( CNT-i ));
            let tmp = d[i];
            d[i] = d[r];
            d[i] = tmp;
        }
        console.log('expected min:' + v.reduce( (prev: number, curr: number) => prev > curr ? curr: prev));
        console.log('expected max:' + v.reduce( (prev: number, curr: number) => prev < curr ? curr: prev));
    };

    before( initArray);

    it('should insert and delete 100000 fast', () => {
        let avlTree = new AvlTree<number>();
        
        for ( let i = 0 ; i < CNT ; ++i ) {
            avlTree.insert(v[i]);
        }
        console.log('avlTree height: ' + avlTree.height );
        console.log('min:' + avlTree.minValue());
        console.log('max:' + avlTree.maxValue() );

        let prevHeight = null;
        let counter = 0;
        for ( let i = 0 ; i < CNT ; ++i ) {
            avlTree.delete(d[i]);
            if ( avlTree.height !== prevHeight) {
                console.log('avlTree height: ' + avlTree.height + ': ' + counter );
                counter = 0;
                prevHeight = avlTree.height;
            }
            ++counter;
        }

        console.log('avlTree height: ' + avlTree.height );
        console.log('min:' + avlTree.minValue());
        console.log('max:' + avlTree.maxValue() );
        
    });

    function log2(x: any) {
        return Math.round(Math.log(x) * Math.LOG2E);
    };

    function assertTreeEqual(avlTree: IAvlTree<number>, heights: Array<number>, values: Array<number>) {
        let treeHeight = log2(values.length + 1) - 1
        let p = getTreePathList([], treeHeight);
        let v: any[] = [];
        let h: any[] = [];

        p.forEach(s => {
            let t = getNode(avlTree, s);
            v.push(t != null ? t.value : null);
            h.push(t != null ? t.height : null);
        });
        assert.deepEqual(h, heights);
        assert.deepEqual(v, values);
    }

    function getTreePathList(a: any[], level: number):any[] {
        if (level === 0) {
            a.push('0');
            return a;
        }

        a = getTreePathList(a, level - 1);

        var cnt = Math.pow(2, level - 1);
        var n = a.length - cnt;

        for (let i = 0; i < cnt; ++i) {
            a.push(a[n + i] + 'L');
            a.push(a[n + i] + 'R');
        }

        return a;
    }

    function getNode(avlTree: IAvlTree<number>, s: string): IAvlTree<number> {
        let t: IAvlTree<number> = null;
        for (let i = 0; i < s.length; ++i) {
            if (s[i] == '0') {
                t = avlTree;
            } else if (s[i] == 'L') {
                t = t.left;
            } else if (s[i] == 'R') {
                t = t.right;
            }
        }
        return t;
    }

});

