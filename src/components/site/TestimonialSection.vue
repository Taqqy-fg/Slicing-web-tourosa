<script setup>
</script>

<template>
  <section style="background:#13233f;color:#fff;">
    <div data-aos="zoom-in" class="testimonial-inner">
      <i class="ph-fill ph-quotes" style="font-size:40px;color:#c39a4d;"></i>
      <p class="testimonial-quote">"Outing kantor 120 orang ke Bali berjalan mulus tanpa drama. Penawaran jelas, invoice rapi untuk reimbursement, dan tim Tourosa standby penuh di lokasi."</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;">
        <div class="testimonial-avatar"><span style="font-family:'IBM Plex Mono',monospace;font-size:10.5px;line-height:1.4;color:#a8a08c;text-align:center;padding:0 10px;">Foto</span></div>
        <div style="text-align:left;"><div style="font-size:15px;font-weight:700;">Rendra Pratama</div><div style="font-size:13px;color:#9fabc4;">HRD · PT Sinar Abadi</div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 84px 32px;
  text-align: center;
}
.testimonial-quote {
  font-size: 27px;
  line-height: 1.45;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 20px 0 30px;
  color: #f3f5f9;
}
.testimonial-avatar {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  background: repeating-linear-gradient(45deg,#efece4,#efece4 9px,#e6e3d8 9px,#e6e3d8 18px);
  border: 1px dashed #d4d0c2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .testimonial-inner {
    padding: 56px 24px;
  }
  .testimonial-quote {
    font-size: 18px;
    line-height: 1.55;
  }
}
</style>
