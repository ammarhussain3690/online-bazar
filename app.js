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
    { 
        id: 9, 
        name: 'P9 Wireless Headphones Bluetooth with Microphone (Noise Cancellation)', 
        price: 2450, 
        category: 'electronics', 
        rating: 5, 
        image: 'p9-1.jpg.jpeg', 
        images: [
            { type: 'image', src: 'p9-1.jpg.jpeg' },
            { type: 'image', src: 'p9-2.jpg.jpeg' },
            { type: 'image', src: 'p9-3.jpg.jpeg' }
        ], 
        description: 'Premium P9 Wireless Headphones featuring high-fidelity sound, deep bass, and active noise cancellation. Equipped with a built-in HD microphone for crystal clear calls, soft memory foam earcups for long-lasting comfort, and the latest Bluetooth 5.0 technology.'
    },
    { 
        id: 10, 
        name: 'Boltex 12V Router Power Bank For Internet Backup', 
        price: 1500, 
        category: 'electronics', 
        rating: 5, 
        image: 'router-1.jpeg', 
        images: [
            { type: 'image', src: 'router-1.jpeg' },
            { type: 'image', src: 'router-2.jpeg' },
            { type: 'image', src: 'router-3.jpeg' }
        ], 
        description: 'High-quality Boltex 12V Router Power Bank designed to keep your internet running smoothly during power outages. Perfect backup solution for Wi-Fi routers, modems, and CCTV cameras with intelligent overcharge protection.'
    },
    { 
        id: 11, 
        name: 'PU Leather Passport Holder and Travel Wallet – Multi Card Organizer with Cash Pocket for Men & Women', 
        price: 700, 
        category: 'fashion', 
        rating: 5, 
        image: 'passport-1.jpeg', 
        images: [
            { type: 'image', src: 'passport-1.jpeg' },
            { type: 'image', src: 'passport-2.jpeg' },
            { type: 'image', src: 'passport-3.jpeg' },
            { type: 'image', src: 'passport-4.jpeg' }
        ], 
        description: 'Premium quality PU leather passport holder and multi-functional travel wallet. Features a dedicated passport slot, multi-card organizing slots, and a secure cash pocket. Sleek, lightweight, and durable design suitable for both men and women.'
    },
    { 
        id: 12, 
        name: 'Rechargeable Mini Pocket Shoppers Sealing Device (with Box Packing)', 
        price: 500, 
        category: 'home', 
        rating: 5, 
        image: 'sealer-1.jpeg', 
        images: [
            { type: 'image', src: 'sealer-1.jpeg' },
            { type: 'image', src: 'sealer-2.jpeg' },
            { type: 'video', src: 'sealer-video.mp4' }
        ], 
        description: 'Convenient and portable Rechargeable Mini Pocket Sealing Device. Perfect for resealing plastic bags, snacks, and shoppers to keep food fresh. Comes with neat box packing and a built-in rechargeable battery.'
    },
    { 
        id: 13, 
        name: "Oval Shaped 'C' Shaped Sofa Side Table Laptop Table Coffee Table", 
        price: 1800, 
        category: 'home', 
        rating: 5, 
        image: 'table-1.jpeg', 
        images: [
            { type: 'image', src: 'table-1.jpeg' },
            { type: 'image', src: 'table-2.jpeg' },
            { type: 'image', src: 'table-3.jpeg' },
            { type: 'video', src: 'table-video.mp4' }
        ], 
        description: 'Modern oval C-shaped sofa side table. Designed to slide easily under your sofa or bed for convenient laptop use, coffee, or snacks. Sturdy frame with a sleek finish, making it a perfect functional space saver for home living.'
    },
    { 
        id: 14, 
        name: 'Heavy Duty Waterproof Picnic Mat & Outdoor Beach Blanket (Foldable with Handle)', 
        price: 1250, 
        category: 'home', 
        rating: 5, 
        image: 'picnic-1.jpeg', 
        images: [
            { type: 'image', src: 'picnic-1.jpeg' },
            { type: 'image', src: 'picnic-2.jpeg' },
            { type: 'image', src: 'picnic-3.jpeg' },
            { type: 'video', src: 'picnic-video.mp4' }
        ], 
        description: 'Premium quality extra-large outdoor picnic mat. Completely waterproof and sand-proof backing to protect you from damp grass or wet surfaces. Easy to clean, lightweight, and folds down into a neat compact tote bag with a built-in carry handle. Ideal for parks, beaches, camping, and backyard gatherings.'
    }
];

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('online_bazar_cart')) || [];
let currentModalImages = [];
let currentImageIndex = 0;

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

    if (cartToggle && cartSidebar) cartToggle.addEventListener('click', () => cartSidebar.classList.remove('hidden'));
    if (cartClose && cartSidebar) cartClose.addEventListener('click', () => cartSidebar.classList.add('hidden'));
    if (cartOverlay && cartSidebar) cartOverlay.addEventListener('click', () => cartSidebar.classList.add('hidden'));

    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const productModal = document.getElementById('product-modal');

    if (modalClose && productModal) modalClose.addEventListener('click', () => productModal.classList.add('hidden'));
    if (modalOverlay && productModal) modalOverlay.backgroundColor = ''; 
    if (modalOverlay && productModal) modalOverlay.addEventListener('click', () => productModal.classList.add('hidden'));

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
        container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400 text-sm"><i class="fas fa-box-open text-3xl mb-2 block"></i> No products found.</div>`;
        return;
    }

    container.innerHTML = items.map(product => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<i class="fas fa-star ${i < product.rating ? 'text-yellow-400' : 'text-gray-200'} text-[10px]"></i>`;
        }

        return `
            <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col group">
                <div onclick="openProductModal(${product.id})" class="relative pt-[100%] bg-gray-50 overflow-hidden cursor-pointer">
                    <img src="${product.image}" alt="${product.name}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div onclick="openProductModal(${product.id})" class="cursor-pointer">
                        <div class="flex items-center space-x-1 mb-1">${stars}</div>
                        <h3 class="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] mb-2">${product.name}</h3>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-baseline justify-between mb-3">
                            <span class="text-base font-black text-brand-dark">Rs. ${product.price.toLocaleString()}</span>
                            <span class="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium capitalize">${product.category}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="w-full bg-brand-dark hover:bg-brand-light text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <i class="fas fa-shopping-cart text-[11px]"></i>
                            <span>Add To Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- SLIDER MODAL FUNCTIONS ---
window.openProductModal = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    currentModalImages = product.images && product.images.length > 0 
        ? product.images.map(item => typeof item === 'string' ? { type: 'image', src: item } : item)
        : [{ type: 'image', src: product.image }];
        
    currentImageIndex = 0;

    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-price').innerText = `Rs. ${product.price.toLocaleString()}`;
    document.getElementById('modal-cat').innerText = product.category;
    document.getElementById('modal-desc').innerText = product.description || 'No description available.';
    
    const addBtn = document.getElementById('modal-add-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(product.id);
            document.getElementById('product-modal').classList.add('hidden');
        };
    }

    updateModalImage();
    renderThumbnails();

    document.getElementById('product-modal').classList.remove('hidden');
};

