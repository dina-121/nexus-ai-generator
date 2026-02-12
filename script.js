        // DOM Elements
        const promptInput = document.getElementById('promptInput');
        const charCount = document.getElementById('charCount');
        const generateBtn = document.getElementById('generateBtn');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const resultPlaceholder = document.getElementById('resultPlaceholder');
        const resultImage = document.getElementById('resultImage');
        const downloadBtn = document.getElementById('downloadBtn');
        
        // Option buttons
        const optionButtons = document.querySelectorAll('.option-btn');
        const aspectRatios = document.querySelectorAll('.aspect-ratio');
        
        // Modals
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const heroTryBtn = document.getElementById('heroTryBtn');
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeRegisterModal = document.getElementById('closeRegisterModal');
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');

        // Update character count
        promptInput.addEventListener('input', function() {
            const count = promptInput.value.length;
            charCount.textContent = `${count} characters`;
            
            // Change color if approaching limit
            if (count > 500) {
                charCount.style.color = '#ff6b6b';
            } else if (count > 300) {
                charCount.style.color = '#ffd700';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });

        // Initialize character count
        promptInput.dispatchEvent(new Event('input'));

        // Option button selection
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const parent = this.parentElement;
                const isStyleSelection = this.hasAttribute('data-style');
                
                if (isStyleSelection) {
                    // For style buttons, only one can be active
                    parent.querySelectorAll('.option-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                } else if (this.hasAttribute('data-type')) {
                    // For type buttons, only one can be active
                    parent.querySelectorAll('.option-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
                
                this.classList.add('active');
            });
        });

        // Aspect ratio selection
        aspectRatios.forEach(ratio => {
            ratio.addEventListener('click', function() {
                aspectRatios.forEach(r => r.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Generate button click simulation
        generateBtn.addEventListener('click', function() {
            // Show loading state
            this.querySelector('span').style.display = 'none';
            loadingIndicator.style.display = 'flex';
            this.disabled = true;
            
            // Simulate AI generation process
            setTimeout(() => {
                // Hide loading
                this.querySelector('span').style.display = 'inline';
                loadingIndicator.style.display = 'none';
                this.disabled = false;
                
                // Show generated image
                resultPlaceholder.style.display = 'none';
                resultImage.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                resultImage.style.display = 'block';
                
                // Enable download button
                downloadBtn.disabled = false;
                
                // Show success message
                showNotification('Image generated successfully!', 'success');
            }, 3000);
        });

        // Download button functionality
        downloadBtn.addEventListener('click', function() {
            if (resultImage.style.display === 'block') {
                showNotification('Download started!', 'success');
                // In a real app, this would trigger an actual download
            } else {
                showNotification('Please generate an image first', 'error');
            }
        });

        // Modal functionality
        loginBtn.addEventListener('click', () => openModal(loginModal));
        registerBtn.addEventListener('click', () => openModal(registerModal));
        heroTryBtn.addEventListener('click', () => openModal(registerModal));
        
        closeLoginModal.addEventListener('click', () => closeModal(loginModal));
        closeRegisterModal.addEventListener('click', () => closeModal(registerModal));
        
        switchToRegister.addEventListener('click', () => {
            closeModal(loginModal);
            openModal(registerModal);
        });
        
        switchToLogin.addEventListener('click', () => {
            closeModal(registerModal);
            openModal(loginModal);
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) closeModal(loginModal);
            if (e.target === registerModal) closeModal(registerModal);
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Login successful!', 'success');
            closeModal(loginModal);
        });

        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Account created successfully!', 'success');
            closeModal(registerModal);
        });

        // Modal helper functions
        function openModal(modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Notification system
        function showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                font-weight: 600;
                z-index: 3000;
                animation: slideIn 0.3s ease-out;
                background-color: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
                color: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add CSS for notification animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);