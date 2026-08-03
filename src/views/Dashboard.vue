<script setup>
import { computed, ref, nextTick } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'

import DashSidebar from '../components/dashboard/DashSidebar.vue'
import DashTopbar from '../components/dashboard/DashTopbar.vue'
import ViewOverview from '../components/dashboard/ViewOverview.vue'
import ViewNewOrder from '../components/dashboard/ViewNewOrder.vue'
import ViewOrderList from '../components/dashboard/ViewOrderList.vue'
import ViewInvoice from '../components/dashboard/ViewInvoice.vue'
import ViewOrderDetail from '../components/dashboard/ViewOrderDetail.vue'
import ViewReport from '../components/dashboard/ViewReport.vue'
import ViewSettings from '../components/dashboard/ViewSettings.vue'

const { state, blankForm, fmt, fmtNum, fmtDate, fmtShort, calc, statusMeta } = useDashboardData()

const isSidebarOpen = ref(false)

const mainScroll = ref(null)

// Routing / View toggles inside dashboard
const setView = (view) => {
  state.dashView = view
  nextTick(() => {
    if (mainScroll.value) {
      mainScroll.value.scrollTop = 0
    }
  })
}

const goNew = () => setView('new')
const goList = () => setView('list')
const goReport = () => setView('report')
const goSettings = () => setView('settings')
const goOverview = () => setView('overview')

// --- Nav ---
const navDefs = [
  ['overview', 'Ringkasan', 'ph-squares-four'],
  ['new', 'Buat Pesanan', 'ph-note-pencil'],
  ['list', 'Daftar Pesanan', 'ph-list-checks'],
  ['report', 'Laporan', 'ph-chart-bar'],
  ['settings', 'Pengaturan', 'ph-gear']
]

const navItems = computed(() => {
  const items = navDefs.map(([key, label, icon]) => {
    const active = state.dashView === key
    return {
      key, label, icon,
      onClick: () => setView(key),
      bg: active ? 'rgba(195,154,77,.15)' : 'transparent',
      color: active ? '#f0d79a' : '#aab3c4'
    }
  })
  if (state.activeInvoice && state.dashView === 'invoice') {
    items.push({ key: 'invoice', label: 'Invoice', icon: 'ph-receipt', onClick: () => {}, bg: 'rgba(195,154,77,.15)', color: '#f0d79a' })
  }
  return items
})

const pageMeta = {
  overview: ['Ringkasan', 'Pantau seluruh pesanan grup dalam satu layar.'],
  new: ['Buat Pesanan', 'Input rincian perjalanan grup dan hasilkan invoice.'],
  list: ['Daftar Pesanan', 'Seluruh pemesanan grup yang tercatat.'],
  detail: ['Detail Pesanan', 'Rincian pesanan & estimasi profit (internal).'],
  report: ['Laporan', 'Ringkasan pendapatan, modal, dan profit.'],
  settings: ['Pengaturan', 'Kelola konten website, kategori, dan vendor.'],
  invoice: ['Invoice', 'Pratinjau dan cetak invoice resmi.'],
}
const pm = computed(() => pageMeta[state.dashView] || pageMeta.overview)
const todayF = fmtDate(new Date().toISOString().slice(0, 10))

// --- Orders Logic ---
const calcs = computed(() => state.orders.map(o => calc(o)))
const sOrders = computed(() => state.orders.length)
const sPax = computed(() => fmtNum(state.orders.reduce((a, o) => a + (Number(o.pax) || 0), 0)))
const sRevenue = computed(() => fmt(calcs.value.reduce((a, c) => a + c.total, 0)))
const sActive = computed(() => state.orders.filter(o => o.status !== 'Lunas').length)

const viewInvoice = (o) => { state.activeInvoice = o; setView('invoice') }
const openDetail = (o) => { state.activeInvoice = o; setView('detail') }

const toRow = (o) => {
  const c = calc(o);
  const m = statusMeta(o.status);
  return {
    no: o.no, group: o.group, dest: o.dest, pax: (o.pax || '-'), total: fmt(c.total),
    tripShort: o.depart ? fmtShort(o.depart) : '-',
    status: o.status, statusBg: m.bg, statusColor: m.color, date: fmtDate(o.date),
    onView: () => viewInvoice(o), onDetail: () => openDetail(o)
  }
}
const recentOrders = computed(() => state.orders.slice(0, 4).map(toRow))
const allOrders = computed(() => state.orders.map(toRow))

