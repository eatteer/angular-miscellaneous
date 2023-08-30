const SCROLL_PERCENTAGE = "--scroll-percentage";
const SECTION_TWO = "--opacity";

const onScroll = (_) => {
  const { documentElement } = document;
  const { scrollTop, clientHeight } = documentElement;
  const scrollPercentage = (scrollTop / clientHeight) * 100;

  documentElement.style.setProperty(
    SCROLL_PERCENTAGE,
    Math.min(scrollPercentage, 100)
  );

  documentElement.style.setProperty(
    SECTION_TWO,
    Math.min(scrollPercentage / 100, 1)
  );
};

window.addEventListener("scroll", onScroll);
