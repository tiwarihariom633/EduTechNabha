// EduTech Nabha - Interactive Learning Platform
// Main JavaScript functionality

class EduTechApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentLanguage = 'en';
        this.currentRole = null;
        this.charts = {};
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupLandingPage();
        this.setupNavigation();
        this.setupCharts();
        this.setupInteractiveElements();
        this.addPageTransitions();
        this.simulateLoading();
        this.setupBackNavigation();
    }

    // Back Navigation Setup
    setupBackNavigation() {
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLandingPage();
            });
        });
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
            
            // Animate the toggle
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);

            // Update charts with new theme
            this.updateChartsTheme();
        });
    }

    // Landing Page Interactions
    setupLandingPage() {
        // Language Selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                languageOptions.forEach(opt => opt.classList.remove('selected'));
                // Add active class to clicked option
                option.classList.add('selected');
                this.currentLanguage = option.dataset.lang;
                
                // Animate selection
                option.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    option.style.transform = 'scale(1)';
                }, 200);
            });
        });

        // Role Selection
        const roleButtons = document.querySelectorAll('.role-button');
        roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.currentRole = button.dataset.role;
                this.showLoadingAndNavigate(this.currentRole);
            });
        });
    }

    // Navigation Setup
    setupNavigation() {
        // Student Dashboard Navigation
        const studentNavItems = document.querySelectorAll('#studentDashboard .nav-item');
        studentNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection('student', section);
                
                // Update active nav item
                studentNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Teacher Dashboard Navigation
        const teacherNavItems = document.querySelectorAll('#teacherDashboard .nav-item');
        teacherNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection('teacher', section);
                
                // Update active nav item
                teacherNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Action buttons in dashboard
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.dataset.section;
                if (section) {
                    this.showSection('student', section);
                    // Update nav
                    studentNavItems.forEach(nav => nav.classList.remove('active'));
                    const targetNav = document.querySelector(`#studentDashboard [data-section="${section}"]`);
                    if (targetNav) {
                        targetNav.classList.add('active');
                    }
                }
            });
        });
    }

    // Chart Setup and Management
    setupCharts() {
        // Student Progress Chart
        this.createProgressChart();
        
        // Student Streak Chart
        this.createStreakChart();
        
        // Teacher Class Performance Chart
        this.createClassPerformanceChart();
        
        // Teacher Engagement Chart
        this.createEngagementChart();
    }

    createProgressChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        this.charts.progress = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Mathematics', 'Science', 'English'],
                datasets: [{
                    data: [85, 92, 78],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    createStreakChart() {
        const ctx = document.getElementById('streakChart');
        if (!ctx) return;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const streakData = [8, 12, 6, 15, 10, 14, 12];

        this.charts.streak = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Daily Study Hours',
                    data: streakData,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20,
                        ticks: {
                            stepSize: 5
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createClassPerformanceChart() {
        const ctx = document.getElementById('classPerformanceChart');
        if (!ctx) return;

        this.charts.classPerformance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Math', 'Science', 'English', 'History', 'Geography'],
                datasets: [{
                    label: 'Average Score (%)',
                    data: [87, 92, 79, 84, 88],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            }
        });
    }

    createEngagementChart() {
        const ctx = document.getElementById('engagementChart');
        if (!ctx) return;

        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const engagementData = [78, 82, 85, 88];

        this.charts.engagement = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: 'Engagement Rate (%)',
                    data: engagementData,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.2)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#FFC185',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 95,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutCubic'
                }
            }
        });
    }

    updateChartsTheme() {
        // Update chart colors based on theme
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        // Filter buttons
        this.setupFilterButtons();
        
        // Course cards
        this.setupCourseCards();
        
        // Quiz functionality
        this.setupQuizzes();
        
        // Video player simulation
        this.setupVideoPlayer();
        
        // Progress animations
        this.animateProgressBars();
        
        // Achievement animations
        this.setupAchievements();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(container => {
            const buttons = container.parentElement.querySelectorAll('.filter-btn');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Animate button press
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        });
    }

    setupCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('click', () => {
                // Simulate course selection with animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    this.showSection('student', 'lessons');
                    // Update navigation
                    const navItems = document.querySelectorAll('#studentDashboard .nav-item');
                    navItems.forEach(nav => nav.classList.remove('active'));
                    const lessonsNav = document.querySelector('#studentDashboard [data-section="lessons"]');
                    if (lessonsNav) {
                        lessonsNav.classList.add('active');
                    }
                }, 200);
            });
        });

        // Continue buttons
        const continueButtons = document.querySelectorAll('.continue-btn');
        continueButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showSection('student', 'lessons');
                // Update navigation
                const navItems = document.querySelectorAll('#studentDashboard .nav-item');
                navItems.forEach(nav => nav.classList.remove('active'));
                const lessonsNav = document.querySelector('#studentDashboard [data-section="lessons"]');
                if (lessonsNav) {
                    lessonsNav.classList.add('active');
                }
            });
        });
    }

    setupQuizzes() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selections
                option.parentElement.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Mark as selected
                option.classList.add('selected');
                
                // Show result after delay
                setTimeout(() => {
                    if (option.classList.contains('correct')) {
                        option.style.background = 'var(--color-bg-3)';
                        option.style.borderColor = 'var(--color-success)';
                        this.showNotification('Correct! Well done! 🎉', 'success');
                    } else {
                        option.style.background = 'var(--color-bg-4)';
                        option.style.borderColor = 'var(--color-error)';
                        // Show correct answer
                        const correctOption = option.parentElement.querySelector('.correct');
                        correctOption.style.background = 'var(--color-bg-3)';
                        correctOption.style.borderColor = 'var(--color-success)';
                        this.showNotification('Not quite right. The correct answer is highlighted.', 'info');
                    }
                }, 500);
            });
        });
    }

    setupVideoPlayer() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', () => {
                const playButton = videoPlaceholder.querySelector('.play-button');
                playButton.innerHTML = '<span class="play-icon">⏸️</span>';
                
                // Simulate video playing
                this.showNotification('Video is now playing! 📹', 'info');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    playButton.innerHTML = '<span class="play-icon">▶️</span>';
                }, 3000);
            });
        }
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    setupAchievements() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('unlocked')) {
                    // Animate achievement celebration
                    card.style.transform = 'scale(1.05) rotate(2deg)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                    
                    this.showNotification('Achievement details viewed! 🏆', 'success');
                } else {
                    this.showNotification('This achievement is still locked. Keep learning! 🔒', 'info');
                }
            });
        });
    }

    // Page Navigation
    showSection(dashboard, section) {
        // Hide all sections in the dashboard
        const dashboardId = dashboard === 'student' ? 'studentDashboard' : 'teacherDashboard';
        const sections = document.querySelectorAll(`#${dashboardId} .content-section`);
        
        sections.forEach(s => s.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Re-render charts if needed
        setTimeout(() => {
            Object.values(this.charts).forEach(chart => {
                if (chart) {
                    chart.resize();
                }
            });
        }, 300);
    }

    showLoadingAndNavigate(role) {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('active');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            this.showDashboard(role);
        }, 2000);
    }

    showDashboard(role) {
        // Hide landing page
        document.getElementById('landingPage').classList.remove('active');
        
        // Show appropriate dashboard
        if (role === 'student') {
            document.getElementById('studentDashboard').classList.add('active');
        } else if (role === 'teacher') {
            document.getElementById('teacherDashboard').classList.add('active');
        }
        
        // Trigger chart animations
        setTimeout(() => {
            Object.values(this.charts).forEach(chart => {
                if (chart) {
                    chart.resize();
                    chart.update();
                }
            });
        }, 500);
    }

    // Updated showLandingPage method
    showLandingPage() {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show landing page
        document.getElementById('landingPage').classList.add('active');
        
        // Reset selections
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Reset navigation states
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Set default active nav items
        const defaultStudentNav = document.querySelector('#studentDashboard [data-section="dashboard"]');
        const defaultTeacherNav = document.querySelector('#teacherDashboard [data-section="teacher-overview"]');
        
        if (defaultStudentNav) defaultStudentNav.classList.add('active');
        if (defaultTeacherNav) defaultTeacherNav.classList.add('active');
        
        // Reset current role
        this.currentRole = null;
        
        // Show notification
        this.showNotification('Welcome back to EduTech Nabha! 🏠', 'info');
    }

    // Page Transitions
    addPageTransitions() {
        // Add smooth transitions between pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.transition = 'opacity 0.3s ease-in-out';
        });
    }

    // Loading Simulation
    simulateLoading() {
        // Add loading states to various elements
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('loading') && !button.classList.contains('back-button')) {
                    const originalText = button.textContent;
                    button.classList.add('loading');
                    button.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        button.classList.remove('loading');
                        button.style.opacity = '1';
                    }, 500);
                }
            });
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-base)',
            padding: 'var(--space-16)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease-out',
            maxWidth: '300px'
        });

        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    // Utility Methods
    animateElement(element, animation) {
        element.style.animation = animation;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }

    addHoverEffects() {
        // Add sophisticated hover effects
        const cards = document.querySelectorAll('.card, .dashboard-card, .course-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Global Functions
function showLandingPage() {
    // This function is called by the back buttons
    if (window.eduTechApp) {
        window.eduTechApp.showLandingPage();
    }
}

// Enhanced Animations and Interactions
function addEnhancedAnimations() {
    // Stagger animations for grids
    const grids = document.querySelectorAll('.courses-grid, .achievements-grid, .assignments-grid');
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-in');
        });
    });

    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Floating animation for achievement badges
    const badges = document.querySelectorAll('.achievement-badge');
    badges.forEach((badge, index) => {
        badge.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
}

// CSS Animations (added via JavaScript)
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out both;
        }
        
        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-8);
        }
        
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 1.5s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new EduTechApp();
    window.eduTechApp = app; // Make app globally accessible
    addCustomAnimations();
    
    setTimeout(() => {
        addEnhancedAnimations();
        app.addHoverEffects();
    }, 1000);
    
    // Add some demo interactions
    setTimeout(() => {
        app.showNotification('Welcome to EduTech Nabha! 🚀', 'success');
    }, 1500);
    const dateDiv = document.getElementById('live-date');
if (dateDiv) {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  dateDiv.innerText = "Today: " + today.toLocaleDateString('en-US', options);
}

});