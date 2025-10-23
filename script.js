document.addEventListener("DOMContentLoaded", function () {

  // ==================================================
  // 1. BAGAN PIRAMIDA PENDUDUK
  // ==================================================
  const labelsPiramida = [
    '0-4', '5-9', '10-14', '15-19', '20-24', '25-29',
    '30-34', '35-39', '40-44', '45-49', '50-54',
    '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'
  ];

  const dataLakiLaki = [-3, -18, -64, -77, -95, -97, -76, -69, -74, -91, -61, -64, -37, -38, -21, -19, -12, -14];
  const dataPerempuan = [64, 33, 52, 82, 101, 111, 75, 61, 69, 72, 61, 53, 30, 37, 23, 20, 8, 8];

  const ctxPiramida = document.getElementById('piramidaPendudukChart');
  if (ctxPiramida) {
    new Chart(ctxPiramida, {
      type: 'bar',
      data: {
        labels: labelsPiramida,
        datasets: [
          {
            label: 'Laki-Laki',
            data: dataLakiLaki,
            backgroundColor: '#549e91'
          },
          {
            label: 'Perempuan',
            data: dataPerempuan,
            backgroundColor: '#f09a8a'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                label += Math.abs(context.raw) + ' Jiwa';
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              callback: function (value) {
                return Math.abs(value);
              }
            },
            title: { display: true, text: 'Jumlah Penduduk' }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Kelompok Umur' }
          }
        }
      }
    });
  }

  // ==================================================
  // 2. PIE CHART BERDASARKAN DUSUN
  // ==================================================
  const ctxDusun = document.getElementById('dusunPieChart');
  if (ctxDusun) {
    const dusunLabels = ['LINGKUNGAN 1', 'LINGKUNGAN 2', 'LINGKUNGAN 3'];
    const dusunData = [30, 24, 33];
    const dusunColors = ['#4E6CEF', '#8BD17C', '#FFC857', '#F56C6C'];

    new Chart(ctxDusun, {
      type: 'pie',
      data: {
        labels: dusunLabels,
        datasets: [{
          data: dusunData,
          backgroundColor: dusunColors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((a, b) => a + b, 0);
                const value = context.raw;
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return `${context.label} : ${value} (${percentage})`;
              }
            }
          }
        }
      }
    });

    // Buat legenda manual di HTML
    const legendList = document.getElementById('dusun-legend-list');
    if (legendList) {
      dusunLabels.forEach((label, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="display:inline-block;width:15px;height:15px;background:${dusunColors[index]};margin-right:8px;border-radius:3px;"></span>${label} (${dusunData[index]} Jiwa)`;
        legendList.appendChild(li);
      });
    }
  }

  // ==================================================
  // 3. BAR CHART BERDASARKAN PENDIDIKAN
  // ==================================================
  const ctxPendidikan = document.getElementById("pendidikanChart");
  if (ctxPendidikan) {
    const labelsPendidikan = [
      "Tidak/Belum Sekolah",
      "Belum Tamat SD/Sederajat",
      "Tamat SD/Sederajat",
      "SLTP/Sederajat",
      "SLTA/Sederajat",
      "Diploma I/II",
      "Diploma III/Sarjana Muda",
      "Diploma IV/Strata I",
      "Strata II",
      "Strata III"
    ];

    const dataPendidikan = [393, 520, 752, 128, 84, 4, 1, 2, 2, 0];

    new Chart(ctxPendidikan, {
      type: "bar",
      data: {
        labels: labelsPendidikan,
        datasets: [{
          label: "Jumlah Penduduk",
          data: dataPendidikan,
          backgroundColor: "#b30000"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y} orang`
            }
          },
          datalabels: {
            color: '#000',
            anchor: 'end',
            align: 'top',
            font: { weight: 'bold' },
            formatter: Math.round
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 100 }
          },
          x: {
            ticks: { autoSkip: false }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

});
