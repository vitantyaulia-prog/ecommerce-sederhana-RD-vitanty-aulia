// ========================================
// DAPUR AULICIOUS ✨ - SCRIPT.JS
// ========================================

// ===== DATA PRODUK =====
var produkData = {
    1: { nama: 'Dimsum Goreng Keju', harga: 5000, img: 'gambar/dimsum-goreng-keju.jpeg', desc: 'Dimsum renyah berisi keju leleh yang gurih, cocok buat camilan sore.', desc_en: 'Crispy dimsum filled with melted savory cheese, perfect for afternoon snacks.', kategori: 'makanan', sku: 'DIM-001', rating: 4.8, reviews: 24, stok: 50, satuan: '/pcs' },
    2: { nama: 'Dimsum Mentai', harga: 18000, img: 'gambar/dimsum-mentai.jpeg', desc: 'Saus mentai pedas manis dibakar sampai kecokelatan, favorit baru.', desc_en: 'Sweet and spicy mentai sauce grilled until golden brown, a new favorite.', kategori: 'makanan', sku: 'DIM-002', rating: 4.9, reviews: 18, stok: 30, satuan: '/box (6 pcs)' },
    3: { nama: 'Dimsum Original', harga: 10000, img: 'gambar/dimsum-original.jpeg', desc: 'Klasik yang nggak pernah salah — rasa ayam gurih, kulit tipis lembut.', desc_en: 'A classic that never fails — savory chicken flavor, thin and soft skin.', kategori: 'makanan', sku: 'DIM-003', rating: 4.7, reviews: 32, stok: 45, satuan: '/box (5 pcs)' },
    4: { nama: 'Dimsum Mentai Birthday', harga: 65000, img: 'gambar/dimsum-mentai-birthday.jpeg', desc: 'Porsi besar cocok makan bareng, sudah termasuk saus, hiasan, dan lilin.', desc_en: 'Large portion perfect for sharing, includes sauce, decorations, and candle.', kategori: 'makanan', sku: 'DIM-004', rating: 4.9, reviews: 12, stok: 10, satuan: '/box (isi 16 pcs)' },
    5: { nama: 'Tahu Bakso Topping', harga: 10000, img: 'gambar/Tahu Bakso Toping.jpeg', desc: 'Tahu lembut berisi bakso sapi dengan topping saus spesial yang bikin nagih.', desc_en: 'Soft tofu filled with beef meatballs with special sauce topping that makes you crave.', kategori: 'makanan', sku: 'TBS-001', rating: 4.6, reviews: 15, stok: 25, satuan: '/box (5 pcs)' },
    6: { nama: 'Ice Matcha', harga: 12000, img: 'gambar/ice-matcha.jpeg', desc: 'Pure matcha + susu full cream + es, kesegaran yang sangat menyenangkan.', desc_en: 'Pure matcha + full cream milk + ice, a very refreshing delight.', kategori: 'minuman', sku: 'MIN-001', rating: 4.8, reviews: 28, stok: 40, satuan: '/pcs' },
    7: { nama: 'Ice Coffee', harga: 12000, img: 'gambar/ice-cofee.jpeg', desc: 'Kopi dingin dengan rasa khas dan susu murni yang bikin creamy, pas buat temen belajar.', desc_en: 'Cold coffee with distinctive flavor and creamy pure milk, perfect for study buddy.', kategori: 'minuman', sku: 'MIN-002', rating: 4.7, reviews: 20, stok: 35, satuan: '/pcs' },
    8: { nama: 'Ice Boba Brown Sugar', harga: 12000, img: 'gambar/ice-boba-brown sugar.jpeg', desc: 'Boba kenyal dengan rasa brown sugar yang manis dan bikin ketagihan.', desc_en: 'Chewy boba with sweet brown sugar flavor that is addictive.', kategori: 'minuman', sku: 'MIN-003', rating: 4.9, reviews: 35, stok: 20, satuan: '/pcs' },
    9: { nama: 'Dessol', harga: 3000, img: 'gambar/dessol.jpeg', desc: 'Dessol merupakan dessert risol dengan dua varian rasa: matcha manis dan coklat-keju yang lumer.', desc_en: 'Spring roll with two flavor variants: sweet matcha and melted chocolate-cheese.', kategori: 'makanan', sku: 'RIS-001', rating: 4.7, reviews: 10, stok: 30, satuan: '/pcs', pilihanRasa: [{ id: 'matcha', nama: 'Matcha Manis', nama_en: 'Sweet Matcha', img: 'gambar/dessol matcha.jpeg' }, { id: 'coklat-keju', nama: 'Coklat-Keju Lumer', nama_en: 'Melted Chocolate-Cheese', img: 'gambar/dessol coklat-keju.jpeg' }], rasaDefault: 'matcha' },
    10: { nama: 'Pisang Naget', harga: 7000, img: 'gambar/pisang naget .jpeg', desc: 'Pisang nugget dengan lapisan tepung renyah dan rasa manis alami pisang.', desc_en: 'Banana nugget with crispy flour coating and natural sweet banana flavor.', kategori: 'makanan', sku: 'PIS-001', rating: 4.6, reviews: 8, stok: 25, satuan: '/box' }
};

// ===== VARIABEL BIAYA =====
var MIN_PEMBELIAN_DISKON = 150000; // Diskon GRATIS ONGKIR untuk pembelian ≥ Rp 150.000
var BIAYA_ONGKIR = 15000;          // Biaya ongkos kirim
var BIAYA_PENANGANAN = 5000;       // Biaya penanganan

// ===== VARIABEL GLOBAL =====
var keranjang = [];
var isAdmin = false;
var orders = [];
var currentLang = 'id';
var ratingChartInstance = null;
var stockChartInstance = null;
var detailProductId = 1;

