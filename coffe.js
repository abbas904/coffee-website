// Initialize Swiper
const swiper = new Swiper('.homeSwiper', {
  effect: 'slide',
  speed: 1000,
  autoplay: {
    delay: 1200,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    waitForTransition: true,
    stopOnLastSlide: false
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1.5',
    bulletActiveClass: '!bg-amber-500 !w-8 !transition-all !duration-300'
  },
  
  on: {
    init: function() {
      animateHomeContent();
      // Start autoplay immediately
      this.autoplay.start();
    },
    slideChange: function() {
      animateHomeContent();
    }
  }
});

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

// Home section text animation
function animateHomeContent() {
    const homeText = document.querySelector('.swiper-slide-active .text-center');
    const buttons = document.querySelectorAll('.swiper-slide-active button');
    
    if (homeText) {
        // Reset styles for text
        homeText.style.opacity = '0';
        homeText.style.transform = 'translatex(30px)';
        
        // Reset styles for buttons
        buttons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translatex(20px)';
        });
        
        // Animate text and buttons
        setTimeout(() => {
            // Animate text
            homeText.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            homeText.style.opacity = '1';
            homeText.style.transform = 'translatex(0)';
            
            // Animate buttons one by one
            buttons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translatex(0)';
                }, 300 + (index * 300));
            });
        }, 200);
    }
}


// Add hover animation to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
    });
});

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  };

  updateCounter();
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

// Start observing all counter elements
document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});
// menu tab
const menuTabs = document.querySelectorAll('.menu-tabs .tab');
        const menuItems = document.querySelectorAll('.menu-item');
        const allItems = document.querySelectorAll('.menu-item.all-item');

        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get selected category
                const category = tab.getAttribute('data-category');
                
                // Hide all items first with fade out
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                });

                // Show relevant items with fade in after a small delay
                setTimeout(() => {
                    if (category === 'all') {
                        // Show all 4 cards for "All" category
                        allItems.forEach(item => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        });
                        // Hide other category items
                        menuItems.forEach(item => {
                            if (!item.classList.contains('all-item')) {
                                item.style.display = 'none';
                            }
                        });
                    } else {
                        // Hide all items first
                        menuItems.forEach(item => {
                            item.style.display = 'none';
                        });
                        // Show only the specific category item
                        const categoryItem = document.querySelector(`.menu-item.${category}`);
                        if (categoryItem) {
                            categoryItem.style.display = 'block';
                            setTimeout(() => {
                                categoryItem.style.opacity = '1';
                                categoryItem.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    }
                }, 300);
            });
        });
 // Tabs functionality for products
 const tabBtns = document.querySelectorAll('.tab-btn');
 const tabContents = document.querySelectorAll('.tab-content');
 tabBtns.forEach(btn => {
   btn.addEventListener('click', () => {
     // Remove active from all
     tabBtns.forEach(b => b.classList.remove('active', 'bg-amber-500', 'text-white'));
     tabContents.forEach(tc => tc.classList.add('hidden'));
     // Add active to clicked
     btn.classList.add('active', 'bg-amber-500', 'text-white');
     const tab = btn.getAttribute('data-tab');
     document.querySelector(`.tab-content[data-tab-content="${tab}"]`).classList.remove('hidden');
   });
 });
// tabs functionality for products
 // Tab functionality
 document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Show first tab by default
  const firstTab = document.querySelector('[data-tab-content="dinner"]');
  if (firstTab) {
      firstTab.classList.remove('hidden');
  }

  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          tabButtons.forEach(btn => {
              btn.classList.remove('active', 'bg-amber-500');
              btn.classList.add('bg-gray-800');
          });

          // Add active class to clicked button
          button.classList.add('active', 'bg-amber-500');
          button.classList.remove('bg-gray-800');

          // Hide all tab contents
          tabContents.forEach(content => {
              content.classList.add('hidden');
          });

          // Show selected tab content
          const tabId = button.getAttribute('data-tab');
          const selectedContent = document.querySelector(`[data-tab-content="${tabId}"]`);
          if (selectedContent) {
              selectedContent.classList.remove('hidden');
          }
      });
  });
});
// footer
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.getElementById('footer');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  }

  // Function to handle scroll event
  function handleScroll() {
      if (isInViewport(footer)) {
          footer.classList.remove('opacity-0', 'translate-y-20');
          footer.classList.add('opacity-100', 'translate-y-0');
          // Remove the scroll event listener after animation
          window.removeEventListener('scroll', handleScroll);
      }
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Check on initial load
  handleScroll();
}); 
// footer-end
// nav-toogle
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