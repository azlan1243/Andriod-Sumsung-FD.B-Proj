document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');

    function navigateToSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[href="#${sectionId}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (targetLink) targetLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateToSection(sectionId);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('show');
            }
        });
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
        });
    }

    // Products Section
    const productsContainer = document.getElementById('products-container');
    
    function createPhoneCard(phone) {
        const card = document.createElement('div');
        card.className = 'phone-card';
        card.innerHTML = `
            <img src="${phone.image}" alt="${phone.model}">
            <div class="phone-info">
                <h3>${phone.model}</h3>
                <p class="phone-price">${phone.price}</p>
                <ul class="specs-list">
                    <li><span>Display:</span> <span>${phone.specs.display}</span></li>
                    <li><span>Processor:</span> <span>${phone.specs.processor}</span></li>
                    <li><span>Camera:</span> <span>${phone.specs.camera}</span></li>
                    <li><span>Battery:</span> <span>${phone.specs.battery}</span></li>
                    <li><span>Rating:</span> <span>${phone.specs.rating}</span></li>
                </ul>
                <button class="cta-button" onclick="addToCompare(${phone.id})">Add to Compare</button>
            </div>
        `;
        return card;
    }

    if (productsContainer) {
        phones.forEach(phone => {
            productsContainer.appendChild(createPhoneCard(phone));
        });
    }

    // Compare Section
    const phoneSelect = document.getElementById('phone-select');
    const comparisonTable = document.getElementById('comparison-table');
    let selectedPhones = [];

    // Populate select options
    if (phoneSelect) {
        phones.forEach(phone => {
            const option = document.createElement('option');
            option.value = phone.id;
            option.textContent = phone.model;
            phoneSelect.appendChild(option);
        });
    }

    window.addToCompare = function(phoneId) {
        const phone = phones.find(p => p.id === phoneId);
        if (phone && selectedPhones.length < 3 && !selectedPhones.find(p => p.id === phoneId)) {
            selectedPhones.push(phone);
            updateComparisonTable();
            navigateToSection('compare');
        } else if (selectedPhones.length >= 3) {
            showToast('You can compare up to 3 phones at a time', 'info');
        } else if (selectedPhones.find(p => p.id === phoneId)) {
            showToast('This phone is already in the comparison', 'info');
        }
    };

    if (document.getElementById('add-to-compare')) {
        document.getElementById('add-to-compare').addEventListener('click', () => {
            const phoneId = Number(phoneSelect.value);
            if (phoneId) {
                addToCompare(phoneId);
            } else {
                showToast('Please select a phone to compare', 'info');
            }
        });
    }

    function updateComparisonTable() {
        if (!comparisonTable) return;
        
        if (selectedPhones.length === 0) {
            comparisonTable.innerHTML = '<p>Select phones to compare</p>';
            return;
        }

        let html = `
            <table>
                <tr class="table-header">
                    <th>Feature</th>
                    ${selectedPhones.map(phone => `
                        <th>
                            ${phone.model}
                            <button onclick="removeFromCompare(${phone.id})" class="remove-btn">&times;</button>
                        </th>
                    `).join('')}
                </tr>
                <tr><td>Price</td>${selectedPhones.map(phone => `<td>${phone.price}</td>`).join('')}</tr>
                <tr><td>Display</td>${selectedPhones.map(phone => `<td>${phone.specs.display}</td>`).join('')}</tr>
                <tr><td>Processor</td>${selectedPhones.map(phone => `<td>${phone.specs.processor}</td>`).join('')}</tr>
                <tr><td>Camera</td>${selectedPhones.map(phone => `<td>${phone.specs.camera}</td>`).join('')}</tr>
                <tr><td>Battery</td>${selectedPhones.map(phone => `<td>${phone.specs.battery}</td>`).join('')}</tr>
                <tr><td>Rating</td>${selectedPhones.map(phone => `<td>${phone.specs.rating}</td>`).join('')}</tr>
                <tr><td>Size</td>${selectedPhones.map(phone => `<td>${phone.specs.size}</td>`).join('')}</tr>
                <tr><td>Weight</td>${selectedPhones.map(phone => `<td>${phone.specs.weight}</td>`).join('')}</tr>
                <tr><td>Color</td>${selectedPhones.map(phone => `<td>${phone.specs.color}</td>`).join('')}</tr>
                <tr><td>Frequency</td>${selectedPhones.map(phone => `<td>${phone.specs.frequency}</td>`).join('')}</tr>
                <tr><td>Extra Features</td>${selectedPhones.map(phone => `<td>${phone.specs.extraFeatures}</td>`).join('')}</tr>
            </table>
        `;
        comparisonTable.innerHTML = html;
    }

    window.removeFromCompare = function(phoneId) {
        selectedPhones = selectedPhones.filter(phone => phone.id !== phoneId);
        updateComparisonTable();
    };

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showToast('Please fill out all fields', 'error');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            const formData = {
                name,
                email,
                message
            };
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', formData);
            showToast('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Animation on scroll
    function setupScrollAnimations() {
        const elements = document.querySelectorAll('.feature-card, .phone-card, .form-group');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Setup animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        setupScrollAnimations();
    }

    // Initialize with home section or section from URL hash
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    navigateToSection(initialSection);
});