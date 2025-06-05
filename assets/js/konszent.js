// Cookie Consent Script for Gálvill Autó Kft.

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Function to load Google Analytics
function loadGoogleAnalytics() {
    // Create and append the Google Analytics script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-9670872-2";
    document.head.appendChild(gaScript);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-9670872-2');
}

// Function to show the cookie consent banner
function showCookieConsent() {
    // Create overlay to prevent interaction with the site
    const overlay = document.createElement('div');
    overlay.id = 'cookie-consent-overlay';
    overlay.className = 'fixed inset-0 bg-gray-800 bg-opacity-80 z-40'; // More transparent grey overlay
    document.body.appendChild(overlay);

    const consentBanner = document.createElement('div');
    consentBanner.id = 'cookie-consent-banner';
    consentBanner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-3 shadow-lg z-50';
    consentBanner.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="mb-3 md:mb-0 md:mr-4">
                    <p class="text-sm md:text-base">Ez a weboldal sütiket használ a felhasználói élmény javítása és a látogatottsági statisztikák készítése érdekében. Elfogadásával segíti munkánkat.</p>
                </div>
                <div class="flex space-x-4">
                    <button id="cookie-accept" class="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-600 transition">Elfogadom</button>
                    <button id="cookie-decline" class="text-white underline hover:text-gray-300 transition text-sm">Elutasítom</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(consentBanner);

    // Add event listeners to the buttons
    document.getElementById('cookie-accept').addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        loadGoogleAnalytics();
        consentBanner.remove();
        document.getElementById('cookie-consent-overlay').remove();
    });

    document.getElementById('cookie-decline').addEventListener('click', function() {
        setCookie('cookie-consent', 'declined', 365);
        consentBanner.remove();
        document.getElementById('cookie-consent-overlay').remove();
    });
}

// Check if user has already made a choice
document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookie('cookie-consent');
    if (consent === 'accepted') {
        loadGoogleAnalytics();
    } else if (consent === '') {
        // If no choice has been made, show the consent banner
        showCookieConsent();
    }
    // If consent is 'declined', do nothing
});