// ===== FUNGSI FORMAT =====
function formatRp(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

// ===== FUNGSI PERHITUNGAN =====
function hitungTotalKotor() {
    var total = 0;
    for (var i = 0; i < keranjang.length; i++) {
        var p = produkData[keranjang[i].id];
        if (p) total += p.harga * keranjang[i].qty;
    }
    return total;
}

function hitungOngkir(totalKotor) {
    // GRATIS ONGKIR jika total belanja >= Rp 150.000
    if (totalKotor >= MIN_PEMBELIAN_DISKON) {
        return 0;
    }
    return BIAYA_ONGKIR;
}

function hitungPenanganan(totalKotor) {
    // GRATIS BIAYA PENANGANAN jika total belanja >= Rp 150.000
    if (totalKotor >= MIN_PEMBELIAN_DISKON) {
        return 0;
    }
    return BIAYA_PENANGANAN;
}

function hitungDiskon(totalKotor) {
    // Diskon = gratis ongkir + gratis penanganan
    if (totalKotor >= MIN_PEMBELIAN_DISKON) {
        return BIAYA_ONGKIR + BIAYA_PENANGANAN;
    }
    return 0;
}

function hitungTotalBersih() {
    var totalKotor = hitungTotalKotor();
    var ongkir = hitungOngkir(totalKotor);
    var penanganan = hitungPenanganan(totalKotor);
    var diskon = hitungDiskon(totalKotor);
    return totalKotor + ongkir + penanganan - diskon;
}

function hitungJumlah() {
    var jumlah = 0;
    for (var i = 0; i < keranjang.length; i++) jumlah += keranjang[i].qty;
    return jumlah;
}

// ===== FUNGSI GET HARGA =====
function getHargaDiskon(produk) {
    return produk.harga;
}

function getStarsHTML(rating) {
    var full = Math.floor(rating);
    var half = rating - full >= 0.5;
    var empty = 5 - full - (half ? 1 : 0);
    var html = '';
    for (var i = 0; i < full; i++) html += '★';
    if (half) html += '<span class="star-half">★</span>';
    for (var i = 0; i < empty; i++) html += '<span class="star-empty">★</span>';
    return html;
}

// ===== UPDATE UI =====
function updateUI() {
    var jumlah = hitungJumlah();
    var totalKotor = hitungTotalKotor();
    var ongkir = hitungOngkir(totalKotor);
    var penanganan = hitungPenanganan(totalKotor);
    var diskon = hitungDiskon(totalKotor);
    var totalBersih = totalKotor + ongkir + penanganan - diskon;
    
    // Update badge keranjang
    var navBadge = document.getElementById('navCartBadge');
    navBadge.textContent = jumlah;
    if (jumlah > 0) navBadge.classList.add('show');
    else navBadge.classList.remove('show');
    
    // Update badge di setiap produk
    for (var i = 0; i < keranjang.length; i++) {
        var id = keranjang[i].id;
        var qtyBadge = document.getElementById('qtyBadge-' + id);
        if (qtyBadge) {
            qtyBadge.textContent = keranjang[i].qty;
            qtyBadge.classList.add('show');
        }
    }
    
    // Hapus badge yang tidak ada di keranjang
    var semuaId = Object.keys(produkData);
    for (var j = 0; j < semuaId.length; j++) {
        var cid = semuaId[j];
        var adaDiKeranjang = false;
        for (var k = 0; k < keranjang.length; k++) {
            if (keranjang[k].id == cid) { adaDiKeranjang = true; break; }
        }
        var cb = document.getElementById('qtyBadge-' + cid);
        if (cb && !adaDiKeranjang) cb.classList.remove('show');
    }
    
    // Update cart count
    document.getElementById('cartCount').textContent = jumlah;
    
    // Update cart total
    var cartTotalEl = document.getElementById('cartTotal');
    var htmlTotal = '';
    
    if (totalKotor > 0) {
        htmlTotal = formatRp(totalBersih);
        htmlTotal += ' <span style="font-size:0.65rem;color:var(--muted);display:block;line-height:1.4;">';
        
        // Tampilkan detail biaya
        if (totalKotor >= MIN_PEMBELIAN_DISKON) {
            htmlTotal += '✅ Gratis Ongkir + Penanganan! 🎉';
        } else {
            var sisa = MIN_PEMBELIAN_DISKON - totalKotor;
            htmlTotal += '🛵 Ongkir Rp ' + BIAYA_ONGKIR.toLocaleString('id-ID');
            htmlTotal += ' + 📦 Penanganan Rp ' + BIAYA_PENANGANAN.toLocaleString('id-ID');
            htmlTotal += '<br><span style="color:var(--primary);">Tambahan Rp ' + sisa.toLocaleString('id-ID') + ' lagi untuk Gratis Ongkir!</span>';
        }
        htmlTotal += '</span>';
        cartTotalEl.innerHTML = htmlTotal;
    } else {
        cartTotalEl.textContent = formatRp(0);
    }
    
    // Tampilkan/sembunyikan footer cart
    document.getElementById('cartFooter').style.display = keranjang.length > 0 ? 'flex' : 'none';
    
    renderCartItems();
    updateSummary();
}

// ===== RENDER CART ITEMS =====
function renderCartItems() {
    var body = document.getElementById('cartBody');
    var dict = translations[currentLang];
    
    if (keranjang.length === 0) {
        var emptyTitle = dict['cart-empty-title'] || (currentLang === 'id' ? 'Belum ada pesanan' : 'No items yet');
        var emptySub = dict['cart-empty-sub'] || (currentLang === 'id' ? 'Tekan tombol + pada produk untuk menambahkan' : 'Press the + button on products to add');
        body.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>' + emptyTitle + '</p><small>' + emptySub + '</small></div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < keranjang.length; i++) {
        var item = keranjang[i];
        var p = produkData[item.id];
        if (!p) continue;
        var subtotal = p.harga * item.qty;
        var rasaText = (item.rasa && item.rasaNama) ? ' <span style="font-size:0.7rem;color:var(--muted);">(' + item.rasaNama + ')</span>' : '';
        
        html += '<div class="cart-item"><div class="cart-item-img"><img src="' + p.img + '" alt="' + p.nama + '"></div><div class="cart-item-info"><div class="cart-item-name">' + p.nama + rasaText + '</div><div class="cart-item-price">' + formatRp(p.harga) + '</div><div class="cart-item-bottom"><div class="qty-ctrl"><button class="qty-btn" onclick="ubahQty(' + item.id + ', -1)">−</button><span class="qty-val">' + item.qty + '</span><button class="qty-btn" onclick="ubahQty(' + item.id + ', 1)">+</button></div><span class="cart-item-subtotal">' + formatRp(subtotal) + '</span></div></div><button class="cart-item-remove" onclick="hapusItem(' + item.id + ')"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    }
    body.innerHTML = html;
}

// ===== UPDATE SUMMARY (CHECKOUT) =====
function updateSummary() {
    var container = document.getElementById('summaryItems');
    var totalKotor = hitungTotalKotor();
    var ongkir = hitungOngkir(totalKotor);
    var penanganan = hitungPenanganan(totalKotor);
    var diskon = hitungDiskon(totalKotor);
    var totalBersih = totalKotor + ongkir + penanganan - diskon;
    
    if (keranjang.length === 0) {
        container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px 0;">' + (currentLang === 'id' ? 'Keranjang kosong' : 'Cart is empty') + '</p>';
        document.getElementById('checkoutBtn').disabled = true;
        document.getElementById('summaryTotal').textContent = 'Rp 0';
        return;
    }
    
    var html = '';
    
    // Item produk
    for (var i = 0; i < keranjang.length; i++) {
        var item = keranjang[i];
        var p = produkData[item.id];
        if (!p) continue;
        var namaItem = p.nama;
        if (item.rasaNama) namaItem += ' (' + item.rasaNama + ')';
        html += '<div class="summary-item"><img src="' + p.img + '" alt="' + p.nama + '"><div class="summary-item-info"><div class="summary-item-name">' + namaItem + '</div><div class="summary-item-price">' + formatRp(p.harga) + ' x ' + item.qty + '</div></div><div style="font-weight:700;color:var(--primary);">' + formatRp(p.harga * item.qty) + '</div></div>';
    }
    
    // Subtotal
    html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.9rem;font-weight:600;color:var(--dark);">';
    html += '<span>Subtotal</span>';
    html += '<span>' + formatRp(totalKotor) + '</span>';
    html += '</div>';
    
    // Ongkos Kirim
    html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.85rem;color:var(--dark-mid);">';
    html += '<span>🛵 Ongkos Kirim</span>';
    html += '<span>' + (ongkir > 0 ? formatRp(ongkir) : '<span style="color:var(--success);">✅ GRATIS</span>') + '</span>';
    html += '</div>';
    
    // Biaya Penanganan
    html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.85rem;color:var(--dark-mid);">';
    html += '<span>📦 Biaya Penanganan</span>';
    html += '<span>' + (penanganan > 0 ? formatRp(penanganan) : '<span style="color:var(--success);">✅ GRATIS</span>') + '</span>';
    html += '</div>';
    
    // Diskon (jika ada)
    if (diskon > 0) {
        html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.85rem;color:var(--discount);">';
        html += '<span>🎉 Diskon (Gratis Ongkir + Penanganan)</span>';
        html += '<span>-' + formatRp(diskon) + '</span>';
        html += '</div>';
    }
    
    container.innerHTML = html;
    
    // Total akhir
    var totalEl = document.getElementById('summaryTotal');
    totalEl.innerHTML = formatRp(totalBersih);
    
    if (diskon > 0) {
        totalEl.innerHTML += ' <span style="font-size:0.75rem;color:var(--success);display:block;font-weight:400;">✅ Gratis Ongkir + Penanganan 🎉</span>';
    } else if (totalKotor > 0) {
        var sisa = MIN_PEMBELIAN_DISKON - totalKotor;
        if (sisa > 0) {
            totalEl.innerHTML += ' <span style="font-size:0.7rem;color:var(--muted);display:block;font-weight:400;">Tambahan Rp ' + sisa.toLocaleString('id-ID') + ' lagi untuk Gratis Ongkir</span>';
        }
    }
    
    document.getElementById('checkoutBtn').disabled = false;
}

// ===== TOAST =====
function showToast(message) {
    var wrap = document.getElementById('toastWrap');
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' + message;
    wrap.appendChild(toast);
    setTimeout(function() {
        toast.style.animation = 'toastOut .3s ease forwards';
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 2400);
}

// ===== KERANJANG =====
function muatKeranjang() {
    try {
        var simpan = localStorage.getItem('keranjang_aulicious');
        if (simpan) keranjang = JSON.parse(simpan);
    } catch (e) { keranjang = []; }
}

function simpanKeranjang() {
    try {
        localStorage.setItem('keranjang_aulicious', JSON.stringify(keranjang));
    } catch (e) {}
}

function tambahKeranjang(id) {
    var produk = produkData[id];
    if (!produk || produk.stok <= 0) {
        showToast(currentLang === 'id' ? '⚠️ Stok produk habis!' : '⚠️ Product out of stock!');
        return;
    }
    if (produk.pilihanRasa && produk.pilihanRasa.length > 0) {
        showDetail(id);
        showToast(currentLang === 'id' ? 'Pilih rasa terlebih dahulu' : 'Please select flavor first');
        return;
    }
    var item = null;
    for (var i = 0; i < keranjang.length; i++) {
        if (keranjang[i].id === id) {
            item = keranjang[i];
            break;
        }
    }
    if (item) {
        item.qty += 1;
    } else {
        keranjang.push({ id: id, qty: 1 });
    }
    simpanKeranjang();
    updateUI();
    showToast(produk.nama + ' ' + (currentLang === 'id' ? 'ditambahkan ke keranjang' : 'added to cart'));
    var badge = document.getElementById('navCartBadge');
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
}

function ubahQty(id, delta) {
    for (var i = 0; i < keranjang.length; i++) {
        if (keranjang[i].id === id) {
            keranjang[i].qty += delta;
            if (keranjang[i].qty <= 0) keranjang.splice(i, 1);
            break;
        }
    }
    simpanKeranjang();
    updateUI();
}

function hapusItem(id) {
    for (var i = 0; i < keranjang.length; i++) {
        if (keranjang[i].id === id) {
            var nama = produkData[id].nama;
            keranjang.splice(i, 1);
            simpanKeranjang();
            updateUI();
            showToast(nama + ' ' + (currentLang === 'id' ? 'dihapus dari keranjang' : 'removed from cart'));
            break;
        }
    }
}

function kosongkanKeranjang() {
    if (keranjang.length === 0) return;
    keranjang = [];
    simpanKeranjang();
    updateUI();
    showToast(currentLang === 'id' ? 'Keranjang dikosongkan' : 'Cart cleared');
}

function pesanViaWA() {
    if (keranjang.length === 0) return;
    var totalKotor = hitungTotalKotor();
    var ongkir = hitungOngkir(totalKotor);
    var penanganan = hitungPenanganan(totalKotor);
    var diskon = hitungDiskon(totalKotor);
    var totalBersih = totalKotor + ongkir + penanganan - diskon;
    
    var pesan = 'Halo, saya mau pesan:\n\n';
    for (var i = 0; i < keranjang.length; i++) {
        var item = keranjang[i];
        var p = produkData[item.id];
        if (!p) continue;
        var namaItem = p.nama;
        if (item.rasaNama) namaItem += ' (' + item.rasaNama + ')';
        pesan += '• ' + namaItem + ' x' + item.qty + ' = ' + formatRp(p.harga * item.qty) + '\n';
    }
    pesan += '\n━━━━━━━━━━━━━━━━━━━━━\n';
    pesan += '🛵 Ongkos Kirim: ' + (ongkir > 0 ? formatRp(ongkir) : 'GRATIS ✅') + '\n';
    pesan += '📦 Biaya Penanganan: ' + (penanganan > 0 ? formatRp(penanganan) : 'GRATIS ✅') + '\n';
    if (diskon > 0) {
        pesan += '🎉 Diskon: -' + formatRp(diskon) + '\n';
    }
    pesan += '━━━━━━━━━━━━━━━━━━━━━\n';
    pesan += '💰 Total Bayar: ' + formatRp(totalBersih) + '\n\n';
    pesan += 'Terima kasih! 🙏';
    
    window.open('https://wa.me/62895412066120?text=' + encodeURIComponent(pesan), '_blank');
}

// ===== CART PANEL =====
var cartPanel = document.getElementById('cartPanel');
var cartOverlay = document.getElementById('cartOverlay');
var navCartBtn = document.getElementById('navCartBtn');
var cartClose = document.getElementById('cartClose');

function bukaKeranjang() {
    cartPanel.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function tutupKeranjang() {
    cartPanel.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

navCartBtn.addEventListener('click', bukaKeranjang);
cartClose.addEventListener('click', tutupKeranjang);
cartOverlay.addEventListener('click', tutupKeranjang);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartPanel.classList.contains('open')) tutupKeranjang();
});

function bukaCheckout() {
    if (keranjang.length === 0) {
        showToast(currentLang === 'id' ? 'Keranjang kosong! Tambahkan produk dulu.' : 'Cart is empty! Add some products first.');
        return;
    }
    showPage('checkout');
}

function tutupCheckout() {
    showPage('home');
}

// ===== PRODUK GRID =====
function renderProdukGrid() {
    var grid = document.getElementById('semuaProduk');
    var ids = Object.keys(produkData);
    
    if (ids.length === 0) {
        grid.innerHTML = (currentLang === 'id' ? '<div class="search-empty"><span>📭</span>Belum ada produk. <br>Login sebagai admin untuk menambahkan.</div>' : '<div class="search-empty"><span>📭</span>No products yet. <br>Login as admin to add.</div>');
        return;
    }
    
    var html = '';
    var badgeLabels = {
        id: { best: '⭐ Favorite', new: '🔥 Best Seller', fav: '❤️ Favorit', pop: '🏆 Best Seller' },
        en: { best: '⭐ Favorite', new: '🔥 Best Seller', fav: '❤️ Favorite', pop: '🏆 Best Seller' }
    };
    var badgeLabel = badgeLabels[currentLang] || badgeLabels.id;
    
    ids.forEach(function(id) {
        var p = produkData[id];
        var badgeClass = 'best', badgeText = badgeLabel.best;
        if (id % 3 === 0) { badgeClass = 'new'; badgeText = badgeLabel.new; }
        else if (id % 4 === 0) { badgeClass = 'fav'; badgeText = badgeLabel.fav; }
        else if (id % 5 === 0) { badgeClass = 'pop'; badgeText = badgeLabel.pop; }
        
        var desc = currentLang === 'id' ? p.desc : (p.desc_en || p.desc);
        var stockStatus = (p.stok <= 0) ? ' <span style="color:var(--danger);font-size:0.6rem;">' + (currentLang === 'id' ? '(Habis)' : '(Out of Stock)') + '</span>' : '';
        var categoryLabel = currentLang === 'id' ? (p.kategori === 'makanan' ? '🍽️ Makanan' : '🧋 Minuman') : (p.kategori === 'makanan' ? '🍱 Food' : '🧋 Drinks');
        var satuan = p.satuan || '/pcs';
        var starsHTML = getStarsHTML(p.rating || 4.5);
        
        html += '<article class="kartu show-in" data-cat="' + p.kategori + '" data-id="' + id + '" onclick="showDetail(' + id + ')"><div class="kartu-img"><img src="' + p.img + '" alt="' + p.nama + '" loading="lazy"><span class="kartu-badge ' + badgeClass + '">' + badgeText + '</span></div><div class="kartu-body"><span class="kartu-category-tag">' + categoryLabel + '</span><h4 class="kartu-name">' + p.nama + stockStatus + '</h4><div class="kartu-rating"><span class="stars">' + starsHTML + '</span><span class="count">(' + (p.reviews || 0) + ')</span></div><p class="kartu-desc">' + desc + '</p><div class="kartu-foot"><div class="kartu-price"><span class="harga-normal">' + formatRp(p.harga) + '<span class="satuan">' + satuan + '</span></span></div><button class="kartu-cart" onclick="event.stopPropagation(); tambahKeranjang(' + id + ')" aria-label="Tambah ke keranjang" ' + (p.stok <= 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : '') + '><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span class="kartu-qty-badge" id="qtyBadge-' + id + '">0</span></button></div></div></article>';
    });
    grid.innerHTML = html;
    updateUI();
}

// ===== DETAIL PRODUK =====
function showDetail(id) {
    detailProductId = id;
    var product = produkData[id];
    if (!product) return;
    
    document.getElementById('mainImage').src = product.img;
    document.getElementById('mainImage').alt = product.nama;
    document.getElementById('productName').textContent = product.nama;
    document.getElementById('productPrice').innerHTML = formatRp(product.harga);
    document.getElementById('productSatuan').textContent = product.satuan || '/pcs';
    
    var starsHTML = getStarsHTML(product.rating || 4.5);
    document.querySelector('#page-detail .rating .stars').innerHTML = starsHTML;
    var reviewsLabel = currentLang === 'id' ? 'ulasan' : 'reviews';
    document.getElementById('productReviews').textContent = '(' + (product.reviews || 0) + ' ' + reviewsLabel + ')';
    
    var desc = currentLang === 'id' ? product.desc : (product.desc_en || product.desc);
    document.getElementById('productDesc').textContent = desc;
    
    var categoryText = currentLang === 'id' ? (product.kategori === 'makanan' ? 'Makanan' : 'Minuman') : (product.kategori === 'makanan' ? 'Food' : 'Drinks');
    document.getElementById('productCategory').textContent = categoryText;
    document.getElementById('specCategory').textContent = categoryText;
    document.getElementById('specSku').textContent = product.sku;
    document.getElementById('specStok').textContent = product.stok || 0;
    
    var stok = product.stok || 0;
    document.getElementById('stokProduk').textContent = stok + ' tersedia';
    document.getElementById('stokProduk').className = stok > 0 ? 'stok-tersedia' : 'stok-habis';
    
    // Rasa selector
    var rasaSelector = document.getElementById('rasaSelector');
    var rasaOptions = document.getElementById('rasaOptions');
    
    if (product.pilihanRasa && product.pilihanRasa.length > 0) {
        rasaSelector.classList.add('show');
        rasaOptions.innerHTML = '';
        product.pilihanRasa.forEach(function(rasa, index) {
            var div = document.createElement('div');
            div.className = 'rasa-option' + (index === 0 ? ' selected' : '');
            div.dataset.rasaId = rasa.id;
            var imgSrc = rasa.img || product.img;
            div.innerHTML = '<img class="rasa-gambar" src="' + imgSrc + '" alt="' + rasa.nama + '"><span class="rasa-nama"><span class="rasa-dot ' + (rasa.id === 'matcha' ? 'matcha' : 'coklat-keju') + '"></span>' + (currentLang === 'id' ? rasa.nama : rasa.nama_en) + '</span>';
            div.onclick = function() {
                document.querySelectorAll('.rasa-option').forEach(function(el) { el.classList.remove('selected'); });
                this.classList.add('selected');
                document.getElementById('selectedRasa').value = this.dataset.rasaId;
                var selectedRasaData = product.pilihanRasa.find(function(r) { return r.id === this.dataset.rasaId; }, this);
                if (selectedRasaData && selectedRasaData.img) document.getElementById('mainImage').src = selectedRasaData.img;
            };
            rasaOptions.appendChild(div);
        });
        var defaultRasa = product.rasaDefault || product.pilihanRasa[0].id;
        document.getElementById('selectedRasa').value = defaultRasa;
        var defaultRasaData = product.pilihanRasa.find(function(r) { return r.id === defaultRasa; });
        if (defaultRasaData && defaultRasaData.img) document.getElementById('mainImage').src = defaultRasaData.img;
        document.querySelectorAll('.rasa-option').forEach(function(el) {
            if (el.dataset.rasaId === defaultRasa) el.classList.add('selected');
        });
    } else {
        rasaSelector.classList.remove('show');
        document.getElementById('selectedRasa').value = '';
    }
    
    document.getElementById('qtyValue').textContent = '1';
    document.getElementById('thumbnails').innerHTML = '<img src="' + product.img + '" class="active" onclick="gantiGambar(this)">';
    if (product.pilihanRasa) {
        product.pilihanRasa.forEach(function(rasa) {
            if (rasa.img) {
                document.getElementById('thumbnails').innerHTML += '<img src="' + rasa.img + '" onclick="gantiGambar(this)">';
            }
        });
    }
    
    // Reviews
    var reviews = [
        { name: 'Ayu S.', text: 'Enak banget! ' + product.nama + ' recommended!', rating: 5, date: currentLang === 'id' ? '2 hari lalu' : '2 days ago' },
        { name: 'Budi P.', text: 'Kualitasnya bagus, rasanya autentik.', rating: 4, date: currentLang === 'id' ? '4 hari lalu' : '4 days ago' },
        { name: 'Citra D.', text: 'Porsi pas dan harganya terjangkau.', rating: 5, date: currentLang === 'id' ? '1 minggu lalu' : '1 week ago' }
    ];
    var html = '';
    reviews.forEach(function(r) {
        html += '<div class="review-item"><div class="review-avatar">' + r.name.charAt(0) + '</div><div class="review-content"><div class="review-name">' + r.name + '</div><div class="review-stars">' + '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) + '</div><div class="review-text">' + r.text + '</div><div class="review-date">' + r.date + '</div></div></div>';
    });
    document.getElementById('reviewsContainer').innerHTML = html;
    
    // Related products
    var other = Object.keys(produkData).filter(function(k) { return parseInt(k) !== id; }).sort(function() { return Math.random() - 0.5; }).slice(0, 4);
    var relatedHtml = '';
    other.forEach(function(k) {
        var p = produkData[k];
        if (!p) return;
        relatedHtml += '<div class="related-card" onclick="showDetail(' + k + ')"><img src="' + p.img + '" alt="' + p.nama + '"><div class="related-info"><h4>' + p.nama + '</h4><div class="related-price">' + formatRp(p.harga) + '</div></div></div>';
    });
    document.getElementById('relatedGrid').innerHTML = relatedHtml;
    showPage('detail');
}

function gantiGambar(img) {
    document.getElementById('mainImage').src = img.src;
    document.querySelectorAll('.detail-thumbs img').forEach(function(el) { el.classList.remove('active'); });
    img.classList.add('active');
}

function ubahQtyDetail(delta) {
    var el = document.getElementById('qtyValue');
    var val = parseInt(el.textContent) || 1;
    val = Math.max(1, val + delta);
    el.textContent = val;
}

function tambahKeKeranjangDetail() {
    var product = produkData[detailProductId];
    if (!product || product.stok <= 0) {
        showToast(currentLang === 'id' ? '⚠️ Stok produk habis!' : '⚠️ Product out of stock!');
        return;
    }
    var qty = parseInt(document.getElementById('qtyValue').textContent) || 1;
    var selectedRasa = document.getElementById('selectedRasa') ? document.getElementById('selectedRasa').value : null;
    
    if (product.pilihanRasa && product.pilihanRasa.length > 0 && !selectedRasa) {
        showToast(currentLang === 'id' ? 'Silakan pilih rasa terlebih dahulu' : 'Please select a flavor first');
        return;
    }
    
    var rasaNama = '';
    if (product.pilihanRasa && selectedRasa) {
        var found = product.pilihanRasa.find(function(r) { return r.id === selectedRasa; });
        if (found) rasaNama = currentLang === 'id' ? found.nama : found.nama_en;
    }
    
    var item = null;
    for (var i = 0; i < keranjang.length; i++) {
        if (keranjang[i].id === detailProductId && keranjang[i].rasa === selectedRasa) {
            item = keranjang[i];
            break;
        }
    }
    
    if (item) {
        item.qty += qty;
    } else {
        keranjang.push({ id: detailProductId, qty: qty, rasa: selectedRasa || null, rasaNama: rasaNama || null });
    }
    
    simpanKeranjang();
    updateUI();
    showToast(product.nama + (rasaNama ? ' (' + rasaNama + ')' : '') + ' (' + qty + 'x) ' + (currentLang === 'id' ? 'ditambahkan ke keranjang' : 'added to cart'));
}

function beliSekarang() {
    tambahKeKeranjangDetail();
    showPage('checkout');
}

// ===== CHECKOUT =====
function pilihMetode(el) {
    document.querySelectorAll('.payment-option').forEach(function(opt) { opt.classList.remove('selected'); });
    el.classList.add('selected');
}

function prosesCheckout(e) {
    e.preventDefault();
    
    var nama = document.getElementById('checkoutNama').value.trim();
    var email = document.getElementById('checkoutEmail').value.trim();
    var phone = document.getElementById('checkoutPhone').value.trim();
    var alamat = document.getElementById('checkoutAlamat').value.trim();
    var valid = true;
    
    if (!nama) {
        document.getElementById('errNama').classList.add('show');
        document.getElementById('checkoutNama').classList.add('error');
        valid = false;
    } else {
        document.getElementById('errNama').classList.remove('show');
        document.getElementById('checkoutNama').classList.remove('error');
    }
    
    if (!email || !email.includes('@')) {
        document.getElementById('errEmail').classList.add('show');
        document.getElementById('checkoutEmail').classList.add('error');
        valid = false;
    } else {
        document.getElementById('errEmail').classList.remove('show');
        document.getElementById('checkoutEmail').classList.remove('error');
    }
    
    if (!phone || phone.length < 10) {
        document.getElementById('errPhone').classList.add('show');
        document.getElementById('checkoutPhone').classList.add('error');
        valid = false;
    } else {
        document.getElementById('errPhone').classList.remove('show');
        document.getElementById('checkoutPhone').classList.remove('error');
    }
    
    if (!alamat) {
        document.getElementById('errAlamat').classList.add('show');
        document.getElementById('checkoutAlamat').classList.add('error');
        valid = false;
    } else {
        document.getElementById('errAlamat').classList.remove('show');
        document.getElementById('checkoutAlamat').classList.remove('error');
    }
    
    if (!valid) {
        showToast(currentLang === 'id' ? 'Mohon lengkapi data yang wajib diisi' : 'Please complete all required fields');
        return;
    }
    
    if (keranjang.length === 0) {
        showToast(currentLang === 'id' ? 'Keranjang Anda kosong!' : 'Your cart is empty!');
        return;
    }
    
    var metode = document.querySelector('.payment-option.selected');
    var metodeNama = metode ? metode.querySelector('span:last-child').textContent : (currentLang === 'id' ? 'Transfer Bank' : 'Bank Transfer');
    
    var btn = document.getElementById('checkoutBtn');
    btn.textContent = currentLang === 'id' ? 'Memproses...' : 'Processing...';
    btn.disabled = true;
    
    var totalKotor = hitungTotalKotor();
    var ongkir = hitungOngkir(totalKotor);
    var penanganan = hitungPenanganan(totalKotor);
    var diskon = hitungDiskon(totalKotor);
    var totalBersih = totalKotor + ongkir + penanganan - diskon;
    
    setTimeout(function() {
        var pesanan = {
            id: Date.now(),
            tanggal: new Date().toLocaleString('id-ID'),
            nama: nama,
            email: email,
            phone: phone,
            alamat: alamat,
            catatan: document.getElementById('checkoutCatatan').value.trim(),
            metode: metodeNama,
            status: 'pending',
            items: keranjang.map(function(item) {
                return {
                    id: item.id,
                    nama: produkData[item.id].nama,
                    harga: produkData[item.id].harga,
                    qty: item.qty,
                    rasa: item.rasa || null,
                    rasaNama: item.rasaNama || null
                };
            }),
            subtotal: totalKotor,
            ongkir: ongkir,
            penanganan: penanganan,
            diskon: diskon,
            total: totalBersih
        };
        
        var riwayat = JSON.parse(localStorage.getItem('riwayat_pesanan_aulicious') || '[]');
        riwayat.push(pesanan);
        localStorage.setItem('riwayat_pesanan_aulicious', JSON.stringify(riwayat));
        
        keranjang.forEach(function(item) {
            if (produkData[item.id]) {
                var p = produkData[item.id];
                p.stok = Math.max(0, p.stok - item.qty);
            }
        });
        
        keranjang = [];
        localStorage.setItem('keranjang_aulicious', JSON.stringify(keranjang));
        updateUI();
        
        document.getElementById('successModal').style.display = 'flex';
        btn.textContent = currentLang === 'id' ? 'Pesan Sekarang' : 'Order Now';
        btn.disabled = false;
        document.getElementById('navCartBadge').textContent = '0';
        document.getElementById('navCartBadge').classList.remove('show');
        
        tutupCheckout();
        tutupKeranjang();
        renderProdukGrid();
        
        if (isAdmin) {
            renderAdminProductList();
            updateStats();
            renderOrders();
        }
    }, 1500);
}

function tutupModal() {
    document.getElementById('successModal').style.display = 'none';
}

// ===== SEARCH & FILTER =====
var searchInput = document.getElementById('heroSearchInput');
var searchClear = document.getElementById('heroSearchClear');
var searchTags = document.querySelectorAll('.search-tag');

function jalankanPencarian(query) {
    query = query.toLowerCase().trim();
    var semuaGrid = document.getElementById('semuaProduk');
    var semuaKartu = semuaGrid.querySelectorAll('.kartu');
    var adaHasil = false;
    
    if (query.length > 0) {
        document.getElementById('katalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    semuaKartu.forEach(function(kartu) {
        var cat = kartu.getAttribute('data-cat');
        var tabAktif = document.querySelector('.tab.active');
        var aktifCat = tabAktif ? tabAktif.getAttribute('data-cat') : 'semua';
        if (aktifCat !== 'semua' && cat !== aktifCat) kartu.classList.add('hidden');
        else kartu.classList.remove('hidden');
        kartu.classList.remove('search-hidden', 'search-highlight');
    });
    
    if (query !== '') {
        semuaKartu.forEach(function(kartu) {
            var nama = kartu.querySelector('.kartu-name') ? kartu.querySelector('.kartu-name').textContent.toLowerCase() : '';
            var desc = kartu.querySelector('.kartu-desc') ? kartu.querySelector('.kartu-desc').textContent.toLowerCase() : '';
            var harga = kartu.querySelector('.kartu-price') ? kartu.querySelector('.kartu-price').textContent.replace(/[^0-9]/g, '') : '';
            var match = false;
            if (nama.includes(query) || desc.includes(query)) match = true;
            else if (query.match(/^\d+$/) && harga.includes(query)) match = true;
            
            var isHidden = kartu.classList.contains('hidden');
            if (!isHidden && match) {
                kartu.classList.remove('search-hidden');
                kartu.classList.add('search-highlight');
                kartu.classList.remove('show-in');
                void kartu.offsetWidth;
                kartu.classList.add('show-in');
                adaHasil = true;
            } else if (!isHidden) {
                kartu.classList.add('search-hidden');
                kartu.classList.remove('search-highlight');
            }
        });
    } else {
        semuaKartu.forEach(function(kartu) {
            kartu.classList.remove('search-hidden', 'search-highlight');
            if (!kartu.classList.contains('hidden')) {
                kartu.classList.remove('show-in');
                void kartu.offsetWidth;
                kartu.classList.add('show-in');
                adaHasil = true;
            }
        });
    }
    
    var existingEmpty = semuaGrid.querySelector('.search-empty-msg');
    if (existingEmpty) existingEmpty.remove();
    if (!adaHasil && query !== '') {
        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'search-empty search-empty-msg';
        var msg = currentLang === 'id' ? 'Produk "' + query + '" tidak ditemukan' : 'Product "' + query + '" not found';
        emptyDiv.innerHTML = '<span>🔍</span>' + msg;
        semuaGrid.appendChild(emptyDiv);
    }
    
    searchClear.classList.toggle('show', query.length > 0);
}

searchInput.addEventListener('input', function() {
    searchTags.forEach(function(t) { t.classList.remove('active'); });
    jalankanPencarian(this.value);
});

searchClear.addEventListener('click', function() {
    searchInput.value = '';
    searchTags.forEach(function(t) { t.classList.remove('active'); });
    jalankanPencarian('');
    searchInput.focus();
});

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filterType = this.getAttribute('data-filter');
        if (filterType === 'nama') {
            searchInput.focus();
            showToast(currentLang === 'id' ? 'Ketik nama produk di kolom pencarian' : 'Type product name in search field');
        } else if (filterType === 'kategori') {
            searchInput.value = '';
            jalankanPencarian('');
            document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
            showToast(currentLang === 'id' ? 'Pilih tab Makanan atau Minuman di bawah' : 'Choose Food or Drinks tab below');
        } else if (filterType === 'harga') {
            searchInput.placeholder = currentLang === 'id' ? 'Ketik harga, contoh: 5000 atau 12000...' : 'Type price, example: 5000 or 12000...';
            searchInput.focus();
            showToast(currentLang === 'id' ? 'Ketik nominal harga untuk filter' : 'Type price amount to filter');
        }
    });
});

