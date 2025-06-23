
function resetHasil() {
  const hasil = document.getElementById("result");
  if (hasil) {
    hasil.innerHTML = "";
  }
}

// File: main.js (Updated dengan fix keliling segitiga)
import { Persegi } from './modules/persegi.js';
import { Lingkaran } from './modules/lingkaran.js';
import { PersegiPanjang } from './modules/persegiPanjang.js';
import { Segitiga } from './modules/segitiga.js';
import { JajarGenjang } from './modules/jajarGenjang.js';
import { Kubus } from './modules/kubus.js';
import { Tabung } from './modules/tabung.js';
import { Balok } from './modules/balok.js';
import { Kerucut } from './modules/kerucut.js';
import { PrismaSegitiga } from './modules/prismaSegitiga.js';

window.currentType = '';
window.currentShape = '';
window.currentCalcType = '';

const shapeClasses = {
  persegi: Persegi,
  lingkaran: Lingkaran,
  persegi_panjang: PersegiPanjang,
  segitiga: Segitiga,
  jajar_genjang: JajarGenjang,
  kubus: Kubus,
  tabung: Tabung,
  balok: Balok,
  kerucut: Kerucut,
  prisma_segitiga: PrismaSegitiga,
};

// ✅ Revisi di sini: input berbeda tergantung jenis kalkulasi
const shapeInputs = {
  persegi: ['sisi'],
  lingkaran: ['jariJari'],
  persegi_panjang: ['panjang', 'lebar'],
  segitiga: {
    luas: ['alas', 'tinggi'],
    keliling: ['sisiA', 'sisiB', 'sisiC']
  },
  jajar_genjang: ['alas', 'tinggi'],
  kubus: ['sisi'],
  tabung: ['jariJari', 'tinggi'],
  balok: ['panjang', 'lebar', 'tinggi'],
  kerucut: ['jariJari', 'tinggi'],
  prisma_segitiga: ['alasSegitiga', 'tinggiSegitiga', 'tinggiPrisma'],
};

const shapeNames = {
  persegi: 'Persegi',
  lingkaran: 'Lingkaran',
  persegi_panjang: 'Persegi Panjang',
  segitiga: 'Segitiga',
  jajar_genjang: 'Jajar Genjang',
  kubus: 'Kubus',
  tabung: 'Tabung',
  balok: 'Balok',
  kerucut: 'Kerucut',
  prisma_segitiga: 'Prisma Segitiga',
};

// ✅ Tambahkan label baru untuk sisi segitiga
const inputLabels = {
  sisi: 'Sisi',
  jariJari: 'Jari-jari',
  panjang: 'Panjang',
  lebar: 'Lebar',
  alas: 'Alas',
  tinggi: 'Tinggi',
  alasSegitiga: 'Alas Segitiga',
  tinggiSegitiga: 'Tinggi Segitiga',
  tinggiPrisma: 'Tinggi Prisma',
  sisiA: 'Sisi A',
  sisiB: 'Sisi B',
  sisiC: 'Sisi C'
};

window.showMainMenu = function () {
  resetHasil();
  document.getElementById('mainMenu').classList.remove('hidden');
  document.getElementById('shapeSelection').classList.add('hidden');
  document.getElementById('calculationSection').classList.add('hidden');
};

window.showShapes = function (type) {
  resetHasil();
  window.currentType = type;
  document.getElementById('mainMenu').classList.add('hidden');
  document.getElementById('shapeSelection').classList.remove('hidden');
  document.getElementById('calculationSection').classList.add('hidden');

  const shapeTitle = document.getElementById('shapeTitle');
  const shapeGrid = document.getElementById('shapeGrid');
  shapeGrid.innerHTML = '';

  const shapeMap = {
    datar: [
      { id: 'persegi', name: 'Persegi', icon: '⬜' },
      { id: 'lingkaran', name: 'Lingkaran', icon: '⭕' },
      { id: 'persegi_panjang', name: 'Persegi Panjang', icon: '▬' },
      { id: 'segitiga', name: 'Segitiga', icon: '🔺' },
      { id: 'jajar_genjang', name: 'Jajar Genjang', icon: '▱' },
    ],
    ruang: [
      { id: 'kubus', name: 'Kubus', icon: '🎲' },
      { id: 'tabung', name: 'Tabung', icon: '🥫' },
      { id: 'balok', name: 'Balok', icon: '📦' },
      { id: 'kerucut', name: 'Kerucut', icon: '🍦' },
      { id: 'prisma_segitiga', name: 'Prisma Segitiga', icon: '🍙' },
    ],
  };

  shapeTitle.textContent = type === 'datar' ? 'Bangun Datar' : 'Bangun Ruang';
  shapeMap[type].forEach((shape) => {
    const el = document.createElement('div');
    el.className = 'shape-card';
    el.innerHTML = `<span class="shape-icon">${shape.icon}</span><h4>${shape.name}</h4>`;
    el.onclick = () => selectShape(shape.id);
    shapeGrid.appendChild(el);
  });
};

window.selectShape = function (shapeId) {
  resetHasil();
  window.currentShape = shapeId;
  document.getElementById('shapeSelection').classList.add('hidden');
  document.getElementById('calculationSection').classList.remove('hidden');

  document.getElementById('calcTitle').textContent = `Kalkulator ${shapeNames[shapeId]}`;
  setupCalculationOptions();
};

