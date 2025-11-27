const ROOT = "[data-js-password-toggle]";

class PasswordToggle {
    selectors = {
        root: ROOT,
        input: "[data-js-password-input]",
        button: "[data-js-password-button]",
    };

    stateClasses = {
        buttonActive: "field__password-toggle--active",
    };

    constructor(element) {
        this.rootElement = element;

        this.inputElement = this.rootElement.querySelector(
            this.selectors.input
        );

        this.buttonElement = this.rootElement.querySelector(
            this.selectors.button
        );

        this.bindEvents();
    }

    onButtonClick() {
        const buttonState = this.buttonElement.classList.toggle(
            this.stateClasses.buttonActive
        );

        if (buttonState) {
            this.inputElement.type = "text";
        } else {
            this.inputElement.type = "password";
        }
    }

    bindEvents() {
        this.buttonElement.addEventListener("click", () =>
            this.onButtonClick()
        );
    }
}

class PasswordToggleList {
    constructor() {
        document.querySelectorAll(ROOT).forEach((element) => {
            new PasswordToggle(element);
        });
    }
}

export default PasswordToggleList;