// ===== TABS =====
var tabs = document.querySelectorAll('.tab');
var semuaGrid = document.getElementById('semuaProduk');

tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        tabs.forEach(function(t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        var cat = tab.getAttribute('data-cat');
        var semuaKartu = semuaGrid.querySelectorAll('.kartu');
        var adaYangTampil = false;
        var query = searchInput.value.trim();
        
        if (query !== '') { jalankanPencarian(query); return; }
        
        semuaKartu.forEach(function(kartu) {
            var kartuCat = kartu.getAttribute('data-cat');
            if (cat === 'semua') {
                kartu.classList.remove('hidden', 'search-hidden');
                adaYangTampil = true;
            } else if (kartuCat === cat) {
                kartu.classList.remove('hidden', 'search-hidden');
                adaYangTampil = true;
            } else {
                kartu.classList.add('hidden');
            }
            kartu.classList.remove('search-highlight');
        });
        
        var existingEmpty = semuaGrid.querySelector('.search-empty-msg');
        if (existingEmpty) existingEmpty.remove();
        if (!adaYangTampil) {
            var emptyDiv = document.createElement('div');
            emptyDiv.className = 'search-empty search-empty-msg';
            emptyDiv.innerHTML = '<span>📭</span>' + (currentLang === 'id' ? 'Belum ada produk di kategori ini' : 'No products in this category');
            semuaGrid.appendChild(emptyDiv);
        }
        
        semuaGrid.querySelectorAll('.kartu:not(.hidden):not(.search-hidden)').forEach(function(k) {
            k.classList.remove('show-in');
            void k.offsetWidth;
            k.classList.add('show-in');
        });
    });
});

