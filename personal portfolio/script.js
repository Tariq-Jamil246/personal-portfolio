

// ========== DOM Elements ==========
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');
const body = document.body;

// Navigation elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

// Academic table elements
const academicTable = document.getElementById('academic-table');
const searchInput = document.getElementById('search-input');
const filterLevel = document.getElementById('filter-level');
const sortYearBtn = document.getElementById('sort-year');

// CV Viewer elements
const pdfCanvas = document.getElementById('pdf-canvas');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumSpan = document.getElementById('page-num');
const pageCountSpan = document.getElementById('page-count');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const realViewCvBtn = document.getElementById('real-view-cv');
const pdfPlaceholder = document.getElementById('pdf-placeholder');
const pdfProgressBar = document.getElementById('pdf-progress-bar');
const pdfLoadingText = document.getElementById('pdf-loading-text');

// Contact form elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');

// Projects carousel elements
const carouselContainer = document.querySelector('.carousel-container');
const prevProjectBtn = document.getElementById('prev-project');
const nextProjectBtn = document.getElementById('next-project');
const currentProjectSpan = document.getElementById('current-project');
const totalProjectsSpan = document.getElementById('total-projects');
const projectDotsContainer = document.querySelector('.project-dots');

// Progress tracker elements
const tasksContainer = document.querySelector('.tasks-container');
const addTaskBtn = document.getElementById('add-task');
const totalTasksSpan = document.getElementById('total-tasks');
const completedTasksSpan = document.getElementById('completed-tasks');
const progressPercentageSpan = document.getElementById('progress-percentage');
const overallProgress = document.getElementById('overall-progress');

// ========== Theme Switcher ==========
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
    }
}

function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('portfolio-theme', 'dark');
    }
}

// ========== Navigation ==========
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger animation
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========== Back to Top Button ==========
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== Academic Background Table ==========
const academicData = [
    { level: 'primary', institution: 'Islamia Public School Shangla', degree: 'Primary Education', year: 2015, grade: 'A+', status: 'completed' },
    { level: 'primary', institution: 'New Shangla Public School', degree: 'Middle Education', year: 2018, grade: 'A+', status: 'completed' },
    { level: 'secondary', institution: 'New Shangla Public School', degree: 'Matriculation (Science)', year: 2020, grade: '89.27%', status: 'completed' },
    { level: 'higher', institution: 'New Shangla Public School & College', degree: 'FSc (Pre-Medical)', year: 2022, grade: '88.61%', status: 'completed' },
    { level: 'university', institution: 'University of Engineering & Technology Peshawar, Abbottabad', degree: 'BS Computer Science', year: 2025, grade: 'waiting', status: 'ongoing' },
    { level: 'university', institution: 'MoroSoft Labs', degree: 'Front end  Web Development Specialization', year: 2023, grade: 'Completed', status: 'completed' },
    
];

function renderAcademicTable(data) {
    const tableBody = academicTable.querySelector('tbody');
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="level-badge ${item.level}">${item.level.charAt(0).toUpperCase() + item.level.slice(1)}</span></td>
            <td>${item.institution}</td>
            <td>${item.degree}</td>
            <td>${item.year}</td>
            <td>${item.grade}</td>
            <td><span class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function filterAndSortTable() {
    let filteredData = [...academicData];
    
    // Filter by level
    const selectedLevel = filterLevel.value;
    if (selectedLevel !== 'all') {
        filteredData = filteredData.filter(item => item.level === selectedLevel);
    }
    
    // Search functionality
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredData = filteredData.filter(item => 
            item.institution.toLowerCase().includes(searchTerm) ||
            item.degree.toLowerCase().includes(searchTerm) ||
            item.year.toString().includes(searchTerm)
        );
    }
    
    // Sort by year (toggle ascending/descending)
    if (sortYearBtn.dataset.order === 'desc') {
        filteredData.sort((a, b) => a.year - b.year);
        sortYearBtn.innerHTML = 'Sort by Year <i class="fas fa-sort-up"></i>';
        sortYearBtn.dataset.order = 'asc';
    } else {
        filteredData.sort((a, b) => b.year - a.year);
        sortYearBtn.innerHTML = 'Sort by Year <i class="fas fa-sort-down"></i>';
        sortYearBtn.dataset.order = 'desc';
    }
    
    renderAcademicTable(filteredData);
    renderTimeline(filteredData);
}

