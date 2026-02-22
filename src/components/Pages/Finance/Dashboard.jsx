import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { invoices } from '../../../data/mockData';

const FinanceDashboard = () => {
  useEffect(() => {
    // Nettoyer les graphiques existants pour éviter l'erreur "Canvas already in use"
    const chartCanvas = document.getElementById('financeChart');
    if (chartCanvas) {
      const existingChart = Chart.getChart(chartCanvas);
      if (existingChart) existingChart.destroy();
    }
    const pieCanvas = document.getElementById('pieChart');
    if (pieCanvas) {
      const existingChart = Chart.getChart(pieCanvas);
      if (existingChart) existingChart.destroy();
    }

    // Créer les graphiques
    const ctxLine = document.getElementById('financeChart')?.getContext('2d');
    if (ctxLine) {
      new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
          datasets: [{
            label: 'Dépenses 2026 (k€)',
            data: [125, 148, 132, 158, 142, 165, 178, 182, 168, 155, 172, 185],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#0b1a33', titleColor: 'white', bodyColor: '#cbd5e1', borderColor: '#1e3a5f' }
          },
          scales: {
            y: { beginAtZero: true, grid: { color: '#1e3a5f' }, ticks: { callback: value => value + 'k€', color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    const ctxPie = document.getElementById('pieChart')?.getContext('2d');
    if (ctxPie) {
      new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: ['Fournitures', 'Services', 'Équipement', 'Déplacements'],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, color: '#e2e8f0' } }
          },
          cutout: '70%'
        }
      });
    }
  }, []);

  const pendingCount = invoices.filter(i => i.status === 'pending').length;

  return (
    <>
      <div className="date-range mb-4">
        <i className="bi bi-calendar-range" style={{ color: '#3b82f6' }}></i>
        <span className="fw-bold">Période :</span>
        <select id="monthStart">
          {['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map((m, i) => (
            <option key={i} value={i+1} selected={i === 11}>{m}</option>
          ))}
        </select>
        <span>à</span>
        <select id="monthEnd">
          {['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map((m, i) => (
            <option key={i} value={i+1} selected={i === 11}>{m}</option>
          ))}
        </select>
        <button onClick={() => alert('Période mise à jour (simulation)')}>
          <i className="bi bi-arrow-repeat me-2"></i>Actualiser
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon"><i className="bi bi-cash-stack"></i></div>
            <div className="stat-value" id="totalExpenses">148 560 €</div>
            <div className="stat-label">Dépenses totales</div>
            <div className="stat-trend trend-up"><i className="bi bi-arrow-up"></i>+12.5%</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon"><i className="bi bi-cpu"></i></div>
            <div className="stat-value">98.7%</div>
            <div className="stat-label">Précision IA</div>
            <div className="stat-trend trend-up"><i className="bi bi-arrow-up"></i>+2.3%</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon"><i className="bi bi-clock-history"></i></div>
            <div className="stat-value">2.4j</div>
            <div className="stat-label">Délai traitement</div>
            <div className="stat-trend trend-down"><i className="bi bi-arrow-down"></i>-0.8j</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon"><i className="bi bi-exclamation-triangle"></i></div>
            <div className="stat-value" id="pendingCount">{pendingCount}</div>
            <div className="stat-label">À valider</div>
            <div className="stat-trend trend-down"><i className="bi bi-arrow-down"></i>-3</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header"><i className="bi bi-graph-up"></i> Évolution des dépenses</div>
            <div className="card-body"><canvas id="financeChart" height="250"></canvas></div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header"><i className="bi bi-pie-chart"></i> Répartition</div>
            <div className="card-body"><canvas id="pieChart" height="200"></canvas></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceDashboard;