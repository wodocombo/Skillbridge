import MatchMedia from "./MatchMedia.js";

const ROOT = "[data-auth-container]";

const ACTIVE_MEDIA = MatchMedia.tablet;

class AuthDomReorder {
    selectors = {
        root: ROOT,
        formBlock: "[data-auth-form-block]",
        secondaryBlock: "[data-auth-secondary-block]",
    };

    constructor(element) {
        this.rootElement = element;

        this.formBlockElement = this.rootElement.querySelector(
            this.selectors.formBlock
        );

        this.secondaryBlockElement = this.rootElement.querySelector(
            this.selectors.secondaryBlock
        );

        this.bindEvents();
        this.MatchMediaChange();
    }

    MatchMediaChange = (matches = ACTIVE_MEDIA.matches) => {
        if (matches) {
            this.formBlockElement.after(this.secondaryBlockElement);
        } else {
            this.secondaryBlockElement.after(this.formBlockElement);
        }
    };

    bindEvents() {
        ACTIVE_MEDIA.addEventListener("change", () => this.MatchMediaChange());
    }
}

class AuthDomReorderList {
    constructor() {
        document.querySelectorAll(ROOT).forEach((e) => new AuthDomReorder(e));
    }
}

export default AuthDomReorderList;