const stCount = (st) => state.orders.filter(o => o.status === st).length
const lunasCount = computed(() => stCount('Lunas'))
const dpCount = computed(() => state.orders.filter(o => o.status === 'DP').length)
const pendCount = computed(() => state.orders.filter(o => o.status !== 'Lunas' && o.status !== 'DP').length)
const totCount = computed(() => Math.max(1, sOrders.value))
const statusBars = computed(() => [
  { label: 'Lunas', count: lunasCount.value, width: Math.round(lunasCount.value / totCount.value * 100) + '%', color: '#1f7a5c' },
  { label: 'DP / Berjalan', count: dpCount.value, width: Math.round(dpCount.value / totCount.value * 100) + '%', color: '#c39a4d' },
  { label: 'Pending', count: pendCount.value, width: Math.round(pendCount.value / totCount.value * 100) + '%', color: '#9aa0ad' },
])

// --- Form Logic ---
const catOptions = computed(() => state.catalog.map(c => c.cat))
const vendorsFor = (cat) => {
  const c = state.catalog.find(x => x.cat === cat)
  return c ? c.items.filter(v => (v || '').trim()) : []
}

const updItem = (idx, field, val) => {
  state.form.items[idx][field] = val
}

const itemRows = computed(() => {
  return state.form.items.map((it, idx) => ({
    idx, cat: it.cat, vendor: it.vendor || '', desc: it.desc, qty: it.qty, cost: it.cost, price: it.price,
    vendorOptions: vendorsFor(it.cat),
    lineF: fmt((Number(it.qty) || 0) * (Number(it.price) || 0)),
    onCat: e => { state.form.items[idx].cat = e.target.value; state.form.items[idx].vendor = '' },
    onVendor: e => { state.form.items[idx].vendor = e.target.value; if (!state.form.items[idx].desc) state.form.items[idx].desc = e.target.value },
    onDesc: e => updItem(idx, 'desc', e.target.value),
    onQty: e => updItem(idx, 'qty', e.target.value),
    onCost: e => updItem(idx, 'cost', e.target.value),
    onPrice: e => updItem(idx, 'price', e.target.value),
    onRemove: () => { if(state.form.items.length > 1) state.form.items.splice(idx, 1) }
  }))
})

const tCalc = computed(() => {
  const c = calc(state.form)
  return {
    tSubtotal: fmt(c.subtotal), tDiscount: fmt(c.discount), tTax: fmt(c.tax), tTotal: fmt(c.total),
    tPerPax: fmt(c.perPax), tDp: fmt(c.dp), tSisa: fmt(c.sisa),
    tCost: fmt(c.totalCost), tProfit: fmt(c.profit), tMargin: Math.round(c.marginPct) + '%'
  }
})

const addItem = () => {
  state.form.items.push({ cat: 'Lainnya', vendor: '', desc: '', qty: '', cost: '', price: '' })
}
const resetForm = () => {
  state.form = blankForm(state.form.taxPercent)
}
const nextInvNo = computed(() => 'INV/TRS/2026/' + String(state.seq).padStart(4, '0'))

const saveOrder = () => {
  const f = state.form
  const items = f.items.filter(it => (Number(it.qty) || 0) > 0 || (Number(it.price) || 0) > 0 || (it.desc || '').trim())
  const no = nextInvNo.value
  const iso = new Date().toISOString().slice(0, 10)
  const order = {
    no, date: iso,
    group: (f.group || '').trim() || 'Tanpa Nama Grup',
    pic: f.pic, contact: f.contact, dest: f.dest || '-', depart: f.depart, ret: f.ret, pax: f.pax,
    items: items.length ? items : [{ cat: 'Lainnya', desc: '(belum ada item)', qty: 0, cost: 0, price: 0 }],
    expenses: [], terms: [],
    discount: f.discount, taxPercent: f.taxPercent, dpPercent: f.dpPercent, notes: f.notes,
    status: (Number(f.dpPercent) >= 100 ? 'Lunas' : 'DP'),
  }
  state.orders.unshift(order)
  state.seq += 1
  state.activeInvoice = order
  setView('invoice')
  state.form = blankForm(state.form.taxPercent)
}

