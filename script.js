// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Height Conversion Calculator
function convertHeight() {
    const feet = parseFloat(document.getElementById('feet').value) || 0;
    const inches = parseFloat(document.getElementById('inches').value) || 0;
    const centimeters = parseFloat(document.getElementById('centimeters').value) || 0;
    
    const resultBox = document.getElementById('convertResult');
    
    let totalCm, totalFeet, totalInches, meters;
    
    if (centimeters > 0) {
        // Convert from cm
        totalCm = centimeters;
        const totalInchesFromCm = centimeters / 2.54;
        totalFeet = Math.floor(totalInchesFromCm / 12);
        totalInches = Math.round((totalInchesFromCm % 12) * 10) / 10;
        meters = (centimeters / 100).toFixed(2);
    } else if (feet > 0 || inches > 0) {
        // Convert from feet and inches
        totalInches = (feet * 12) + inches;
        totalCm = Math.round(totalInches * 2.54 * 10) / 10;
        totalFeet = feet;
        meters = (totalCm / 100).toFixed(2);
    } else {
        resultBox.innerHTML = '<p style="color: #FF6B35; font-weight: 700;">⚠️ Please enter a height value!</p>';
        resultBox.classList.add('show');
        return;
    }
    
    resultBox.innerHTML = `
        <div style="display: grid; gap: 15px;">
            <div style="background: #fff; padding: 15px; border: 3px solid #1A1A1A; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">
                <div style="font-size: 14px; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">Imperial</div>
                <div style="font-size: 28px; color: #FF6B35; font-weight: 900;">${totalFeet}' ${totalInches}"</div>
            </div>
            <div style="background: #fff; padding: 15px; border: 3px solid #1A1A1A; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">
                <div style="font-size: 14px; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">Metric</div>
                <div style="font-size: 28px; color: #4ECDC4; font-weight: 900;">${totalCm} cm</div>
            </div>
            <div style="background: #fff; padding: 15px; border: 3px solid #1A1A1A; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">
                <div style="font-size: 14px; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">Meters</div>
                <div style="font-size: 28px; color: #FF6B35; font-weight: 900;">${meters} m</div>
            </div>
        </div>
    `;
    resultBox.classList.add('show');
    
    // Animate result
    resultBox.style.animation = 'none';
    setTimeout(() => {
        resultBox.style.animation = 'slideDown 0.3s ease';
    }, 10);
}

// Child Height Prediction
function predictHeight() {
    const gender = document.getElementById('gender').value;
    const fatherHeight = parseFloat(document.getElementById('fatherHeight').value);
    const motherHeight = parseFloat(document.getElementById('motherHeight').value);
    
    const resultBox = document.getElementById('predictResult');
    
    if (!fatherHeight || !motherHeight) {
        resultBox.innerHTML = '<p style="color: #FF6B35; font-weight: 700;">⚠️ Please enter both parent heights!</p>';
        resultBox.classList.add('show');
        return;
    }
    
    // Mid-parental height method
    let predictedHeight;
    if (gender === 'male') {
        predictedHeight = ((fatherHeight + motherHeight + 13) / 2);
    } else {
        predictedHeight = ((fatherHeight + motherHeight - 13) / 2);
    }
    
    const minHeight = Math.round(predictedHeight - 10);
    const maxHeight = Math.round(predictedHeight + 10);
    predictedHeight = Math.round(predictedHeight);
    
    // Convert to feet and inches
    const totalInches = predictedHeight / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round((totalInches % 12) * 10) / 10;
    
    resultBox.innerHTML = `
        <div style="display: grid; gap: 15px;">
            <div style="background: #fff; padding: 20px; border: 3px solid #1A1A1A; box-shadow: 4px 4px 0 rgba(0,0,0,0.1); text-align: center;">
                <div style="font-size: 14px; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">Predicted Adult Height</div>
                <div style="font-size: 36px; color: #FF6B35; font-weight: 900; margin-bottom: 5px;">${predictedHeight} cm</div>
                <div style="font-size: 24px; color: #4ECDC4; font-weight: 700;">${feet}' ${inches}"</div>
            </div>
            <div style="background: #fff; padding: 15px; border: 3px solid #1A1A1A; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">
                <div style="font-size: 14px; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 5px;">Height Range</div>
                <div style="font-size: 20px; color: #1A1A1A; font-weight: 700;">${minHeight} - ${maxHeight} cm</div>
                <p style="margin-top: 10px; font-size: 14px; color: #666; line-height: 1.4;">This is an estimate based on parental heights. Actual height may vary due to nutrition, health, and genetics.</p>
            </div>
        </div>
    `;
    resultBox.classList.add('show');
    
    // Animate result
    resultBox.style.animation = 'none';
    setTimeout(() => {
        resultBox.style.animation = 'slideDown 0.3s ease';
    }, 10);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#fff';
    nav.style.flexDirection = 'column';
    nav.style.padding = '20px';
    nav.style.borderTop = '5px solid #1A1A1A';
    nav.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
});

// Smooth Scroll
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

// Allow Enter key to trigger calculations
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab.id === 'convert') {
                convertHeight();
            } else if (activeTab.id === 'predict') {
                predictHeight();
            }
        }
    });
});