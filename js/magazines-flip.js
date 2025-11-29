// magazines-flip.js - مدمج مع page-flip
// يدعم صور افتراضية حتى تُكمل تصميمك

// معلومات المجلات (مع دعم placeholder)
const MAGAZINES = {
  portfolio: {
    title: "أعمالي المختارة",
    desc: "Portfolio Highlights",
    pages: 3,
    pdf: "/pdfs/portfolio-highlights.pdf",
    folder: "placeholder" // سيتغير لـ "portfolio" لاحقًا
  },
  branding: {
    title: "هويات بصرية",
    desc: "Brand Identities",
    pages: 3,
    pdf: "/pdfs/brand-identities.pdf",
    folder: "placeholder"
  },
  packaging: {
    title: "تغليف منتجات",
    desc: "Product Packaging",
    pages: 3,
    pdf: "/pdfs/packaging-works.pdf",
    folder: "placeholder"
  }
};

let currentFlipBook = null;

// تحميل مجلّة افتراضية عند التشغيل
document.addEventListener('DOMContentLoaded', () => {
  switchMagazine('portfolio');
});

function switchMagazine(key) {
  if (!MAGAZINES[key]) return;

  const mag = MAGAZINES[key];
  
  // تحديث واجهة المستخدم
  document.getElementById('currentMagTitle')?.setTextContent(mag.title);
  document.getElementById('currentMagDesc')?.setTextContent(mag.desc);
  const downloadLink = document.getElementById('downloadPdfLink');
  const downloadLinkMobile = document.getElementById('downloadPdfLinkMobile');
  if (downloadLink) downloadLink.href = mag.pdf;
  if (downloadLinkMobile) downloadLinkMobile.href = mag.pdf;

  // تحميل العارض
  loadFlipbook(mag.folder, mag.pages);
}

function loadFlipbook(folder, totalPages) {
  const container = document.getElementById('flipbook-container');
  if (!container) return;

  // إزالة المحتوى القديم
  container.innerHTML = '';

  // إنشاء عناصر الصفحات
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement('div');
    page.className = 'page bg-white';
    page.style.backgroundImage = `url('/magazines/${folder}/page-${i}.jpg)`;
    page.style.backgroundSize = 'contain';
    page.style.backgroundRepeat = 'no-repeat';
    page.style.backgroundPosition = 'center';
    page.style.border = '1px solid #e2e8f0';
    page.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
    page.style.borderRadius = '2px';
    pages.push(page);
  }

  // تهيئة page-flip
  if (currentFlipBook) {
    currentFlipBook.dispose();
  }

  // حساب الأبعاد
  const width = Math.min(container.offsetWidth || 500, 800);
  const height = width * 1.4;

  currentFlipBook = new PageFlip(container, {
    width: width,
    height: height,
    size: 'fixed',
    minWidth: 300,
    maxWidth: 800,
    minHeight: 400,
    maxHeight: 1000,
    maxShadowOpacity: 0.6,
    showCover: false,
    mobileScrollSupport: true,
    usePortrait: true,
    clickEventForward: true
  });

  currentFlipBook.loadFromHTML(pages);

  // تحديث عند تغيير حجم النافذة
  const resizeObserver = new ResizeObserver(() => {
    const newWidth = Math.min(container.offsetWidth || 500, 800);
    const newHeight = newWidth * 1.4;
    currentFlipBook.updateSize(newWidth, newHeight);
  });
  resizeObserver.observe(container);
}
