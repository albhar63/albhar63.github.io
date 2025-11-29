// magazines-flip.js
// مجلات رقمية مع محتوى افتراضي - بدون صور خارجية

const MAGAZINES = {
  portfolio: {
    title: "أعمالي المختارة",
    desc: "Portfolio Highlights",
    pages: 3,
    pdf: "/pdfs/portfolio-highlights.pdf"
  },
  branding: {
    title: "هويات بصرية",
    desc: "Brand Identities",
    pages: 3,
    pdf: "/pdfs/brand-identities.pdf"
  },
  packaging: {
    title: "تغليف منتجات",
    desc: "Product Packaging",
    pages: 3,
    pdf: "/pdfs/packaging-works.pdf"
  }
};

let currentFlipBook = null;

document.addEventListener('DOMContentLoaded', () => {
  switchMagazine('portfolio');
});

function switchMagazine(key) {
  const mag = MAGAZINES[key];
  if (!mag) return;

  // تحديث العنوان والوصف
  const titleEl = document.getElementById('currentMagTitle');
  const descEl = document.getElementById('currentMagDesc');
  if (titleEl) titleEl.textContent = mag.title;
  if (descEl) descEl.textContent = mag.desc;

  // تحديث روابط التنزيل
  const downloadLink = document.getElementById('downloadPdfLink');
  const downloadLinkMobile = document.getElementById('downloadPdfLinkMobile');
  if (downloadLink) downloadLink.href = mag.pdf;
  if (downloadLinkMobile) downloadLinkMobile.href = mag.pdf;

  // تحميل المجلّة
  loadFlipbook(mag.pages);
}

function loadFlipbook(totalPages) {
  const container = document.getElementById('flipbook-container');
  if (!container) return;

  container.innerHTML = '';
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement('div');
    page.className = 'page flex items-center justify-center bg-white';
    page.style.border = '1px solid #e2e8f0';
    page.style.borderRadius = '4px';
    page.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
    page.style.minWidth = '300px';
    page.style.minHeight = '420px';

    const content = document.createElement('div');
    content.className = 'text-center p-6 max-w-xs';

    if (i === 1) {
      content.innerHTML = `
        <div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M9 11H7m4 0V9a2 2 0 00-2-2M9 11V9m0 0V7m0 2H7m10 4h-2" />
          </svg>
        </div>
        <h3 class="font-bold text-gray-800 text-lg">مجلّة تجريبية</h3>
        <p class="text-gray-600 text-sm mt-2">سيتم استبدالها بمحتواك عند الانتهاء من التصميم</p>
      `;
    } else if (i === totalPages) {
      content.innerHTML = `
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p class="text-gray-600 text-sm">نهاية المجلّة</p>
      `;
    } else {
      content.innerHTML = `
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-gray-500 font-bold text-lg">${i}</span>
        </div>
        <p class="text-gray-600 text-sm">صفحة تجريبية ${i}</p>
      `;
    }

    page.appendChild(content);
    pages.push(page);
  }

  // تدمير العارض القديم
  if (currentFlipBook) {
    currentFlipBook.dispose();
  }

  // حساب الأبعاد
  const width = Math.min(container.offsetWidth || 500, 800);
  const height = width * 1.4;

  // إنشاء عارض جديد
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
    usePortrait: true
  });

  currentFlipBook.loadFromHTML(pages);

  // دعم تغيير الحجم
  const resizeObserver = new ResizeObserver(() => {
    const newWidth = Math.min(container.offsetWidth || 500, 800);
    currentFlipBook.updateSize(newWidth, newWidth * 1.4);
  });
  resizeObserver.observe(container);
}
