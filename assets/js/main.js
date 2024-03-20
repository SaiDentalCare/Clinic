
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


function sendToWhatsapp2(){
	let waNumber = "9848052840";

	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
  let number = document.getElementById('number').value;
	let message = document.getElementById('message').value;

	var url = "https://wa.me/" + waNumber + "?text="
	+ "*Name:* " +name+ "%0a"
	+ "*Email:* " +email+ "%0a"
  + "*Number:* " +number+ "%0a"
	+ "*Message:* " +message+ "%0a%0a";

	window.open(url, '_blank').focus();
}


function sendToWhatsapp() {
  let number = "9848052840";
  const nameInput = document.getElementById('nameInput').value.trim();
  const emailInput = document.getElementById('emailInput').value.trim();
  const numberInput = document.getElementById('numberInput').value.trim();
  const dateInput = document.getElementById('dateInput').value.trim();
  const timeInput = document.getElementById('timeInput').value.trim();
  const ampmInput = document.getElementById('ampmInput').value.trim();
  const formattedDateTime = dateInput + " " + timeInput + " " + ampmInput;

  const messageInput = document.getElementById('messageInput').value.trim();

  var url = "https://wa.me/" + number + "?text="
    + "*Name*: " + nameInput + "%0a"
    + "*Email*: " + emailInput + "%0a"
    + "*Number*: " + numberInput + "%0a"
    + "*Date and Time*: " + formattedDateTime + "%0a"
    + "*Message*: " + messageInput + "%0a%0a";

  window.open(url, '_blank').focus();
}


function displayAlert(message, className) {
  // Create a toast element
  const toastDiv = document.createElement('div');
  toastDiv.className = `toast align-items-center ${className}`;
  toastDiv.setAttribute('role', 'alert');
  toastDiv.setAttribute('aria-live', 'assertive');
  toastDiv.setAttribute('aria-atomic', 'true');

  // Create the inner structure of the toast
  const toastInnerDiv = document.createElement('div');
  toastInnerDiv.className = 'd-flex';

  const toastBodyDiv = document.createElement('div');
  toastBodyDiv.className = 'toast-body text-black';
  toastBodyDiv.appendChild(document.createTextNode(message));

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close me-2 m-auto';
  closeButton.setAttribute('data-bs-dismiss', 'toast');
  closeButton.setAttribute('aria-label', 'Close');

  // Assemble the toast structure
  toastInnerDiv.appendChild(toastBodyDiv);
  toastInnerDiv.appendChild(closeButton);
  toastDiv.appendChild(toastInnerDiv);

  // Add styles for a smaller toast box and bottom margin (you can adjust these as needed)
  toastDiv.style.fontSize = '12px';
  toastDiv.style.padding = '8px';
  toastDiv.style.borderRadius = '4px';
  toastDiv.style.marginBottom = '10px';

  // Insert the toast at the beginning of the form
  const form = document.getElementById('signupForm');
  form.insertBefore(toastDiv, form.firstChild);

  // Activate the Bootstrap Toast component
  const toast = new bootstrap.Toast(toastDiv);
  toast.show();

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toastDiv.remove();
  }, 3000);
}


function nextField(nextFieldId, validationFunction = null) {
  if (validationFunction && !window[validationFunction]()) {
    return;
  }

  hideAllFields();
  document.getElementById(nextFieldId).style.display = 'block';

  // Focus on the first input field of the displayed section
  const firstInputField = document.getElementById(nextFieldId).querySelector('input, textarea');
  if (firstInputField) {
    firstInputField.focus();
  }
}

function prevField(prevFieldId) {
  hideAllFields();
  document.getElementById(prevFieldId).style.display = 'block';

  // Focus on the first input field of the displayed section
  const firstInputField = document.getElementById(prevFieldId).querySelector('input, textarea');
  if (firstInputField) {
    firstInputField.focus();
  }
}

function hideAllFields() {
  const fieldIds = ['nameField', 'emailField', 'numberField', 'dateTimeField', 'messageField'];
  fieldIds.forEach(fieldId => {
    document.getElementById(fieldId).style.display = 'none';
  });
}

function isValidEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateNameField() {
  const nameInput = document.getElementById('nameInput').value.trim();

  if (nameInput === "") {
    displayAlert("Please enter your name.", "alert-danger");
    return false;
  }

  return true;
}

function validateEmailField() {
  const emailInput = document.getElementById('emailInput').value.trim();

  if (!isValidEmail(emailInput)) {
    displayAlert("Please enter a valid email address", "alert-danger");
    return false;
  }

  return true;
}

function validateNumberField() {
  const numberInput = document.getElementById('numberInput').value.trim();

  if (numberInput === "" || !/^[0-9]{10}$/.test(numberInput)) {
    displayAlert("Please enter a valid 10-digit number.", "alert-danger");
    return false;
  }

  return true;
}

function validateDateTimeField() {
  const dateInput = document.getElementById('dateInput').value.trim();
  const timeInput = document.getElementById('timeInput').value.trim();
  const ampmInput = document.getElementById('ampmInput').value.trim();

  if (!dateInput || !timeInput || !ampmInput) {
    displayAlert("Please select both date and time.", "alert-danger");
    return false;
  }

  return true;
}


// Add event listener for Enter key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission behavior
    simulateNextButtonClick();
  }
});

function simulateNextButtonClick() {
  const activeField = document.querySelector('.inputFields[style="display: block;"]');
  const nextButton = activeField.querySelector('.btn-primary:not([onclick*="prevField"])');
  if (nextButton) {
    nextButton.click();
  }
}




// function nextField(nextFieldId, validationFunction = null) {
//   if (validationFunction && !window[validationFunction]()) {
//     return;
//   }

//   hideAllFields();
//   document.getElementById(nextFieldId).style.display = 'block';

//   // Focus on the first input field of the displayed section
//   const firstInputField = document.getElementById(nextFieldId).querySelector('input, textarea');
//   if (firstInputField) {
//     firstInputField.focus();
//   }
// }

// function prevField(prevFieldId) {
//   hideAllFields();
//   document.getElementById(prevFieldId).style.display = 'block';

//   // Focus on the first input field of the displayed section
//   const firstInputField = document.getElementById(prevFieldId).querySelector('input, textarea');
//   if (firstInputField) {
//     firstInputField.focus();
//   }
// }

// function hideAllFields() {
//   const fieldIds = ['nameField', 'emailField', 'numberField', 'messageField'];
//   fieldIds.forEach(fieldId => {
//     document.getElementById(fieldId).style.display = 'none';
//   });
// }

// function isValidEmail(email) {
//   // Basic email validation using a regular expression
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function validateNameField() {
//   const nameInput = document.getElementById('nameInput').value.trim();

//   if (nameInput === "") {
//     displayAlert("Please enter your name.", "alert-danger");
//     return false;
//   }

//   return true;
// }

// function validateEmailField() {
//   const emailInput = document.getElementById('emailInput').value.trim();

//   if (!isValidEmail(emailInput)) {
//     displayAlert("Please enter a valid email address", "alert-danger");
//     return false;
//   }

//   return true;
// }

// function validateNumberField() {
//   const numberInput = document.getElementById('numberInput').value.trim();

//   if (numberInput === "" || !/^[0-9]{10}$/.test(numberInput)) {
//     displayAlert("Please enter a valid 10-digit number.", "alert-danger");
//     return false;
//   }

//   return true;
// }

// // Add event listener for Enter key press
// document.addEventListener('keydown', function (event) {
//   if (event.key === 'Enter') {
//     event.preventDefault(); // Prevent default form submission behavior
//     simulateNextButtonClick();
//   }
// });

// function simulateNextButtonClick() {
//   const activeField = document.querySelector('.inputFields[style="display: block;"]');
//   const nextButton = activeField.querySelector('.btn-primary:not([onclick*="prevField"])');
//   if (nextButton) {
//     nextButton.click();
//   }
// }


