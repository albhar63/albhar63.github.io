// معلومات المجلات
const MAGAZINES = {
  portfolio: {
    title: "أعمالي المختارة",
    desc: "Portfolio Highlights",
    pages: 8, // عدد الصفحات
    pdf: "/pdfs/portfolio-highlights.pdf"
  },
  branding: {
    title: "هويات بصرية",
    desc: "Brand Identities",
    pages: 10,
    pdf: "/pdfs/brand-identities.pdf"
  },
  packaging: {
    title: "تغليف منتجات",
    desc: "Product Packaging",
    pages: 12,
    pdf: "/pdfs/packaging-works.pdf"
  }
};

let currentMagazine = 'portfolio';
let flipbookInitialized = false;

// تحميل مجلّة افتراضية
document.addEventListener('DOMContentLoaded', () => {
  switchMagazine('portfolio');
});

function switchMagazine(key) {
  if (!MAGAZINES[key]) return;
  
  currentMagazine = key;
  const mag = MAGAZINES[key];
  
  // تحديث واجهة المستخدم
  document.getElementById('currentMagTitle').textContent = mag.title;
  document.getElementById('currentMagDesc').textContent = mag.desc;
  document.getElementById('downloadPdfLink').href = mag.pdf;
  document.getElementById('downloadPdfLinkMobile').href = mag.pdf;
  
  // إعادة تحميل كتاب التقليب
  loadFlipbook(key, mag.pages);
}

function loadFlipbook(magKey, totalPages) {
  const container = document.getElementById('flipbook');
  
  // إزالة المحتوى القديم
  container.innerHTML = '';
  
  // إنشاء صفحات كصور
  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement('div');
    page.className = 'page bg-white';
    page.style.backgroundImage = `url('/magazines/${magKey}/page-${i}.jpg)`;
    page.style.backgroundSize = 'contain';
    page.style.backgroundRepeat = 'no-repeat';
    page.style.backgroundPosition = 'center';
    page.style.width = '100%';
    page.style.height = '100%';
    container.appendChild(page);
  }

  // تهيئة Turn.js
  if (flipbookInitialized) {
    $('#flipbook').turn('destroy');
  }

  // حساب الأبعاد
  const width = container.offsetWidth || 500;
  const height = width * 1.4; // نسبة A4 تقريبًا

  $('#flipbook').turn({
    width: width,
    height: height,
    autoCenter: true,
    duration: 800,
    acceleration: true,
    gradients: true,
    elevation: 50
  });

  flipbookInitialized = true;

  // تحديث أبعاد عند تغيير حجم النافذة
  window.addEventListener('resize', () => {
    const newWidth = container.offsetWidth || 500;
    const newHeight = newWidth * 1.4;
    $('#flipbook').turn('size', newWidth, newHeight);
  });
}
