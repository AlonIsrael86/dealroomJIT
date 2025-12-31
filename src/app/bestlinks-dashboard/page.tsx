'use client';

import { useState } from 'react';

export default function BestLinksDashboardPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['ipc']));
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const scrollToClient = (clientId: string) => {
    const element = document.getElementById(`client-${clientId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClientSelect = (clientId: string | null) => {
    setSelectedClient(clientId);
    if (clientId) {
      scrollToClient(clientId);
      setOpenSections(new Set([clientId]));
    } else {
      setOpenSections(new Set(['ipc', 'techom', 'danesya', 'zoolu', 'mhaim']));
    }
  };

  // חישוב סטטיסטיקות מעודכנות
  const stats = {
    total: 12 + 42 + 15 + 10 + 4, // מחסן + זולו + דנסיה + טקהום + IPC
    published: 2 + 4 + 4 + 10 + 1, // לפי הנתונים המעודכנים
    scheduled: 4 + 5 + 3 + 0 + 3,
    budget: '105K₪'
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --secondary: #ec4899;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          --info: #3b82f6;
          --dark: #1e293b;
          --light: #f8fafc;
          --gray: #64748b;
        }
        
        .bestlinks-dashboard {
          font-family: 'Heebo', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          min-height: 100vh;
          color: #e2e8f0;
          overflow-x: hidden;
          position: relative;
        }
        
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        
        .bg-animation span {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background: rgba(99, 102, 241, 0.1);
          animation: float 25s infinite;
          border-radius: 50%;
        }
        
        .bg-animation span:nth-child(1) { left: 10%; width: 80px; height: 80px; animation-delay: 0s; }
        .bg-animation span:nth-child(2) { left: 20%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .bg-animation span:nth-child(3) { left: 25%; width: 60px; height: 60px; animation-delay: 4s; }
        .bg-animation span:nth-child(4) { left: 40%; width: 40px; height: 40px; animation-delay: 0s; animation-duration: 18s; }
        .bg-animation span:nth-child(5) { left: 70%; width: 50px; height: 50px; animation-delay: 0s; }
        .bg-animation span:nth-child(6) { left: 80%; width: 100px; height: 100px; animation-delay: 3s; }
        .bg-animation span:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .bg-animation span:nth-child(8) { left: 55%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .bg-animation span:nth-child(9) { left: 65%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .bg-animation span:nth-child(10) { left: 90%; width: 120px; height: 120px; animation-delay: 0s; animation-duration: 11s; }
        
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        .bestlinks-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          z-index: 1;
        }
        
        .bestlinks-header {
          text-align: center;
          padding: 40px 20px;
          animation: slideDown 0.8s ease-out;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bestlinks-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          text-shadow: 0 0 60px rgba(99, 102, 241, 0.5);
        }
        
        .bestlinks-header p {
          color: #94a3b8;
          font-size: 1.2rem;
        }
        
        .last-update {
          display: inline-block;
          background: rgba(99, 102, 241, 0.2);
          padding: 8px 20px;
          border-radius: 50px;
          margin-top: 15px;
          font-size: 0.9rem;
          border: 1px solid rgba(99, 102, 241, 0.3);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .summary-card {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
          transition: all 0.3s ease;
        }
        
        .summary-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(99, 102, 241, 0.5);
        }
        
        .summary-card:nth-child(1) { animation-delay: 0.1s; }
        .summary-card:nth-child(2) { animation-delay: 0.2s; }
        .summary-card:nth-child(3) { animation-delay: 0.3s; }
        .summary-card:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }
        
        .summary-card .icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 15px;
        }
        
        .summary-card .number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .summary-card .label {
          color: #94a3b8;
          font-size: 1rem;
        }
        
        .icon-total { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        .icon-published { background: linear-gradient(135deg, #10b981, #34d399); }
        .icon-scheduled { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
        .icon-budget { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        
        .client-section {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          margin-bottom: 30px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .client-header {
          padding: 25px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .client-header:hover {
          background: rgba(99, 102, 241, 0.1);
        }
        
        .client-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .client-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }
        
        .client-icon.ipc { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        .client-icon.techom { background: linear-gradient(135deg, #ef4444, #f87171); }
        .client-icon.danesya { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        .client-icon.zoolu { background: linear-gradient(135deg, #10b981, #34d399); }
        .client-icon.mhaim { background: linear-gradient(135deg, #ec4899, #f472b6); }
        
        .client-name h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .client-name p {
          color: #94a3b8;
          font-size: 0.9rem;
        }
        
        .client-stats {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #94a3b8;
        }
        
        .stat-value.published { color: #10b981; }
        .stat-value.scheduled { color: #3b82f6; }
        .stat-value.pending { color: #f59e0b; }
        
        .status-badge {
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .status-published {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .status-scheduled {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .status-pending {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        
        .status-waiting {
          background: rgba(148, 163, 184, 0.2);
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }
        
        .payment-status {
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .payment-paid {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }
        
        .payment-pending {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
        }
        
        .articles-container {
          padding: 0 30px 30px;
        }
        
        .articles-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }
        
        .articles-table th {
          text-align: right;
          padding: 15px;
          color: #94a3b8;
          font-weight: 500;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .articles-table td {
          padding: 18px 15px;
          background: rgba(15, 23, 42, 0.5);
          transition: all 0.3s ease;
        }
        
        .articles-table tr:hover td {
          background: rgba(99, 102, 241, 0.15);
        }
        
        .articles-table tr td:first-child {
          border-radius: 0 12px 12px 0;
        }
        
        .articles-table tr td:last-child {
          border-radius: 12px 0 0 12px;
        }
        
        .article-title {
          font-weight: 500;
          max-width: 300px;
        }
        
        .article-site {
          color: #60a5fa;
          font-size: 0.9rem;
        }
        
        .article-date {
          font-weight: 600;
          color: #fbbf24;
        }
        
        .article-price {
          font-weight: 600;
          color: #34d399;
        }
        
        .dr-badge {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .link-btn {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .link-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(59, 130, 246, 0.4);
        }
        
        .collapse-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }
        
        .collapse-content.active {
          max-height: 5000px;
        }
        
        .collapse-toggle {
          transition: transform 0.3s ease;
          font-size: 1.2rem;
        }
        
        .collapse-toggle.active {
          transform: rotate(180deg);
        }
        
        .progress-container {
          margin-top: 15px;
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-top: 8px;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 1s ease;
        }
        
        .bestlinks-footer {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .team-alert {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.2));
          border: 2px solid rgba(245, 158, 11, 0.5);
          border-radius: 16px;
          padding: 20px 30px;
          margin-bottom: 30px;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
        
        .team-alert h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fbbf24;
        }
        
        .team-alert p {
          color: #fde68a;
          line-height: 1.6;
          margin: 5px 0;
        }
        
        .client-selector {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 20px;
          margin: -20px -20px 30px -20px;
          border-bottom: 2px solid rgba(99, 102, 241, 0.3);
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .client-selector-btn {
          padding: 10px 20px;
          border-radius: 25px;
          border: 2px solid transparent;
          background: rgba(30, 41, 59, 0.8);
          color: #e2e8f0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .client-selector-btn:hover {
          transform: translateY(-2px);
        }
        
        .client-selector-btn.active {
          border-color: currentColor;
          box-shadow: 0 0 15px currentColor;
        }
        
        .client-selector-btn.ipc { color: #8b5cf6; }
        .client-selector-btn.techom { color: #f87171; }
        .client-selector-btn.danesya { color: #fbbf24; }
        .client-selector-btn.zoolu { color: #34d399; }
        .client-selector-btn.mhaim { color: #f472b6; }
        .client-selector-btn.all { color: #60a5fa; }
        
        .client-section.hidden {
          display: none;
        }
        
        .client-links-section {
          padding: 20px 30px;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 12px;
          margin: 0 30px 20px;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        
        .client-links-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        .client-links-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .doc-link-btn {
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .doc-link-btn.planning {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          color: white;
        }
        
        .doc-link-btn.seo {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
        }
        
        @media (max-width: 768px) {
          .bestlinks-header h1 { font-size: 2rem; }
          .client-header { flex-direction: column; gap: 20px; }
          .client-stats { width: 100%; justify-content: space-around; flex-wrap: wrap; }
          .articles-table { display: block; overflow-x: auto; }
        }
      `}</style>

      <div className="bestlinks-dashboard">
        <div className="bg-animation">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="bestlinks-container">
          {/* Header */}
          <header className="bestlinks-header">
            <h1>📊 דאשבורד מאמרי בסטלינקס</h1>
            <p>מעקב סטטוס פרסום מאמרים לאתרי מדיה</p>
            <div className="last-update">🕐 עדכון אחרון: 31 דצמבר 2025</div>
          </header>

          {/* Team Alert */}
          <div className="team-alert">
            <h3>⚠️ חשוב לצוות: עדכון מסמכי קידום</h3>
            <p><strong>לאחר כל פרסום מאמר בסטלינקס, יש לעדכן את מסמכי הקידום (Google Docs) עם הלינק החדש!</strong></p>
          </div>

          {/* Client Selector */}
          <div className="client-selector">
            <button 
              className={`client-selector-btn all ${selectedClient === null ? 'active' : ''}`}
              onClick={() => handleClientSelect(null)}
            >
              📋 הכל
            </button>
            <button 
              className={`client-selector-btn mhaim ${selectedClient === 'mhaim' ? 'active' : ''}`}
              onClick={() => handleClientSelect('mhaim')}
            >
              🐾 המחסן של חיים
            </button>
            <button 
              className={`client-selector-btn zoolu ${selectedClient === 'zoolu' ? 'active' : ''}`}
              onClick={() => handleClientSelect('zoolu')}
            >
              🦁 זולו
            </button>
            <button 
              className={`client-selector-btn danesya ${selectedClient === 'danesya' ? 'active' : ''}`}
              onClick={() => handleClientSelect('danesya')}
            >
              🏠 דנסיה
            </button>
            <button 
              className={`client-selector-btn techom ${selectedClient === 'techom' ? 'active' : ''}`}
              onClick={() => handleClientSelect('techom')}
            >
              🔐 טקהום
            </button>
            <button 
              className={`client-selector-btn ipc ${selectedClient === 'ipc' ? 'active' : ''}`}
              onClick={() => handleClientSelect('ipc')}
            >
              🎓 IPC
            </button>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="icon icon-total">📄</div>
              <div className="number">78</div>
              <div className="label">סה"כ מאמרים</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-published">✅</div>
              <div className="number">23</div>
              <div className="label">פורסמו</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-scheduled">📅</div>
              <div className="number">14</div>
              <div className="label">תוזמנו</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-budget">💰</div>
              <div className="number">105K₪</div>
              <div className="label">תקציב כולל</div>
            </div>
          </div>

          {/* המחסן של חיים Section */}
          <section id="client-mhaim" className={`client-section ${selectedClient && selectedClient !== 'mhaim' ? 'hidden' : ''}`}>
            <div className="client-header" onClick={() => toggleSection('mhaim')}>
              <div className="client-info">
                <div className="client-icon mhaim">🐾</div>
                <div className="client-name">
                  <h2>המחסן של חיים</h2>
                  <p>קבוצת מילאטין | חנות חיות</p>
                </div>
              </div>
              <div className="client-stats">
                <div className="stat">
                  <div className="stat-value published">3</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">3</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="stat-value pending">6</div>
                  <div className="stat-label">צריך לכתוב</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם ~35K₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('mhaim') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 3/12 מאמרים (25%)</small>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '25%', background: 'linear-gradient(90deg, #ec4899, #f472b6)' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('mhaim') ? 'active' : ''}`}>
              <div className="client-links-section">
                <div className="client-links-title">📎 קישורים מהירים - המחסן של חיים</div>
                <div className="client-links-buttons">
                  <a href="https://docs.google.com/spreadsheets/d/1SafY06BwYyUDXoJhARAp2ngGdSjJjra8/edit?gid=189942519#gid=189942519" target="_blank" rel="noopener noreferrer" className="doc-link-btn planning">📊 טבלת תכנון</a>
                  <a href="https://docs.google.com/document/d/1zygB3DF3NI6pUX2nqRWngUf-RpV3VGG_dL6jaNRN9js/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn seo">📄 מסמך לינקים</a>
                </div>
              </div>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>DR</th>
                      <th>מחיר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">המדריך המלא איך לבחור מזון לבעלי חיים</td>
                      <td className="article-site">food.walla.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><a href="https://food.walla.co.il/item/3802343?r=1" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">איך לבחור שימורים לכלבים שמתאימים לגיל ולצרכים</td>
                      <td className="article-site">hashulchan.co.il</td>
                      <td><span className="dr-badge">53</span></td>
                      <td className="article-price">1,440₪</td>
                      <td><a href="https://www.hashulchan.co.il/ppost/%d7%90%d7%99%d7%9a-%d7%9c%d7%91%d7%97%d7%95%d7%a8-%d7%a9%d7%99%d7%9e%d7%95%d7%a8%d7%99%d7%9d-%d7%9c%d7%9b%d7%9c%d7%91%d7%99%d7%9d-%d7%a9%d7%9e%d7%aa%d7%90%d7%99%d7%9e%d7%99%d7%9d-%d7%9c%d7%92%d7%99/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">חול לחתולים שגורם לבית להישאר נקי וריחני</td>
                      <td className="article-site">mako.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">7,200₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 1.1.26</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">אוכל לגורים המדריך המלא להאכלת גורי כלבים</td>
                      <td className="article-site">foodis.co.il</td>
                      <td><span className="dr-badge">47</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 8.1.26</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">מחנות חיות רגילה לאימפריה – הסיפור של המחסן של חיים</td>
                      <td className="article-site">globes.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">5,760₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 15.1.26</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">פתרונות חסכוניים להאכלת חתולי רחוב בזול</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td><span className="dr-badge">73</span></td>
                      <td className="article-price">864₪</td>
                      <td><a href="https://www.bizportal.co.il/bizpoint-sponsored/news/article/20025237" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>7</td>
                      <td className="article-title">אוכל לגורים הוא ההוצאה הקטנה שמונעת עלויות גדולות</td>
                      <td className="article-site">hon.co.il</td>
                      <td><span className="dr-badge">46</span></td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>8</td>
                      <td className="article-title">מדריך רכישה: חיתולים לכלבים</td>
                      <td className="article-site">magazine.yad2.co.il</td>
                      <td><span className="dr-badge">68</span></td>
                      <td className="article-price">807₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>9</td>
                      <td className="article-title">המחסן של חיים בראשון לציון</td>
                      <td className="article-site">13tv.co.il</td>
                      <td><span className="dr-badge">76</span></td>
                      <td className="article-price">1,536₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>10</td>
                      <td className="article-title">חנות חיות אונליין עם משלוחים מהירים</td>
                      <td className="article-site">il.pcmag.com</td>
                      <td><span className="dr-badge">91</span></td>
                      <td className="article-price">336₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>11</td>
                      <td className="article-title">איפה מוצאים מונג' במבצע</td>
                      <td className="article-site">finance.walla.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>12</td>
                      <td className="article-title">איזה אוכל לכלבים מומלץ</td>
                      <td className="article-site">foodsdictionary.co.il</td>
                      <td><span className="dr-badge">52</span></td>
                      <td className="article-price">1,344₪</td>
                      <td><span className="status-badge status-waiting">✏️ צריך לכתוב</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* זולו Section */}
          <section id="client-zoolu" className={`client-section ${selectedClient && selectedClient !== 'zoolu' ? 'hidden' : ''}`}>
            <div className="client-header" onClick={() => toggleSection('zoolu')}>
              <div className="client-info">
                <div className="client-icon zoolu">🦁</div>
                <div className="client-name">
                  <h2>זולו - חנות חיות</h2>
                  <p>קבוצת מילאטין | ציוד ומזון לבע"ח</p>
                </div>
              </div>
              <div className="client-stats">
                <div className="stat">
                  <div className="stat-value published">3</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">2</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="stat-value pending">32</div>
                  <div className="stat-label">מאושרים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם ~22K₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('zoolu') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 3/37 מאמרים (8%)</small>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '8%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('zoolu') ? 'active' : ''}`}>
              <div className="client-links-section">
                <div className="client-links-title">📎 קישורים מהירים - זולו</div>
                <div className="client-links-buttons">
                  <a href="https://docs.google.com/spreadsheets/d/1BaLmOtVOlMPiNLI4RZDbW9kcAAAsY9Hd/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn planning">📊 טבלת תכנון</a>
                  <a href="https://docs.google.com/document/d/1TWSjlklfsfVclOkZ3BlYSo2WJikb0-rGSRo8-Zu4J4s/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn seo">📄 מסמך לינקים</a>
                </div>
              </div>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>DR</th>
                      <th>מחיר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">זולו – חנות חיות שגדלה יחד עם קהילת בעלי החיים</td>
                      <td className="article-site">maariv.co.il</td>
                      <td><span className="dr-badge">79</span></td>
                      <td className="article-price">1,785₪</td>
                      <td><a href="https://www.maariv.co.il/economy/consumerism/article-1264769" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">אמפולות נגד פרעושים לחתולים – חלק ממערך הדברה חכם</td>
                      <td className="article-site">tudu.co.il</td>
                      <td><span className="dr-badge">20</span></td>
                      <td className="article-price">192₪</td>
                      <td><a href="https://tudu.co.il/%d7%90%d7%9e%d7%a4%d7%95%d7%9c%d7%95%d7%aa-%d7%a0%d7%92%d7%93-%d7%a4%d7%a8%d7%a2%d7%95%d7%a9%d7%99%d7%9d-%d7%9c%d7%97%d7%aa%d7%95%d7%9c%d7%99%d7%9d-%d7%97%d7%9c%d7%a7-%d7%9e%d7%9e%d7%a2/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">אוכל לחתולים במשלוח: מדריך בטוח לשליחויות</td>
                      <td className="article-site">dtdc.co.il</td>
                      <td><span className="dr-badge">41</span></td>
                      <td className="article-price">192₪</td>
                      <td><a href="https://dtdc.co.il/%d7%90%d7%95%d7%9b%d7%9c-%d7%9c%d7%97%d7%aa%d7%95%d7%9c%d7%99%d7%9d-%d7%91%d7%9e%d7%a9%d7%9c%d7%95%d7%97-%d7%9e%d7%93%d7%a8%d7%99%d7%9a-%d7%91%d7%98%d7%95%d7%97-%d7%9c%d7%a9%d7%9c%d7%99%d7%97%d7%95/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">אוכל רפואי לכלבים – מתי ולמה כדאי להשתמש</td>
                      <td className="article-site">kumba.co.il</td>
                      <td><span className="dr-badge">24</span></td>
                      <td className="article-price">240₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 30.12</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">איפה כדאי לקנות אוכל לחתולים זול אונליין או אופליין</td>
                      <td className="article-site">smartcapital.co.il</td>
                      <td><span className="dr-badge">16</span></td>
                      <td className="article-price">192₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 1.1</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">איך לחסוך בקניית אוכל זול לכלבים בלי לפגוע באיכות</td>
                      <td className="article-site">redesign.co.il</td>
                      <td><span className="dr-badge">32</span></td>
                      <td className="article-price">80₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="article-title">חנות חיות תל אביב – בריאות, צרכנות ואהבה לחיות</td>
                      <td className="article-site">tlife.co.il</td>
                      <td><span className="dr-badge">39</span></td>
                      <td className="article-price">172₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="article-title">חנות כלבים תל אביב – היכן למצוא את כל מה שכלב צריך</td>
                      <td className="article-site">telaviv-yafo.co.il</td>
                      <td><span className="dr-badge">34</span></td>
                      <td className="article-price">144₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="article-title">חנות חיות תל אביב משלוחים – נוחות עירונית</td>
                      <td className="article-site">tlvcity.co.il</td>
                      <td><span className="dr-badge">22</span></td>
                      <td className="article-price">172₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="article-title">חנות חיות בחולון – איפה קונים חכמה ואהבה לבעלי החיים</td>
                      <td className="article-site">holon.mynet.co.il</td>
                      <td><span className="dr-badge">75</span></td>
                      <td className="article-price">355₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="article-title">ציוד ומזון לחיות מחמד בזולו – נגישות, איכות וחדשנות</td>
                      <td className="article-site">13tv.co.il</td>
                      <td><span className="dr-badge">75</span></td>
                      <td className="article-price">1,536₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="article-title">מהצלחת שלנו לקערה שלהם – החשיבות שבבחירת אוכל לכלבים</td>
                      <td className="article-site">foodis.co.il</td>
                      <td><span className="dr-badge">47</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="article-title">חנות החיות זולו – סיפור צרכנות מקומית</td>
                      <td className="article-site">israelhayom.co.il</td>
                      <td><span className="dr-badge">-</span></td>
                      <td className="article-price">1,152₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="article-title">מיטה לכלב - איך לבחור מיטה נוחה ובריאה</td>
                      <td className="article-site">findog.co.il</td>
                      <td><span className="dr-badge">79</span></td>
                      <td className="article-price">576₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="article-title">אוכל לכלבים כשר לפסח - איך לבחור מזון מתאים</td>
                      <td className="article-site">bhol.co.il</td>
                      <td><span className="dr-badge">29</span></td>
                      <td className="article-price">384₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="article-title">מה לא לשכוח כשנוסעים עם חיית מחמד</td>
                      <td className="article-site">praguehotels.co.il</td>
                      <td><span className="dr-badge">48</span></td>
                      <td className="article-price">400₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="article-title">מלונות באירופה שמקבלים חיות מחמד</td>
                      <td className="article-site">athenshotels.co.il</td>
                      <td><span className="dr-badge">32</span></td>
                      <td className="article-price">400₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="article-title">אוכל לכלבים תל אביב - איך בוחרים נכון</td>
                      <td className="article-site">tlv.mcity.co.il</td>
                      <td><span className="dr-badge">31</span></td>
                      <td className="article-price">124₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="article-title">חנות חיות בדרום תל אביב</td>
                      <td className="article-site">tel-avivi.co.il</td>
                      <td><span className="dr-badge">42</span></td>
                      <td className="article-price">80₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="article-title">מזון רטוב לחתולים - טעמים, מרקמים ובריאות</td>
                      <td className="article-site">hashulchan.co.il</td>
                      <td><span className="dr-badge">31</span></td>
                      <td className="article-price">1,440₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="article-title">שימורים לחתולים - כל מה שצריך לדעת</td>
                      <td className="article-site">foodsdictionary.co.il</td>
                      <td><span className="dr-badge">45</span></td>
                      <td className="article-price">1,344₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="article-title">שלוקים לחתולים - הפינוק הבריא</td>
                      <td className="article-site">dafmatok.co.il</td>
                      <td><span className="dr-badge">62</span></td>
                      <td className="article-price">432₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="article-title">חנות חיות סוקולוב חולון</td>
                      <td className="article-site">hb.mcity.co.il</td>
                      <td><span className="dr-badge">51</span></td>
                      <td className="article-price">124₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="article-title">חנות חיות רמת גן</td>
                      <td className="article-site">rg.mcity.co.il</td>
                      <td><span className="dr-badge">42</span></td>
                      <td className="article-price">124₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="article-title">חנות חיות בגבעתיים - מזון, ציוד וטיפול מקצועי</td>
                      <td className="article-site">rgg-news.co.il</td>
                      <td><span className="dr-badge">42</span></td>
                      <td className="article-price">240₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="article-title">מזון רפואי לכלבים - איך לבחור תזונה מותאמת</td>
                      <td className="article-site">doctordolittle.co.il</td>
                      <td><span className="dr-badge">37</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="article-title">מתקן גירוד לגינה – פתרון מושלם לחתולים</td>
                      <td className="article-site">mygardener.co.il</td>
                      <td><span className="dr-badge">22</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td className="article-title">אוכל לדגי נוי – איך לבחור תזונה נכונה לאקווריום</td>
                      <td className="article-site">marinadivers.co.il</td>
                      <td><span className="dr-badge">19</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td className="article-title">קולר נגד פרעושים – איך לבחור הגנה יעילה</td>
                      <td className="article-site">petsi.co.il</td>
                      <td><span className="dr-badge">20</span></td>
                      <td className="article-price">550₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td className="article-title">זולו תל אביב - חנות חיות עם מזון וציוד</td>
                      <td className="article-site">telavivguide.net</td>
                      <td><span className="dr-badge">27</span></td>
                      <td className="article-price">432₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td className="article-title">אוכל לכלבים קטנים - איך לבחור תזונה נכונה</td>
                      <td className="article-site">wisedog.co.il</td>
                      <td><span className="dr-badge">30</span></td>
                      <td className="article-price">384₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>32</td>
                      <td className="article-title">חנות חיות ברמת גן – ציוד, מזון ושירות</td>
                      <td className="article-site">ramatgan4u</td>
                      <td><span className="dr-badge">28</span></td>
                      <td className="article-price">115₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td className="article-title">חנות חיות אונליין - מזון, ציוד ומשלוחים</td>
                      <td className="article-site">il.pcmag.com</td>
                      <td><span className="dr-badge">25</span></td>
                      <td className="article-price">336₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td className="article-title">השוואת מחירים אוכל לכלבים</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td><span className="dr-badge">91</span></td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>35</td>
                      <td className="article-title">חנות חיות - איך לבחור את המקום הנכון</td>
                      <td className="article-site">havafarm.co.il</td>
                      <td><span className="dr-badge">73</span></td>
                      <td className="article-price">192₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td className="article-title">כדור נגד פרעושים לכלבים - מדריך לבחירה</td>
                      <td className="article-site">palm-weevil.co.il</td>
                      <td><span className="dr-badge">14</span></td>
                      <td className="article-price">192₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td className="article-title">מזון טבעי לכלבים - איך לבחור תזונה איכותית</td>
                      <td className="article-site">lentrecote.co.il</td>
                      <td><span className="dr-badge">14</span></td>
                      <td className="article-price">192₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* דנסיה Section */}
          <section id="client-danesya" className={`client-section ${selectedClient && selectedClient !== 'danesya' ? 'hidden' : ''}`}>
            <div className="client-header" onClick={() => toggleSection('danesya')}>
              <div className="client-info">
                <div className="client-icon danesya">🏠</div>
                <div className="client-name">
                  <h2>דנסיה - נדל"ן דובאי</h2>
                  <p>איש קשר: גבי | השקעות נדל"ן</p>
                </div>
              </div>
              <div className="client-stats">
                <div className="stat">
                  <div className="stat-value published">6</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">6</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="stat-value pending">3</div>
                  <div className="stat-label">ממתינים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('danesya') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 6/15 מאמרים (40%)</small>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '40%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('danesya') ? 'active' : ''}`}>
              <div className="client-links-section">
                <div className="client-links-title">📎 קישורים מהירים - דנסיה</div>
                <div className="client-links-buttons">
                  <a href="https://docs.google.com/spreadsheets/d/1yS9ynLV86z3YKn8VijJkTk5H6gXeAtcazCQ7LHHc8s0/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="doc-link-btn planning">📊 טבלת תכנון</a>
                  <a href="https://docs.google.com/document/d/1qtGeX29OrCst246QHucOo7UPyms8JqTubIxfvSuweIo/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn seo">📄 מסמך לינקים</a>
                </div>
              </div>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>DR</th>
                      <th>מחיר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">למי מתאימות השקעות נדלן בדובאי</td>
                      <td className="article-site">ivalue.co.il</td>
                      <td><span className="dr-badge">80</span></td>
                      <td className="article-price">134₪</td>
                      <td><a href="https://www.ivalue.co.il/%d7%9c%d7%9e%d7%99-%d7%9e%d7%aa%d7%90%d7%99%d7%9e%d7%95%d7%aa-%d7%94%d7%a9%d7%a7%d7%a2%d7%95%d7%aa-%d7%a0%d7%93%d7%9c%d7%b4%d7%9f-%d7%91%d7%93%d7%95%d7%91%d7%90%d7%99/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">מחפשים נכס להשקעה מבחר דירות למכירה בדובאי</td>
                      <td className="article-site">househunt.co.il</td>
                      <td><span className="dr-badge">46</span></td>
                      <td className="article-price">144₪</td>
                      <td><a href="https://househunt.co.il/מחפשים-נכס-להשקעה-מבחר-דירות-למכירה-בד/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">למה השקעה בדובאי ולא במקומות אחרים</td>
                      <td className="article-site">israelcalcali.co.il</td>
                      <td><span className="dr-badge">36</span></td>
                      <td className="article-price">144₪</td>
                      <td><a href="https://www.israelcalcali.co.il/למה-השקעה-בדובאי-ולא-במקומות-אחרים-גלו/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">איך לבחור סוכנות של דירות להשקעה בדובאי</td>
                      <td className="article-site">epoch.org.il</td>
                      <td><span className="dr-badge">48</span></td>
                      <td className="article-price">134₪</td>
                      <td><a href="https://epoch.org.il/commercial/612575/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">מדריך ממוקד למשקיע דירות למכירה בדובאי</td>
                      <td className="article-site">clickinvest.co.il</td>
                      <td><span className="dr-badge">64</span></td>
                      <td className="article-price">1,152₪</td>
                      <td><a href="https://clickinvest.co.il/dubai-real-estate-investment/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">דירות בדובאי הסוד של המשקיעים מהדור החדש</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td><span className="dr-badge">73</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><a href="https://www.bizportal.co.il/bizpoint-sponsored/news/article/20025628" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="article-title">מתי הכי כדאי לקנות דירה בדובאי</td>
                      <td className="article-site">mimoona.co.il</td>
                      <td><span className="dr-badge">53</span></td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 1.1.26</span></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="article-title">8 טעויות שמשקיעים עושים ברכישת נדלן בדובאי</td>
                      <td className="article-site">househunt.co.il</td>
                      <td><span className="dr-badge">46</span></td>
                      <td className="article-price">154₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 4.1</span></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="article-title">6 טעויות שאתם עושים לגבי דירות להשקעה בדובאי</td>
                      <td className="article-site">finance.walla.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">5,760₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 6.1</span></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="article-title">כל מה שרציתם לדעת על השקעה בדובאי</td>
                      <td className="article-site">ymag.ynet.co.il</td>
                      <td><span className="dr-badge">86</span></td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 8.1</span></td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="article-title">למה 2026 היא השנה הנכונה לנדלן דובאי</td>
                      <td className="article-site">moneysite.co.il</td>
                      <td><span className="dr-badge">40</span></td>
                      <td className="article-price">1,400₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 13.1</span></td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="article-title">השקעות נדלן בדובאי איך מתחילים נכון</td>
                      <td className="article-site">babyfinance.co.il</td>
                      <td><span className="dr-badge">48</span></td>
                      <td className="article-price">288₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 20.1</span></td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="article-title">למה משקיעים מכוונים היום לדירות בדובאי</td>
                      <td className="article-site">mygoldi.co.il</td>
                      <td><span className="dr-badge">48</span></td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-pending">⏳ ממתין</span></td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="article-title">נדל"ן בדובאי: הטרנד שסוחף ישראלים</td>
                      <td className="article-site">globes.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">960₪</td>
                      <td><span className="status-badge status-pending">⏳ ממתין</span></td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="article-title">חולמים על דירה בדובאי כך תגשימו את החלום</td>
                      <td className="article-site">nadlan2.co.il</td>
                      <td><span className="dr-badge">68</span></td>
                      <td className="article-price">173₪</td>
                      <td><span className="status-badge status-pending">⏳ ממתין</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* טקהום Section */}
          <section id="client-techom" className={`client-section ${selectedClient && selectedClient !== 'techom' ? 'hidden' : ''}`}>
            <div className="client-header" onClick={() => toggleSection('techom')}>
              <div className="client-info">
                <div className="client-icon techom">🔐</div>
                <div className="client-name">
                  <h2>טקהום - מנעולים חכמים</h2>
                  <p>איש קשר: נתנאל | ✅ הושלם!</p>
                </div>
              </div>
              <div className="client-stats">
                <div className="stat">
                  <div className="stat-value published">10</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">0</div>
                  <div className="stat-label">ממתינים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם 11,287₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('techom') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 10/10 מאמרים (100%) 🎉</small>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('techom') ? 'active' : ''}`}>
              <div className="client-links-section">
                <div className="client-links-title">📎 קישורים מהירים - טקהום</div>
                <div className="client-links-buttons">
                  <a href="https://docs.google.com/spreadsheets/d/14JqLypt9kDdjzUUJAPXrvIVKzyVnM9I0/edit?gid=571005030#gid=571005030" target="_blank" rel="noopener noreferrer" className="doc-link-btn planning">📊 טבלת תכנון</a>
                  <a href="https://docs.google.com/document/d/1TWSjlklfsfVclOkZ3BlYSo2WJikb0-rGSRo8-Zu4J4s/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn seo">📄 מסמך לינקים</a>
                </div>
              </div>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>DR</th>
                      <th>מחיר</th>
                      <th>קישור</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">מנעול חכם לדלת רב בריח: סוגים ודרך התקנה</td>
                      <td className="article-site">tgspot.co.il</td>
                      <td><span className="dr-badge">51</span></td>
                      <td className="article-price">825₪</td>
                      <td><a href="https://www.tgspot.co.il/smart-door-lock-types-installation/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">מנעול חכם ופתרונות אלומיניום לבית חכם</td>
                      <td className="article-site">silvergate.co.il</td>
                      <td><span className="dr-badge">47</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://silvergate.co.il/aluminum-solutions-smart-home/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">איפה קונים מנעול חכם לדלת מומלץ</td>
                      <td className="article-site">horimnet.co.il</td>
                      <td><span className="dr-badge">20</span></td>
                      <td className="article-price">500₪</td>
                      <td><a href="https://horimnet.co.il/%d7%90%d7%99%d7%a4%d7%94-%d7%a7%d7%95%d7%a0%d7%99%d7%9d-%d7%9e%d7%a0%d7%a2%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">חמישה טיפים לרכישת מנעול חכם</td>
                      <td className="article-site">applications.co.il</td>
                      <td><span className="dr-badge">38</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.applications.co.il/%d7%97%d7%9e%d7%99%d7%a9%d7%94-%d7%98%d7%99%d7%a4%d7%99%d7%9d-%d7%9c%d7%a8%d7%9b%d7%99%d7%a9%d7%aa-%d7%9e%d7%a0%d7%a2%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">מתכוננים לחופשה - 4 דברים להכין מראש</td>
                      <td className="article-site">countries.co.il</td>
                      <td><span className="dr-badge">18</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.countries.co.il/%d7%9e%d7%aa%d7%9b%d7%95%d7%a0%d7%a0%d7%99%d7%9d-%d7%9c%d7%97%d7%95%d7%a4%d7%a9%d7%94-4-%d7%93%d7%91%d7%a8%d7%99%d7%9d-%d7%a9%d7%9b%d7%93%d7%90%d7%99-%d7%9e%d7%90%d7%95%d7%93-%d7%9c%d7%94%d7%9b%d7%99/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">האם מנעול חכם מתאים לציבור הדתי?</td>
                      <td className="article-site">kipa.co.il</td>
                      <td><span className="dr-badge">68</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.kipa.co.il/%D7%9B%D7%93%D7%90%D7%99-%D7%9C%D7%93%D7%A2%D7%AA/1216168-0/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="article-title">כמה באמת עולה מנעול חכם מומלץ</td>
                      <td className="article-site">hwzone.co.il</td>
                      <td><span className="dr-badge">47</span></td>
                      <td className="article-price">600₪</td>
                      <td><a href="https://hwzone.co.il/channel-ad/best-links/%d7%9b%d7%9e%d7%94-%d7%91%d7%90%d7%9e%d7%aa-%d7%a2%d7%95%d7%9c%d7%94-%d7%9e%d7%a0%d7%a2%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5-%d7%aa%d7%9e%d7%99%d7%93/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="article-title">מדוע מנעול חכם מומלץ לילדים וקשישים</td>
                      <td className="article-site">applications.co.il</td>
                      <td><span className="dr-badge">38</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.applications.co.il/%d7%9e%d7%93%d7%95%d7%a2-%d7%9e%d7%a0%d7%a2%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5-%d7%9c%d7%99%d7%9c%d7%93%d7%99%d7%9d-%d7%95%d7%a7%d7%a9%d7%99%d7%a9/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="article-title">היתרונות של התקנת מנעול חכם מקצועית</td>
                      <td className="article-site">g-rafa.co.il</td>
                      <td><span className="dr-badge">35</span></td>
                      <td className="article-price">872₪</td>
                      <td><a href="https://g-rafa.co.il/the-benefits-of-installing-a-smart-lock-professionally-rather-than-on-your-own/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="article-title">האם מנעול דיגיטלי מתאים לדלת שלכם</td>
                      <td className="article-site">tech.walla.co.il</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><a href="https://tech.walla.co.il/item/3799951" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* IPC Section */}
          <section id="client-ipc" className={`client-section ${selectedClient && selectedClient !== 'ipc' ? 'hidden' : ''}`}>
            <div className="client-header" onClick={() => toggleSection('ipc')}>
              <div className="client-info">
                <div className="client-icon ipc">🎓</div>
                <div className="client-name">
                  <h2>IPC - המכללה</h2>
                  <p>איש קשר: אוהד | קורסים מקצועיים</p>
                </div>
              </div>
              <div className="client-stats">
                <div className="stat">
                  <div className="stat-value published">1</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">3</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם 18,100₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('ipc') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 1/4 מאמרים (25%)</small>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '25%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('ipc') ? 'active' : ''}`}>
              <div className="client-links-section">
                <div className="client-links-title">📎 קישורים מהירים - IPC</div>
                <div className="client-links-buttons">
                  <a href="https://docs.google.com/spreadsheets/d/18OPxjYa3JEM4M198Mh7QPPVGbRT4EnFTbZbiFziFLaA/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="doc-link-btn planning">📊 טבלת תכנון</a>
                  <a href="https://docs.google.com/document/d/1FE66e0rgAdJTuAb70M1-YHZtcWhOmaFLe_Y9e6uyRrU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="doc-link-btn seo">📄 מסמך לינקים</a>
                </div>
              </div>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">מכללת IPC - תגובות שלא משאירות מקום לספק</td>
                      <td className="article-site">tgspot.co.il</td>
                      <td><a href="https://www.tgspot.co.il/ipc-college-comments-on-the-business-accounting-course/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 פורסם</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">חפשו IPC מכללה ביקורת - ביקורות מאוזנות</td>
                      <td className="article-site">thestudent.co.il</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 4.1</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">מכללת IPC חוות דעת שתזניק את הקריירה</td>
                      <td className="article-site">bhol.co.il</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 8.1</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">למה חשוב לקרוא ביקורות על IPC</td>
                      <td className="article-site">hon.co.il</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן 15.1</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <footer className="bestlinks-footer">
            <p>📊 דאשבורד מאמרי בסטלינקס | JustInTime.co.il</p>
            <p style={{ marginTop: '10px' }}>נבנה עם ❤️ עבור ניהול קמפיינים יעיל</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
