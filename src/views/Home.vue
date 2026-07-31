<script setup>
import { computed } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'

import SiteHeader from '../components/site/SiteHeader.vue'
import HeroSection from '../components/site/HeroSection.vue'
import TrustStrip from '../components/site/TrustStrip.vue'
import ServicesSection from '../components/site/ServicesSection.vue'
import AboutSection from '../components/site/AboutSection.vue'
import ProcessSection from '../components/site/ProcessSection.vue'
import TestimonialSection from '../components/site/TestimonialSection.vue'
import CtaSection from '../components/site/CtaSection.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import ScrollToTop from '../components/site/ScrollToTop.vue'

const { state } = useDashboardData()
const site = state.site

// Computed values based on state logic from the HTML script
const waNum = computed(() => (site.waNumber || '6281200000000').replace(/[^0-9]/g, ''))
const waMsg = encodeURIComponent('Halo Tourosa, saya ingin konsultasi perjalanan grup.')
const waLink = computed(() => 'https://wa.me/' + waNum.value + '?text=' + waMsg)
const waDisplay = computed(() => '+' + waNum.value.replace(/^(\d{2})(\d{3,4})(\d{3,4})(\d+)$/, '$1 $2-$3-$4'))

</script>

<template>
  <div style="background:#ffffff;">
    <SiteHeader :wa-link="waLink" />
    <HeroSection :site-tagline="site.tagline" :site-stats="site.stats" :wa-link="waLink" />
    <TrustStrip :site-clients="site.clients" />
    <ServicesSection />
    <AboutSection />
    <ProcessSection />
    <TestimonialSection />
    <CtaSection :wa-link="waLink" :wa-display="waDisplay" />
    <SiteFooter :wa-display="waDisplay" :site-email="site.email" :site-address="site.address" />
    <ScrollToTop />
  </div>
</template>
