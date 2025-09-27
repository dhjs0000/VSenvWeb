// VSenv H5 Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality for usage section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Code animation in hero section
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function animateCode() {
        if (currentLine < codeLines.length) {
            codeLines[currentLine].style.opacity = '0';
            codeLines[currentLine].style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                codeLines[currentLine].style.opacity = '1';
                codeLines[currentLine].style.transform = 'translateX(0)';
                codeLines[currentLine].style.transition = 'all 0.5s ease';
                currentLine++;
                
                if (currentLine < codeLines.length) {
                    setTimeout(animateCode, 800);
                }
            }, 100);
        }
    }
    
    // Start code animation when page loads
    setTimeout(animateCode, 1000);
    
    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    const originalTitle = heroTitle.textContent;
    
    // Only start typing animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter(heroTitle, originalTitle, 80);
                }, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(document.querySelector('.hero'));
    
    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-color);
        `;
        
        nav.appendChild(menuButton);
        
        // Toggle mobile menu
        menuButton.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Show/hide mobile menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
                navMenu.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: var(--shadow);
                    display: none;
                `;
            } else {
                menuButton.style.display = 'none';
                navMenu.style.cssText = `
                    display: flex;
                    position: static;
                    flex-direction: row;
                    box-shadow: none;
                    padding: 0;
                `;
            }
        }
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    };
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Copy code functionality
    const codeExamples = document.querySelectorAll('.code-example');
    
    codeExamples.forEach(example => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = '复制';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.3rem 0.8rem;
            border-radius: 0.3rem;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        example.style.position = 'relative';
        example.appendChild(copyButton);
        
        example.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        example.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', function() {
            const code = example.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = '已复制!';
                copyButton.style.background = 'var(--accent-color)';
                
                setTimeout(() => {
                    copyButton.textContent = '复制';
                    copyButton.style.background = 'var(--primary-color)';
                }, 2000);
            });
        });
    });
    
    // Add loading animation for download buttons
    const downloadButtons = document.querySelectorAll('.btn-primary');
    
    downloadButtons.forEach(button => {
        if (button.textContent.includes('下载')) {
            button.addEventListener('click', function(e) {
                if (this.href === '#' || this.href.includes('#download')) {
                    e.preventDefault();
                    
                    // Add loading state
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span>⏳</span> 准备下载...';
                    this.style.pointerEvents = 'none';
                    
                    // Simulate download preparation
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.pointerEvents = 'auto';
                        
                        // Scroll to download section
                        document.querySelector('#download').scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 1500);
                }
            });
        }
    });
    
    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab navigation for usage section
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-button.active');
            const tabs = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = tabs.indexOf(activeTab);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[newIndex].click();
        }
        
        // Home/End keys for navigation
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
    
    console.log('🚀 VSenv website loaded successfully!');
    console.log('💡 Try using arrow keys to navigate usage tabs');
    console.log('🏠 Press Home/End for quick navigation');
});