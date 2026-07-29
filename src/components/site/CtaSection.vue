<script setup>
defineProps({
  waLink: String,
  waDisplay: String
})
</script>

<template>
  <section id="kontak" style="max-width:1240px;margin:0 auto;padding:88px 32px;">
    <div style="background:linear-gradient(120deg,#fbf5e8 0%,#fcfaf4 100%);border:1px solid #efe6d2;border-radius:24px;padding:56px 56px;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;">
      <div style="max-width:560px;">
        <h2 style="font-size:36px;line-height:1.12;letter-spacing:-.02em;font-weight:800;color:#13233f;margin:0 0 14px;">Siap rencanakan perjalanan grup Anda?</h2>
        <p style="font-size:16px;line-height:1.6;color:#5d6a82;margin:0;">Chat tim kami via WhatsApp untuk penawaran &amp; itinerary tanpa biaya. Balasan cepat di jam kerja.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <a :href="waLink" target="_blank" class="tr-btn" style="background:#15294f;color:#fff;font-size:16px;font-weight:700;padding:17px 32px;border-radius:13px;display:flex;align-items:center;gap:11px;justify-content:center;box-shadow:0 16px 34px -12px rgba(21,41,79,.5);"><i class="ph-fill ph-whatsapp-logo" style="font-size:22px;color:#c39a4d;"></i>Chat WhatsApp Sekarang</a>
        <div style="font-size:13px;color:#8a7c5c;text-align:center;font-weight:500;font-family:'IBM Plex Mono',monospace;">{{ waDisplay }}</div>
      </div>
    </div>
  </section>
</template>
