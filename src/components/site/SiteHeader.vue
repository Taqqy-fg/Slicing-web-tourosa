<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  waLink: String
})

const goDash = () => {
  router.push('/dashboard')
}
</script>

<template>
  <header style="position:sticky;top:0;z-index:60;background:rgba(255,255,255,.88);backdrop-filter:blur(14px);border-bottom:1px solid #ecebe4;">
    <div style="max-width:1240px;margin:0 auto;padding:15px 32px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <img src="/assets/tourosa-logo.png" alt="Tourosa" style="height:26px;width:auto;display:block;">
      <nav style="display:flex;align-items:center;gap:30px;">
        <a href="#layanan" class="tr-link" style="font-size:14px;font-weight:500;color:#3a4459;">Layanan</a>
        <a href="#tentang" class="tr-link" style="font-size:14px;font-weight:500;color:#3a4459;">Tentang</a>
        <a href="#proses" class="tr-link" style="font-size:14px;font-weight:500;color:#3a4459;">Cara Kerja</a>
        <a href="#kontak" class="tr-link" style="font-size:14px;font-weight:500;color:#3a4459;">Kontak</a>
      </nav>
      <div style="display:flex;align-items:center;gap:12px;">
        <button @click="goDash" class="tr-btn" style="border:1px solid #d9dbe0;background:#fff;color:#15294f;font-size:13.5px;font-weight:600;padding:9px 16px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:7px;"><i class="ph ph-squares-four" style="font-size:16px;"></i>Dashboard</button>
        <a :href="waLink" target="_blank" class="tr-btn" style="background:#15294f;color:#fff;font-size:13.5px;font-weight:600;padding:10px 18px;border-radius:10px;display:flex;align-items:center;gap:8px;"><i class="ph-fill ph-whatsapp-logo" style="font-size:17px;color:#c39a4d;"></i>Hubungi Kami</a>
      </div>
    </div>
  </header>
</template>
