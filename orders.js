document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements for Orders Page
    const orderForm = document.getElementById('order-form');
    const orderIdInput = document.getElementById('orderId');
    const orderUserIdInput = document.getElementById('orderUserId');
    const orderDateInput = document.getElementById('orderDate');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const totalAmountInput = document.getElementById('totalAmount');
    const orderSummary = document.getElementById('order-summary');
    const ordersList = document.getElementById('orders-list');
    
    let selectedProduct = null;
    let orderItems = [];
    
    // Auto-generate Order ID
    const generateOrderId = () => {
        const randomId = Math.floor(10000 + Math.random() * 90000);
        return `ORD${randomId}`;
    };
    
    // Set default values
    if (!orderIdInput.value) {
        orderIdInput.value = generateOrderId();
    }
    
    if (!orderDateInput.value) {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        
        orderDateInput.value = `${year}-${month}-${day}`;
    }
    
    // Populate product select options from phones.js data
    function populateProductOptions() {
        phones.forEach(phone => {
            const option = document.createElement('option');
            option.value = phone.id;
            option.textContent = `${phone.model} - ${phone.price}`;
            productSelect.appendChild(option);
        });
    }
    
    populateProductOptions();
    
    // Update total amount when product or quantity changes
    function updateTotal() {
        if (!selectedProduct) return;
        
        const quantity = parseInt(quantityInput.value) || 1;
        const price = parseFloat(selectedProduct.price.replace('$', '').replace(',', ''));
        const total = (price * quantity).toFixed(2);
        
        totalAmountInput.value = `$${total}`;
    }
    
    productSelect.addEventListener('change', () => {
        const productId = parseInt(productSelect.value);
        selectedProduct = phones.find(phone => phone.id === productId);
        updateTotal();
        updateOrderSummary();
    });
    
    quantityInput.addEventListener('input', () => {
        updateTotal();
        updateOrderSummary();
    });
    
    // Update order summary
    function updateOrderSummary() {
        if (!selectedProduct) {
            orderSummary.innerHTML = '<h3>Order Summary</h3><p>No items added yet.</p>';
            return;
        }
        
        const quantity = parseInt(quantityInput.value) || 1;
        const price = parseFloat(selectedProduct.price.replace('$', '').replace(',', ''));
        const total = (price * quantity).toFixed(2);
        
        orderSummary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="order-item">
                <p><strong>Product:</strong> ${selectedProduct.model}</p>
                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Subtotal:</strong> $${total}</p>
            </div>
        `;
    }
    
    // Handle form submission
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateOrderForm()) return;
        
        // Create order object
        const order = {
            orderId: orderIdInput.value,
            userId: orderUserIdInput.value,
            orderDate: orderDateInput.value,
            productId: parseInt(productSelect.value),
            productName: selectedProduct.model,
            quantity: parseInt(quantityInput.value),
            unitPrice: selectedProduct.price,
            totalAmount: totalAmountInput.value,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };
        
        try {
            // Save order data
            await saveOrder(order);
            
            // Show success message
            showToast('Order placed successfully!', 'success');
            
            // Reset form and reload orders
            resetOrderForm();
            loadOrders();
            
        } catch (error) {
            console.error('Error placing order:', error);
            showToast('Error placing order. Please try again.', 'error');
        }
    });
    
    // Form validation
    function validateOrderForm() {
        let isValid = true;
        
        if (!orderIdInput.value) {
            showToast('Order ID is required', 'error');
            isValid = false;
        }
        
        if (!orderUserIdInput.value) {
            showToast('User ID is required', 'error');
            isValid = false;
        }
        
        if (!orderDateInput.value) {
            showToast('Order date is required', 'error');
            isValid = false;
        }
        
        if (!productSelect.value) {
            showToast('Please select a product', 'error');
            isValid = false;
        }
        
        if (!quantityInput.value || parseInt(quantityInput.value) < 1) {
            showToast('Quantity must be at least 1', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Reset the order form
    function resetOrderForm() {
        orderIdInput.value = generateOrderId();
        productSelect.value = '';
        quantityInput.value = '1';
        totalAmountInput.value = '';
        selectedProduct = null;
        updateOrderSummary();
    }
    
    // Load orders from storage
    async function loadOrders() {
        try {
            const userId = orderUserIdInput.value;
            if (!userId) return;
            
            const orders = await getOrdersByUserId(userId);
            
            if (orders && orders.length > 0) {
                let html = '';
                
                orders.forEach(order => {
                    html += `
                        <div class="order-card">
                            <h4>Order #${order.orderId}</h4>
                            <p><strong>Date:</strong> ${formatDate(order.orderDate)}</p>
                            <p><strong>Product:</strong> ${order.productName}</p>
                            <p><strong>Quantity:</strong> ${order.quantity}</p>
                            <p><strong>Total:</strong> ${order.totalAmount}</p>
                            <p><strong>Status:</strong> <span class="status-${order.status.toLowerCase()}">${order.status}</span></p>
                        </div>
                    `;
                });
                
                ordersList.innerHTML = html;
            } else {
                ordersList.innerHTML = '<p>No previous orders found.</p>';
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            ordersList.innerHTML = '<p>Error loading orders. Please try again.</p>';
        }
    }
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Load stored orders when user ID changes
    orderUserIdInput.addEventListener('change', loadOrders);
    
    // Initial load of orders
    window.addEventListener('load', loadOrders);
});