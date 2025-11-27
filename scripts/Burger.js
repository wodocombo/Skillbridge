const rootSelector = "[data-js-header]";

class Burger {
    selectors = {
        root: rootSelector,
        menu: "[data-js-menu]",
        burgerButton: "[data-js-burger-button]",
    };

    stateClasses = {
        menuIsExpanded: "header__menu--expanded",
        buttonIsActive: "header__burger-button--active",
        menuLinkIsActive: "header__menu-link--active",
    };

    stateAttributes = {
        ariaExpanded: "aria-expanded",
        ariaLabel: "aria-label",
    };

    constructor(mediaQuery) {
        this.rootElement = document.querySelector(this.selectors.root);

        if (this.rootElement === null) {
            throw new Error("Не найден `Header`");
        }

        this.menuElement = this.rootElement.querySelector(this.selectors.menu);

        this.linkElements = this.menuElement.querySelectorAll("a");

        this.burgerButtonElement = this.rootElement.querySelector(
            this.selectors.burgerButton
        );

        this.mediaQuery = mediaQuery;

        this.setLinksTabIndex(!this.mediaQuery.matches);

        this.setButtonTabIndex();

        this.bindEvents();
    }

    setButtonTabIndex() {
        this.burgerButtonElement.tabIndex = this.mediaQuery.matches ? 0 : -1;
    }

    getNotActiveLinks() {
        const arrayLinks = [...this.linkElements];

        return Array.from(this.linkElements).filter(
            (link) =>
                !link.classList.contains(this.stateClasses.menuLinkIsActive)
        );
    }

    setLinksTabIndex(isLinksActive) {
        this.linkElements.forEach((element) => {
            if (
                element.classList.contains(this.stateClasses.menuLinkIsActive)
            ) {
                element.tabIndex = -1;
                return;
            }

            element.tabIndex = isLinksActive ? 0 : -1;
        });
    }

    onClickBurgerButton = () => {
        const buttonIsActive = this.burgerButtonElement.classList.toggle(
            this.stateClasses.buttonIsActive
        );

        const ariaLabelText = buttonIsActive ? "Закрыть меню" : "Открыть меню";

        this.burgerButtonElement.setAttribute(
            this.stateAttributes.ariaExpanded,
            buttonIsActive
        );

        this.burgerButtonElement.setAttribute(
            this.stateAttributes.ariaLabel,
            ariaLabelText
        );

        const menuState = this.menuElement.classList.toggle(
            this.stateClasses.menuIsExpanded
        );

        this.setLinksTabIndex(menuState);

        for (const linkElement of this.linkElements) {
            const isLinkActive = !linkElement.classList.contains(
                this.stateClasses.menuLinkIsActive
            );

            if (isLinkActive) {
                linkElement.focus();
                break;
            }
        }
    };

    onPhabletMatchMediaChange = () => {
        this.setButtonTabIndex();

        const menuIsExpanden = this.menuElement.classList.contains(
            this.stateClasses.menuIsExpanded
        );

        if (this.mediaQuery.matches && !menuIsExpanden) {
            this.setLinksTabIndex(false);
        }

        if (!this.mediaQuery.matches) {
            this.setLinksTabIndex(true);
        }
    };

    onKeydownMenu = (event) => {
        if (!this.mediaQuery.matches) return;

        const { code, shiftKey, target } = event;

        if (code !== "Tab") {
            return;
        }

        const activeLinks = this.getNotActiveLinks();

        const firstActriveLink = activeLinks[0];
        const lastActriveLink = activeLinks[activeLinks.length - 1];

        if (lastActriveLink === target && !shiftKey) {
            this.burgerButtonElement.click();
            this.burgerButtonElement.focus();
            event.preventDefault();
        }

        if (firstActriveLink === target && shiftKey) {
            this.burgerButtonElement.click();
            this.burgerButtonElement.focus();
            event.preventDefault();
        }
    };

    bindEvents() {
        this.burgerButtonElement.addEventListener(
            "click",
            this.onClickBurgerButton
        );

        this.menuElement.addEventListener("keydown", this.onKeydownMenu);

        this.mediaQuery.addEventListener(
            "change",
            this.onPhabletMatchMediaChange
        );
    }
}

export default Burger;
