<script setup>
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
</script>

<template>
  <footer style="background:#0d1b30;color:#fff;">
    <div style="max-width:1240px;margin:0 auto;padding:64px 32px 32px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;">
      <div>
        <img src="/assets/tourosa-logo-white.png" alt="Tourosa" style="height:24px;width:auto;display:block;margin-bottom:18px;">
        <p style="font-size:14px;line-height:1.65;color:#9aa6bd;margin:0;max-width:280px;">Agen perjalanan untuk grup &amp; korporat. Tiket, hotel, tour, dan gathering dalam satu layanan terpercaya.</p>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#c39a4d;margin-bottom:16px;letter-spacing:.04em;">Layanan</div>
        <div style="display:flex;flex-direction:column;gap:10px;font-size:14px;color:#9aa6bd;"><span>Tiket Pesawat</span><span>Hotel &amp; Akomodasi</span><span>Group Tour</span><span>Gathering &amp; Event</span></div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#c39a4d;margin-bottom:16px;letter-spacing:.04em;">Perusahaan</div>
        <div style="display:flex;flex-direction:column;gap:10px;font-size:14px;color:#9aa6bd;"><a href="#tentang" class="tr-link" style="color:#9aa6bd;">Tentang Kami</a><a href="#proses" class="tr-link" style="color:#9aa6bd;">Cara Kerja</a><span style="cursor:pointer;" @click="goDash">Dashboard Admin</span></div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#c39a4d;margin-bottom:16px;letter-spacing:.04em;">Kontak</div>
        <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;color:#9aa6bd;">
          <span style="display:flex;gap:9px;align-items:center;"><i class="ph ph-whatsapp-logo" style="color:#c39a4d;font-size:17px;"></i>{{ waDisplay }}</span>
          <span style="display:flex;gap:9px;align-items:center;"><i class="ph ph-envelope-simple" style="color:#c39a4d;font-size:17px;"></i>{{ siteEmail }}</span>
          <span style="display:flex;gap:9px;align-items:flex-start;"><i class="ph ph-map-pin" style="color:#c39a4d;font-size:17px;"></i>{{ siteAddress }}</span>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid #1c2b44;">
      <div style="max-width:1240px;margin:0 auto;padding:20px 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <span style="font-size:13px;color:#6f7c95;">© 2026 Tourosa Travel. Hak cipta dilindungi.</span>
        <span style="font-size:13px;color:#6f7c95;">Made with care for group travel.</span>
      </div>
    </div>
  </footer>
</template>