function renderTimeline(data) {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';
    
    // Sort data by year for timeline
    const sortedData = [...data].sort((a, b) => a.year - b.year);
    
    sortedData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h4>${item.degree}</h4>
                <p><strong>${item.institution}</strong></p>
                <p>Grade: ${item.grade}</p>
                <span class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// ========== Interactive CV Viewer with REAL PDF ==========
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.2;
const ctx = pdfCanvas.getContext('2d');

// Set up PDF.js worker
if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

function initPDFViewer() {
    pdfLoadingText.textContent = 'Loading CV...';
    pdfProgressBar.style.width = '30%';
    
    // Simple direct approach - the PDF should be in the same folder
    const pdfPath = 'jamil_resume.pdf';
    
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    
    loadingTask.promise.then(function(pdf) {
        pdfLoadingText.textContent = 'Rendering...';
        pdfProgressBar.style.width = '90%';
        
        pdfDoc = pdf;
        pageCountSpan.textContent = pdf.numPages;
        
        // Hide placeholder and show canvas
        setTimeout(() => {
            pdfPlaceholder.style.display = 'none';
            pdfCanvas.style.display = 'block';
            pdfProgressBar.style.width = '100%';
            
            // Render the first page
            renderPage(pageNum);
        }, 500);
        
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        showPDFError('CV file not found. Please make sure "jamil_resume.pdf" is in the same folder as this website.');
    });
}

function showPDFError(message) {
    pdfPlaceholder.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-exclamation-triangle" style="color: #e74c3c; font-size: 3rem; margin-bottom: 20px;"></i>
            <h3 style="color: #e74c3c;">CV Not Available</h3>
            <p>${message}</p>
            <div style="margin-top: 20px;">
                <button onclick="initPDFViewer()" class="btn" style="margin-right: 10px;">
                    <i class="fas fa-redo"></i> Retry Loading
                </button>
                <a href="jamil_resume.pdf" download="Tariq_Jamil_CV.pdf" class="btn" style="background-color: var(--accent-color);">
                    <i class="fas fa-download"></i> Download CV
                </a>
            </div>
        </div>
    `;
}

function renderPage(num) {
    pageRendering = true;
    
    // Update page number
    pageNumSpan.textContent = num;
    
    // Get page
    pdfDoc.getPage(num).then(function(page) {
        // Calculate appropriate scale for the canvas
        const viewport = page.getViewport({ scale: scale });
        
        // Set canvas dimensions
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        // Render PDF page
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        page.render(renderContext).promise.then(function() {
            pageRendering = false;
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
            
            // Update button states
            prevPageBtn.disabled = num <= 1;
            nextPageBtn.disabled = num >= pdfDoc.numPages;
        });
    }).catch(function(error) {
        console.error('Error rendering page:', error);
        showNotification('Error displaying CV page. Please try again.');
    });
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

function zoomIn() {
    if (scale >= 2.5) return;
    scale += 0.2;
    queueRenderPage(pageNum);
}

function zoomOut() {
    if (scale <= 0.5) return;
    scale -= 0.2;
    queueRenderPage(pageNum);
}

function viewCVFullScreen() {
    // Open CV in new tab for full screen viewing
    window.open('jamil_resume.pdf', '_blank');
}

// ========== Contact Form Validation ==========
function validateForm() {
    let isValid = true;
    
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.className = 'form-status';
    formStatus.textContent = '';
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
        nameInput.classList.add('error');
    } else {
        nameInput.classList.remove('error');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
        emailInput.classList.add('error');
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
        emailInput.classList.add('error');
    } else {
        emailInput.classList.remove('error');
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
        messageInput.classList.add('error');
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
        messageInput.classList.add('error');
    } else {
        messageInput.classList.remove('error');
    }
    
    return isValid;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Simulate form submission
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Show success message
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
    
    // Reset form after 5 seconds
    setTimeout(() => {
        contactForm.reset();
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }, 5000);
    
    // Log form data (in real app, send to server)
    console.log('Form submitted:', formData);
}

// ========== Projects Gallery Carousel ==========
const projectsData = [
    {
        title: 'E-Commerce Website',
        description: 'A full-featured e-commerce platform with shopping cart, user authentication, and payment integration.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API']
    },
    {
        title: 'Task Management App',
        description: 'A productivity application for managing tasks with drag & drop functionality and real-time updates.',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['Vue.js', 'Firebase', 'CSS3', 'PWA']
    },
    {
        title: 'Weather Dashboard',
        description: 'Interactive weather application with 5-day forecast, location detection, and historical data.',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'Bootstrap']
    },
    {
        title: 'Portfolio Website',
        description: 'Responsive portfolio website with animations, dark mode, and interactive elements.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP']
    },
    {
        title: 'Fitness Tracker',
        description: 'Mobile application for tracking workouts, nutrition, and fitness progress with charts and analytics.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['React Native', 'Redux', 'GraphQL', 'AWS']
    }
];

let currentProjectIndex = 0;
let carouselInterval;

function renderProjectsCarousel() {
    carouselContainer.innerHTML = '';
    projectDotsContainer.innerHTML = '';
    
    // Update total projects count
    totalProjectsSpan.textContent = projectsData.length;
    
    projectsData.forEach((project, index) => {
        // Create project slide
        const slide = document.createElement('div');
        slide.className = 'project-slide';
        slide.style.transform = `translateX(${index * 100}%)`;
        
        slide.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/800x400/4a6fa5/ffffff?text=Project+Image'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <button class="btn project-view-btn" data-index="${index}">View Project <i class="fas fa-external-link-alt"></i></button>
            </div>
        `;
        
        carouselContainer.appendChild(slide);
        
        // Create dot indicator
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToProject(index));
        projectDotsContainer.appendChild(dot);
    });
    
    // Add event listeners to project buttons
    document.querySelectorAll('.project-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            showNotification(`Viewing project: ${projectsData[index].title}`);
        });
    });
    
    updateProjectIndicator();
}