// --- Active Invoice Logic ---
const invData = computed(() => {
  if (!state.activeInvoice) return null
  const o = state.activeInvoice
  const c = calc(o)
  const m = statusMeta(o.status)
  const tripF = (o.depart ? fmtDate(o.depart) : '-') + (o.ret ? '  –  ' + fmtDate(o.ret) : '')
  const invTerms = (o.terms || []).map((tm, i) => ({
    no: i + 1, label: tm.label || ('Termin ' + (i + 1)),
    dueF: tm.due ? fmtDate(tm.due) : '-',
    percentF: (Number(tm.percent) || 0) + '%',
    amountF: fmt(c.total * (Number(tm.percent) || 0) / 100)
  }))
  return {
    no: o.no, dateF: fmtDate(o.date), group: o.group, pic: o.pic || '-', contact: o.contact || '-', dest: o.dest || '-',
    tripF, paxF: (o.pax || '-') + ' pax', statusLabel: o.status, statusBg: m.bg, statusColor: m.color,
    subtotalF: fmt(c.subtotal), discountF: fmt(c.discount), taxPercentF: String(c.taxPercent), taxF: fmt(c.tax),
    totalF: fmt(c.total), perPaxF: fmt(c.perPax), dpPercentF: String(c.dpPercent), dpF: fmt(c.dp), sisaF: fmt(c.sisa),
    notes: o.notes || '-',
    invTerms, hasTerms: invTerms.length > 0
  }
})

const invItemsData = computed(() => {
  if (!state.activeInvoice) return []
  const o = state.activeInvoice; const c = calc(o);
  return c.items.map((it, i) => ({
    no: i + 1, desc: (it.desc || '').trim() || it.cat, cat: (it.vendor && it.vendor.trim()) ? it.cat + ' · ' + it.vendor : it.cat,
    qtyF: String(it.qty || 0), priceF: fmt(it.price), lineF: fmt(it.line)
  }))
})

// --- Active Invoice Detail (Internal) ---
const detailData = computed(() => {
  if (!state.activeInvoice) return null
  const o = state.activeInvoice; const c = calc(o); const m = statusMeta(o.status);
  return {
    no: o.no, dateF: fmtDate(o.date), group: o.group, pic: o.pic || '-', contact: o.contact || '-', dest: o.dest || '-',
    tripF: (o.depart ? fmtDate(o.depart) : '-') + (o.ret ? '  –  ' + fmtDate(o.ret) : ''), paxF: (o.pax || '-') + ' pax',
    statusLabel: o.status, statusBg: m.bg, statusColor: m.color,
    revenueF: fmt(c.total), costF: fmt(c.totalCost), totalExpensesF: fmt(c.totalExpenses), profitF: fmt(c.profit), marginF: Math.round(c.marginPct) + '%',
    subtotalF: fmt(c.subtotal), discountF: fmt(c.discount), taxF: fmt(c.tax), taxPercentF: String(c.taxPercent),
    totalF: fmt(c.total), perPaxF: fmt(c.perPax), dpPercentF: String(c.dpPercent), dpF: fmt(c.dp), sisaF: fmt(c.sisa),
    profitColor: c.profit >= 0 ? '#1f7a5c' : '#c2603a'
  }
})

const detailItems = computed(() => {
  if (!state.activeInvoice) return []
  const o = state.activeInvoice; const c = calc(o);
  return c.items.map((it, i) => ({
    no: i + 1, desc: (it.desc || '').trim() || it.cat, cat: (it.vendor && it.vendor.trim()) ? it.cat + ' · ' + it.vendor : it.cat,
    qtyF: String(it.qty || 0), costF: fmt(it.cost), priceF: fmt(it.price),
    lineSellF: fmt(it.line), lineProfitF: fmt(it.lineProfit),
    profitColor: it.lineProfit >= 0 ? '#1f7a5c' : '#c2603a'
  }))
})

const updateActiveOrder = (field, val, listName, idx) => {
  if(listName) {
      if(!state.activeInvoice[listName]) state.activeInvoice[listName] = []
      state.activeInvoice[listName][idx][field] = val
  } else {
      state.activeInvoice[field] = val
  }
  // sync with main orders array
  const oid = state.orders.findIndex(o => o.no === state.activeInvoice.no)
  if(oid !== -1) {
    state.orders[oid] = state.activeInvoice
  }
}

const detailExpenses = computed(() => {
  if (!state.activeInvoice) return []
  return (state.activeInvoice.expenses || []).map((e, idx) => ({
    idx, label: e.label, amount: e.amount, amountF: fmt(e.amount),
    onLabel: ev => updateActiveOrder('label', ev.target.value, 'expenses', idx),
    onAmount: ev => updateActiveOrder('amount', ev.target.value, 'expenses', idx),
    onRemove: () => { state.activeInvoice.expenses.splice(idx, 1) }
  }))
})

