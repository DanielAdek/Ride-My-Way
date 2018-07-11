const backdrop = document.querySelector('.backdrop');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');

toggleButton.addEventListener('click', openMobileNav);
backdrop.addEventListener('click', closeMobileNav);

function openMobileNav() {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
}

function closeMobileNav() {
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
}