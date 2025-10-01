// Landing page functionality
class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupModal();
        this.setupSmoothScrolling();
        this.setupInterestForm();
    }

    setupModal() {
        const modal = document.getElementById('interest-modal');
        const btn = document.getElementById('express-interest');
        const closeBtn = modal.querySelector('.close');

        btn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupInterestForm() {
        const form = document.getElementById('interest-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Let the form submit naturally to Formspree
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    this.showSuccessMessage('Thank you for your interest! We\'ll notify you when we launch.');
                    
                    // Close modal and reset form
                    document.getElementById('interest-modal').style.display = 'none';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                this.showSuccessMessage('Something went wrong. Please try again.');
            }
        });
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1001;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 4000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LandingPage();
});

// Add CSS animation for success message
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
`;
document.head.appendChild(style);