const addExpense = () => {
  if (!state.activeInvoice.expenses) state.activeInvoice.expenses = []
  state.activeInvoice.expenses.push({ label: '', amount: '' })
}

const detailTerms = computed(() => {
  if (!state.activeInvoice) return []
  const o = state.activeInvoice; const c = calc(o);
  return (o.terms || []).map((tm, idx) => ({
    idx, label: tm.label, percent: tm.percent, due: tm.due, dueF: tm.due ? fmtDate(tm.due) : '—',
    amountF: fmt(c.total * (Number(tm.percent) || 0) / 100),
    onLabel: ev => updateActiveOrder('label', ev.target.value, 'terms', idx),
    onPercent: ev => updateActiveOrder('percent', ev.target.value, 'terms', idx),
    onDue: ev => updateActiveOrder('due', ev.target.value, 'terms', idx),
    onRemove: () => { state.activeInvoice.terms.splice(idx, 1) }
  }))
})

const addTerm = () => {
  if (!state.activeInvoice.terms) state.activeInvoice.terms = []
  const n = state.activeInvoice.terms.length + 1
  state.activeInvoice.terms.push({ label: 'Termin ' + n, percent: '', due: '' })
}

const termSummary = computed(() => {
  if (!state.activeInvoice) return {}
  const o = state.activeInvoice; const c = calc(o);
  const tPct = (o.terms || []).reduce((a, tm) => a + (Number(tm.percent) || 0), 0)
  return { totalPctF: tPct + '%', totalAmtF: fmt(c.total * tPct / 100), ok: tPct === 100, balanced: tPct === 100, remPctF: (100 - tPct) + '%', hasTerms: (o.terms || []).length > 0 }
})


// --- Reports ---
const repRevenue = computed(() => calcs.value.reduce((a, c) => a + c.total, 0))
const repCost = computed(() => calcs.value.reduce((a, c) => a + c.totalCost, 0))
const repAfterDisc = computed(() => calcs.value.reduce((a, c) => a + (c.subtotal - c.discount), 0))
const repProfit = computed(() => calcs.value.reduce((a, c) => a + c.profit, 0))
const repMargin = computed(() => repAfterDisc.value ? Math.round(repProfit.value / repAfterDisc.value * 100) : 0)

const maxP = computed(() => Math.max(1, ...calcs.value.map(c => c.profit)))
const repOrders = computed(() => {
  return state.orders.map((o, i) => {
    const c = calcs.value[i]; const m = statusMeta(o.status);
    return {
      group: o.group, no: o.no, dest: o.dest, revenueF: fmt(c.total), costF: fmt(c.totalCost),
      profitF: fmt(c.profit), marginF: Math.round(c.marginPct) + '%', status: o.status, statusBg: m.bg, statusColor: m.color,
      width: Math.round(Math.max(0, c.profit) / maxP.value * 100) + '%', onDetail: () => openDetail(o)
    }
  })
})

const catBreakdown = computed(() => {
  const catMap = {};
  state.orders.forEach((o, i) => calcs.value[i].items.forEach(it => { catMap[it.cat] = (catMap[it.cat] || 0) + it.line; }));
  const catTotal = Object.values(catMap).reduce((a, b) => a + b, 0) || 1;
  const catColors = ['#15294f', '#c39a4d', '#1f7a5c', '#c2603a', '#5b6b8c', '#9a7320', '#7c89a3', '#a8a08c'];
  return Object.entries(catMap).sort((a, b) => b[1] - a[1]).map(([cat, amt], i) => ({
    cat, amountF: fmt(amt), pct: Math.round(amt / catTotal * 100) + '%', width: Math.round(amt / catTotal * 100) + '%',
    color: catColors[i % catColors.length]
  }))
})


// --- Settings ---
const tabWebBg = computed(() => state.settingsTab === 'website' ? '#15294f' : 'transparent')
const tabWebColor = computed(() => state.settingsTab === 'website' ? '#fff' : '#5d6a82')
const tabCatBg = computed(() => state.settingsTab === 'catalog' ? '#15294f' : 'transparent')
const tabCatColor = computed(() => state.settingsTab === 'catalog' ? '#fff' : '#5d6a82')

const statEdit = computed(() => state.site.stats.map((st, i) => ({
  idx: i, n: st.n, l: st.l,
  onN: e => state.site.stats[i].n = e.target.value,
  onL: e => state.site.stats[i].l = e.target.value
})))