// ===== NAVIGASI =====
function showPage(page) {
    var pages = ['home', 'detail', 'checkout', 'bisnis'];
    for (var i = 0; i < pages.length; i++) {
        var el = document.getElementById('page-' + pages[i]);
        if (el) {
            el.style.display = (pages[i] === page) ? 'block' : 'none';
        }
    }
    
    var checkoutSec = document.querySelector('.checkout-section');
    if (checkoutSec) {
        if (page === 'checkout') checkoutSec.classList.add('active');
        else checkoutSec.classList.remove('active');
    }
    
    var links = document.querySelectorAll('.nav-links a');
    var pageMap = { home: 'Beranda', checkout: 'Checkout', bisnis: 'Tentang Kami', detail: 'Menu' };
    var enMap = { home: 'Home', checkout: 'Checkout', bisnis: 'About Us', detail: 'Menu' };
    
    links.forEach(function(link) {
        link.classList.remove('active');
        var linkText = link.textContent.trim();
        var target = currentLang === 'id' ? pageMap[page] : enMap[page];
        if (target && linkText === target) link.classList.add('active');
        else if (page === 'home' && (linkText === 'Beranda' || linkText === 'Home')) link.classList.add('active');
        else if (page === 'checkout' && linkText === 'Checkout') link.classList.add('active');
        else if (page === 'bisnis' && (linkText === 'Tentang Kami' || linkText === 'About Us')) link.classList.add('active');
        else if (page === 'detail' && (linkText === 'Menu' || linkText === 'Menu')) link.classList.add('active');
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToKatalog() {
    showPage('home');
    setTimeout(function() {
        var el = document.getElementById('katalog');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function scrollToKontak() {
    showPage('home');
    setTimeout(function() {
        var el = document.getElementById('kontak');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===== NAV TOGGLE =====
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== TRANSLATIONS =====
var translations = {
    id: {
        'brand': 'Dapur Aulicious✨',
        'nav-home': 'Beranda',
        'nav-products': 'Menu',
        'nav-checkout': 'Checkout',
        'nav-about': 'Tentang Kami',
        'nav-contact': 'Kontak',
        'hero-badge': '✨ Dari dapur rumahan, untuk semua momen',
        'hero-title': 'Camilan Hangat yang Bikin Hari Lebih Ceria',
        'hero-desc': 'Dimsum renyah, tahu bakso lembut, dan minuman segar — semua dibuat dari bahan alami pilihan, tanpa pengawet. Teman setia buat kamu yang lagi belajar, kerja, atau sekadar ingin menikmati waktu santai bersama orang tersayang.',
        'hero-btn': 'Lihat Menu Lengkap',
        'search-placeholder': 'Cari menu favoritmu...',
        'filter-label': '🔍 Filter:',
        'filter-name': 'Nama',
        'filter-category': 'Kategori',
        'filter-price': 'Harga',
        'catalog-title': '🍽️ Menu Spesial Kami',
        'catalog-sub': 'Pilih menu favoritmu, lalu langsung order — praktis, cepat, dan pasti enak!',
        'tab-all': '✨ Semua Menu',
        'tab-food': '🍽️ Makanan',
        'tab-drink': '🧋 Minuman',
        'spec-weight': '⚖️ Berat:',
        'spec-category': '📂 Kategori:',
        'spec-expiry': '📅 Kadaluarsa:',
        'spec-stock': '📦 Stok:',
        'qty-label': '🔢 Jumlah:',
        'btn-add-cart': '🛒 Tambah ke Keranjang',
        'btn-buy-now': '⚡ Beli Sekarang',
        'btn-back-catalog': '← Kembali ke Menu',
        'reviews-title': '💬 Kata Pelanggan',
        'related-title': '✨ Rekomendasi Lainnya',
        'select-flavor': '🍭 Pilih Rasa:',
        'checkout-title': '📋 Detail Pemesan',
        'checkout-name': 'Nama Lengkap',
        'checkout-name-placeholder': 'Masukkan nama lengkap',
        'checkout-email': 'Email',
        'checkout-phone': 'No. WhatsApp',
        'checkout-address': 'Alamat Pengiriman',
        'checkout-address-placeholder': 'Masukkan alamat lengkap',
        'checkout-note': 'Catatan (opsional)',
        'checkout-note-placeholder': 'Tingkat kepedasan, request khusus, dll.',
        'checkout-payment': 'Metode Pembayaran',
        'payment-bank': 'Transfer Bank',
        'payment-qris': 'QRIS',
        'payment-ewallet': 'E-Wallet',
        'payment-cod': 'COD (Bayar di Tempat)',
        'checkout-submit': '🛍️ Pesan Sekarang',
        'summary-title': '🛒 Ringkasan Pesanan',
        'summary-total': 'Total',
        'summary-terms': '*Dengan mengklik "Pesan Sekarang", Anda menyetujui syarat dan ketentuan kami',
        'back-shop': '← Kembali Belanja',
        'err-name': 'Nama harus diisi',
        'err-email': 'Email tidak valid',
        'err-phone': 'Nomor HP tidak valid',
        'err-address': 'Alamat harus diisi',
        'cart-title': '🛒 Keranjang',
        'cart-total': 'Total',
        'cart-wa': 'Pesan via WhatsApp',
        'cart-clear': '🗑️ Kosongkan Keranjang',
        'cart-checkout': 'Checkout',
        'success-title': 'Pesanan Berhasil!',
        'success-desc': 'Terima kasih telah memesan. Kami akan menghubungi Anda segera melalui WhatsApp.',
        'success-ok': 'OK',
        'login-title': '🔐 Dapur Aulicious',
        'login-sub': 'Admin Panel — Masuk untuk mengelola',
        'login-username': '👤 Username',
        'login-password': '🔑 Password',
        'login-btn': '🚀 Login',
        'login-close': '✕ Tutup',
        'login-security': '🔒 Hanya admin yang dapat mengakses panel ini',
        'admin-title': '📊 Dashboard Admin',
        'admin-badge': '🔐 Admin',
        'admin-logout': '🚪 Logout',
        'stat-products': 'Total Produk',
        'stat-active': '● Aktif',
        'stat-orders': 'Total Pesanan',
        'stat-alltime': '● Semua waktu',
        'stat-revenue': 'Total Pendapatan',
        'stat-rating': 'Rata-rata Rating',
        'stat-from-reviews': 'Dari ulasan',
        'chart-title': '📈 Statistik Produk',
        'chart-rating': '⭐ Rating Produk',
        'chart-stock': '📦 Stok Produk',
        'admin-tab-products': '📦 Produk',
        'admin-tab-orders': '📋 Pesanan',
        'admin-add-product': '➕ Tambah Produk',
        'admin-product-name': 'Nama Produk',
        'admin-product-name-placeholder': 'Contoh: Dimsum Goreng Keju',
        'admin-product-price': 'Harga (Rp)',
        'admin-product-stock': 'Stok',
        'admin-product-desc': 'Deskripsi',
        'admin-product-desc-placeholder': 'Deskripsi produk...',
        'admin-product-desc-en': 'Deskripsi Inggris',
        'admin-product-desc-en-placeholder': 'Contoh: Crispy dimsum filled with melted cheese...',
        'admin-product-category': 'Kategori',
        'admin-product-image': 'URL Gambar',
        'admin-product-image-placeholder': 'gambar/nama-file.jpeg',
        'admin-product-sku': 'SKU',
        'admin-product-rating': 'Rating (1-5)',
        'admin-product-reviews': 'Jumlah Ulasan',
        'admin-add-btn': '➕ Tambah Produk',
        'admin-cancel': '❌ Batal Edit',
        'admin-product-list': '📋 Daftar Produk',
        'admin-order-history': '📋 Riwayat Pesanan',
        'category-food': '🍽️ Makanan',
        'category-drink': '🧋 Minuman',
        'bisnis-title': '📖 Cerita Dapur Aulicious',
        'bisnis-sub': '✨ Dari hati, untuk kamu — camilan rumahan penuh cinta',
        'bisnis-1-title': '🏢 Siapa Kami?',
        'bisnis-1-desc': '<strong>Dapur Aulicious ✨</strong> lahir dari kecintaan kami memasak untuk orang-orang terdekat. Kami percaya bahwa makanan terbaik adalah yang dibuat dengan hati, dari bahan-bahan alami tanpa pengawet. Setiap gigitan dimsum, setiap teguk minuman kami, adalah cerita tentang kehangatan dan kejujuran rasa.',
        'bisnis-1-value': '<strong>💎 Proposisi Nilai:</strong> Masakan rumahan dengan cinta, untuk setiap momen berharga — cocok untuk teman santai, belajar, atau kumpul bersama keluarga dan sahabat.',
        'bisnis-2-title': '🎯 Siapa yang Kami Layani?',
        'bisnis-2-1': 'Mahasiswa dan pelajar — camilan murah &amp; lezat',
        'bisnis-2-2': 'Pekerja kantoran — makanan praktis untuk sela-sela waktu',
        'bisnis-2-3': 'Keluarga — hidangan untuk acara kumpul dan arisan',
        'bisnis-2-4': 'Anak muda — pecinta kuliner kekinian dan Instagramable',
        'bisnis-2-seg': '<strong>📍 Segmentasi:</strong> Usia 15-35 tahun, domisili perkotaan, aktif di media sosial.',
        'bisnis-3-title': '📊 Analisis Pasar',
        'bisnis-3-1': '<strong>Pesaing Utama:</strong> Gerai dimsum kekinian, food truck, dan UMKM kuliner serupa.',
        'bisnis-3-2': '<strong>Keunggulan Kami:</strong>',
        'bisnis-3-3': 'Harga terjangkau dengan kualitas premium',
        'bisnis-3-4': 'Varian rasa unik (Mentai, Keju, Birthday, Matcha)',
        'bisnis-3-5': 'Kemasan menarik dan ramah di media sosial',
        'bisnis-3-6': 'Layanan pesan antar cepat dan terpercaya',
        'bisnis-4-title': '📦 Manajemen Produk',
        'bisnis-4-1': '<strong>Kategori Produk:</strong>',
        'bisnis-4-2': '<strong>Makanan:</strong> Dimsum Goreng Keju, Dimsum Mentai, Dimsum Original, Dimsum Mentai Birthday, Tahu Bakso Topping, Dessol, Pisang Naget',
        'bisnis-4-3': '<strong>Minuman:</strong> Ice Matcha, Ice Coffee, Ice Boba Brown Sugar',
        'bisnis-4-4': '<strong>Deskripsi:</strong> Setiap produk dilengkapi deskripsi menggugah selera dan informasi bahan baku.',
        'bisnis-4-5': '<strong>Visual:</strong> Foto produk berkualitas tinggi dengan pencahayaan yang baik dan tampilan menarik.',
        'bisnis-5-title': '💰 Model Bisnis',
        'bisnis-5-1': '<strong>B2C:</strong> Penjualan langsung ke konsumen via WhatsApp',
        'bisnis-5-2': '<strong>Pendapatan Utama:</strong> Penjualan makanan &amp; minuman',
        'bisnis-5-3': '<strong>Pendapatan Tambahan:</strong> Paket catering untuk acara (ulang tahun, meeting)',
        'bisnis-6-title': '🏷️ Strategi Harga & Promosi',
        'bisnis-6-1': '<strong>Harga:</strong> Rp 5.000 - Rp 65.000 (terjangkau semua kalangan)',
        'bisnis-6-2': '<strong>Promosi:</strong> Diskon 10% untuk pembelian di atas Rp 50.000',
        'bisnis-6-3': '<strong>Bundle:</strong> Paket hemat (1 makanan + 1 minuman)',
        'bisnis-6-4': '<strong>Marketing:</strong> Instagram, WhatsApp, dan word-of-mouth',
        'bisnis-7-title': '💳 Proses Checkout & Pembayaran',
        'bisnis-7-1': '<strong>Langkah Mudah Memesan:</strong>',
        'bisnis-7-2': 'Pilih menu favorit & tambahkan ke keranjang',
        'bisnis-7-3': 'Isi form pemesanan (nama, alamat, no HP)',
        'bisnis-7-4': 'Pilih metode pembayaran (Transfer Bank, QRIS, E-Wallet, COD)',
        'bisnis-7-5': 'Konfirmasi pesanan via WhatsApp — kami akan segera menghubungi!',
        'bisnis-7-6': '<strong>🔜 Rencana Integrasi:</strong> Kami sedang mengembangkan sistem pembayaran otomatis dengan <span class="highlight">Midtrans</span> untuk pengalaman yang lebih praktis.',
        'bisnis-8-title': '🔒 Keamanan & Pemeliharaan',
        'bisnis-8-1': '<strong>Keamanan Data:</strong> Validasi form dan sanitasi input',
        'bisnis-8-2': '<strong>SEO:</strong> Meta tags, deskripsi produk, struktur URL bersih',
        'bisnis-8-3': '<strong>Pemeliharaan:</strong> Update konten rutin, backup data, monitoring performa',
        'bisnis-9-title': '📈 Data Analitik',
        'bisnis-9-1': '<strong>Metrik yang Dipantau:</strong>',
        'bisnis-9-2': '<strong>Page Views:</strong> Halaman paling sering dikunjungi',
        'bisnis-9-3': '<strong>Bounce Rate:</strong> Persentase pengunjung yang pergi setelah 1 halaman',
        'bisnis-9-4': '<strong>Add to Cart:</strong> Produk paling populer',
        'bisnis-9-5': '<strong>Checkout Start:</strong> Jumlah yang memulai checkout',
        'bisnis-9-6': '<strong>Conversion Rate:</strong> Pembelian vs pengunjung',
        'bisnis-9-7': '<strong>Search Queries:</strong> Apa yang paling sering dicari',
        'bisnis-9-8': '<strong>📊 Pengambilan Keputusan:</strong> Data digunakan untuk menentukan produk yang perlu ditambah stok, promosi yang efektif, dan perbaikan UX.',
        'bisnis-10-title': '📝 Rencana Pengembangan',
        'bisnis-10-1': 'Integrasi payment gateway (Midtrans)',
        'bisnis-10-2': 'Sistem loyalitas pelanggan (poin & reward)',
        'bisnis-10-3': 'Fitur tracking pesanan real-time',
        'bisnis-10-4': 'Mobile app (PWA) untuk kemudahan akses',
        'bisnis-10-5': 'Ekspansi menu — makanan & minuman baru setiap bulan',
        'back-home': '← Kembali ke Beranda',
        'contact-title': '📞 Yuk, Chat & Order!',
        'contact-wa-label': '💬 Chat di WhatsApp',
        'contact-email-label': '📧 Kirim Email',
        'contact-ig-label': '📸 Follow Instagram',
        'footer-tagline': 'Rasa Istimewa di Setiap Gigitan & Tegukan',
        'footer-desc': 'Dimsum, Tahu Bakso, dan Minuman Segar — Tanpa Pengawet',
        'footer-menu': 'Navigasi',
        'footer-contact-title': 'Hubungi Kami',
        'footer-copy': '© 2026 Dapur Aulicious ✨ | Dibuat dengan ❤️ | E-Commerce UMKM',
        'footer-location': '📍 Bandung, Indonesia',
        'cart-empty-title': 'Belum ada pesanan',
        'cart-empty-sub': 'Tekan tombol + pada produk untuk menambahkan',
        'order-empty': 'Belum ada pesanan masuk',
        'admin-product-empty': 'Belum ada produk',
        'promo-min-order': '🎉 Diskon 10% untuk pembelian ≥ Rp 50.000'
    },
    en: {
        'brand': 'Aulicious Kitchen✨',
        'nav-home': 'Home',
        'nav-products': 'Menu',
        'nav-checkout': 'Checkout',
        'nav-about': 'About Us',
        'nav-contact': 'Contact',
        'hero-badge': '✨ From our home kitchen, for every moment',
        'hero-title': 'Warm Snacks That Make Your Day Brighter',
        'hero-desc': 'Crispy dimsum, soft tofu meatballs, and refreshing drinks — all made from premium natural ingredients, no preservatives. Your perfect companion for studying, working, or simply enjoying quality time with loved ones.',
        'hero-btn': 'View Full Menu',
        'search-placeholder': 'Search your favorite menu...',
        'filter-label': '🔍 Filter:',
        'filter-name': 'Name',
        'filter-category': 'Category',
        'filter-price': 'Price',
        'catalog-title': '🍽️ Our Special Menu',
        'catalog-sub': 'Pick your favorite menu, then order — practical, fast, and definitely delicious!',
        'tab-all': '✨ All Menu',
        'tab-food': '🍱 Food',
        'tab-drink': '🧋 Drinks',
        'spec-weight': '⚖️ Weight:',
        'spec-category': '📂 Category:',
        'spec-expiry': '📅 Expiry:',
        'spec-stock': '📦 Stock:',
        'qty-label': '🔢 Qty:',
        'btn-add-cart': '🛒 Add to Cart',
        'btn-buy-now': '⚡ Buy Now',
        'btn-back-catalog': '← Back to Menu',
        'reviews-title': '💬 Customer Reviews',
        'related-title': '✨ Other Recommendations',
        'select-flavor': '🍭 Select Flavor:',
        'checkout-title': '📋 Order Details',
        'checkout-name': 'Full Name',
        'checkout-name-placeholder': 'Enter full name',
        'checkout-email': 'Email',
        'checkout-phone': 'WhatsApp No.',
        'checkout-address': 'Delivery Address',
        'checkout-address-placeholder': 'Enter complete address',
        'checkout-note': 'Note (optional)',
        'checkout-note-placeholder': 'Spiciness level, special requests, etc.',
        'checkout-payment': 'Payment Method',
        'payment-bank': 'Bank Transfer',
        'payment-qris': 'QRIS',
        'payment-ewallet': 'E-Wallet',
        'payment-cod': 'COD (Pay on Delivery)',
        'checkout-submit': '🛍️ Order Now',
        'summary-title': '🛒 Order Summary',
        'summary-total': 'Total',
        'summary-terms': '*By clicking "Order Now", you agree to our terms and conditions',
        'back-shop': '← Back to Shopping',
        'err-name': 'Name is required',
        'err-email': 'Invalid email',
        'err-phone': 'Invalid phone number',
        'err-address': 'Address is required',
        'cart-title': '🛒 Cart',
        'cart-total': 'Total',
        'cart-wa': 'Order via WhatsApp',
        'cart-clear': '🗑️ Clear Cart',
        'cart-checkout': 'Checkout',
        'success-title': 'Order Successful!',
        'success-desc': 'Thank you for your order. We will contact you soon via WhatsApp.',
        'success-ok': 'OK',
        'login-title': '🔐 Aulicious Kitchen',
        'login-sub': 'Admin Panel — Login to manage',
        'login-username': '👤 Username',
        'login-password': '🔑 Password',
        'login-btn': '🚀 Login',
        'login-close': '✕ Close',
        'login-security': '🔒 Only admin can access this panel',
        'admin-title': '📊 Admin Dashboard',
        'admin-badge': '🔐 Admin',
        'admin-logout': '🚪 Logout',
        'stat-products': 'Total Products',
        'stat-active': '● Active',
        'stat-orders': 'Total Orders',
        'stat-alltime': '● All time',
        'stat-revenue': 'Total Revenue',
        'stat-rating': 'Average Rating',
        'stat-from-reviews': 'From reviews',
        'chart-title': '📈 Product Statistics',
        'chart-rating': '⭐ Product Ratings',
        'chart-stock': '📦 Product Stock',
        'admin-tab-products': '📦 Products',
        'admin-tab-orders': '📋 Orders',
        'admin-add-product': '➕ Add Product',
        'admin-product-name': 'Product Name',
        'admin-product-name-placeholder': 'Example: Fried Cheese Dimsum',
        'admin-product-price': 'Price (Rp)',
        'admin-product-stock': 'Stock',
        'admin-product-desc': 'Description',
        'admin-product-desc-placeholder': 'Product description...',
        'admin-product-desc-en': 'English Description',
        'admin-product-desc-en-placeholder': 'Example: Crispy dimsum filled with melted cheese...',
        'admin-product-category': 'Category',
        'admin-product-image': 'Image URL',
        'admin-product-image-placeholder': 'image/file-name.jpeg',
        'admin-product-sku': 'SKU',
        'admin-product-rating': 'Rating (1-5)',
        'admin-product-reviews': 'Reviews Count',
        'admin-add-btn': '➕ Add Product',
        'admin-cancel': '❌ Cancel Edit',
        'admin-product-list': '📋 Product List',
        'admin-order-history': '📋 Order History',
        'category-food': '🍱 Food',
        'category-drink': '🧋 Drinks',
        'bisnis-title': '📖 The Aulicious Story',
        'bisnis-sub': '✨ From the heart, for you — homemade snacks made with love',
        'bisnis-1-title': '🏢 Who We Are?',
        'bisnis-1-desc': '<strong>Aulicious Kitchen ✨</strong> was born from our love of cooking for those closest to us. We believe the best food is made with heart, from natural ingredients without preservatives. Every bite of our dimsum, every sip of our drinks, tells a story of warmth and honest flavor.',
        'bisnis-1-value': '<strong>💎 Value Proposition:</strong> Homemade food with love, for every precious moment — perfect for relaxing, studying, or gathering with family and friends.',
        'bisnis-2-title': '🎯 Who Do We Serve?',
        'bisnis-2-1': 'Students — affordable & tasty snacks',
        'bisnis-2-2': 'Office workers — practical food for breaks',
        'bisnis-2-3': 'Families — dishes for gatherings and events',
        'bisnis-2-4': 'Young people — trendy and Instagramable cuisine',
        'bisnis-2-seg': '<strong>📍 Segmentation:</strong> Age 15-35, urban areas, active on social media.',
        'bisnis-3-title': '📊 Market Analysis',
        'bisnis-3-1': '<strong>Main Competitors:</strong> Modern dimsum outlets, food trucks, and similar culinary SMEs.',
        'bisnis-3-2': '<strong>Our Advantages:</strong>',
        'bisnis-3-3': 'Affordable prices with premium quality',
        'bisnis-3-4': 'Unique flavor variants (Mentai, Cheese, Birthday, Matcha)',
        'bisnis-3-5': 'Attractive and social-media-friendly packaging',
        'bisnis-3-6': 'Fast and reliable delivery service',
        'bisnis-4-title': '📦 Product Management',
        'bisnis-4-1': '<strong>Product Categories:</strong>',
        'bisnis-4-2': '<strong>Food:</strong> Fried Cheese Dimsum, Mentai Dimsum, Original Dimsum, Mentai Birthday Dimsum, Tofu Meatball Topping, Dessol, Banana Nugget',
        'bisnis-4-3': '<strong>Drinks:</strong> Ice Matcha, Ice Coffee, Ice Boba Brown Sugar',
        'bisnis-4-4': '<strong>Description:</strong> Each product comes with a tempting description and ingredient information.',
        'bisnis-4-5': '<strong>Visual:</strong> High-quality product photos with good lighting and attractive presentation.',
        'bisnis-5-title': '💰 Business Model',
        'bisnis-5-1': '<strong>B2C:</strong> Direct sales to consumers via WhatsApp',
        'bisnis-5-2': '<strong>Main Revenue:</strong> Food & beverage product sales',
        'bisnis-5-3': '<strong>Additional Revenue:</strong> Catering packages for events (birthdays, meetings)',
        'bisnis-6-title': '🏷️ Pricing & Promotion Strategy',
        'bisnis-6-1': '<strong>Price:</strong> Rp 5,000 - Rp 65,000 (affordable for all)',
        'bisnis-6-2': '<strong>Promotion:</strong> 10% discount for purchases above Rp 50,000',
        'bisnis-6-3': '<strong>Bundle:</strong> Value pack (1 food + 1 drink)',
        'bisnis-6-4': '<strong>Marketing:</strong> Instagram, WhatsApp, and word-of-mouth',
        'bisnis-7-title': '💳 Checkout & Payment Process',
        'bisnis-7-1': '<strong>Easy Ordering Steps:</strong>',
        'bisnis-7-2': 'Pick your favorite menu & add to cart',
        'bisnis-7-3': 'Fill order form (name, address, phone)',
        'bisnis-7-4': 'Choose payment method (Bank Transfer, QRIS, E-Wallet, COD)',
        'bisnis-7-5': 'Confirm order via WhatsApp — we will contact you right away!',
        'bisnis-7-6': '<strong>🔜 Integration Plan:</strong> We are developing an automated payment system with <span class="highlight">Midtrans</span> for a more convenient experience.',
        'bisnis-8-title': '🔒 Security & Maintenance',
        'bisnis-8-1': '<strong>Data Security:</strong> Form validation and input sanitization',
        'bisnis-8-2': '<strong>SEO:</strong> Meta tags, product descriptions, clean URL structure',
        'bisnis-8-3': '<strong>Maintenance:</strong> Regular content updates, data backup, performance monitoring',
        'bisnis-9-title': '📈 Analytics Data',
        'bisnis-9-1': '<strong>Metrics Monitored:</strong>',
        'bisnis-9-2': '<strong>Page Views:</strong> Most visited pages',
        'bisnis-9-3': '<strong>Bounce Rate:</strong> Percentage of visitors who leave after 1 page',
        'bisnis-9-4': '<strong>Add to Cart:</strong> Most popular products',
        'bisnis-9-5': '<strong>Checkout Start:</strong> Number who start checkout',
        'bisnis-9-6': '<strong>Conversion Rate:</strong> Purchases vs visitors',
        'bisnis-9-7': '<strong>Search Queries:</strong> Most searched keywords',
        'bisnis-9-8': '<strong>📊 Decision Making:</strong> Data is used to determine which products need more stock, effective promotions, and UX improvements.',
        'bisnis-10-title': '📝 Development Plan',
        'bisnis-10-1': 'Payment gateway integration (Midtrans)',
        'bisnis-10-2': 'Customer loyalty system (points & rewards)',
        'bisnis-10-3': 'Real-time order tracking feature',
        'bisnis-10-4': 'Mobile app (PWA) for easy access',
        'bisnis-10-5': 'Menu expansion — new food & drinks every month',
        'back-home': '← Back to Home',
        'contact-title': '📞 Let\'s Chat & Order!',
        'contact-wa-label': '💬 Chat on WhatsApp',
        'contact-email-label': '📧 Send Email',
        'contact-ig-label': '📸 Follow on Instagram',
        'footer-tagline': 'Special Taste in Every Bite & Sip',
        'footer-desc': 'Dimsum, Tofu Meatballs, and Fresh Drinks — No Preservatives',
        'footer-menu': 'Navigation',
        'footer-contact-title': 'Contact Us',
        'footer-copy': '© 2026 Aulicious Kitchen ✨ | Made with ❤️ | SME E-Commerce',
        'footer-location': '📍 Bandung, Indonesia',
        'cart-empty-title': 'No items yet',
        'cart-empty-sub': 'Press the + button on products to add',
        'order-empty': 'No orders yet',
        'admin-product-empty': 'No products yet',
        'promo-min-order': '🎉 10% discount for purchases ≥ Rp 50,000'
    }
};

// ===== FUNGSI TRANSLASI =====
function toggleLanguage() {
    currentLang = (currentLang === 'id') ? 'en' : 'id';
    document.getElementById('langToggle').textContent = currentLang === 'id' ? '🌍 EN' : '🌍 ID';
    applyLanguage();
    showToast(currentLang === 'id' ? '🌍 Bahasa Indonesia' : '🌍 English');
}

function applyLanguage() {
    var dict = translations[currentLang];
    document.querySelectorAll('[data-key]').forEach(function(el) {
        var key = el.getAttribute('data-key');
        if (dict[key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else if (el.tagName === 'SELECT') {
                el.querySelectorAll('option').forEach(function(opt) {
                    var optKey = opt.getAttribute('data-key');
                    if (optKey && dict[optKey]) opt.textContent = dict[optKey];
                });
            } else {
                el.innerHTML = dict[key];
            }
        }
    });
    var brandText = document.querySelector('.brand-text');
    if (brandText) brandText.textContent = dict['brand'] || (currentLang === 'id' ? 'Dapur Aulicious✨' : 'Aulicious Kitchen✨');
    updateAdminFormLanguage();
    var searchInput = document.getElementById('heroSearchInput');
    if (searchInput) searchInput.placeholder = dict['search-placeholder'] || 'Cari menu favoritmu...';
    renderProdukGrid();
    if (document.getElementById('page-detail').style.display !== 'none') showDetail(detailProductId);
    renderCartItems();
    if (isAdmin) {
        renderOrders();
        renderAdminProductList();
        updateCharts();
    }
}

function updateAdminFormLanguage() {
    var dict = translations[currentLang];
    var formTitle = document.getElementById('adminFormTitle');
    var submitBtn = document.getElementById('adminSubmitBtn');
    var cancelBtn = document.getElementById('adminCancelBtn');
    var editId = document.getElementById('editProductId').value;
    if (formTitle) formTitle.textContent = editId ? (currentLang === 'id' ? '✏️ Edit Produk' : '✏️ Edit Product') : dict['admin-add-product'] || '➕ Tambah Produk';
    if (submitBtn) submitBtn.textContent = editId ? (currentLang === 'id' ? '💾 Update Produk' : '💾 Update Product') : dict['admin-add-btn'] || '➕ Tambah Produk';
    if (cancelBtn) cancelBtn.textContent = dict['admin-cancel'] || '❌ Batal Edit';
}

// ===== ADMIN LOGIN =====
function toggleAdminLogin() {
    if (isAdmin) {
        adminLogout();
    } else {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('loginError').classList.remove('show');
        setTimeout(function() { document.getElementById('loginUser').focus(); }, 100);
    }
}

function closeLogin() {
    document.getElementById('loginModal').classList.remove('active');
}

function prosesLogin() {
    var user = document.getElementById('loginUser').value.trim();
    var pass = document.getElementById('loginPass').value.trim();
    if (user === 'admin' && pass === 'aulicious2026') {
        isAdmin = true;
        localStorage.setItem('admin_session_aulicious', 'true');
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').textContent = '👑 Admin';
        document.getElementById('adminLoginBtn').classList.add('logged');
        renderAdminProductList();
        updateStats();
        renderOrders();
        updateCharts();
        showToast('✅ Login berhasil! Selamat datang Admin.');
    } else {
        document.getElementById('loginError').classList.add('show');
        document.getElementById('loginPass').value = '';
        document.getElementById('loginPass').focus();
    }
}

function adminLogout() {
    isAdmin = false;
    localStorage.removeItem('admin_session_aulicious');
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('adminLoginBtn').textContent = '🔑 Admin';
    document.getElementById('adminLoginBtn').classList.remove('logged');
    showToast('Logout berhasil');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('loginModal').classList.contains('active')) prosesLogin();
});

// ===== ADMIN PANEL =====
function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.admin-tab-content').forEach(function(c) { c.classList.remove('active'); });
    document.querySelector('.admin-tab[data-tab="' + tabId + '"]').classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function updateStats() {
    var ids = Object.keys(produkData);
    document.getElementById('statProducts').textContent = ids.length;
    try {
        orders = JSON.parse(localStorage.getItem('riwayat_pesanan_aulicious') || '[]');
    } catch (e) { orders = []; }
    document.getElementById('statOrders').textContent = orders.length;
    var totalRevenue = 0;
    orders.forEach(function(o) { totalRevenue += o.total || 0; });
    document.getElementById('statRevenue').textContent = formatRp(totalRevenue);
    var totalRating = 0, countRating = 0;
    ids.forEach(function(id) {
        if (produkData[id].rating !== undefined) {
            totalRating += produkData[id].rating;
            countRating++;
        }
    });
    var avgRating = countRating > 0 ? (totalRating / countRating) : 0;
    document.getElementById('statAvgRating').textContent = avgRating.toFixed(1) + ' ⭐';
    updateCharts();
}

function updateCharts() {
    if (!isAdmin) return;
    var ids = Object.keys(produkData);
    var labels = [], ratings = [], stocks = [];
    var colors = ['#d4784a', '#e8906a', '#f5b692', '#4caf84', '#6a9ec9', '#8b5cf6', '#ec4899', '#e8b86d', '#e8837a', '#14b8a6'];
    ids.forEach(function(id, index) {
        var p = produkData[id];
        labels.push(p.nama.length > 12 ? p.nama.substring(0, 12) + '...' : p.nama);
        ratings.push(p.rating || 4.5);
        stocks.push(p.stok || 0);
    });
    var ratingCtx = document.getElementById('ratingChart').getContext('2d');
    if (ratingChartInstance) ratingChartInstance.destroy();
    ratingChartInstance = new Chart(ratingCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: currentLang === 'id' ? 'Rating' : 'Rating',
                data: ratings,
                backgroundColor: 'rgba(212,120,74,0.6)',
                borderColor: '#d4784a',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } }
        }
    });
    var stockCtx = document.getElementById('stockChart').getContext('2d');
    if (stockChartInstance) stockChartInstance.destroy();
    stockChartInstance = new Chart(stockCtx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: stocks,
                backgroundColor: colors.slice(0, ids.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 12, padding: 8, font: { size: 10 } }
                }
            }
        }
    });
}

