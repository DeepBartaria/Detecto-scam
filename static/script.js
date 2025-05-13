document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize stats
    let stats = {
        emailsAnalyzed: 0,
        spamBlocked: 0,
        accuracyRate: 0,
        avgResponseTime: 0
    };

    // DOM Elements
    const analyzeForm = document.getElementById('analyzeForm');
    const trainForm = document.getElementById('trainForm');
    const resultDiv = document.getElementById('result');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const confidenceText = document.getElementById('confidenceText');

    // Stats Elements
    const emailsAnalyzedEl = document.getElementById('emailsAnalyzed');
    const spamBlockedEl = document.getElementById('spamBlocked');
    const accuracyRateEl = document.getElementById('accuracyRate');
    const avgResponseTimeEl = document.getElementById('avgResponseTime');

    // Update stats
    function updateStats() {
        emailsAnalyzedEl.textContent = stats.emailsAnalyzed;
        spamBlockedEl.textContent = stats.spamBlocked;
        accuracyRateEl.textContent = `${stats.accuracyRate}%`;
        avgResponseTimeEl.textContent = `${stats.avgResponseTime}ms`;
    }

    // Analyze form submission
    analyzeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailText = document.getElementById('emailText').value.trim();
        if (!emailText) {
            showError('Please enter some email content to analyze.');
            return;
        }

        const startTime = performance.now();

        try {
            const formData = new FormData();
            formData.append('email_content', emailText);

            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                const endTime = performance.now();
                const responseTime = Math.round(endTime - startTime);
                
                // Update stats
                stats.emailsAnalyzed++;
                if (data.prediction === 1) stats.spamBlocked++;
                stats.avgResponseTime = Math.round((stats.avgResponseTime * (stats.emailsAnalyzed - 1) + responseTime) / stats.emailsAnalyzed);
                updateStats();

                showResult(data);
            } else {
                showError(data.error || 'An error occurred during analysis.');
            }
        } catch (error) {
            showError('Failed to connect to the server. Please try again.');
        }
    });

    // Train form submission
    trainForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('trainingFile');
        if (!fileInput.files.length) {
            showError('Please select a training data file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('/train', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                showSuccess('Model trained successfully!');
                // Update accuracy rate after training
                stats.accuracyRate = Math.round(data.accuracy * 100);
                updateStats();
            } else {
                showError(data.error || 'An error occurred during training.');
            }
        } catch (error) {
            showError('Failed to connect to the server. Please try again.');
        }
    });

    // Show result
    function showResult(data) {
        resultDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
        
        if (data.prediction === 1) {
            resultDiv.classList.add('alert-danger');
            resultTitle.textContent = 'Spam Detected!';
            resultText.textContent = 'This email appears to be spam.';
        } else {
            resultDiv.classList.add('alert-success');
            resultTitle.textContent = 'Not Spam';
            resultText.textContent = 'This email appears to be legitimate.';
        }
        
        confidenceText.textContent = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Show error
    function showError(message) {
        resultDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
        resultDiv.classList.add('alert-danger');
        resultTitle.textContent = 'Error';
        resultText.textContent = message;
        confidenceText.textContent = '';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Show success
    function showSuccess(message) {
        resultDiv.classList.remove('d-none', 'alert-success', 'alert-danger');
        resultDiv.classList.add('alert-success');
        resultTitle.textContent = 'Success';
        resultText.textContent = message;
        confidenceText.textContent = '';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
});

// Smooth scrolling
function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Add active class to nav items on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}); 