<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  waDisplay: String,
  siteEmail: String,
  siteAddress: String
})

const router = useRouter()
const goDash = () => {
  router.push('/dashboard')
}

// Custom Intersection Observer for Footer
const footerRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.1 }) // Trigger when 10% of footer is visible
  
  if (footerRef.value) {
    observer.observe(footerRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <footer class="site-footer" ref="footerRef">
    <div class="footer-inner" :class="{ 'is-visible': isVisible }">

      <!-- Brand col -->
      <div class="footer-brand footer-anim-item" style="transition-delay: 0s;">
        <img src="/assets/tourosa-logo-white.png" alt="Tourosa" class="footer-logo">
        <p class="footer-desc">Agen perjalanan untuk grup &amp; korporat. Tiket, hotel, tour, dan gathering dalam satu layanan terpercaya.</p>
        <!-- Kontak tampil di mobile di bawah brand -->
        <div class="footer-contact-mobile">
          <div class="footer-contact-item"><i class="ph ph-whatsapp-logo"></i><span>{{ waDisplay }}</span></div>
          <div class="footer-contact-item"><i class="ph ph-envelope-simple"></i><span>{{ siteEmail }}</span></div>
          <div class="footer-contact-item align-start"><i class="ph ph-map-pin"></i><span>{{ siteAddress }}</span></div>
        </div>
      </div>

      <!-- Layanan -->
      <div class="footer-col footer-anim-item" style="transition-delay: 0.1s;">
        <div class="footer-col-title">Layanan</div>
        <div class="footer-col-links">
          <span>Tiket Pesawat</span>
          <span>Hotel &amp; Akomodasi</span>
          <span>Group Tour</span>
          <span>Gathering &amp; Event</span>
        </div>
      </div>

      <!-- Perusahaan -->
      <div class="footer-col footer-anim-item" style="transition-delay: 0.2s;">
        <div class="footer-col-title">Perusahaan</div>
        <div class="footer-col-links">
          <a href="#tentang" class="tr-link" style="color:#9aa6bd;">Tentang Kami</a>
          <a href="#proses" class="tr-link" style="color:#9aa6bd;">Cara Kerja</a>
          <span style="cursor:pointer;" @click="goDash">Dashboard Admin</span>
        </div>
      </div>

      <!-- Kontak — hanya desktop -->
      <div class="footer-col footer-col-contact footer-anim-item" style="transition-delay: 0.3s;">
        <div class="footer-col-title">Kontak</div>
        <div class="footer-contact-list">
          <div class="footer-contact-item"><i class="ph ph-whatsapp-logo"></i><span>{{ waDisplay }}</span></div>
          <div class="footer-contact-item"><i class="ph ph-envelope-simple"></i><span>{{ siteEmail }}</span></div>
          <div class="footer-contact-item align-start"><i class="ph ph-map-pin"></i><span>{{ siteAddress }}</span></div>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>© 2026 Tourosa Travel. Hak cipta dilindungi.</span>
        <span>Made with care for group travel.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #0d1b30;
  color: #fff;
  overflow: hidden;
}

/* ===== CUSTOM ANIMATION (Replacing AOS for footer reliability) ===== */
.footer-anim-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.is-visible .footer-anim-item {
  opacity: 1;
  transform: translateY(0);
}

/* ===== GRID ===== */
.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 64px 32px 40px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.1fr;
  gap: 40px;
  align-items: start;
}

/* ===== BRAND ===== */
.footer-logo { height: 24px; width: auto; display: block; margin-bottom: 16px; }
.footer-desc { font-size: 14px; line-height: 1.65; color: #9aa6bd; margin: 0; max-width: 260px; }
.footer-contact-mobile { display: none; margin-top: 20px; }

/* ===== COLS ===== */
.footer-col-title {
  font-size: 12px;
  font-weight: 700;
  color: #c39a4d;
  margin-bottom: 16px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.footer-col-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #9aa6bd;
}

/* ===== CONTACT ===== */
.footer-contact-list { display: flex; flex-direction: column; gap: 12px; }
.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  color: #9aa6bd;
}
.footer-contact-item.align-start { align-items: flex-start; }
.footer-contact-item i { color: #c39a4d; font-size: 17px; flex-shrink: 0; margin-top: 1px; }

/* ===== BOTTOM BAR ===== */
.footer-bottom { border-top: 1px solid #1c2b44; }
.footer-bottom-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: #6f7c95;
}

/* ===== TABLET (1024px) ===== */
@media (max-width: 1024px) {
  .footer-inner {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 32px;
    padding: 52px 28px 36px;
  }
  /* Sembunyikan kolom kontak terpisah, tampilkan di bawah brand */
  .footer-col-contact { display: none; }
  .footer-contact-mobile { display: block; }
}

/* ===== MOBILE (768px) ===== */
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    padding: 40px 20px 28px;
  }
  /* Brand ambil full width */
  .footer-brand { grid-column: 1 / -1; }
  .footer-desc { max-width: 100%; }
  .footer-bottom-inner {
    padding: 16px 20px;
    flex-direction: column;
    text-align: center;
    gap: 4px;
  }
  /* On mobile, slightly reduce animation distance for better UX */
  .footer-anim-item { transform: translateY(15px); }
}

/* ===== SMALL MOBILE (480px) ===== */
@media (max-width: 480px) {
  .footer-inner { grid-template-columns: 1fr; gap: 24px; }
}
</style>