function renderAdminProductList() {
    var container = document.getElementById('adminProductList');
    var ids = Object.keys(produkData);
    var dict = translations[currentLang];
    if (ids.length === 0) {
        container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px;">' + (dict['admin-product-empty'] || 'Belum ada produk') + '</p>';
        return;
    }
    var html = '';
    ids.forEach(function(id) {
        var p = produkData[id];
        var stockClass = 'in-stock', stockText = currentLang === 'id' ? '✓ Tersedia' : '✓ Available';
        if (p.stok <= 0) {
            stockClass = 'out-of-stock';
            stockText = currentLang === 'id' ? '✕ Habis' : '✕ Out of Stock';
        } else if (p.stok <= 10) {
            stockClass = 'low-stock';
            stockText = (currentLang === 'id' ? '⚠️ ' + p.stok + ' tersisa' : '⚠️ ' + p.stok + ' left');
        } else {
            stockText = (currentLang === 'id' ? '✓ ' + p.stok + ' tersedia' : '✓ ' + p.stok + ' available');
        }
        html += '<div class="list-item"><div class="item-info"><img src="' + p.img + '" alt="' + p.nama + '"><div class="item-detail"><div class="item-name">' + p.nama + '</div><div class="item-price">' + formatRp(p.harga) + '</div><div class="item-stock">⭐ ' + (p.rating || 4.5) + ' (' + (p.reviews || 0) + ' ulasan) | <span class="item-stock-badge ' + stockClass + '">' + stockText + '</span></div></div></div><div class="item-actions"><button class="edit-btn" onclick="editProdukAdmin(' + id + ')">✏️ Edit</button><button class="delete-btn" onclick="hapusProdukAdmin(' + id + ')">🗑️ Hapus</button></div></div>';
    });
    container.innerHTML = html;
}

