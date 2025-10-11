// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Navbar scroll behavior
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

// Blog card hover effect
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 30px rgba(245, 158, 11, 0.3)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// Load more posts functionality
const loadMoreButton = document.querySelector('button.bg-amber-500');
let currentPage = 1;

loadMoreButton.addEventListener('click', () => {
  // Simulate loading more posts
  currentPage++;
  loadMoreButton.textContent = 'Loading...';
  loadMoreButton.disabled = true;
  
  setTimeout(() => {
    // In a real application, this would fetch more posts from an API
    loadMoreButton.textContent = 'Load More Posts';
    loadMoreButton.disabled = false;
    
    if (currentPage >= 3) {
      loadMoreButton.style.display = 'none';
    }
  }, 1000);
}); 