function updateProjectIndicator() {
    currentProjectSpan.textContent = currentProjectIndex + 1;
    
    // Update carousel position
    carouselContainer.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
    
    // Update active dot
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentProjectIndex);
    });
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    updateProjectIndicator();
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    updateProjectIndicator();
}

function goToProject(index) {
    currentProjectIndex = index;
    updateProjectIndicator();
}

function startCarouselAutoRotation() {
    carouselInterval = setInterval(nextProject, 5000);
}

function stopCarouselAutoRotation() {
    clearInterval(carouselInterval);
}

// ========== Progress Tracker ==========
let tasks = [
    { id: 1, title: 'Complete Portfolio Website', description: 'Finish all sections and responsive design', progress: 100, completed: true },
    { id: 2, title: 'Learn React Advanced Concepts', description: 'Hooks, Context API, and Redux', progress: 75, completed: false },
    { id: 3, title: 'Build E-Commerce API', description: 'RESTful API with Node.js and Express', progress: 50, completed: false },
    { id: 4, title: 'Study Data Structures', description: 'Algorithms and problem solving practice', progress: 30, completed: false },
    { id: 5, title: 'Mobile App Development', description: 'React Native project for fitness tracking', progress: 10, completed: false }
];

let taskId = 6;

function renderTasks() {
    tasksContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <div class="task-content">
                <h4 class="task-title">${task.title}</h4>
                <p class="task-desc">${task.description}</p>
            </div>
            <div class="task-progress">
                <div class="task-progress-bar">
                    <div class="task-progress-fill" style="width: ${task.progress}%"></div>
                </div>
                <div class="task-progress-text">${task.progress}%</div>
            </div>
            <div class="task-actions">
                <button class="task-action-btn edit-task" data-id="${task.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-action-btn delete-task" data-id="${task.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
    
    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.task-progress-fill').forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 100);
    
    updateProgressSummary();
}

function updateProgressSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    progressPercentageSpan.textContent = `${percentage}%`;
    overallProgress.style.width = `${percentage}%`;
}

function addNewTask() {
    const title = prompt('Enter task title:');
    if (!title) return;
    
    const description = prompt('Enter task description:') || 'No description provided';
    
    const newTask = {
        id: taskId++,
        title: title,
        description: description,
        progress: 0,
        completed: false
    };
    
    tasks.push(newTask);
    renderTasks();
    
    showNotification(`Task "${title}" added successfully!`);
}