function setupCalculationOptions() {
  const calcOptions = document.getElementById('calcOptions');
  calcOptions.innerHTML = '';

  const ops = window.currentType === 'datar'
    ? [{ key: 'luas', label: 'Luas' }, { key: 'keliling', label: 'Keliling' }]
    : [{ key: 'volume', label: 'Volume' }, { key: 'luas', label: 'Luas Permukaan' }];

  ops.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'calc-option';
    btn.textContent = op.label;
    btn.onclick = () => {
      resetHasil();
      document.getElementById('inputFields').innerHTML = '';
      document.getElementById('formulaDisplay').style.display = 'none';
      document.querySelectorAll('.calc-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      window.currentCalcType = op.key;
      setupInputFields();
      showFormula();
    };
    calcOptions.appendChild(btn);
  });
}

function setupInputFields() {
  const container = document.getElementById('inputFields');
  container.innerHTML = '';

  const inputsByShape = shapeInputs[window.currentShape];
  const fields = Array.isArray(inputsByShape)
    ? inputsByShape
    : (inputsByShape?.[window.currentCalcType] || []);

  fields.forEach(field => {
    const group = document.createElement('div');
    group.className = 'input-group';
    const label = document.createElement('label');
    label.textContent = inputLabels[field] || field;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.id = field;
    input.placeholder = `Masukkan ${inputLabels[field] || field}`;
    group.appendChild(label);
    group.appendChild(input);
    container.appendChild(group);
  });
}

function showFormula() {
  const formulaDisplay = document.getElementById('formulaDisplay');
  if (!formulaDisplay) return;

  const formulas = getFormulas();
  const key = `${window.currentShape}_${window.currentCalcType}`;

  if (formulas[key]) {
    formulaDisplay.innerHTML = `<div class="formula"><strong>Rumus:</strong> ${formulas[key]}</div>`;
    formulaDisplay.style.display = 'block';
  } else {
    formulaDisplay.style.display = 'none';
  }
}

function getFormulas() {
  return {
    // Bangun Datar
    'persegi_luas': 'L = s²',
    'persegi_keliling': 'K = 4s',
    'lingkaran_luas': 'L = πr²',
    'lingkaran_keliling': 'K = 2πr',
    'persegi_panjang_luas': 'L = p × l',
    'persegi_panjang_keliling': 'K = 2(p + l)',
    'segitiga_luas': 'L = ½ × a × t',
    'segitiga_keliling': 'K = a + b + c',
    'jajar_genjang_luas': 'L = a × t',
    'jajar_genjang_keliling': 'K = 2(a + s)',

    // Bangun Ruang
    'kubus_volume': 'V = s³',
    'kubus_luas': 'L = 6s²',
    'tabung_volume': 'V = πr²t',
    'tabung_luas': 'L = 2πr² + 2πrt',
    'balok_volume': 'V = p × l × t',
    'balok_luas': 'L = 2(pl + pt + lt)',
    'kerucut_volume': 'V = ⅓πr²t',
    'kerucut_luas': 'L = πr² + πrs',
    'prisma_segitiga_volume': 'V = (½ × a × t) × T',
    'prisma_segitiga_luas': 'L = 2 × L_alas + K_alas × T'
  };
}

window.calculate = function () {
  resetHasil();
  const inputsByShape = shapeInputs[window.currentShape];
  const inputs = Array.isArray(inputsByShape)
    ? inputsByShape
    : (inputsByShape?.[window.currentCalcType] || []);

  const values = [];

  for (let i = 0; i < inputs.length; i++) {
    const id = inputs[i];
    const element = document.getElementById(id);
    const value = parseFloat(element?.value || 0);

    if (isNaN(value) || value <= 0) {
      alert(`❌ Error: ${inputLabels[id] || id} harus diisi dengan angka yang lebih besar dari 0!`);
      element?.focus();
      return;
    }
    values.push(value);
  }

  try {
    const ShapeClass = shapeClasses[window.currentShape];
    const shape = new ShapeClass(...values);

    const methodMap = {
      'luas': 'hitungLuas',
      'keliling': 'hitungKeliling',
      'volume': 'hitungVolume'
    };

    const methodName = methodMap[window.currentCalcType];

    if (!shape[methodName]) {
      alert(`❌ Error: Metode ${methodName} tidak tersedia untuk ${shapeNames[window.currentShape]}`);
      return;
    }

    const result = shape[methodName]();

    if (result === undefined || isNaN(result)) {
      alert(`❌ Error: Gagal menghitung ${getCalcTypeLabel(window.currentCalcType)}`);
      return;
    }

    const unit = getUnit(window.currentCalcType);
    document.getElementById('result').innerHTML =
      `<div class='result'>✅ Hasil ${getCalcTypeLabel(window.currentCalcType)}: ${result.toFixed(2)} ${unit}</div>`;

  } catch (error) {
    alert(`❌ Error: ${error.message || 'Terjadi kesalahan dalam perhitungan'}`);
    console.error('Calculation error:', error);
  }
};

function getCalcTypeLabel(type) {
  const labels = {
    'luas': 'Luas',
    'keliling': 'Keliling',
    'volume': 'Volume'
  };
  return labels[type] || type;
}

function getUnit(type) {
  const units = {
    'luas': 'satuan²',
    'keliling': 'satuan',
    'volume': 'satuan³'
  };
  return units[type] || '';
}
