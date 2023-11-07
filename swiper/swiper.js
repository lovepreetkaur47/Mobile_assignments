$(document).ready(function(){
let mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 'vertical' for vertical slider
    loop: true, // Loop the slides
    navigation: {          
        nextEl: ".swiper-button-next",          
        prevEl: ".swiper-button-prev",        
    }
});
})

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Swiper
  
  $('#personalForm').validate({
      // Validation rules for the personal information form
      errorElement: 'span',
      errorPlacement: function (error, element) {
          error.addClass('error-message');
          error.insertAfter(element);
      },
      rules: {
          name: 'required',
          dob: 'required',
          gender: 'required',
      },
      messages: {
          name: 'Please enter your name',
          dob: 'Please enter your date of birth',
          gender: 'Please select your gender',
      },
  });

  $('#contactForm').validate({
      // Validation rules for the contact information form
      errorElement: 'span',
      errorPlacement: function (error, element) {
          error.addClass('error-message');
          error.insertAfter(element);
      },
      rules: {
          email: {
              required: true,
              email: true,
          },
          phone: {
              required: true,
              pattern: /^\d{3}-\d{3}-\d{4}$/,
          },
          address: 'required',
      },
      messages: {
          email: 'Please enter a valid email address',
          phone: 'Please enter a valid phone number (e.g., 123-456-7890)',
          address: 'Please enter your address',
      },
  });

  const paymentForm = document.getElementById('paymentForm');

  if (paymentForm) {
      paymentForm.addEventListener('submit', function (e) {
          e.preventDefault();

          const validator = new FormValidator('paymentForm', [
              // Validation rules for the payment form
              {
                  name: 'creditCard',
                  rules: 'required|numeric|exact_length[10]',
                  messages: {
                      required: 'Credit card number is required',
                      numeric: 'Please enter a numeric value',
                      exact_length: 'Credit card number must be 10 digits',
                  },
              },
              {
                  name: 'expirationDate',
                  rules: 'required',
                  messages: {
                      required: 'Expiration date is required',
                  },
              },
              {
                  name: 'cvv',
                  rules: 'required|numeric|exact_length[3]',
                  messages: {
                      required: 'CVV is required',
                      numeric: 'Please enter a numeric value',
                      exact_length: 'CVV must be 3 digits',
                  },
              },
          ]);

          const validationResponse = validator.validateForm();

          if (validationResponse !== true) {
              for (const error of validationResponse) {
                  const field = document.querySelector(`[name=${error.name}]`);
                  if (field) {
                      const errorMessage = document.createElement('span');
                      errorMessage.classList.add('error-message');
                      errorMessage.textContent = error.message;
                      field.parentNode.appendChild(errorMessage);
                  }
              }
          } else {
              paymentForm.submit();
          }
      });
  }

  function adjustLayout() {
      const screenWidth = window.innerWidth;
      const body = document.querySelector('body');

      if (screenWidth <= 600) {
          body.style.backgroundColor = '#f0f0f0';
          const labels = document.querySelectorAll('label');
          labels.forEach((label) => {
              label.style.fontSize = '1.2em';
          });
      } else {
          body.style.backgroundColor = '#dcdcdc';
      }
  }

  adjustLayout();
  window.addEventListener('resize', adjustLayout);
});
