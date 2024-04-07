import BasicDomain from "./BasicDomain.js";

export default class Preference extends BasicDomain {

    static DIFICULTY_0 ="Trivial"
    static DIFICULTY_1 ="Easy"
    static DIFICULTY_2 ="Medium"
    static DIFICULTY_3 ="Challenging"
    static DIFICULTY_4 ="Hard"
    static DIFICULTY_5 ="Extreme"
    static DIFICULTY_6 ="Suicide Mission"
    static DIFICULTY_7 ="Impossible"
    static DIFICULTY_8 ="Helldive"

    static DIFFICULTIES = [
        Preference.DIFICULTY_0,
        Preference.DIFICULTY_1,
        Preference.DIFICULTY_2,
        Preference.DIFICULTY_3,
        Preference.DIFICULTY_4,
        Preference.DIFICULTY_5,
        Preference.DIFICULTY_6,
        Preference.DIFICULTY_7,
        Preference.DIFICULTY_8,
    ]

    static INTENSITY_CASUAL = 'Casual'
    
    static INTENSITY_DETERMINED = 'Determined'
    
    static INTENSITY_SWEATY = 'Sweaty'
    

    static INTENSITIES = [
        Preference.INTENSITY_CASUAL,
        Preference.INTENSITY_DETERMINED,
        Preference.INTENSITY_SWEATY,
    ]

    static FOCUS_LIBERATION = "Liberation"
    static FOCUS_FULL_STARS = "Full Stars"
    static FOCUS_SAMPLES = "Samples"
    static FOCUS_MEDALS = "Medals"

    static FOCUSES = [
        Preference.FOCUS_LIBERATION,
        Preference.FOCUS_FULL_STARS,
        Preference.FOCUS_SAMPLES,
        Preference.FOCUS_MEDALS,
    ]

    static MIC_NONE = "None"
    static MIC_LOGISTICAL = "Logistical"
    static MIC_SOCIAL = "Social"

    static MIC_OPTIONS = [
        Preference.MIC_NONE,
        Preference.MIC_LOGISTICAL,
        Preference.MIC_SOCIAL,
    ]

    static BUGS = "Bugs"
    static BOTS = "Bots"

    static ENEMIES = [
        Preference.BUGS,
        Preference.BOTS,
    ]

    static DEFAULTS = {
        difficulties: [],
        focus: Preference.FOCUS_LIBERATION,
        intensity: Preference.INTENSITY_DETERMINED,
        mic: Preference.MIC_LOGISTICAL,
        enemies: Preference.ENEMIES,
    }

    constructor(props = {}) {

        super(props);
        this.objectId = props.objectId || null;
        this.difficulties = props.difficulties || Preference.DEFAULTS.difficulties;
        this.focus = props.focus || Preference.DEFAULTS.focus;
        this.intensity = props.intensity || Preference.DEFAULTS.intensity;
        this.mic = props.mic || Preference.DEFAULTS.mic;
        this.enemies = props.enemies || Preference.DEFAULTS.enemies;
    }


    validate = () => {
        if (!this.difficulties.length) {
            throw 'Please select at least one difficulty';
        }
        if (!this.enemies.length) {
            throw 'Please select at least one enemy';
        }
    }

    getActionToken = () => {
        return {
            objectId: this.objectId,
            difficulties: this.difficulties,
            focus: this.focus,
            intensity: this.intensity,
            mic: this.mic,
            enemies: this.enemies,
        }
    };
}
