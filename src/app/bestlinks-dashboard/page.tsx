'use client';

import { useState } from 'react';

export default function BestLinksDashboardPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['ipc']));

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
        
        .client-section:nth-child(1) { animation-delay: 0.2s; }
        .client-section:nth-child(2) { animation-delay: 0.3s; }
        .client-section:nth-child(3) { animation-delay: 0.4s; }
        .client-section:nth-child(4) { animation-delay: 0.5s; }
        .client-section:nth-child(5) { animation-delay: 0.6s; }
        
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
        
        .timeline {
          padding: 30px;
        }
        
        .timeline-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }
        
        .timeline-item {
          background: rgba(15, 23, 42, 0.6);
          border-radius: 16px;
          padding: 20px;
          border-right: 4px solid;
          transition: all 0.3s ease;
        }
        
        .timeline-item:hover {
          transform: translateX(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .timeline-item.ipc { border-color: #6366f1; }
        .timeline-item.techom { border-color: #ef4444; }
        .timeline-item.danesya { border-color: #f59e0b; }
        .timeline-item.zoolu { border-color: #10b981; }
        .timeline-item.mhaim { border-color: #ec4899; }
        
        .timeline-date {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .timeline-client {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 5px;
        }
        
        .timeline-article {
          font-size: 0.95rem;
          line-height: 1.4;
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
          animation: progressAnimation 2s ease-out;
        }
        
        @keyframes progressAnimation {
          from { width: 0; }
        }
        
        .progress-fill.ipc { background: linear-gradient(90deg, #6366f1, #8b5cf6); width: 23%; }
        .progress-fill.techom { background: linear-gradient(90deg, #10b981, #34d399); width: 100%; }
        .progress-fill.danesya { background: linear-gradient(90deg, #f59e0b, #fbbf24); width: 93%; }
        .progress-fill.zoolu { background: linear-gradient(90deg, #3b82f6, #60a5fa); width: 12%; }
        .progress-fill.mhaim { background: linear-gradient(90deg, #ec4899, #f472b6); width: 50%; }
        
        .collapse-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }
        
        .collapse-content.active {
          max-height: 2000px;
        }
        
        .collapse-toggle {
          transition: transform 0.3s ease;
          font-size: 1.2rem;
        }
        
        .collapse-toggle.active {
          transform: rotate(180deg);
        }
        
        .bestlinks-footer {
          text-align: center;
          padding: 40px;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
          to { text-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(236, 72, 153, 0.6); }
        }
        
        @media (max-width: 768px) {
          .bestlinks-header h1 {
            font-size: 2rem;
          }
          
          .client-header {
            flex-direction: column;
            gap: 20px;
          }
          
          .client-stats {
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;
          }
          
          .articles-table {
            display: block;
            overflow-x: auto;
          }
          
          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="bestlinks-dashboard">
        {/* Animated Background */}
        <div className="bg-animation">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="bestlinks-container">
          {/* Header */}
          <header className="bestlinks-header">
            <h1 className="glow">📊 דאשבורד מאמרי בסטלינקס</h1>
            <p>מעקב סטטוס פרסום מאמרים לאתרי מדיה</p>
            <div className="last-update">🕐 עדכון אחרון: 29 דצמבר 2025</div>
          </header>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="icon icon-total">📄</div>
              <div className="number">92</div>
              <div className="label">סה"כ מאמרים</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-published">✅</div>
              <div className="number">14</div>
              <div className="label">פורסמו</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-scheduled">📅</div>
              <div className="number">37</div>
              <div className="label">תוזמנו</div>
            </div>
            <div className="summary-card">
              <div className="icon icon-budget">💰</div>
              <div className="number">105K₪</div>
              <div className="label">תקציב כולל</div>
            </div>
          </div>

          {/* IPC Section */}
          <section className="client-section">
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
                  <div className="stat-value published">3</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">11</div>
                  <div className="stat-label">ממתינים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם 18,100₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('ipc') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 3/14 מאמרים (21%)</small>
              <div className="progress-bar">
                <div className="progress-fill ipc"></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('ipc') ? 'active' : ''}`}>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>סטטוס</th>
                      <th>תאריך</th>
                      <th>אתר מפרסם</th>
                      <th>קישור</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td><span className="status-badge status-published">✅ פורסם</span></td>
                      <td className="article-date">29/12/2025</td>
                      <td className="article-site">tgspot.co.il</td>
                      <td><a href="https://www.tgspot.co.il/ipc-college-comments-on-the-business-accounting-course/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 צפייה</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td><span className="status-badge status-published">✅ פורסם</span></td>
                      <td className="article-date">28/12/2025</td>
                      <td className="article-site">israelhayom.co.il</td>
                      <td><a href="https://www.israelhayom.co.il/you-may-find-interesting/article/19553772" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 צפייה</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td><span className="status-badge status-published">✅ פורסם</span></td>
                      <td className="article-date">25/12/2025</td>
                      <td className="article-site">tech.walla.co.il</td>
                      <td><a href="https://tech.walla.co.il/item/3804030" target="_blank" rel="noopener noreferrer" className="link-btn">🔗 צפייה</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">thestudent.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td><span className="status-badge status-waiting">🔄 מחכה לתוכן</span></td>
                      <td>---</td>
                      <td className="article-site">limudim-index.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td><span className="status-badge status-waiting">🔄 מחכה לתוכן</span></td>
                      <td>---</td>
                      <td className="article-site">applications.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">hwzone.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">hon.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td><span className="status-badge status-waiting">🔄 מחכה לתוכן</span></td>
                      <td>---</td>
                      <td className="article-site">sponser.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">timeout.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">bhol.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td><span className="status-badge status-waiting">🔄 מחכה לתוכן</span></td>
                      <td>---</td>
                      <td className="article-site">news1.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לפרסום</span></td>
                      <td>---</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td>---</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td><span className="status-badge status-pending">⏳ ממתין לתוכן</span></td>
                      <td>---</td>
                      <td className="article-site">maariv.co.il</td>
                      <td>---</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Techom Section */}
          <section className="client-section">
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
                <div className="progress-fill techom"></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('techom') ? 'active' : ''}`}>
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
                      <td><a href="https://horimnet.co.il/%d7%90%d7%99%d7%a4%d7%94-%d7%a7%d7%95%d7%a0%d7%99%d7%9d-%d7%9e%d7%a0%d7%a0%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">חמישה טיפים לרכישת מנעול חכם</td>
                      <td className="article-site">applications.co.il</td>
                      <td><span className="dr-badge">38</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.applications.co.il/%d7%97%d7%9e%d7%99%d7%a9%d7%94-%d7%98%d7%99%d7%a4%d7%99%d7%9d-%d7%9c%d7%a8%d7%9b%d7%99%d7%a9%d7%aa-%d7%9e%d7%a0%d7%a0%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
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
                      <td><a href="https://hwzone.co.il/channel-ad/best-links/%d7%9b%d7%9e%d7%94-%d7%91%d7%90%d7%9e%d7%aa-%d7%a2%d7%95%d7%9c%d7%94-%d7%9e%d7%a0%d7%a0%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5-%d7%aa%d7%9e%d7%99%d7%93/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="article-title">מדוע מנעול חכם מומלץ לילדים וקשישים</td>
                      <td className="article-site">applications.co.il</td>
                      <td><span className="dr-badge">38</span></td>
                      <td className="article-price">624₪</td>
                      <td><a href="https://www.applications.co.il/%d7%9e%d7%93%d7%95%d7%a2-%d7%9e%d7%a0%d7%a0%d7%95%d7%9c-%d7%97%d7%9b%d7%9d-%d7%9c%d7%93%d7%9c%d7%aa-%d7%9e%d7%95%d7%9e%d7%9c%d7%a5-%d7%9c%d7%99%d7%9c%d7%93%d7%99%d7%9d-%d7%95%d7%a7%d7%a9%d7%99%d7%a9/" target="_blank" rel="noopener noreferrer" className="link-btn">🔗</a></td>
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

          {/* Danesya Section */}
          <section className="client-section">
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
                  <div className="stat-value published">1</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">14</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-pending">⏳ ממתין לתשלום</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('danesya') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 1/15 מאמרים (7%)</small>
              <div className="progress-bar">
                <div className="progress-fill danesya" style={{ width: '7%' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('danesya') ? 'active' : ''}`}>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>תאריך</th>
                      <th>מחיר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">למי מתאימות השקעות נדל"ן בדובאי?</td>
                      <td className="article-site">ivalue.co.il</td>
                      <td className="article-date">פורסם ✅</td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-published">✅ פורסם</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">מבחר דירות למכירה בדובאי</td>
                      <td className="article-site">househunt.co.il</td>
                      <td className="article-date">21.12.25</td>
                      <td className="article-price">144₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">למה השקעה בדובאי ולא במקומות אחרים</td>
                      <td className="article-site">israelcalcali.co.il</td>
                      <td className="article-date">23.12.25</td>
                      <td className="article-price">144₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">איך לבחור סוכנות דירות להשקעה בדובאי</td>
                      <td className="article-site">epoch.org.il</td>
                      <td className="article-date">25.12.25</td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">מדריך ממוקד למשקיע דירות בדובאי</td>
                      <td className="article-site">clickinvest.co.il</td>
                      <td className="article-date">28.12.25</td>
                      <td className="article-price">1,152₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">דירות בדובאי - הסוד של המשקיעים</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td className="article-date">30.12.25</td>
                      <td className="article-price">3,648₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="article-title">מתי הכי כדאי לקנות דירה בדובאי</td>
                      <td className="article-site">mimoona.co.il</td>
                      <td className="article-date">1.1.26</td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="article-title">טעויות שמשקיעים עושים ברכישת נדל"ן</td>
                      <td className="article-site">househunt.co.il</td>
                      <td className="article-date">4.1.26</td>
                      <td className="article-price">154₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="article-title">6 טעויות בדירות להשקעה בדובאי</td>
                      <td className="article-site">finance.walla.co.il</td>
                      <td className="article-date">6.1.26</td>
                      <td className="article-price">5,760₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="article-title">למה 2026 היא השנה הנכונה לנדל"ן דובאי</td>
                      <td className="article-site">moneysite.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">1,400₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="article-title">למה משקיעים מכוונים לדירות בדובאי</td>
                      <td className="article-site">mygoldi.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">134₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="article-title">השקעות נדל"ן בדובאי: איך מתחילים נכון</td>
                      <td className="article-site">babyfinance.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">288₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="article-title">כל מה שרציתם לדעת על השקעה בדובאי</td>
                      <td className="article-site">ymag.ynet.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="article-title">נדל"ן בדובאי: הטרנד שסוחף ישראלים</td>
                      <td className="article-site">globes.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">960₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="article-title">חולמים על דירה בדובאי</td>
                      <td className="article-site">nadlan2.co.il</td>
                      <td>מאושר</td>
                      <td className="article-price">173₪</td>
                      <td><span className="status-badge status-pending">⏳ מאושר</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Zoolu Section */}
          <section className="client-section">
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
                  <div className="stat-value published">0</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">5</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="stat-value pending">37</div>
                  <div className="stat-label">מאושרים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם ~22K₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('zoolu') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 0/42 מאמרים (0%)</small>
              <div className="progress-bar">
                <div className="progress-fill zoolu" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('zoolu') ? 'active' : ''}`}>
              <div className="timeline">
                <div className="timeline-title">📅 תזמונים קרובים</div>
                <div className="timeline-grid">
                  <div className="timeline-item zoolu">
                    <div className="timeline-date">23.12.25</div>
                    <div className="timeline-client">🦁 זולו</div>
                    <div className="timeline-article">זולו – חנות חיות שגדלה עם קהילת בעלי החיים</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>maariv.co.il | DR 79 | 1,785₪</div>
                  </div>
                  <div className="timeline-item zoolu">
                    <div className="timeline-date">25.12.25</div>
                    <div className="timeline-client">🦁 זולו</div>
                    <div className="timeline-article">אמפולות נגד פרעושים לחתולים</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>tudu.co.il | DR 20 | 192₪</div>
                  </div>
                  <div className="timeline-item zoolu">
                    <div className="timeline-date">28.12.25</div>
                    <div className="timeline-client">🦁 זולו</div>
                    <div className="timeline-article">אוכל לחתולים במשלוח</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>dtdc.co.il | DR 41 | 192₪</div>
                  </div>
                  <div className="timeline-item zoolu">
                    <div className="timeline-date">30.12.25</div>
                    <div className="timeline-client">🦁 זולו</div>
                    <div className="timeline-article">אוכל רפואי לכלבים</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>kumba.co.il | DR 24 | 240₪</div>
                  </div>
                  <div className="timeline-item zoolu">
                    <div className="timeline-date">1.1.26</div>
                    <div className="timeline-client">🦁 זולו</div>
                    <div className="timeline-article">איפה כדאי לקנות אוכל לחתולים זול</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>smartcapital.co.il | DR 16 | 192₪</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: '#94a3b8' }}>✅ <strong>37 מאמרים נוספים מאושרים</strong> - ממתינים לתזמון</p>
              </div>
            </div>
          </section>

          {/* Mhaim Section */}
          <section className="client-section">
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
                  <div className="stat-value published">0</div>
                  <div className="stat-label">פורסמו</div>
                </div>
                <div className="stat">
                  <div className="stat-value scheduled">6</div>
                  <div className="stat-label">תוזמנו</div>
                </div>
                <div className="stat">
                  <div className="stat-value pending">6</div>
                  <div className="stat-label">ממתינים</div>
                </div>
                <div className="stat">
                  <div className="payment-status payment-paid">✅ שולם ~35K₪</div>
                </div>
                <div className={`collapse-toggle ${openSections.has('mhaim') ? 'active' : ''}`}>▼</div>
              </div>
            </div>
            
            <div className="progress-container" style={{ padding: '0 30px' }}>
              <small>התקדמות: 0/12 מאמרים (0%)</small>
              <div className="progress-bar">
                <div className="progress-fill mhaim" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div className={`collapse-content ${openSections.has('mhaim') ? 'active' : ''}`}>
              <div className="articles-container">
                <table className="articles-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>כותרת</th>
                      <th>אתר</th>
                      <th>תאריך</th>
                      <th>DR</th>
                      <th>מחיר</th>
                      <th>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="article-title">המדריך המלא: איך לבחור מזון לבעלי חיים</td>
                      <td className="article-site">food.walla.co.il</td>
                      <td className="article-date">17.12.25</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="article-title">איך לבחור שימורים לכלבים</td>
                      <td className="article-site">hashulchan.co.il</td>
                      <td className="article-date">23.12.25</td>
                      <td><span className="dr-badge">53</span></td>
                      <td className="article-price">1,440₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="article-title">חול לחתולים שגורם לבית להישאר נקי</td>
                      <td className="article-site">mako.co.il</td>
                      <td className="article-date">1.1.26</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">7,200₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="article-title">אוכל לגורים: המדריך המלא</td>
                      <td className="article-site">foodis.co.il</td>
                      <td className="article-date">8.1.26</td>
                      <td><span className="dr-badge">47</span></td>
                      <td className="article-price">768₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="article-title">מחנות חיות לאימפריה - הסיפור של המחסן של חיים</td>
                      <td className="article-site">globes.co.il</td>
                      <td className="article-date">15.1.26</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">5,760₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="article-title">הפתרונות החסכוניים להאכלת חתולי רחוב</td>
                      <td className="article-site">bizportal.co.il</td>
                      <td className="article-date">22.1.26</td>
                      <td><span className="dr-badge">73</span></td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-scheduled">📅 תוזמן</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>7</td>
                      <td className="article-title">אוכל לגורים - ההוצאה הקטנה שמונעת עלויות</td>
                      <td className="article-site">hon.co.il</td>
                      <td>---</td>
                      <td><span className="dr-badge">46</span></td>
                      <td className="article-price">864₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>8</td>
                      <td className="article-title">מדריך רכישה: חיתולים לכלבים</td>
                      <td className="article-site">magazine.yad2.co.il</td>
                      <td>---</td>
                      <td><span className="dr-badge">68</span></td>
                      <td className="article-price">807₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>9</td>
                      <td className="article-title">המחסן של חיים בראשון לציון</td>
                      <td className="article-site">13tv.co.il</td>
                      <td>---</td>
                      <td><span className="dr-badge">76</span></td>
                      <td className="article-price">1,536₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>10</td>
                      <td className="article-title">חנות חיות אונליין עם משלוחים מהירים</td>
                      <td className="article-site">il.pcmag.com</td>
                      <td>---</td>
                      <td><span className="dr-badge">91</span></td>
                      <td className="article-price">336₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>11</td>
                      <td className="article-title">איפה מוצאים מונג' במבצע</td>
                      <td className="article-site">finance.walla.co.il</td>
                      <td>---</td>
                      <td><span className="dr-badge">83</span></td>
                      <td className="article-price">3,648₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                    <tr style={{ opacity: 0.6 }}>
                      <td>12</td>
                      <td className="article-title">איזה אוכל לכלבים מומלץ</td>
                      <td className="article-site">foodsdictionary.co.il</td>
                      <td>---</td>
                      <td><span className="dr-badge">52</span></td>
                      <td className="article-price">1,344₪</td>
                      <td><span className="status-badge status-waiting">⏳ ממתין</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Upcoming Timeline */}
          <section className="client-section">
            <div className="client-header">
              <div className="client-info">
                <div className="client-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>📅</div>
                <div className="client-name">
                  <h2>לוח זמנים - פרסומים קרובים</h2>
                  <p>דצמבר 2025 - ינואר 2026</p>
                </div>
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-grid">
                <div className="timeline-item mhaim">
                  <div className="timeline-date">17.12.25</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">המדריך המלא: מזון לבעלי חיים</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">21.12.25</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">דירות למכירה בדובאי</div>
                </div>
                <div className="timeline-item mhaim">
                  <div className="timeline-date">23.12.25</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">שימורים לכלבים</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">23.12.25</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">השקעה בדובאי</div>
                </div>
                <div className="timeline-item zoolu">
                  <div className="timeline-date">23.12.25</div>
                  <div className="timeline-client">🦁 זולו</div>
                  <div className="timeline-article">זולו - חנות חיות</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">25.12.25</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">דירות להשקעה בדובאי</div>
                </div>
                <div className="timeline-item zoolu">
                  <div className="timeline-date">25.12.25</div>
                  <div className="timeline-client">🦁 זולו</div>
                  <div className="timeline-article">אמפולות נגד פרעושים</div>
                </div>
                <div className="timeline-item zoolu">
                  <div className="timeline-date">28.12.25</div>
                  <div className="timeline-client">🦁 זולו</div>
                  <div className="timeline-article">אוכל לחתולים במשלוח</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">28.12.25</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">מדריך למשקיע</div>
                </div>
                <div className="timeline-item zoolu">
                  <div className="timeline-date">30.12.25</div>
                  <div className="timeline-client">🦁 זולו</div>
                  <div className="timeline-article">אוכל רפואי לכלבים</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">30.12.25</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">דירות בדובאי - הסוד של המשקיעים</div>
                </div>
                <div className="timeline-item mhaim">
                  <div className="timeline-date">1.1.26</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">חול לחתולים</div>
                </div>
                <div className="timeline-item zoolu">
                  <div className="timeline-date">1.1.26</div>
                  <div className="timeline-client">🦁 זולו</div>
                  <div className="timeline-article">אוכל לחתולים זול</div>
                </div>
                <div className="timeline-item danesya">
                  <div className="timeline-date">1.1.26</div>
                  <div className="timeline-client">🏠 דנסיה</div>
                  <div className="timeline-article">דירה בדובאי</div>
                </div>
                <div className="timeline-item mhaim">
                  <div className="timeline-date">8.1.26</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">אוכל לגורים</div>
                </div>
                <div className="timeline-item mhaim">
                  <div className="timeline-date">15.1.26</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">סיפור המחסן של חיים</div>
                </div>
                <div className="timeline-item mhaim">
                  <div className="timeline-date">22.1.26</div>
                  <div className="timeline-client">🐾 המחסן של חיים</div>
                  <div className="timeline-article">אוכל לחתולים זול</div>
                </div>
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

