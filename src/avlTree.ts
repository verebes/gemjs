export interface IAvlTree<T> {
    right: IAvlTree<T>;
    left: IAvlTree<T>;

    height: number;
    value: T;

    has(t: T): boolean;
    insert(t: T): void;
    delete(t: T): void;
    minValue(): T;
    preceding(): T;
    succeeding(): T;
}

export class AvlTree<T> implements IAvlTree<T> {
    get right(): IAvlTree<T> {
        return this.root.right;
    }
    get left(): IAvlTree<T> {
        return this.root.left;
    }

    get height(): number {
        return this.root.height;
    }

    get value(): T {
        return this.root.value;
    }

    constructor() {
        this.root = new AvlNode<T>();
        this.root.left = new AvlNode<T>();
        this.root.right = new AvlNode<T>();
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

        if (this.root.value === t) {
            if (this.root.right) {
                this.root = this.root.right;
            } else if (this.root.left) {
                this.root = this.root.left;
            } else {
                this.root = new AvlNode<T>();
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

    private root = new AvlNode<T>();
}

class AvlNode<T> implements IAvlTree<T>  {

    public value: T;
    public height: number;
    public left: AvlNode<T>;
    public right: AvlNode<T>;

    constructor() {
        this.value = null;
        this.height = 0;
        this.left = null;
        this.right = null;
    }

    public has(t: T): boolean {
        if (this.value === null) {
            return false;
        }

        if (this.value === t) {
            return true;
        }

        if (t < this.value) {
            return this.left.has(t);
        } else {
            return this.right.has(t);
        }
    }

    public insert(t: T): AvlNode<T> {
        if (this.value === null) {
            this.value = t;
            this.height = 1;
            this.left = new AvlNode<T>();
            this.right = new AvlNode<T>();
            return this;
        }

        if (t < this.value) {
            this.left = this.left.insert(t);
        } else {
            this.right = this.right.insert(t);
        }

        this.height = this.getMaxChildHeight() + 1;

        return this.rebalance(t);
    }

    private rebalance(t: T) {
        let newRoot: AvlNode<T> = this;
        let balance: number = this.left.height - this.right.height;

        if (balance < -1) {
            if (t > this.right.value) {
                newRoot = this.rotateRR();
            } else {
                newRoot = this.rotateRL();
            }
        } else if (balance > 1) {
            if (t < this.left.value) {
                newRoot = this.rotateLL();
            } else {
                newRoot = this.rotateLR();
            }
        }
        return newRoot;
    }

    public delete(t: T): AvlNode<T> {
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


    private deleteChild(t: T, parent: AvlNode<T>): AvlNode<T> {
        if (this.value === null) {
            return this;
        }

        if (t < this.value) {
            if (this.left === null) {
                return this;
            }
            this.left = this.left.deleteChild(t, this);
            this.height = this.getMaxChildHeight() + 1;
        } else if (t > this.value) {
            if (this.right === null) {
                return this;
            }
            this.right = this.right.deleteChild(t, this);
            this.height = this.getMaxChildHeight() + 1;
        } else {
            if (this.left.isLeaf() && this.right.isLeaf()) {
                return new AvlNode<T>();
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

        let result: AvlNode<T> = this;

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
        let p: AvlNode<T> = this;
        while (p.left !== null) {
            p = p.left;
        }
        return p.value;
    }

    public succeeding(): T {
        let p: AvlNode<T> = this;
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

    public rotateLL(): AvlNode<T> {
        let tmp = this.left;
        this.left = tmp.right;
        tmp.right = this;

        this.height = this.getMaxChildHeight() + 1;
        tmp.height = tmp.getMaxChildHeight() + 1;
        return tmp;
    }

    public rotateRR(): AvlNode<T> {
        let tmp = this.right;
        this.right = tmp.left;
        tmp.left = this;

        this.height = this.getMaxChildHeight() + 1;
        tmp.height = tmp.getMaxChildHeight() + 1;
        return tmp;
    }

    public rotateLR(): AvlNode<T> {
        this.left = this.left.rotateRR();
        return this.rotateLL();
    }

    public rotateRL(): AvlNode<T> {
        this.right = this.right.rotateLL();
        return this.rotateRR();
    }
}   