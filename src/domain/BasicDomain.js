export default class BasicDomain {
    get className() { throw new Error('Unknown class name'); }

    get myClass() { return BasicDomain; }

    constructor(props = {}) {
        this.id = props.id || props.objectId || null;
    }

    clone = () => {
        const C = this.myClass;
        return new C(this);
    };

    value = (k, v) => { if (v === undefined) { return this[k]; } this[k] = v; return this; };

    isSame = () => false;

    isSavable = () => false;

    equals = (obj) => (obj instanceof this.myClass && this.id === obj.id);

    getActionToken = () => {
        throw new Error('Action not allowed');
    };

    get pointer() {
        if (this.id == null || this.id === '') return undefined;
        return { __type: 'Pointer', className: this.className, objectId: this.id };
    }
}