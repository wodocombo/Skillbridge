const rootSelector = "[data-js-button-price]";

class ButtonPrice {
    selectors = {
        root: rootSelector,
        button: "[data-js-button-price-button]",
        price: "[data-js-price]",
        value: "[data-js-price-value]",
        period: "[data-js-price-period]",
    };

    stateClasses = {
        buttonActive: "button-price__button--active",
    };

    attributes = {
        button: "data-js-button-price-button",
        pricePeriod: "data-js-price-period",
        dateInterval: "data-js-date-interval",
        originalPrice: "data-js-original-price",
    };

    constructor(element) {
        this.rootElement = element;

        this.buttonElements = this.rootElement.querySelectorAll(
            this.selectors.button
        );

        this.bindEvents();
    }

    changePriceAndPeriod(targetButton) {
        const priceElements = document.querySelectorAll(this.selectors.price);

        const pricePeriod = targetButton.getAttribute(
            this.attributes.pricePeriod
        );

        const dateInterval = targetButton.getAttribute(
            this.attributes.dateInterval
        );

        priceElements.forEach((element) => {
            const valueElement = element.querySelector(this.selectors.value);

            const originalValue = valueElement.getAttribute(
                this.attributes.originalPrice
            );

            valueElement.innerText = +pricePeriod * +originalValue;

            const periodElement = element.querySelector(this.selectors.period);

            periodElement.innerText = `/${dateInterval}`;
        });
    }

    onClick = (event) => {
        const { target } = event;

        if (!target.hasAttribute(this.attributes.button)) return;

        this.buttonElements.forEach((element) => {
            element.classList.remove(this.stateClasses.buttonActive);
        });

        target.classList.add(this.stateClasses.buttonActive);

        this.changePriceAndPeriod(target);
    };

    bindEvents() {
        this.rootElement.addEventListener("click", this.onClick);
    }
}

class ButtonPriceCollection {
    constructor() {
        const allButtonElements = document.querySelectorAll(rootSelector);

        allButtonElements.forEach((element) => new ButtonPrice(element));
    }
}

export default ButtonPriceCollection;
