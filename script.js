/* ===============================
   🚀 INITIALIZATION
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initMobileMenu();
  initActiveLinks();
  initSlider();
  initFeedbackForm();
});

/* ===============================
   🎬 AOS (Animation on Scroll)
================================ */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }
}

/* ===============================
   🎨 Tailwind Custom Config
================================ */
tailwind.config = {
  theme: {
    extend: {
      animation: {
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};

/* ===============================
   📱 MOBILE MENU
================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !closeBtn || !mobileMenu) return;

  // Select all links inside the mobile menu dynamically
  // (No need for specific classes like .mobile-link)
  const mobileLinks = mobileMenu.querySelectorAll("a");

  // Open menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
  });

  // Reusable Close Menu function
  const closeMenu = () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  };

  // Close menu on "X" button click
  closeBtn.addEventListener("click", closeMenu);

  // Close on ANY link click inside the mobile menu
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ===============================
   📍 ACTIVE NAV LINK ON SCROLL
================================ */
function initActiveLinks() {
  const sections = document.querySelectorAll("section[id]");
  // Target links in both desktop nav and mobile menu
  const navLinks = document.querySelectorAll("nav a, #mobileMenu a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            // Remove active states (adjusted to purple-400 to match your theme)
            link.classList.remove("text-purple-400", "font-semibold");

            // Add active state if the href matches the section ID
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("text-purple-400", "font-semibold");
            }
          });
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ===============================
   🎠 TESTIMONIAL SLIDER
================================ */
function initSlider() {
  const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (!slides) return;

  const slideCount = slides.children.length;
  let index = 0;

  function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.remove("bg-purple-500", "scale-125");
      dot.classList.add("bg-gray-600");

      if (i === index) {
        dot.classList.add("bg-purple-500", "scale-125");
        dot.classList.remove("bg-gray-600");
      }
    });
  }

  // Next
  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slideCount;
    updateSlider();
  });

  // Prev
  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slideCount) % slideCount;
    updateSlider();
  });

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
    });
  });

  // Auto slide
  setInterval(() => {
    index = (index + 1) % slideCount;
    updateSlider();
  }, 5000);

  updateSlider();
}

/* ===============================
   📝 FEEDBACK FORM
================================ */
function initFeedbackForm() {
  // Fix: Targeting the form tag directly instead of expecting an ID
  // since your HTML just has <form action="#" method="POST">
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    // Validation
    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields!",
        confirmButtonColor: "#6f42c1",
      });
      return;
    }

    // Success
    Swal.fire({
      icon: "success",
      title: "Feedback Submitted!",
      text: "Thank you for your feedback 🙌",
      confirmButtonColor: "#6f42c1",
    });

    form.reset();
  });
}