function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        renderTasks();
        showNotification(`Task "${deletedTask.title}" deleted!`);
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle === null) return;
    
    const newDesc = prompt('Edit task description:', task.description) || task.description;
    
    task.title = newTitle;
    task.description = newDesc;
    
    renderTasks();
    showNotification(`Task updated successfully!`);
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    task.completed = !task.completed;
    task.progress = task.completed ? 100 : Math.min(task.progress, 99);
    
    renderTasks();
    
    const message = task.completed ? 
        `Task "${task.title}" marked as completed!` :
        `Task "${task.title}" marked as incomplete.`;
    
    showNotification(message);
}

// ========== Utility Functions ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.progress');
    
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// ========== Initialize Everything ==========
function init() {
    // Initialize theme
    initTheme();
    
    // Render initial content
    renderAcademicTable(academicData);
    renderTimeline(academicData);
    renderProjectsCarousel();
    renderTasks();
    
    // Initialize PDF viewer
    setTimeout(() => {
        initPDFViewer();
    }, 1000); // Delay to ensure DOM is fully loaded
    
    // Animate skill bars
    setTimeout(animateSkillBars, 500);
    
    // Start carousel auto-rotation
    startCarouselAutoRotation();
    
    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Back to top
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Academic table
    searchInput.addEventListener('input', filterAndSortTable);
    filterLevel.addEventListener('change', filterAndSortTable);
    sortYearBtn.addEventListener('click', filterAndSortTable);
    sortYearBtn.dataset.order = 'desc';
    
    // CV viewer
    prevPageBtn.addEventListener('click', onPrevPage);
    nextPageBtn.addEventListener('click', onNextPage);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    realViewCvBtn.addEventListener('click', viewCVFullScreen);
    
    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Projects carousel
    prevProjectBtn.addEventListener('click', () => {
        prevProject();
        stopCarouselAutoRotation();
        setTimeout(startCarouselAutoRotation, 10000);
    });
    
    nextProjectBtn.addEventListener('click', () => {
        nextProject();
        stopCarouselAutoRotation();
        setTimeout(startCarouselAutoRotation, 10000);
    });
    
    // Pause carousel on hover
    carouselContainer.addEventListener('mouseenter', stopCarouselAutoRotation);
    carouselContainer.addEventListener('mouseleave', startCarouselAutoRotation);
    
    // Progress tracker
    addTaskBtn.addEventListener('click', addNewTask);
    
    // Event delegation for task actions
    tasksContainer.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('task-checkbox')) {
            const taskId = parseInt(target.dataset.id);
            toggleTaskCompletion(taskId);
        }
        
        if (target.classList.contains('edit-task') || target.closest('.edit-task')) {
            const taskId = parseInt(target.dataset.id || target.closest('.edit-task').dataset.id);
            editTask(taskId);
        }
        
        if (target.classList.contains('delete-task') || target.closest('.delete-task')) {
            const taskId = parseInt(target.dataset.id || target.closest('.delete-task').dataset.id);
            deleteTask(taskId);
        }
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialize active nav link
    setActiveNavLink();
    
    console.log('Portfolio website initialized successfully!');
}

// ========== Start the Application ==========
document.addEventListener('DOMContentLoaded', init);















document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after page loads
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Animate child elements
                    const staggerItems = entry.target.querySelectorAll('.stagger-item, .detail-item, .skill, .task, .timeline-item');
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200); // 200ms delay between each item
                    });
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to elements
    function addLoadingAnimation() {
        const elements = [
            '.name',
            '.title',
            '.description',
            '.section-title',
            '.section-subtitle'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    }

    // Initialize animations
    addLoadingAnimation();
    
    // Animate hero content sequentially
    setTimeout(() => {
        const name = document.querySelector('.name');
        const title = document.querySelector('.title');
        const description = document.querySelector('.description');
        
        if (name) {
            name.style.animation = 'fadeInUp 0.8s ease 0.5s forwards, gradientWave 3s ease infinite 1.5s';
        }
        
        if (title) {
            title.style.animation = 'fadeInUp 0.8s ease 1s forwards';
        }
        
        if (description) {
            description.style.animation = 'fadeInUp 0.8s ease 1.5s forwards';
        }
    }, 500);
});