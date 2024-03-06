
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

});


function showEmailField() {
  const nameInput = document.getElementById('nameInput').value.trim();

  if (nameInput === "") {
    displayAlert("Please enter your name before proceeding.", "alert-danger");
    return;
  }

  document.getElementById('nameField').style.display = 'none';
  document.getElementById('emailField').style.display = 'block';
  document.getElementById('messageField').style.display = 'none';
}

function showMessageField() {
  const emailInput = document.getElementById('emailInput').value.trim();

  if (!isValidEmail(emailInput)) {
    displayAlert("Please enter a valid email address before proceeding.", "alert-danger");
    return;
  }

  document.getElementById('nameField').style.display = 'none';
  document.getElementById('emailField').style.display = 'none';
  document.getElementById('messageField').style.display = 'block';
}

function showNameField() {
  document.getElementById('nameField').style.display = 'block';
  document.getElementById('emailField').style.display = 'none';
  document.getElementById('messageField').style.display = 'none';
}

function submitForm() {
  const nameInput = document.getElementById('nameInput').value.trim();
  const emailInput = document.getElementById('emailInput').value.trim();
  const messageInput = document.getElementById('messageInput').value.trim();

  if (nameInput === "") {
    displayAlert("Please enter your name.", "alert-danger");
    return;
  }

  if (!isValidEmail(emailInput)) {
    displayAlert("Please enter a valid email address.", "alert-danger");
    return;
  }

  if (messageInput === "") {
    displayAlert("Please enter your message.", "alert-danger");
    return;
  }

  // Proceed with form submission logic
  const whatsappMessage = `Name: ${nameInput}\nEmail: ${emailInput}\nMessage: ${messageInput}`;
  displayAlert("Sending message to WhatsApp:\n" + whatsappMessage, "alert-success");
}

function isValidEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayAlert(message, alertClass) {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
}


// WhatsApp Integration
// function showEmailField() {
//   document.getElementById('nameField').style.display = 'none';
//   document.getElementById('emailField').style.display = 'block';
//   document.getElementById('messageField').style.display = 'none';
// }

// function showMessageField() {
//   document.getElementById('nameField').style.display = 'none';
//   document.getElementById('emailField').style.display = 'none';
//   document.getElementById('messageField').style.display = 'block';
// }

// function showNameField() {
//   document.getElementById('nameField').style.display = 'block';
//   document.getElementById('emailField').style.display = 'none';
//   document.getElementById('messageField').style.display = 'none';
// }

// function submitForm() {
//   // Assuming you want to send a message to WhatsApp here
//   const name = document.getElementById('nameInput').value;
//   const email = document.getElementById('emailInput').value;
//   const message = document.getElementById('messageInput').value;

//   const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
//   // Replace the following line with your logic to send the message to WhatsApp
//   alert("Sending message to WhatsApp:\n" + whatsappMessage);
// }