import BasicDomain from './BasicDomain';

export default class BasicArray extends Array {
    get myClass() { return BasicArray; }

    get myItemClass() { return BasicDomain; }

    constructor(items = []) {
        super();
        for (let i = 0; i < items.length; i += 1) {
            this.add(items[i]);
        }
        this.assignIds();
        this.sort();
    }

    assignIds = () => {
        this.forEach((item, idx) => {
            if (item.id === undefined) {
                item.id = idx;
            }
        })
    }
    clone = () => {
        const C = this.myClass;
        return new C(this);
    };

    add = (item) => {
        const C = this.myItemClass;
        this.push(new C(item));
        this.sort();
        return this;
    };

    update = (item) => {
        for (let i = 0, len = this.length; i < len; i += 1) {
            if (this[i].equals(item)) {
                this[i] = item;
            }
        }
        return this;
    };

    addUpdate = (item) => {
        let isChangeMade = false;
        for (let i = 0, len = this.length; i < len; i += 1) {
            if (this[i].equals(item)) {
                this[i] = item;
                isChangeMade = true;
            }
        }
        return isChangeMade ? this : this.add(item);
    };

    get = (id) => this.find((e) => e.id === id);

    contains = (item) => this.get(item.id) != null;

    remove = (target) => {
        const newList = this.filter((item) => !item.equals(target));
        this.splice(0);
        newList.forEach((item) => this.push(item));
        return this;
    };

    isEmpty = () => (this.length === 0);

    comparator = (a, b) => {
        const nameA = a.toString();
        const nameB = b.toString();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    };

    sort = () => super.sort(this.comparator);

    sortBy = (property) => {
        super.sort((a, b) => {
            const propA = a[property].toString().toUpperCase();
            const propB = b[property].toString().toUpperCase();
            if (propA < propB) {
                return -1;
            }
            if (propA > propB) {
                return 1;
            }
            return 0;
        });
    }

    toJSON = () => this.map((item) => item);

    toIds = () => this.map((item) => item.id);
    
    getActionToken () {
        return this.map(ele => ele.getActionToken())
      }

    get pointer() {
        return this.map((item) => item.pointer);
    }
}