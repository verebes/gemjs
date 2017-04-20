export interface IComparator<T> {
    isEqual( t1: T, t2: T): boolean;
    lessThan( t1: T, t2: T): boolean;
}

export interface IAvlTree<T, C extends IComparator<T>> {
    right: IAvlTree<T, C>;
    left: IAvlTree<T, C>;

    height: number;
    value: T;

    has(t: T): boolean;
    insert(t: T): void;
    delete(t: T): void;
    minValue(): T;
    preceding(): T;
    succeeding(): T;
}

export class Comparator<T> implements IComparator<T> {
    public isEqual(t1: T, t2: T): boolean {
        return t1 === t2;
    }
    public lessThan(t1: T, t2: T): boolean {
        return t1 < t2;
    }
}

export class AvlTree<T, C extends IComparator<T>> implements IAvlTree<T, C> {
    get right(): IAvlTree<T, C> {
        return this.root.right;
    }
    get left(): IAvlTree<T, C> {
        return this.root.left;
    }

    get height(): number {
        return this.root.height;
    }

    get value(): T {
        return this.root.value;
    }

    constructor( private readonly comparator: IComparator<T> ) {
        this.root = new AvlNode<T, C>(comparator);
        this.root.left = new AvlNode<T, C>(comparator);
        this.root.right = new AvlNode<T, C>(comparator);
    }

    has(t: T): boolean {
        return this.root.has(t);
    }
    insert(t: T): void {
        this.root = this.root.insert(t);
    }
    delete(t: T): void {
        if (!this.root.value) {
            return;
        }

        if ( this.comparator.isEqual( this.root.value, t)) {
            if (this.root.right) {
                this.root = this.root.right;
            } else if (this.root.left) {
                this.root = this.root.left;
            } else {
                this.root = new AvlNode<T, C>( this.comparator);
            }
            return;
        }
        this.root = this.root.delete(t);
        this.root.height = this.root.getMaxChildHeight() + 1;
    }
    minValue(): T {
        return this.root.minValue();
    }
    maxValue(): T {
        return this.root.maxValue();
    }
    preceding(): T {
        return this.root.preceding();
    }
    succeeding(): T {
        return this.root.succeeding();
    }

    private root = new AvlNode<T, C>(this.comparator);
}

class AvlNode<T, C extends IComparator<T>> implements IAvlTree<T, C>  {

    public value: T;
    public height: number;
    public left: AvlNode<T, C>;
    public right: AvlNode<T, C>;

    constructor( private readonly comparator: IComparator<T>) {
        this.value = null;
        this.height = 0;
        this.left = null;
        this.right = null;
    }

    public has(t: T): boolean {
        if (this.value === null) {
            return false;
        }

        if ( this.comparator.isEqual( this.value, t)) {
            return true;
        }

        if ( this.comparator.lessThan( this.value, t)) {
            return this.right.has(t);
        } else {
            return this.left.has(t);
        }
    }

    public insert(t: T): AvlNode<T, C> {
        if (this.value === null) {
            this.value = t;
            this.height = 1;
            this.left = new AvlNode<T, C>( this.comparator);
            this.right = new AvlNode<T, C>( this.comparator);
            return this;
        }

        if (this.comparator.lessThan(this.value, t)) {
            this.right = this.right.insert(t);
        } else {
            this.left = this.left.insert(t);
        }

        this.height = this.getMaxChildHeight() + 1;

        return this.rebalance(t);
    }

    private rebalance(t: T) {
        let newRoot: AvlNode<T, C> = this;
        let balance: number = this.left.height - this.right.height;

        if (balance < -1) {
            if (this.comparator.lessThan(this.right.value ,t)) {
                newRoot = this.rotateRR();
            } else {
                newRoot = this.rotateRL();
            }
        } else if (balance > 1) {
            if ( this.comparator.lessThan( this.left.value, t)) {
                newRoot = this.rotateLR();
            } else {
                newRoot = this.rotateLL();
            }
        }
        return newRoot;
    }

