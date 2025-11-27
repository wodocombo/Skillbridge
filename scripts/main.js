import MatchMedia from "./MatchMedia.js";

import Burger from "./Burger.js";
import VideoPlayerCollection from "./VideoPlayer.js";
import CourseCardList from "./CourseCard.js";
import ButtonPriceButtonPriceCollection from "./ButtonPrice.js";
import TestimonialsSliderList from "./TestimonialsSlider.js";
import AuthDomReorderList from "./AuthDomReorder.js";
import PasswordToggleList from "./PasswordToggle.js";

new Burger(MatchMedia.phablet);
new VideoPlayerCollection();
new CourseCardList();
new ButtonPriceButtonPriceCollection();
new TestimonialsSliderList();
new AuthDomReorderList();
new PasswordToggleList();
