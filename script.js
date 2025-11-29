document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const fileInput = document.getElementById('drawingFile');
    const fileNameDisplay = document.querySelector('.file-name');
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const screens = document.querySelectorAll('.screen');
    const splashScreen = document.getElementById('splash-screen');

    // Splash Screen Auto-Hide
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.classList.add('hidden');
        }
    }, 2000); // 2 seconds

    // Toggle Sidebar
    toggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    });

    // Close Sidebar (Mobile)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }


    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });







    // File Input Change Handler
    const handleFileInput = (inputId, displayId) => {
        const input = document.getElementById(inputId);
        const display = displayId ? document.getElementById(displayId) : input.parentElement.querySelector('.file-name');

        if (input && display) {
            input.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    display.textContent = e.target.files[0].name;
                } else {
                    display.textContent = 'No file chosen';
                }
            });
        }
    };

    handleFileInput('drawingFile');
    // handleFileInput('bottleDocument', 'bottleDocumentName'); // Removed previous implementation

    // Custom Browse Button Logic for Bottle Entry
    const browseBtn = document.getElementById('browseBtn');
    const hiddenFileInput = document.getElementById('hiddenFileInput');
    const docPathInput = document.getElementById('docPathInput');
    const docNameSpan = document.getElementById('docNameSpan');

    if (browseBtn && hiddenFileInput && docPathInput && docNameSpan) {
        browseBtn.addEventListener('click', () => {
            hiddenFileInput.click();
        });

        hiddenFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                docPathInput.value = fileName;
                docNameSpan.textContent = fileName;
            } else {
                docPathInput.value = '';
                docNameSpan.textContent = 'Doc 1';
            }
        });
    }

    // Screen Switching Function
    const switchScreen = (targetId) => {
        // Hide all screens
        screens.forEach(screen => screen.classList.remove('active'));

        // Show target screen
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    };

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Handle screen switching
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                e.preventDefault(); // Prevent default link behavior
                switchScreen(targetId);
            }

            // On mobile, close sidebar after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Dashboard Quick Actions
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                switchScreen(targetId);
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('data-target') === targetId) {
                        nav.classList.add('active');
                    }
                });
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            }
        });
    });

    // ← Add this at the very end of DOMContentLoaded
    // Set Dashboard as default screen on page load
    switchScreen('dashboard-screen');
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-target') === 'dashboard-screen') {
            nav.classList.add('active');
        }
    });

});
