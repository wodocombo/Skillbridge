const root = "[data-testimonials-slider-container]";

class TestimonialsSlider {
    selectors = {
        root: root,
        slider: "[data-testimonials-slider]",
        sliderItem: "[data-testimonials-slider-item]",
        itemLink: "[data-testimonials-slider-link]",
        buttonPrev: "[data-testimonials-slider-button-prev]",
        buttonNext: "[data-testimonials-slider-button-next]",
    };

    stateClasses = {
        activeItem: "slider__item--active",
    };

    constructor(element) {
        this.rootElement = element;

        this.sliderElement = this.rootElement.querySelector(
            this.selectors.slider
        );

        this.sliderItemElements = this.rootElement.querySelectorAll(
            this.selectors.sliderItem
        );

        this.itemLinkElements = this.rootElement.querySelectorAll(
            this.selectors.itemLink
        );

        this.buttonPrevElement = this.rootElement.querySelector(
            this.selectors.buttonPrev
        );

        this.buttonNextElement = this.rootElement.querySelector(
            this.selectors.buttonNext
        );

        this.currentIndex = 0;

        this.activeSliderItemElement =
            this.sliderItemElements[this.currentIndex];

        this.activeItemLinkElement = this.itemLinkElements[this.currentIndex];

        this.itemLinkElements.forEach((link) => (link.tabIndex = -1));

        this.updateSlider();

        this.bindEvents();
    }

    changeCurrentIndex = (isNext) => {
        const slideCount = this.sliderItemElements.length;

        if (isNext) {
            this.currentIndex = (this.currentIndex + 1) % slideCount;
        } else {
            this.currentIndex =
                (this.currentIndex - 1 + slideCount) % slideCount;
        }

        this.updateSlider();
    };

    changeActiveSliderItem() {
        this.activeSliderItemElement.classList.remove(
            this.stateClasses.activeItem
        );

        this.activeItemLinkElement.tabIndex = -1;

        this.activeSliderItemElement =
            this.sliderItemElements[this.currentIndex];

        this.activeItemLinkElement = this.itemLinkElements[this.currentIndex];

        this.activeSliderItemElement.classList.add(
            this.stateClasses.activeItem
        );

        this.activeItemLinkElement.tabIndex = 0;
    }

    updateSlider() {
        this.changeActiveSliderItem();

        this.sliderElement.style.transform = `translateX(-${
            this.currentIndex * 100
        }%)`;
    }

    bindEvents() {
        this.buttonPrevElement.addEventListener("click", () =>
            this.changeCurrentIndex(false)
        );

        this.buttonNextElement.addEventListener("click", () =>
            this.changeCurrentIndex(true)
        );
    }
}

class TestimonialsSliderList {
    constructor() {
        document
            .querySelectorAll(root)
            .forEach((e) => new TestimonialsSlider(e));
    }
}

export default TestimonialsSliderList;
