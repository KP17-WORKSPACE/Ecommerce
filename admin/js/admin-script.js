/* ============================================
   ADMIN PANEL - JAVASCRIPT FUNCTIONALITY
   Amazon/Flipkart Inspired Admin Dashboard
   ============================================ */

// Global Admin Object
const Admin = {
    // Sidebar Toggle
    toggleSidebar: function() {
        const sidebar = document.querySelector('.admin-sidebar');
        const overlay = document.querySelector('.admin-sidebar-overlay');
        
        console.log('Admin.toggleSidebar called');
        console.log('Sidebar:', sidebar);
        console.log('Overlay:', overlay);
        
        if (sidebar) {
            const isActive = sidebar.classList.contains('active');
            sidebar.classList.toggle('active');
            console.log('Sidebar toggled from', isActive, 'to', sidebar.classList.contains('active'));
        }
        
        if (overlay) {
            overlay.classList.toggle('active');
            console.log('Overlay toggled');
        }
        
        // Prevent body scroll when sidebar is open
        if (sidebar && sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },

    // Close Sidebar (on overlay click)
    closeSidebar: function() {
        const sidebar = document.querySelector('.admin-sidebar');
        const overlay = document.querySelector('.admin-sidebar-overlay');
        
        console.log('Admin.closeSidebar called');
        
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    },

    // Toggle Submenu
    toggleSubmenu: function(element) {
        const parent = element.closest('.admin-nav-item');
        const submenu = parent.nextElementSibling;
        
        if (parent && submenu && submenu.classList.contains('admin-submenu')) {
            // Close other open submenus
            const openSubmenus = document.querySelectorAll('.admin-submenu.open');
            openSubmenus.forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('open');
                    const menuParent = menu.previousElementSibling;
                    if (menuParent) {
                        menuParent.classList.remove('open');
                    }
                }
            });

            // Toggle current submenu
            parent.classList.toggle('open');
            submenu.classList.toggle('open');
        }
    },

    // Initialize Submenu Event Listeners
    initSubmenuListeners: function() {
        const submenuTriggers = document.querySelectorAll('.admin-nav-item.has-submenu');
        
        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                Admin.toggleSubmenu(this);
            });
        });
    },

    // Initialize Chart.js Charts
    initCharts: function() {
        // Revenue Chart
        const revenueCanvas = document.getElementById('revenueChart');
        if (revenueCanvas) {
            const ctx = revenueCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                        borderColor: '#146eb4',
                        backgroundColor: 'rgba(20, 110, 180, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: '#146eb4',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#1a1a2e',
                            padding: 12,
                            cornerRadius: 8,
                            titleColor: '#fff',
                            bodyColor: '#a0d8ff',
                            callbacks: {
                                label: function(context) {
                                    return '₹' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + (value / 1000) + 'k';
                                },
                                color: '#718096'
                            },
                            grid: {
                                color: '#e3e8ef',
                                drawBorder: false
                            }
                        },
                        x: {
                            ticks: {
                                color: '#718096'
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Category Chart
        const categoryCanvas = document.getElementById('categoryChart');
        if (categoryCanvas) {
            const ctx = categoryCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            '#146eb4',
                            '#28a745',
                            '#ffc107',
                            '#dc3545',
                            '#6c757d'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: {
                                    size: 12
                                },
                                color: '#2d3748'
                            }
                        },
                        tooltip: {
                            backgroundColor: '#1a1a2e',
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    },

    // Format Currency
    formatCurrency: function(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    },

    // Format Number
    formatNumber: function(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },

    // Search Functionality
    initSearch: function() {
        const searchInput = document.querySelector('.admin-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                console.log('Search query:', query);
                // Implement search logic here
            });
        }
    },

    // Table Sorting
    sortTable: function(table, column, direction = 'asc') {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            const aValue = a.cells[column].textContent.trim();
            const bValue = b.cells[column].textContent.trim();
            
            if (direction === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
        
        rows.forEach(row => tbody.appendChild(row));
    },

    // Show Notification
    showNotification: function(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `admin-notification admin-notification-${type}`;
        notification.innerHTML = `
            <div class="admin-notification-content">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    // Confirm Dialog
    confirm: function(message, callback) {
        if (confirm(message)) {
            callback();
        }
    },

    // AJAX Helper
    ajax: {
        get: function(url, success, error) {
            fetch(url)
                .then(response => response.json())
                .then(data => success(data))
                .catch(err => error ? error(err) : console.error(err));
        },
        
        post: function(url, data, success, error) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => success(data))
                .catch(err => error ? error(err) : console.error(err));
        },
        
        put: function(url, data, success, error) {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => success(data))
                .catch(err => error ? error(err) : console.error(err));
        },
        
        delete: function(url, success, error) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => success(data))
                .catch(err => error ? error(err) : console.error(err));
        }
    },

    // Form Validation
    validateForm: function(formElement) {
        const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    },

    // Image Preview
    previewImage: function(input, previewElement) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewElement.src = e.target.result;
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    },

    // Initialize Date Pickers
    initDatePickers: function() {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        
        dateInputs.forEach(input => {
            if (!input.value) {
                input.value = today;
            }
        });
    },

    // Auto-resize Textarea
    autoResizeTextarea: function(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    },

    // Initialize Tooltips
    initTooltips: function() {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    },

    // Initialize Modals
    initModals: function() {
        // Modal initialization logic
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', function() {
                const firstInput = modal.querySelector('input, textarea, select');
                if (firstInput) {
                    firstInput.focus();
                }
            });
        });
    },

    // Update Stats (for real-time updates)
    updateStats: function(stats) {
        Object.keys(stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = this.formatCurrency(stats[key]);
            }
        });
    },

    // Initialize Everything
    init: function() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.admin-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', this.toggleSidebar.bind(this));
        }

        // Sidebar overlay close
        const overlay = document.querySelector('.admin-sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', this.closeSidebar.bind(this));
        }

        // Sidebar toggle button
        const sidebarToggle = document.querySelector('.admin-sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', this.closeSidebar.bind(this));
        }

        // Initialize charts
        if (typeof Chart !== 'undefined') {
            this.initCharts();
        }

        // Initialize search
        this.initSearch();

        // Initialize submenu listeners
        this.initSubmenuListeners();

        // Initialize date pickers
        this.initDatePickers();

        // Initialize tooltips
        if (typeof bootstrap !== 'undefined') {
            this.initTooltips();
            this.initModals();
        }

        // Auto-resize textareas
        const textareas = document.querySelectorAll('textarea.auto-resize');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', () => {
                this.autoResizeTextarea(textarea);
            });
            this.autoResizeTextarea(textarea);
        });

        console.log('Admin panel initialized successfully');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    Admin.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Admin;
}