const clientsEdit = computed(() => state.site.clients.map((c, i) => ({
  idx: i, name: c.name, img: c.img, hasImg: !!c.img, notImg: !c.img,
  onName: e => state.site.clients[i].name = e.target.value,
  onLogo: e => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const r = new FileReader();
      r.onload = () => state.site.clients[i].img = r.result;
      r.readAsDataURL(file);
    }
  },
  onRemove: () => state.site.clients.splice(i, 1)
})))

const addClient = () => { state.site.clients.push({ name: 'Klien Baru', img: null }) }

const catalogEdit = computed(() => state.catalog.map((c, ci) => ({
  idx: ci, cat: c.cat,
  onName: e => state.catalog[ci].cat = e.target.value,
  onRemove: () => state.catalog.splice(ci, 1),
  onAddVendor: () => state.catalog[ci].items.push(''),
  vendors: c.items.map((v, vi) => ({
    vidx: vi, val: v,
    onVal: e => state.catalog[ci].items[vi] = e.target.value,
    onRemove: () => state.catalog[ci].items.splice(vi, 1)
  }))
})))
const addCat = () => { state.catalog.push({ cat: 'Kategori Baru', items: [] }) }


</script>

<template>
  <div style="display:flex;position:fixed;top:0;left:0;right:0;bottom:0;background:#f4f5f8;overflow:hidden;">
    <DashSidebar :nav-items="navItems" :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
    <div class="sidebar-backdrop" :class="{ open: isSidebarOpen }" @click="isSidebarOpen = false"></div>

    <main style="flex:1;min-width:0;display:flex;flex-direction:column;height:100%;">
      <DashTopbar 
        :page-title="pm[0]" 
        :page-sub="pm[1]" 
        :today-f="todayF" 
        :go-new="goNew" 
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      />

      <div ref="mainScroll" style="flex:1;overflow-y:auto;position:relative;">

        <ViewOverview v-if="state.dashView === 'overview'" 
          :s-orders="sOrders"
          :s-pax="sPax"
          :s-revenue="sRevenue"
          :s-active="sActive"
          :recent-orders="recentOrders"
          :status-bars="statusBars"
          :go-list="goList"
          :go-new="goNew"
        />

        <ViewNewOrder v-if="state.dashView === 'new'" 
          :f="state.form"
          :t="tCalc"
          :item-rows="itemRows"
          :cat-options="catOptions"
          :next-inv-no="nextInvNo"
          :add-item="addItem"
          :reset-form="resetForm"
          :save-order="saveOrder"
        />

        <ViewOrderList v-if="state.dashView === 'list'" 
          :s-orders="sOrders"
          :all-orders="allOrders"
          :go-new="goNew"
        />

        <ViewInvoice v-if="state.dashView === 'invoice' && invData"
          :inv="invData"
          :inv-items="invItemsData"
          :inv-terms="invData.invTerms"
          :has-terms="invData.hasTerms"
          :site-address="state.site.address"
          :site-email="state.site.email"
          :wa-display="state.site.waNumber"
          :go-new="goNew"
          :back-from-invoice="() => setView('detail')"
          :do-print="() => window.print()"
        />

        <ViewOrderDetail v-if="state.dashView === 'detail' && detailData" 
          :detail="detailData"
          :detail-items="detailItems"
          :detail-expenses="detailExpenses"
          :detail-terms="detailTerms"
          :term-summary="termSummary"
          :go-list="goList"
          :go-invoice-from-detail="() => setView('invoice')"
          :add-expense="addExpense"
          :add-term="addTerm"
        />

        <ViewReport v-if="state.dashView === 'report'" 
          :rep-revenue-f="fmt(repRevenue)"
          :rep-cost-f="fmt(repCost)"
          :rep-profit-f="fmt(repProfit)"
          :rep-margin-f="repMargin + '%'"
          :rep-orders="repOrders"
          :cat-breakdown="catBreakdown"
        />

        <ViewSettings v-if="state.dashView === 'settings'" 
          :tab-website="() => state.settingsTab = 'website'"
          :tab-catalog="() => state.settingsTab = 'catalog'"
          :tab-web-bg="tabWebBg"
          :tab-web-color="tabWebColor"
          :tab-cat-bg="tabCatBg"
          :tab-cat-color="tabCatColor"
          :is-tab-website="state.settingsTab === 'website'"
          :is-tab-catalog="state.settingsTab === 'catalog'"
          :site="state.site"
          :stat-edit="statEdit"
          :clients-edit="clientsEdit"
          :add-client="addClient"
          :catalog-edit="catalogEdit"
          :add-cat="addCat"
        />

      </div>
    </main>
  </div>
</template>
