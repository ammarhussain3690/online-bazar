// --- DATA SOURCE CONFIGURATIONS ---
const CATEGORIES = [
    { id: 'electronics', name: 'Electronics', icon: 'fa-laptop' },
    { id: 'fashion', name: 'Fashion & Style', icon: 'fa-tshirt' },
    { id: 'home', name: 'Home Living', icon: 'fa-couch' },
    { id: 'crockery', name: 'Kitchen Crockery', icon: 'fa-utensils' },
    { id: 'beauty', name: 'Beauty & Health', icon: 'fa-heart' },
    { id: 'sports', name: 'Sports Apparel', icon: 'fa-dumbbell' }
];

const PRODUCTS = [
    { id: 1, name: 'Premium Noise-Cancelling Headphones', price: 299.99, category: 'electronics', rating: 5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Minimalist Leather Chronograph Watch', price: 189.50, category: 'fashion', rating: 4, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Ergonomic Wireless Mesh Mouse', price: 79.99, category: 'electronics', rating: 5, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60' },
    { id: 4, name: 'Eco-Friendly Vacuum Thermos Flask', price: 34.00, category: 'home', rating: 4, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60' },
    { id: 5, name: 'All-Natural Organic Tea Ensemble', price: 24.50, category: 'groceries', rating: 5, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=60' },
    { id: 6, name: 'Elite Performance Cross-Trainer Shoes', price: 145.00, category: 'sports', rating: 4, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
    { id: 7, name: 'Hydro-Active Repair Skin Serum', price: 59.00, category: 'beauty', rating: 5, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60' },
    { id: 8, name: 'Industrial Oak Accent Side Table', price: 210.00, category: 'home', rating: 4, image: 'https://images.unsplash.com/photo-1532372320978-9b4d1a358f4c?w=500&auto=format&fit=crop&q=60' },
    
    // P9 WIRELESS HEADPHONES WITH YOUR EXACT GITHUB FILE NAMES
    { 
        id: 9, 
        name: 'P9 Wireless Headphones Bluetooth with Microphone (Noise Cancellation)', 
        price: 25.00, 
        category: 'electronics', 
        rating: 5, 
        image: 'p9-1.jpg.jpeg', // Fixed extension matching your GitHub repo
        images: [
            'p9-1.jpg.jpeg',
            'p9-2.jpg.jpeg',
            'p9-3.jpg.jpeg'
        ], 
        description: 'Premium P9 Wireless Headphones featuring high-fidelity sound, deep bass, and active noise cancellation. Equipped with a built-in HD microphone for crystal clear calls, soft memory foam earcups for long-lasting comfort, and the latest Bluetooth 5.0 technology.'
    }
];

// --- SHOPPING CART STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('online_bazar_cart')) || [];

// --- DOM READY BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
    initUIComponents();
    renderCategories();
    renderProducts(PRODUCTS);
    updateCartUI();
});

function initUIComponents() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => cartSidebar.classList.remove('hidden'));
    }
    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', () => cartSidebar.classList.add('hidden'));
    }
    if (cartOverlay && cartSidebar) {
        cartOverlay.addEventListener('click', () => cartSidebar.classList.add('hidden'));
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.firstElementChild.classList.remove('-translate-x-full'), 10);
        });
    }
    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.firstElementChild.classList.add('-translate-x-full');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(query));
            renderProducts(filtered);
        });
    }
}

// --- RENDER FUNCTIONS ---
function renderCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;
    
    container.innerHTML = CATEGORIES.map(cat => `
        <div onclick="filterByCategory('${cat.id}')" class="bg-white border border-gray-100 rounded-xl p-4 text-center cursor-pointer shadow-sm hover:border-brand-dark hover:shadow transition-all group">
            <div class="w-12 h-12 bg-gray-50 group-hover:bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                <i class="fas ${cat.icon} text-lg text-gray-600 group-hover:text-brand-dark"></i>
            </div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-brand-dark block truncate">${cat.name}</span>
        </div>
    `).join('');
}

function renderProducts(items) {
    const container = document.getElementById('products-grid');
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm"><i class="fas fa-box-open text-3xl mb-2 block"></i> No products found matching your entry.</div>`;
        return;
    }

    container.innerHTML = items.map(product => {
        let stars = '';
        for (let i = 0; i < product.rating; i++) {
            stars += `<i class="fas fa-star text-yellow-400 text-[10px]"></i>`;
        }
        for (let i = product.rating; i < 5; i++) {
            stars += `<i class="fas fa-star text-gray-200 text-[10px]"></i>`;
        }

        return `
            <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col group">
                <div class="relative pt-[100%] bg-gray-50 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center space-x-1 mb-1">${stars}</div>
                        <h3 class="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] mb-2">${product.name}</h3>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-baseline justify-between mb-3">
                            <span class="text-lg font-black text-brand-dark">$${product.price.toFixed(2)}</span>
                            <span class="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium capitalize">${product.category}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="w-full bg-brand-dark hover:bg-brand-light text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors focus:outline-none">
                            <i class="fas fa-shopping-cart text-[11px]"></i>
                            <span>Add To Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- INTERACTIVE METHODS ---
window.filterByCategory = function(catId) {
    const filtered = PRODUCTS.filter(p => p.category === catId);
    renderProducts(filtered);
    document.getElementById('featured-products').scrollIntoView({ behavior: 'smooth' });
};

window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    document.getElementById('cart-sidebar').classList.remove('hidden');
};

window.modifyQuantity = function(productId, delta) {
    const target = cart.find(item => item.id === productId);
    if (!target) return;

    target.quantity += delta;
    if (target.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCartUI();
};

function updateCartUI() {
    localStorage.setItem('online_bazar_cart', JSON.stringify(cart));
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    const container = document.getElementById('cart-items-container');
    const subtotalText = document.getElementById('cart-subtotal');
    if (!container || !subtotalText) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-16 text-gray-400 text-sm flex flex-col items-center justify-center h-full"><i class="fas fa-shopping-basket text-4xl mb-3 opacity-40"></i>Your shopping cart is empty</div>`;
        subtotalText.innerText = "$0.00";
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        const cost = item.price * item.quantity;
        subtotal += cost;
        return `
            <div class="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md bg-white border border-gray-200 flex-shrink-0">
                <div class="flex-1 min-w-0">
                    <h4 class="text-xs font-bold text-gray-800 truncate mb-1">${item.name}</h4>
                    <span class="text-sm font-black text-brand-dark block mb-2">$${item.price.toFixed(2)}</span>
                    <div class="flex items-center space-x-2">
                        <button onclick="modifyQuantity(${item.id}, -1)" class="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">-</button>
                        <span class="text-xs font-bold text-gray-800 w-4 text-center">${item.quantity}</span>
                        <button onclick="modifyQuantity(${item.id}, 1)" class="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    subtotalText.innerText = `$${subtotal.toFixed(2)}`;
}