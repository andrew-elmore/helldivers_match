import BasicDomain from "./BasicDomain.js";

export default class Preference extends BasicDomain {
    constructor(props = {}) {
        super(props);
        this.difficulties = props.difficulties || Preference.DEFAULTS.difficulties;
        this.focus = props.focus || Preference.DEFAULTS.focus;
        this.intensity = props.intensity || Preference.DEFAULTS.intensity;
        this.mic = props.mic || Preference.DEFAULTS.mic;
        this.enemies = props.enemies || Preference.DEFAULTS.enemies;
    }


    isSavable = () => (
        this.difficulties.length > 0
    );

    getActionToken = () => {
        return {
            difficulties: this.difficulties,
            focus: this.focus,
            intensity: this.intensity,
            mic: this.mic,
            enemies: this.enemies,
        }
    };
}