function simpanProdukAdmin() {
    var nama = document.getElementById('adminNama').value.trim();
    var harga = parseInt(document.getElementById('adminHarga').value.trim());
    var desc = document.getElementById('adminDesc').value.trim();
    var descEn = document.getElementById('adminDescEn').value.trim();
    var kategori = document.getElementById('adminKategori').value;
    var img = document.getElementById('adminImg').value.trim();
    var sku = document.getElementById('adminSku').value.trim() || 'CUST-' + Date.now();
    var stok = parseInt(document.getElementById('adminStok').value.trim()) || 0;
    var rating = parseFloat(document.getElementById('adminRating').value.trim()) || 4.5;
    var reviews = parseInt(document.getElementById('adminReviews').value.trim()) || 0;
    if (!nama || !harga || !desc || !img || !descEn) {
        showToast(currentLang === 'id' ? '⚠️ Semua field wajib diisi!' : '⚠️ All fields are required!');
        return;
    }
    var editIdVal = document.getElementById('editProductId').value;
    if (editIdVal) {
        var id = parseInt(editIdVal);
        produkData[id] = {
            nama: nama,
            harga: harga,
            desc: desc,
            desc_en: descEn,
            kategori: kategori,
            img: img,
            sku: sku,
            stok: stok,
            rating: rating,
            reviews: reviews,
            satuan: produkData[id]?.satuan || '/pcs',
            pilihanRasa: produkData[id]?.pilihanRasa || null,
            rasaDefault: produkData[id]?.rasaDefault || null
        };
        showToast(currentLang === 'id' ? '✅ Produk berhasil diupdate!' : '✅ Product updated successfully!');
        batalEditAdmin();
    } else {
        var newId = Math.max(0, ...Object.keys(produkData).map(Number)) + 1;
        produkData[newId] = {
            nama: nama,
            harga: harga,
            desc: desc,
            desc_en: descEn,
            kategori: kategori,
            img: img,
            sku: sku,
            stok: stok,
            rating: rating,
            reviews: reviews,
            satuan: '/pcs'
        };
        showToast(currentLang === 'id' ? '✅ Produk berhasil ditambahkan!' : '✅ Product added successfully!');
    }
    document.getElementById('adminNama').value = '';
    document.getElementById('adminHarga').value = '';
    document.getElementById('adminDesc').value = '';
    document.getElementById('adminDescEn').value = '';
    document.getElementById('adminImg').value = '';
    document.getElementById('adminSku').value = '';
    document.getElementById('adminStok').value = '';
    document.getElementById('adminRating').value = '';
    document.getElementById('adminReviews').value = '';
    document.getElementById('editProductId').value = '';
    updateAdminFormLanguage();
    renderAdminProductList();
    renderProdukGrid();
    updateStats();
}

