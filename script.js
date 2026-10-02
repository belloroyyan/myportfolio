document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  header.style.boxShadow = current > 10 ? "0 8px 25px rgba(20,20,20,.035)" : "none";
  lastScroll = current;
}, { passive: true });


const revealGroups = [
  {
    selector: ".intro-strip, .section-heading, .about-grid, .future-projects, .contact-inner",
    direction: "slide-left"
  },
  {
    selector: ".featured-project, .skills-grid, .experience-row, .education-row",
    direction: "slide-right"
  },
  {
    selector: ".skill-group, .achievement-card, .future-card",
    direction: "slide-up"
  }
];

revealGroups.forEach(({ selector, direction }) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("slide-reveal", direction);
    element.classList.add(`slide-stagger-${(index % 4) + 1}`);
  });
});

const revealElements = document.querySelectorAll(".slide-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -70px 0px"
  });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}
