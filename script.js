'use strict';

const letter = document.querySelector('.letter');
const customizer = document.querySelector('#personalizador');
const status = document.querySelector('#estado');
const openButtons = document.querySelectorAll('[data-open-customizer]');
const arrangement = document.querySelector('.arrangement');
const customizerForm = document.querySelector('.customizer-card');

function updateArrangement() {
  const rose = document.querySelector('input[name="roses"]:checked').value;
  const tulip = document.querySelector('input[name="tulips"]:checked').value;
  letter.dataset.rose = rose;
  letter.dataset.tulip = tulip;
  status.textContent = `Rosas ${rose} y tulipanes ${tulip}.`;
  document.querySelector('.arrangement').setAttribute(
    'aria-label',
    `Arreglo con rosas ${rose} y tulipanes ${tulip}.`
  );
}

updateArrangement();

if (typeof customizer.showModal === 'function') {
  openButtons.forEach((button) => {
    button.addEventListener('click', () => customizer.showModal());
  });

  customizer.addEventListener('click', (event) => {
    if (event.target === customizer) customizer.close();
  });

  customizer.addEventListener('change', (event) => {
    if (event.target.matches('input[type="radio"]')) updateArrangement();
  });

  customizerForm.addEventListener('submit', (event) => {
    if (!event.submitter.matches('[data-confirm-arrangement]')) return;

    letter.classList.add('arrangement-revealed');
    window.setTimeout(() => {
      arrangement.focus({ preventScroll: true });
      const arrangementTop = arrangement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, arrangementTop - window.innerHeight * .12),
        behavior: 'smooth'
      });
    }, 180);
  });
} else {
  openButtons.forEach((button) => button.remove());
}