function editProdukAdmin(id) {
    var p = produkData[id];
    if (!p) return;
    document.getElementById('editProductId').value = id;
    document.getElementById('adminNama').value = p.nama;
    document.getElementById('adminHarga').value = p.harga;
    document.getElementById('adminDesc').value = p.desc;
    document.getElementById('adminDescEn').value = p.desc_en || '';
    document.getElementById('adminKategori').value = p.kategori;
    document.getElementById('adminImg').value = p.img;
    document.getElementById('adminSku').value = p.sku || '';
    document.getElementById('adminStok').value = p.stok || 0;
    document.getElementById('adminRating').value = p.rating || 4.5;
    document.getElementById('adminReviews').value = p.reviews || 0;
    updateAdminFormLanguage();
    document.getElementById('adminCancelBtn').style.display = 'block';
    document.querySelector('.admin-form').scrollIntoView({ behavior: 'smooth' });
}

function batalEditAdmin() {
    document.getElementById('editProductId').value = '';
    document.getElementById('adminNama').value = '';
    document.getElementById('adminHarga').value = '';
    document.getElementById('adminDesc').value = '';
    document.getElementById('adminDescEn').value = '';
    document.getElementById('adminImg').value = '';
    document.getElementById('adminSku').value = '';
    document.getElementById('adminStok').value = '';
    document.getElementById('adminRating').value = '';
    document.getElementById('adminReviews').value = '';
    document.getElementById('adminCancelBtn').style.display = 'none';
    updateAdminFormLanguage();
}

