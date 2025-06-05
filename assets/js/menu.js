document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', function() {
            // Toggle the 'menu-open' class to show/hide the mobile menu
            mobileMenu.classList.toggle('menu-open');
            // Toggle the 'open' class for hamburger button animation
            hamburgerButton.classList.toggle('open');
        });
    }
});
