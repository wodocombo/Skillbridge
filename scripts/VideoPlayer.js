const rootSelector = "[data-js-video-player]";

class VideoPlayer {
    selectors = {
        root: rootSelector,
        playerVideo: "[data-js-video-player-video]",
        controlPanel: "[data-js-video-player-control-panel]",
        playerButton: "[data-js-video-player-button]",
    };

    stateClasses = {
        controlPanelIsActive: "video-player__control-panel--active",
    };

    stateAttributes = {
        ariaLabel: "aria-label",
    };

    constructor(element) {
        this.rootElement = element;

        this.playerVideoElement = this.rootElement.querySelector(
            this.selectors.playerVideo
        );

        this.controlPanelElement = this.rootElement.querySelector(
            this.selectors.controlPanel
        );

        this.playerButtonElement = this.rootElement.querySelector(
            this.selectors.playerButton
        );

        this.bindEvents();
    }

    changeStateVideoElements(isVideoPlay) {
        this.playerVideoElement.controls = isVideoPlay;

        const ariaLabelText = isVideoPlay
            ? "Приостановить видео"
            : "Воспроизвести видео";

        this.playerButtonElement.setAttribute(
            this.stateAttributes.ariaLabel,
            ariaLabelText
        );

        if (isVideoPlay) {
            this.controlPanelElement.classList.remove(
                this.stateClasses.controlPanelIsActive
            );
        } else {
            this.controlPanelElement.classList.add(
                this.stateClasses.controlPanelIsActive
            );
        }
    }

    onPauseVideo = () => {
        setTimeout(() => {
            if (!this.playerVideoElement.seeking)
                this.changeStateVideoElements(false);
        }, 100);
    };

    onClickPlayerButton = () => {
        this.changeStateVideoElements(true);

        this.playerVideoElement.play();
    };

    bindEvents() {
        this.playerButtonElement.addEventListener(
            "click",
            this.onClickPlayerButton
        );

        this.playerVideoElement.addEventListener("pause", (e) =>
            this.onPauseVideo(e)
        );
    }
}

class VideoPlayerCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new VideoPlayer(element);
        });
    }
}

export default VideoPlayerCollection;