function hapusProdukAdmin(id) {
    var confirmMsg = currentLang === 'id' ? 'Yakin ingin menghapus produk "' + produkData[id].nama + '"?' : 'Are you sure you want to delete "' + produkData[id].nama + '"?';
    if (!confirm(confirmMsg)) return;
    delete produkData[id];
    renderAdminProductList();
    renderProdukGrid();
    updateStats();
    showToast(currentLang === 'id' ? '🗑️ Produk dihapus' : '🗑️ Product deleted');
}

function renderOrders() {
    var container = document.getElementById('orderList');
    try {
        orders = JSON.parse(localStorage.getItem('riwayat_pesanan_aulicious') || '[]');
    } catch (e) { orders = []; }
    if (orders.length === 0) {
        container.innerHTML = (currentLang === 'id' ? '<div class="orders-empty"><span>📭</span><p>Belum ada pesanan masuk</p></div>' : '<div class="orders-empty"><span>📭</span><p>No orders yet</p></div>');
        return;
    }
    var html = '';
    orders.slice().reverse().forEach(function(order, index) {
        var statusClass = 'pending', statusText = currentLang === 'id' ? '⏳ Pending' : '⏳ Pending';
        if (order.status === 'processed') {
            statusClass = 'processed';
            statusText = currentLang === 'id' ? '🔄 Diproses' : '🔄 Processed';
        } else if (order.status === 'completed') {
            statusClass = 'completed';
            statusText = currentLang === 'id' ? '✅ Selesai' : '✅ Completed';
        } else if (order.status === 'cancelled') {
            statusClass = 'cancelled';
            statusText = currentLang === 'id' ? '❌ Dibatalkan' : '❌ Cancelled';
        }
        var itemsHtml = '';
        if (order.items) {
            order.items.forEach(function(item) {
                var namaItem = item.nama;
                if (item.rasaNama) namaItem += ' (' + item.rasaNama + ')';
                itemsHtml += '<li>• ' + namaItem + ' x ' + item.qty + ' = ' + formatRp(item.harga * item.qty) + '</li>';
            });
        }
        var nameLabel = currentLang === 'id' ? 'Nama:' : 'Name:';
        var waLabel = currentLang === 'id' ? 'WhatsApp:' : 'WhatsApp:';
        var methodLabel = currentLang === 'id' ? 'Metode:' : 'Method:';
        var addressLabel = currentLang === 'id' ? 'Alamat:' : 'Address:';
        var itemsLabel = currentLang === 'id' ? 'Pesanan:' : 'Order:';
        var totalLabel = currentLang === 'id' ? 'Total:' : 'Total:';
        var processLabel = currentLang === 'id' ? '🔄 Proses' : '🔄 Process';
        var completeLabel = currentLang === 'id' ? '✅ Selesai' : '✅ Complete';
        var cancelLabel = currentLang === 'id' ? '❌ Batalkan' : '❌ Cancel';
        var deleteLabel = currentLang === 'id' ? '🗑️ Hapus' : '🗑️ Delete';
        html += '<div class="order-item"><div class="order-header"><span class="order-id">#ORDER-' + (order.id || Date.now() + index) + '</span><span class="order-status ' + statusClass + '">' + statusText + '</span><span style="font-size:0.75rem;color:var(--muted);">' + (order.tanggal || new Date().toLocaleString('id-ID')) + '</span></div><div class="order-detail"><div><strong>' + nameLabel + '</strong> ' + (order.nama || '-') + '</div><div><strong>' + waLabel + '</strong> ' + (order.phone || '-') + '</div><div><strong>' + methodLabel + '</strong> ' + (order.metode || '-') + '</div><div><strong>' + addressLabel + '</strong> ' + (order.alamat || '-') + '</div><div class="order-items"><strong>' + itemsLabel + '</strong><ul>' + itemsHtml + '</ul></div><div class="order-total">' + totalLabel + ' ' + formatRp(order.total || 0) + '</div></div><div class="order-actions"><button class="status-btn" onclick="updateOrderStatus(' + index + ', \'processed\')">' + processLabel + '</button><button class="status-btn" onclick="updateOrderStatus(' + index + ', \'completed\')">' + completeLabel + '</button><button class="status-btn" onclick="updateOrderStatus(' + index + ', \'cancelled\')">' + cancelLabel + '</button><button class="delete-order-btn" onclick="deleteOrder(' + index + ')">' + deleteLabel + '</button></div></div>';
    });
    container.innerHTML = html;
}

function updateOrderStatus(index, status) {
    try {
        orders = JSON.parse(localStorage.getItem('riwayat_pesanan_aulicious') || '[]');
    } catch (e) { orders = []; }
    var realIndex = orders.length - 1 - index;
    if (orders[realIndex]) {
        orders[realIndex].status = status;
        localStorage.setItem('riwayat_pesanan_aulicious', JSON.stringify(orders));
        renderOrders();
        updateStats();
        showToast(currentLang === 'id' ? '✅ Status pesanan diperbarui' : '✅ Order status updated');
    }
}

function deleteOrder(index) {
    if (!confirm(currentLang === 'id' ? 'Yakin ingin menghapus pesanan ini?' : 'Are you sure you want to delete this order?')) return;
    try {
        orders = JSON.parse(localStorage.getItem('riwayat_pesanan_aulicious') || '[]');
    } catch (e) { orders = []; }
    var realIndex = orders.length - 1 - index;
    if (orders[realIndex]) {
        orders.splice(realIndex, 1);
        localStorage.setItem('riwayat_pesanan_aulicious', JSON.stringify(orders));
        renderOrders();
        updateStats();
        showToast(currentLang === 'id' ? '🗑️ Pesanan dihapus' : '🗑️ Order deleted');
    }
}

// ===== INISIALISASI =====
muatKeranjang();
renderProdukGrid();
updateUI();
showPage('home');
applyLanguage();

// Cek session admin
try {
    var adminSession = localStorage.getItem('admin_session_aulicious');
    if (adminSession === 'true') {
        isAdmin = true;
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').textContent = '👑 Admin';
        document.getElementById('adminLoginBtn').classList.add('logged');
        renderAdminProductList();
        updateStats();
        renderOrders();
    }
} catch (e) {}

document.querySelector('.tab.active') && document.querySelector('.tab.active').click();

console.log('✅ Dapur Aulicious ✨ siap digunakan!');
console.log('📦 Diskon: GRATIS ONGKIR untuk pembelian ≥ Rp 150.000');
console.log('🛵 Ongkos Kirim: Rp 15.000');
console.log('📦 Biaya Penanganan: Rp 5.000');