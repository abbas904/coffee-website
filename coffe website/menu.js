// Navbar scroll animation
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;
  
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        
        // Change icon based on menu state
        const icon = mobileMenuButton.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            isMenuOpen = false;
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
  
    // Handle scroll behavior for navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
  
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('scroll-down');
            navbar.classList.remove('scroll-up');
        } else {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScrollTop = scrollTop;
    });
  });
//  
// Smooth Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const scrollToBottomBtn = document.getElementById('scrollToBottom');
    const footer = document.querySelector('footer');

    // Function to check scroll position and show/hide buttons
    function checkScrollPosition() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Show scroll to top button when scrolled down
        if (scrollPosition > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }

        // Show scroll to bottom button when not at bottom
        if (scrollPosition + windowHeight < documentHeight - 100) {
            scrollToBottomBtn.style.opacity = '1';
            scrollToBottomBtn.style.visibility = 'visible';
        } else {
            scrollToBottomBtn.style.opacity = '0';
            scrollToBottomBtn.style.visibility = 'hidden';
        }
    }

    // Scroll to top function
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll to bottom function
    scrollToBottomBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });

    // Check scroll position on scroll and load
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('load', checkScrollPosition);

    // Add hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    scrollToBottomBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    scrollToBottomBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}); 