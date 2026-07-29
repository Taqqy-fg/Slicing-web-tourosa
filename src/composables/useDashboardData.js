import { reactive } from 'vue'

export function useDashboardData() {
  const blankForm = (tax = 11) => ({
    group: '', pic: '', contact: '', dest: '', depart: '', ret: '', pax: '',
    items: [
      { cat: 'Tiket Pesawat', vendor: '', desc: '', qty: '', cost: '', price: '' },
      { cat: 'Hotel', vendor: '', desc: '', qty: '', cost: '', price: '' },
    ],
    discount: '', taxPercent: tax, dpPercent: '50',
    notes: 'Pembayaran DP 50% saat konfirmasi booking. Pelunasan paling lambat H-14 sebelum keberangkatan.',
  })

  const state = reactive({
    orders: [
      { no:'INV/TRS/2026/0007', date:'2026-06-22', group:'PT Sinar Abadi — Annual Gathering', pic:'Bpk. Rendra (HRD)', contact:'0812-3344-5566', dest:'Bali (Denpasar)', depart:'2026-08-12', ret:'2026-08-15', pax:'45', status:'Lunas',
        items:[
          { cat:'Tiket Pesawat', desc:'PP Jakarta–Denpasar (Garuda Indonesia)', qty:45, cost:1980000, price:2150000 },
          { cat:'Hotel', desc:'The Anvaya Resort — 3 malam, twin share', qty:45, cost:1650000, price:1850000 },
          { cat:'Group Tour / Land Tour', desc:'Full day tour + tiket masuk objek wisata', qty:45, cost:520000, price:650000 },
          { cat:'Konsumsi', desc:'Gala dinner & makan harian (3 hari)', qty:45, cost:400000, price:480000 },
          { cat:'Transport', desc:'Bus pariwisata + BBM & driver (3 hari)', qty:3, cost:2900000, price:3500000 },
        ], expenses:[{ label:'Fee koordinator lapangan', amount:3500000 },{ label:'Dokumentasi & merchandise', amount:2750000 }], discount:2000000, taxPercent:'11', dpPercent:'100',
        notes:'Lunas. Terima kasih atas kepercayaan PT Sinar Abadi.' },
      { no:'INV/TRS/2026/0006', date:'2026-06-19', group:'Komunitas Pendaki Nusantara', pic:'Sdri. Maya Anggraini', contact:'0813-9988-7766', dest:'Lombok — Rinjani', depart:'2026-07-20', ret:'2026-07-24', pax:'28', status:'DP',
        items:[
          { cat:'Tiket Pesawat', desc:'PP Jakarta–Lombok (Lion Air)', qty:28, cost:1320000, price:1450000 },
          { cat:'Hotel', desc:'Homestay pre/post trekking — 2 malam', qty:28, cost:330000, price:420000 },
          { cat:'Tour Leader', desc:'Guide & porter paket Rinjani 3D2N', qty:28, cost:1600000, price:1850000 },
          { cat:'Konsumsi', desc:'Logistik makan selama trekking', qty:28, cost:460000, price:550000 },
          { cat:'Transport', desc:'Sewa elf bandara–basecamp PP', qty:3, cost:980000, price:1200000 },
        ], expenses:[{ label:'P3K & asuransi trekking', amount:1200000 }], terms:[{ label:'DP Booking', percent:50, due:'2026-07-06' },{ label:'Pelunasan', percent:50, due:'2026-07-15' }], discount:0, taxPercent:'11', dpPercent:'50',
        notes:'DP 50% diterima. Pelunasan H-14 sebelum keberangkatan.' },
      { no:'INV/TRS/2026/0005', date:'2026-06-15', group:'Reuni SMA Negeri 5 — Angkatan 2010', pic:'Bpk. Adi Nugroho', contact:'0817-2211-3344', dest:'Yogyakarta', depart:'2026-09-05', ret:'2026-09-07', pax:'60', status:'DP',
        items:[
          { cat:'Hotel', desc:'Hotel bintang 4 kawasan Malioboro — 2 malam', qty:60, cost:660000, price:780000 },
          { cat:'Group Tour / Land Tour', desc:'City tour + Borobudur & Prambanan', qty:60, cost:430000, price:540000 },
          { cat:'Konsumsi', desc:'Gala dinner reuni + makan harian', qty:60, cost:350000, price:420000 },
          { cat:'Transport', desc:'Bus pariwisata 2 unit (2 hari)', qty:4, cost:2350000, price:2800000 },
        ], expenses:[{ label:'Sewa sound system & panggung', amount:4500000 }], discount:1500000, taxPercent:'11', dpPercent:'40',
        notes:'DP 40% diterima. Pelunasan H-10 sebelum acara.' },
      { no:'INV/TRS/2026/0004', date:'2026-06-08', group:'Family Trip Keluarga Wijaya', pic:'Ibu Surya Wijaya', contact:'0811-5566-7788', dest:'Singapore', depart:'2026-07-02', ret:'2026-07-05', pax:'12', status:'Lunas',
        items:[
          { cat:'Tiket Pesawat', desc:'PP Jakarta–Singapore (Singapore Airlines)', qty:12, cost:3020000, price:3250000 },
          { cat:'Hotel', desc:'Hotel kawasan Orchard — 3 malam', qty:12, cost:1880000, price:2100000 },
          { cat:'Group Tour / Land Tour', desc:'Universal Studios + Gardens by the Bay', qty:12, cost:1180000, price:1450000 },
          { cat:'Dokumen / Visa', desc:'Pengurusan dokumen perjalanan', qty:12, cost:90000, price:150000 },
        ], expenses:[], discount:0, taxPercent:'11', dpPercent:'100',
        notes:'Lunas. Selamat menikmati perjalanan keluarga.' },
    ],
    seq: 8,
    activeInvoice: null,
    dashView: 'overview', // Default view when accessing dashboard
    form: blankForm(11),
    site: {
      waNumber: '6281200000000',
      email: 'halo@tourosa.id',
      address: 'Jakarta, Indonesia',
      tagline: 'Tiket pesawat, hotel, group tour, hingga gathering korporat — Tourosa mengurus semuanya, lengkap dengan penawaran transparan dan invoice resmi.',
      stats: [{ n: '12+', l: 'Tahun pengalaman' }, { n: '800+', l: 'Grup diberangkatkan' }, { n: '50+', l: 'Destinasi' }],
      clients: [
        { name: 'KAI', img: null }, { name: 'Pertamina', img: null }, { name: 'Bank Mandiri', img: null },
        { name: 'Telkom', img: null }, { name: 'BRI', img: null }, { name: 'Garuda Indonesia', img: null }
      ]
    },
    catalog: [
      { cat: 'Tiket Pesawat', items: ['Garuda Indonesia', 'Batik Air', 'Citilink', 'Lion Air', 'AirAsia', 'NAM Air', 'Super Air Jet'] },
      { cat: 'Hotel', items: ['The Anvaya Resort', 'Hotel Santika', 'Aston Hotel', 'Swiss-Belhotel', 'Grand Mercure', 'Harris Hotel'] },
      { cat: 'Group Tour / Land Tour', items: ['City Tour', 'Full Day Tour', 'Land Tour', 'Open Trip', 'Private Tour'] },
      { cat: 'Konsumsi', items: ['Catering Prasmanan', 'Gala Dinner', 'Nasi Box', 'Coffee Break'] },
      { cat: 'Transport', items: ['Bus Pariwisata', 'Elf / Hiace', 'Sewa Mobil', 'Big Bus'] },
      { cat: 'Tour Leader', items: ['Tour Leader', 'Local Guide', 'Porter'] },
      { cat: 'Dokumen / Visa', items: ['Visa', 'Paspor', 'Asuransi Perjalanan'] },
      { cat: 'Lainnya', items: [] },
    ],
    settingsTab: 'website'
  })

  // Formatters
  const fmt = (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
  const fmtNum = (n) => new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
  const fmtDate = (iso) => {
    if (!iso) return '-'
    const p = String(iso).split('-'); if (p.length < 3) return iso;
    const b = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    return Number(p[2]) + ' ' + b[Number(p[1]) - 1] + ' ' + p[0]
  }
  const fmtShort = (iso) => {
    if (!iso) return '-'
    const p = String(iso).split('-'); if (p.length < 3) return iso;
    const b = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    return Number(p[2]) + ' ' + b[Number(p[1]) - 1]
  }

  // Calculator
  const calc = (o) => {
    const items = (o.items || []).map(it => {
      const qty = Number(it.qty) || 0, price = Number(it.price) || 0, cost = Number(it.cost) || 0;
      return { ...it, qty, price, cost, line: qty * price, lineCost: qty * cost, lineProfit: qty * (price - cost) };
    });
    const subtotal = items.reduce((s, it) => s + it.line, 0);
    const totalCost = items.reduce((s, it) => s + it.lineCost, 0);
    const totalExpenses = (o.expenses || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const discount = Number(o.discount) || 0;
    const afterDisc = Math.max(0, subtotal - discount);
    const taxPercent = Number(o.taxPercent) || 0;
    const tax = Math.round(afterDisc * taxPercent / 100);
    const total = afterDisc + tax;
    const pax = Number(o.pax) || 0;
    const perPax = pax ? total / pax : 0;
    const dpPercent = Number(o.dpPercent) || 0;
    const dp = Math.round(total * dpPercent / 100);
    const sisa = Math.max(0, total - dp);
    const profit = afterDisc - totalCost - totalExpenses;
    const marginPct = afterDisc ? (profit / afterDisc * 100) : 0;
    return { items, subtotal, totalCost, totalExpenses, discount, taxPercent, tax, total, pax, perPax, dpPercent, dp, sisa, profit, marginPct };
  }

  const statusMeta = (st) => {
    if (st === 'Lunas') return { bg: '#e6f4ec', color: '#1f7a5c' };
    if (st === 'DP') return { bg: '#fbf1dc', color: '#9a7320' };
    return { bg: '#eef0f3', color: '#5f6b80' };
  }

  return {
    state,
    blankForm,
    fmt,
    fmtNum,
    fmtDate,
    fmtShort,
    calc,
    statusMeta
  }
}