function updateModalImage() {
    const container = document.getElementById('modal-main-img-container') || document.getElementById('modal-main-img')?.parentElement;
    if (!container) return;

    const currentMedia = currentModalImages[currentImageIndex];

    if (currentMedia.type === 'video') {
        container.innerHTML = `<video id="modal-main-img" src="${currentMedia.src}" controls autoplay loop muted class="absolute inset-0 w-full h-full object-cover rounded-lg"></video>`;
    } else {
        container.innerHTML = `<img id="modal-main-img" src="${currentMedia.src}" class="absolute inset-0 w-full h-full object-cover rounded-lg">`;
    }
}

window.changeModalImage = function(direction) {
    if (!currentModalImages.length) return;
    currentImageIndex += direction;
    if (currentImageIndex >= currentModalImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = currentModalImages.length - 1;
    updateModalImage();
    renderThumbnails();
};

window.setModalImage = function(index) {
    currentImageIndex = index;
    updateModalImage();
    renderThumbnails();
};

function renderThumbnails() {
    const container = document.getElementById('modal-thumbnails');
    if (!container) return;

    container.innerHTML = currentModalImages.map((media, idx) => {
        const content = media.type === 'video' 
            ? `<div class="w-full h-full flex items-center justify-center bg-gray-900 text-white"><i class="fas fa-play text-xs"></i></div>`
            : `<img src="${media.src}" class="w-full h-full object-cover">`;

        return `
            <div onclick="setModalImage(${idx})" class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${idx === currentImageIndex ? 'border-brand-dark scale-95' : 'border-transparent opacity-60 hover:opacity-100'}">
                ${content}
            </div>
        `;
    }).join('');
}

// --- CART INTERACTION METHODS ---
window.filterByCategory = function(catId) {
    const filtered = PRODUCTS.filter(p => p.category === catId);
    renderProducts(filtered);
    const featured = document.getElementById('featured-products');
    if (featured) featured.scrollIntoView({ behavior: 'smooth' });
};

window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.remove('hidden');
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
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.innerText = totalCount;

    const container = document.getElementById('cart-items-container');
    const subtotalText = document.getElementById('cart-subtotal');
    if (!container || !subtotalText) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-16 text-gray-400 text-sm flex flex-col items-center justify-center h-full"><i class="fas fa-shopping-basket text-4xl mb-3 opacity-40"></i>Your shopping cart is empty</div>`;
        subtotalText.innerText = "Rs. 0";
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
                    <span class="text-sm font-black text-brand-dark block mb-2">Rs. ${item.price.toLocaleString()}</span>
                    <div class="flex items-center space-x-2">
                        <button onclick="modifyQuantity(${item.id}, -1)" class="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">-</button>
                        <span class="text-xs font-bold text-gray-800 w-4 text-center">${item.quantity}</span>
                        <button onclick="modifyQuantity(${item.id}, 1)" class="w-6 h-6 bg-white border border-gray-300 hover:bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    subtotalText.innerText = `Rs. ${subtotal.toLocaleString()}`;
}