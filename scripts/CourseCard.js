const rootSelector = "[data-js-course-card-list]";

class CourseCard {
    selectors = {
        root: rootSelector,
        container: "[data-js-course-card-container]",
        card: "[data-js-course-card]",
        tag: "[data-js-course-card-tag]",
    };

    stateClasses = {
        tag: "course-card__tag-button",
        tagIsActive: "course-card__tag-button--active",
    };

    constructor(element) {
        this.rootElement = element;

        this.cardElements = this.rootElement.querySelectorAll(
            this.selectors.card
        );

        this.bindEvents();
    }

    activeTags = new Set();

    applyFilters() {
        const active = Array.from(this.activeTags);

        this.cardElements.forEach((element) => {
            const allTags = Array.from(
                element.querySelectorAll(this.selectors.tag)
            );

            const allTagTexts = allTags.map((tag) => tag.innerText.trim());

            const showIfAllActiveTagsPresent = active.every((active) =>
                allTagTexts.includes(active)
            );

            allTags.forEach((tag) => {
                if (active.includes(tag.innerText.trim())) {
                    tag.classList.add(this.stateClasses.tagIsActive);
                } else {
                    tag.classList.remove(this.stateClasses.tagIsActive);
                }
            });

            const container = element.closest(this.selectors.container);

            if (showIfAllActiveTagsPresent || active.length === 0) {
                container.style.display = "";
            } else {
                container.style.display = "none";
            }
        });
    }

    onListClick = (event) => {
        const { target } = event;

        if (!target.classList.contains(this.stateClasses.tag)) {
            return;
        }

        if (!this.activeTags.has(target.innerText)) {
            this.activeTags.add(target.innerText);
        } else {
            this.activeTags.delete(target.innerText);
        }

        this.applyFilters();
    };

    bindEvents() {
        this.rootElement.addEventListener("click", this.onListClick);
    }
}

class CourseCardList {
    constructor() {
        document
            .querySelectorAll(rootSelector)
            .forEach((element) => new CourseCard(element));
    }
}

export default CourseCardList;
