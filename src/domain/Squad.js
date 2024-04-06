import BasicDomain from "./BasicDomain.js";
import Preference from "./Preference.js";

export default class Squad extends BasicDomain {
    constructor(props = {}) {
        super(props);
        this.host = props.host || '';
        this.guests = props.guests || [];
        this.friendCode = props.friendCode || '';
        this.preference = new Preference(props.preference || {})
    }

    validate () {
        if (!this.friendCode.length) {
            throw 'Please enter a valid friend code.';
        }
        this.preference.validate();
    }

    getActionToken () {
        return {
            host: this.host,
            guests: this.guests,
            friendCode: this.friendCode,
            preference: this.preference.getActionToken()
        }
    };
}
