document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Email list functionality
    const emailItems = document.querySelectorAll('.email-item');
    emailItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.email-checkbox') && !e.target.closest('.email-star')) {
                this.classList.remove('unread');
            }
        });
    });

    // Star functionality
    const starButtons = document.querySelectorAll('.email-star i');
    starButtons.forEach(star => {
        star.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('far');
            this.classList.toggle('fas');
            this.classList.toggle('text-warning');
        });
    });

    // Compose form handling
    const composeForm = document.getElementById('composeForm');
    if (composeForm) {
        composeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Here you would typically send the email data to your backend
            alert('Email sent successfully!');
            bootstrap.Modal.getInstance(document.getElementById('composeModal')).hide();
            this.reset();
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            emailItems.forEach(item => {
                const sender = item.querySelector('.email-sender').textContent.toLowerCase();
                const subject = item.querySelector('.email-subject').textContent.toLowerCase();
                const preview = item.querySelector('.email-preview').textContent.toLowerCase();
                
                if (sender.includes(searchTerm) || subject.includes(searchTerm) || preview.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Email filters
    const filterButtons = document.querySelectorAll('.email-filters .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically filter emails based on the selected category
        });
    });

    // Refresh button
    const refreshButton = document.querySelector('.email-actions .fa-sync-alt').parentElement;
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            this.classList.add('fa-spin');
            setTimeout(() => {
                this.classList.remove('fa-spin');
                // Here you would typically refresh the email list
            }, 1000);
        });
    }

    // File attachment handling
    const attachmentButtons = document.querySelectorAll('.compose-actions .fa-paperclip, .compose-actions .fa-image');
    attachmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.classList.contains('fa-image') ? 'image/*' : '*/*';
            input.click();
            
            input.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    // Here you would typically handle the file attachment
                    alert(`File "${file.name}" attached successfully!`);
                }
            });
        });
    });

    // Email actions (reply, forward, etc.)
    const emailActionButtons = document.querySelectorAll('.email-meta .btn');
    emailActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.querySelector('i').classList.contains('fa-reply') ? 'reply' : 'more';
            // Here you would typically handle the email action
            if (action === 'reply') {
                const composeModal = new bootstrap.Modal(document.getElementById('composeModal'));
                composeModal.show();
            }
        });
    });

    // Checkbox selection
    const checkboxes = document.querySelectorAll('.email-checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
            // Here you would typically handle bulk selection
        });
    });

    // Storage info animation
    const progressBar = document.querySelector('.storage-info .progress-bar');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = '65%';
        }, 500);
    }
}); 