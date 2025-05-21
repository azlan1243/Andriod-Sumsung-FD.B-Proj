document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements for Profile Page
    const profileForm = document.getElementById('profile-form');
    const userIdInput = document.getElementById('userId');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const userEmailInput = document.getElementById('userEmail');
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');
    const addressInput = document.getElementById('address');

    // Preview elements
    const previewName = document.getElementById('preview-name');
    const previewUserId = document.getElementById('preview-userId');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewAge = document.getElementById('preview-age');
    const previewAddress = document.getElementById('preview-address');
    
    // Auto-generate User ID
    const generateUserId = () => {
        const randomId = Math.floor(10000 + Math.random() * 90000);
        return `USER${randomId}`;
    };
    
    // Auto-calculate age based on DOB
    dobInput.addEventListener('change', () => {
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        ageInput.value = age;
        
        // Update preview
        previewAge.textContent = age;
    });
    
    // Auto-fill full name when first name or last name changes
    const updateFullName = () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        
        if (firstName || lastName) {
            fullNameInput.value = `${firstName} ${lastName}`.trim();
            previewName.textContent = fullNameInput.value || 'Your Name';
        }
    };
    
    firstNameInput.addEventListener('input', updateFullName);
    lastNameInput.addEventListener('input', updateFullName);
    
    // Live preview for other fields
    userIdInput.addEventListener('input', () => {
        previewUserId.textContent = userIdInput.value || '-';
    });
    
    userEmailInput.addEventListener('input', () => {
        previewEmail.textContent = userEmailInput.value || '-';
    });
    
    phoneInput.addEventListener('input', () => {
        previewPhone.textContent = phoneInput.value || '-';
    });
    
    addressInput.addEventListener('input', () => {
        previewAddress.textContent = addressInput.value || '-';
    });
    
    // Auto-generate user ID if not present
    if (!userIdInput.value) {
        userIdInput.value = generateUserId();
        previewUserId.textContent = userIdInput.value;
    }
    
    // Handle form submission
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateProfileForm()) return;
        
        // Create user object
        const user = {
            userId: userIdInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            fullName: fullNameInput.value,
            phone: phoneInput.value,
            email: userEmailInput.value,
            dob: dobInput.value,
            age: parseInt(ageInput.value),
            address: addressInput.value,
            createdAt: new Date().toISOString()
        };
        
        try {
            // Save user data
            await saveUserProfile(user);
            
            // Show success message
            showToast('Profile saved successfully!', 'success');
            
            // Update UI elements for orders and reviews
            updateUserIdDropdowns(user.userId);
            
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('Error saving profile. Please try again.', 'error');
        }
    });
    
    // Form validation
    function validateProfileForm() {
        let isValid = true;
        
        // Basic validation for each field
        if (!userIdInput.value) {
            showToast('User ID is required', 'error');
            isValid = false;
        }
        
        if (!firstNameInput.value || !lastNameInput.value) {
            showToast('First and last name are required', 'error');
            isValid = false;
        }
        
        if (!userEmailInput.value || !userEmailInput.value.includes('@')) {
            showToast('Please enter a valid email address', 'error');
            isValid = false;
        }
        
        if (!phoneInput.value || phoneInput.value.length < 10) {
            showToast('Please enter a valid phone number', 'error');
            isValid = false;
        }
        
        if (!dobInput.value) {
            showToast('Date of birth is required', 'error');
            isValid = false;
        }
        
        if (!addressInput.value) {
            showToast('Address is required', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to update userId dropdowns in order and review forms
    function updateUserIdDropdowns(userId) {
        const orderUserIdInput = document.getElementById('orderUserId');
        const reviewUserIdInput = document.getElementById('reviewUserId');
        
        if (orderUserIdInput) orderUserIdInput.value = userId;
        if (reviewUserIdInput) reviewUserIdInput.value = userId;
    }
    
    // Load stored profile data if exists
    window.addEventListener('load', async () => {
        try {
            const user = await getUserProfile();
            
            if (user) {
                userIdInput.value = user.userId;
                firstNameInput.value = user.firstName;
                lastNameInput.value = user.lastName;
                fullNameInput.value = user.fullName;
                phoneInput.value = user.phone;
                userEmailInput.value = user.email;
                dobInput.value = user.dob;
                ageInput.value = user.age;
                addressInput.value = user.address;
                
                // Update preview
                previewName.textContent = user.fullName;
                previewUserId.textContent = user.userId;
                previewEmail.textContent = user.email;
                previewPhone.textContent = user.phone;
                previewAge.textContent = user.age;
                previewAddress.textContent = user.address;
                
                // Update other forms
                updateUserIdDropdowns(user.userId);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    });
});