    public delete(t: T): AvlNode<T, C> {
        return this.deleteChild(t, this);
    }

    public minValue(): T {
        if (this.value === null) {
            return null;
        }
        if (this.left.value === null) {
            return this.value;
        }
        return this.left.minValue();
    }

    public maxValue(): T {
        if (this.value === null) {
            return null;
        }

        if (this.right.value === null) {
            return this.value;
        }
        return this.right.maxValue();
    }


    private deleteChild(t: T, parent: AvlNode<T, C>): AvlNode<T, C> {
        if (this.value === null) {
            return this;
        }

        if ( this.comparator.lessThan(t, this.value)) {
            if (this.left === null) {
                return this;
            }
            this.left = this.left.deleteChild(t, this);
            this.height = this.getMaxChildHeight() + 1;
        } else if ( this.comparator.lessThan(this.value, t)) {
            if (this.right === null) {
                return this;
            }
            this.right = this.right.deleteChild(t, this);
            this.height = this.getMaxChildHeight() + 1;
        } else {
            if (this.left.isLeaf() && this.right.isLeaf()) {
                return new AvlNode<T, C>( this.comparator);
            } else {
                if (!this.left.isLeaf() && !this.right.isLeaf()) {
                    this.value = this.right.minValue();
                    this.right = this.right.deleteChild(this.value, this);
                    this.height = this.getMaxChildHeight() + 1;
                } else if (!this.left.isLeaf()) {
                    return this.left;
                } else if (!this.right.isLeaf()) {
                    return this.right;
                }
            }
        }

        let result: AvlNode<T, C> = this;

        let balance = this.getBalance();
        if (balance > 1) {
            let childBalance = this.left.getBalance();
            if (childBalance < 0) {
                result = this.rotateLR();
            } else {
                result = this.rotateLL();
            }
        } else if (balance < -1) {
            let childBalance = this.right.getBalance();
            if (childBalance > 0) {
                result = this.rotateRL();
            } else {
                result = this.rotateRR();
            }
        }

        result.height = result.getMaxChildHeight() + 1;
        return result;
    }

    public preceding(): T {
        let p: AvlNode<T, C> = this;
        while (p.left !== null) {
            p = p.left;
        }
        return p.value;
    }

    public succeeding(): T {
        let p: AvlNode<T, C> = this;
        while (p.right !== null) {
            p = p.right;
        }
        return p.value;
    }

    private isLeaf(): boolean {
        return this.getMaxChildHeight() === 0;
    }

    public getMaxChildHeight(): number {

        let hl = this.left ? this.left.height : 0;
        let hr = this.right ? this.right.height : 0;

        return Math.max(hl, hr);
    }

    public getBalance(): number {
        let hl = this.left ? this.left.height : 0;
        let hr = this.right ? this.right.height : 0;

        return hl - hr;
    }

    public rotateLL(): AvlNode<T, C> {
        let tmp = this.left;
        this.left = tmp.right;
        tmp.right = this;

        this.height = this.getMaxChildHeight() + 1;
        tmp.height = tmp.getMaxChildHeight() + 1;
        return tmp;
    }

    public rotateRR(): AvlNode<T, C> {
        let tmp = this.right;
        this.right = tmp.left;
        tmp.left = this;

        this.height = this.getMaxChildHeight() + 1;
        tmp.height = tmp.getMaxChildHeight() + 1;
        return tmp;
    }

    public rotateLR(): AvlNode<T, C> {
        this.left = this.left.rotateRR();
        return this.rotateLL();
    }

    public rotateRL(): AvlNode<T, C> {
        this.right = this.right.rotateLL();
        return this.rotateRR();
    }
}   

export class NumericAvlTree extends AvlTree<number,  Comparator<number>> {
    constructor() {
        super( new Comparator<number>());
    }
}
