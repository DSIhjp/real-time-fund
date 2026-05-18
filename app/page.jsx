'use client';

import { useEffect, useRef, useState, useMemo, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { createAvatar } from '@dicebear/core';
import { glass } from '@dicebear/collection';
import Announcement from "./components/Announcement";
import zhifubaoImg from "./assets/zhifubao.jpg";
import weixinImg from "./assets/weixin.jpg";
import githubImg from "./assets/github.svg";
import { supabase } from './lib/supabase';
import packageJson from '../package.json';

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UpdateIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6l1-2h6l1 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M19.4 15a7.97 7.97 0 0 0 .1-2l2-1.5-2-3.5-2.3.5a8.02 8.02 0 0 0-1.7-1l-.4-2.3h-4l-.4 2.3a8.02 8.02 0 0 0-1.7 1l-2.3-.5-2 3.5 2 1.5a7.97 7.97 0 0 0 .1 2l-2 1.5 2 3.5 2.3-.5a8.02 8.02 0 0 0 1.7 1l.4 2.3h4l.4-2.3a8.02 8.02 0 0 0 1.7-1l2.3.5 2-3.5-2-1.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M20 17.5a4.5 4.5 0 0 0-1.5-8.77A6 6 0 1 0 6 16.5H18a3.5 3.5 0 0 0 2-6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0 1 12.5-6.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 5h3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12a8 8 0 0 1-12.5 6.9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 19H5v-3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChevronIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SortIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M3 7h18M6 12h12M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoginIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="10 17 15 12 10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExitIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DragIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h16M4 12h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FolderPlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M9 13h6m-3-3v6m-9-4V5a2 2 0 0 1 2-2h4l2 3h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ filled, ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "var(--accent)" : "none"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => value ? new Date(value) : new Date());

  // 点击外部关闭
  useEffect(() => {
    const close = () => setIsOpen(false);
    if (isOpen) window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isOpen]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-11

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleSelect = (e, day) => {
    e.stopPropagation();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // 检查是否是未来日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateStr);

    if (selectedDate > today) return; // 禁止选择未来日期

    onChange(dateStr);
    setIsOpen(false);
  };

  // 生成日历数据
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0(Sun)-6(Sat)

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="date-picker" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <div
        className="input-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          height: '40px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          cursor: 'pointer',
          border: '1px solid transparent',
          transition: 'all 0.2s'
        }}
      >
        <span>{value || '选择日期'}</span>
        <CalendarIcon width="16" height="16" className="muted" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass card"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              marginTop: 8,
              padding: 12,
              zIndex: 10,
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <button onClick={handlePrevMonth} className="icon-button" style={{ width: 24, height: 24 }}>&lt;</button>
              <span style={{ fontWeight: 600 }}>{year}年 {month + 1}月</span>
              <button
                onClick={handleNextMonth}
                className="icon-button"
                style={{ width: 24, height: 24 }}
              // 如果下个月已经是未来，可以禁用（可选，这里简单起见不禁用翻页，只禁用日期点击）
              >
                &gt;
              </button>
            </div>

            <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
              {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                <div key={d} className="muted" style={{ fontSize: '12px', marginBottom: 4 }}>{d}</div>
              ))}
              {days.map((d, i) => {
                if (!d) return <div key={i} />;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const isSelected = value === dateStr;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const current = new Date(dateStr);
                const isToday = current.getTime() === today.getTime();
                const isFuture = current > today;

                return (
                  <div
                    key={i}
                    onClick={(e) => !isFuture && handleSelect(e, d)}
                    style={{
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      borderRadius: '6px',
                      cursor: isFuture ? 'not-allowed' : 'pointer',
                      background: isSelected ? 'var(--primary)' : isToday ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: isFuture ? 'var(--muted)' : isSelected ? '#000' : 'var(--text)',
                      fontWeight: isSelected || isToday ? 600 : 400,
                      opacity: isFuture ? 0.3 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !isFuture) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isFuture) e.currentTarget.style.background = isToday ? 'rgba(255,255,255,0.1)' : 'transparent';
                    }}
                  >
                    {d}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DonateTabs() {
  const [method, setMethod] = useState('wechat'); // alipay, wechat

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div className="tabs glass" style={{ padding: 4, borderRadius: 12, width: '100%', display: 'flex' }}>
        <button
          onClick={() => setMethod('alipay')}
          style={{
            flex: 1,
            padding: '8px 0',
            border: 'none',
            background: method === 'alipay' ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
            color: method === 'alipay' ? 'var(--primary)' : 'var(--muted)',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          支付宝
        </button>
        <button
          onClick={() => setMethod('wechat')}
          style={{
            flex: 1,
            padding: '8px 0',
            border: 'none',
            background: method === 'wechat' ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
            color: method === 'wechat' ? 'var(--primary)' : 'var(--muted)',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          微信支付
        </button>
      </div>

      <div
        style={{
          width: 200,
          height: 200,
          background: 'white',
          borderRadius: 12,
          padding: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {method === 'alipay' ? (
          <img
            src={zhifubaoImg.src}
            alt="支付宝收款码"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <img
            src={weixinImg.src}
            alt="微信收款码"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>
    </div>
  );
}

function MinusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NumericInput({ value, onChange, step = 1, min = 0, placeholder }) {
  const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
  const fmt = (n) => Number(n).toFixed(decimals);
  const inc = () => {
    const v = parseFloat(value);
    const base = isNaN(v) ? 0 : v;
    const next = base + step;
    onChange(fmt(next));
  };
  const dec = () => {
    const v = parseFloat(value);
    const base = isNaN(v) ? 0 : v;
    const next = Math.max(min, base - step);
    onChange(fmt(next));
  };
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="number"
        step="any"
        className="input no-zoom" // 增加 no-zoom 类
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', paddingRight: 56 }}
      />
      <div style={{ position: 'absolute', right: 6, top: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button className="icon-button" type="button" onClick={inc} style={{ width: 44, height: 16, padding: 0 }}>
          <PlusIcon width="14" height="14" />
        </button>
        <button className="icon-button" type="button" onClick={dec} style={{ width: 44, height: 16, padding: 0 }}>
          <MinusIcon width="14" height="14" />
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, delta }) {
  const dir = delta > 0 ? 'up' : delta < 0 ? 'down' : '';
  return (
    <div className="stat" style={{ flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span className="label" style={{ fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      <span className={`value ${dir}`} style={{ fontSize: '15px', lineHeight: 1.2, whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}

function FeedbackModal({ onClose, user }) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.target);
    const nickname = formData.get("nickname")?.trim();
    if (!nickname) {
      formData.set("nickname", "匿名");
    }

    // Web3Forms Access Key
    formData.append("access_key", "c390fbb1-77e0-4aab-a939-caa75edc7319");
    formData.append("subject", "基估宝 - 用户反馈");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSucceeded(true);
      } else {
        setError(data.message || "提交失败，请稍后再试");
      }
    } catch (err) {
      setError("网络错误，请检查您的连接");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="意见反馈"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal feedback-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon width="20" height="20" />
            <span>意见反馈</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        {succeeded ? (
          <div className="success-message" style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: 16 }}>🎉</div>
            <h3 style={{ marginBottom: 8 }}>感谢您的反馈！</h3>
            <p className="muted">我们已收到您的建议，会尽快查看。</p>
            <button className="button" onClick={onClose} style={{ marginTop: 24, width: '100%' }}>
              关闭
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="feedback-form">
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="nickname" className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                您的昵称（可选）
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                className="input"
                placeholder="匿名"
                style={{ width: '100%' }}
              />
            </div>
            <input type="hidden" name="email" value={user?.email || ''} />
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label htmlFor="message" className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                反馈内容
              </label>
              <textarea
                id="message"
                name="message"
                className="input"
                required
                placeholder="请描述您遇到的问题或建议..."
                style={{ width: '100%', minHeight: '120px', padding: '12px', resize: 'vertical' }}
              />
            </div>
            {error && (
              <div className="error-text" style={{ marginBottom: 16, textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button className="button" type="submit" disabled={submitting} style={{ width: '100%' }}>
              {submitting ? '发送中...' : '提交反馈'}
            </button>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p className="muted" style={{ fontSize: '12px', lineHeight: '1.6' }}>
                如果您有 Github 账号，也可以在本项目
                <a
                  href="https://github.com/hzm0321/real-time-fund/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ color: 'var(--primary)', textDecoration: 'underline', padding: '0 4px', fontWeight: 600 }}
                >
                  Issues
                </a>
                区留言互动
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function HoldingActionModal({ fund, onClose, onAction }) {
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="持仓操作"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '320px' }}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon width="20" height="20" />
            <span>持仓操作</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <div className="fund-name" style={{ fontWeight: 600, fontSize: '16px', marginBottom: 4 }}>{fund?.name}</div>
          <div className="muted" style={{ fontSize: '12px' }}>#{fund?.code}</div>
        </div>

        <div className="grid" style={{ gap: 12 }}>
          <button hidden className="button col-6" onClick={() => onAction('buy')} style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
            加仓
          </button>
          <button hidden className="button col-6" onClick={() => onAction('sell')} style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)' }}>
            减仓
          </button>
          <button className="button col-12" onClick={() => onAction('edit')} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>
            编辑持仓
          </button>
          <button
            className="button col-12"
            onClick={() => onAction('clear')}
            style={{
              marginTop: 8,
              background: 'linear-gradient(180deg, #ef4444, #f87171)',
              border: 'none',
              color: '#2b0b0b',
              fontWeight: 600
            }}
          >
            清空持仓
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TradeModal({ type, fund, onClose, onConfirm }) {
  const isBuy = type === 'buy';
  const [share, setShare] = useState('');
  const [amount, setAmount] = useState('');
  const [feeRate, setFeeRate] = useState('0');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isAfter3pm, setIsAfter3pm] = useState(new Date().getHours() >= 15);
  const [calcShare, setCalcShare] = useState(null);
  const price = fund?.estPricedCoverage > 0.05 ? fund?.estGsz : (typeof fund?.gsz === 'number' ? fund?.gsz : Number(fund?.dwjz));

  useEffect(() => {
    if (!isBuy) return;
    const a = parseFloat(amount);
    const f = parseFloat(feeRate);
    const p = parseFloat(price);
    if (a > 0 && p > 0 && !isNaN(f)) {
      const netAmount = a / (1 + f / 100);
      const s = netAmount / p;
      setCalcShare(s);
    } else {
      setCalcShare(null);
    }
  }, [isBuy, amount, feeRate, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBuy) {
      if (!amount || !feeRate || !date || calcShare === null || !price) return;
      onConfirm({ share: calcShare, price: Number(price), totalCost: Number(amount), date, isAfter3pm });
    } else {
      if (!share || !price) return;
      onConfirm({ share: Number(share), price: Number(price) });
    }
  };

  const isValid = isBuy
    ? (!!amount && !!feeRate && !!date && calcShare !== null)
    : (!!share && !!price);

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={isBuy ? "加仓" : "减仓"}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '420px' }}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '20px' }}>{isBuy ? '📥' : '📤'}</span>
            <span>{isBuy ? '加仓' : '减仓'}</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="fund-name" style={{ fontWeight: 600, fontSize: '16px', marginBottom: 4 }}>{fund?.name}</div>
          <div className="muted" style={{ fontSize: '12px' }}>#{fund?.code}</div>
        </div>

        <form onSubmit={handleSubmit}>
          {isBuy ? (
            <>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  加仓金额 (¥) <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <div style={{ border: !amount ? '1px solid var(--danger)' : '1px solid var(--border)', borderRadius: 12 }}>
                  <NumericInput
                    value={amount}
                    onChange={setAmount}
                    step={100}
                    min={0}
                    placeholder="请输入加仓金额"
                  />
                </div>
              </div>

              <div className="row" style={{ gap: 12, marginBottom: 16 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                    买入费率 (%) <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <div style={{ border: !feeRate ? '1px solid var(--danger)' : '1px solid var(--border)', borderRadius: 12 }}>
                    <NumericInput
                      value={feeRate}
                      onChange={setFeeRate}
                      step={0.01}
                      min={0}
                      placeholder="0.12"
                    />
                  </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                    加仓日期 <span style={{ color: 'var(--danger)' }}>*</span>
                  </label>
                  <DatePicker value={date} onChange={setDate} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 12 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  交易时段
                </label>
                <div className="row" style={{ gap: 8, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setIsAfter3pm(false)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: !isAfter3pm ? 'var(--primary)' : 'transparent',
                      color: !isAfter3pm ? '#05263b' : 'var(--muted)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      padding: '6px 8px'
                    }}
                  >
                    15:00前
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAfter3pm(true)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: isAfter3pm ? 'var(--primary)' : 'transparent',
                      color: isAfter3pm ? '#05263b' : 'var(--muted)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      padding: '6px 8px'
                    }}
                  >
                    15:00后
                  </button>
                </div>
                <div className="muted" style={{ fontSize: '12px', marginTop: 6 }}>
                  {isAfter3pm ? '将在下一个交易日确认份额' : '将在当日确认份额'}
                </div>
              </div>

              {price && calcShare !== null && (
                <div className="glass" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(34, 211, 238, 0.05)', border: '1px solid rgba(34, 211, 238, 0.2)', marginBottom: 8 }}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className="muted" style={{ fontSize: '12px' }}>预计确认份额</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{calcShare.toFixed(2)} 份</span>
                  </div>
                  <div className="muted" style={{ fontSize: '12px' }}>计算基于当前净值/估值：¥{Number(price).toFixed(4)}</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  卖出份额 <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <div style={{ border: !share ? '1px solid var(--danger)' : '1px solid var(--border)', borderRadius: 12 }}>
                  <NumericInput
                    value={share}
                    onChange={setShare}
                    step={1}
                    min={0}
                    placeholder="请输入卖出份额"
                  />
                </div>
              </div>
            </>
          )}

          <div className="row" style={{ gap: 12, marginTop: 12 }}>
            <button type="button" className="button secondary" onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>取消</button>
            <button
              type="submit"
              className="button"
              disabled={!isValid}
              style={{ flex: 1, opacity: isValid ? 1 : 0.6 }}
            >
              确定
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function HoldingEditModal({ fund, holding, onClose, onSave }) {
  const [mode, setMode] = useState('amount'); // 'amount' | 'share'

  // 基础数据
  const dwjz = fund?.dwjz || fund?.gsz || 0;

  // 表单状态
  const [share, setShare] = useState('');
  const [cost, setCost] = useState('');
  const [amount, setAmount] = useState('');
  const [profit, setProfit] = useState('');

  // 初始化数据
  useEffect(() => {
    if (holding) {
      const s = holding.share || 0;
      const c = holding.cost || 0;
      setShare(String(s));
      setCost(String(c));

      if (dwjz > 0) {
        const a = s * dwjz;
        const p = (dwjz - c) * s;
        setAmount(a.toFixed(2));
        setProfit(p.toFixed(2));
      }
    }
  }, [holding, fund]);

  // 切换模式时同步数据
  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);

    if (newMode === 'share') {
      // 从金额/收益 -> 份额/成本
      if (amount && dwjz > 0) {
        const a = parseFloat(amount);
        const p = parseFloat(profit || 0);
        const s = a / dwjz;
        const principal = a - p;
        const c = s > 0 ? principal / s : 0;

        setShare(s.toFixed(2)); // 保留2位小数，或者更多？基金份额通常2位
        setCost(c.toFixed(4));
      }
    } else {
      // 从份额/成本 -> 金额/收益
      if (share && dwjz > 0) {
        const s = parseFloat(share);
        const c = parseFloat(cost || 0);
        const a = s * dwjz;
        const p = (dwjz - c) * s;

        setAmount(a.toFixed(2));
        setProfit(p.toFixed(2));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalShare = 0;
    let finalCost = 0;

    if (mode === 'share') {
      if (!share || !cost) return;
      finalShare = Number(share);
      finalCost = Number(cost);
    } else {
      if (!amount || !dwjz) return;
      const a = Number(amount);
      const p = Number(profit || 0);
      finalShare = a / dwjz;
      const principal = a - p;
      finalCost = finalShare > 0 ? principal / finalShare : 0;
    }

    onSave({
      share: finalShare,
      cost: finalCost
    });
    onClose();
  };

  const isValid = mode === 'share'
    ? (share && cost && !isNaN(share) && !isNaN(cost))
    : (amount && !isNaN(amount) && (!profit || !isNaN(profit)) && dwjz > 0);

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="编辑持仓"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '400px' }}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon width="20" height="20" />
            <span>设置持仓</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="fund-name" style={{ fontWeight: 600, fontSize: '16px', marginBottom: 4 }}>{fund?.name}</div>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="muted" style={{ fontSize: '12px' }}>#{fund?.code}</div>
            <div className="badge" style={{ fontSize: '12px' }}>
              最新净值：<span style={{ fontWeight: 600, color: 'var(--primary)' }}>{dwjz}</span>
            </div>
          </div>
        </div>

        <div className="tabs-container" style={{ marginBottom: 20, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12 }}>
          <div className="row" style={{ gap: 0 }}>
            <button
              type="button"
              className={`tab ${mode === 'amount' ? 'active' : ''}`}
              onClick={() => handleModeChange('amount')}
              style={{ flex: 1, justifyContent: 'center', height: 32, borderRadius: 8 }}
            >
              按金额
            </button>
            <button
              type="button"
              className={`tab ${mode === 'share' ? 'active' : ''}`}
              onClick={() => handleModeChange('share')}
              style={{ flex: 1, justifyContent: 'center', height: 32, borderRadius: 8 }}
            >
              按份额
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'amount' ? (
            <>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  持有金额 <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input ${!amount ? 'error' : ''}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="请输入持有总金额"
                  style={{
                    width: '100%',
                    border: !amount ? '1px solid var(--danger)' : undefined
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  持有收益
                </label>
                <input
                  type="number"
                  step="any"
                  className="input"
                  value={profit}
                  onChange={(e) => setProfit(e.target.value)}
                  placeholder="请输入持有总收益 (可为负)"
                  style={{ width: '100%' }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  持有份额 <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input ${!share ? 'error' : ''}`}
                  value={share}
                  onChange={(e) => setShare(e.target.value)}
                  placeholder="请输入持有份额"
                  style={{
                    width: '100%',
                    border: !share ? '1px solid var(--danger)' : undefined
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>
                  持仓成本价 <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  className={`input ${!cost ? 'error' : ''}`}
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="请输入持仓成本价"
                  style={{
                    width: '100%',
                    border: !cost ? '1px solid var(--danger)' : undefined
                  }}
                />
              </div>
            </>
          )}

          <div className="row" style={{ gap: 12 }}>
            <button type="button" className="button secondary" onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>取消</button>
            <button
              type="submit"
              className="button"
              disabled={!isValid}
              style={{ flex: 1, opacity: isValid ? 1 : 0.6 }}
            >
              保存
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AddResultModal({ failures, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="添加结果"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon width="20" height="20" />
            <span>部分基金添加失败</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>
        <div className="muted" style={{ marginBottom: 12, fontSize: '14px' }}>
          未获取到估值数据的基金如下：
        </div>
        <div className="list">
          {failures.map((it, idx) => (
            <div className="item" key={idx}>
              <span className="name">{it.name || '未知名称'}</span>
              <div className="values">
                <span className="badge">#{it.code}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="button" onClick={onClose}>知道了</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SuccessModal({ message, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="成功提示"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-message" style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>🎉</div>
          <h3 style={{ marginBottom: 8 }}>{message}</h3>
          <p className="muted">操作已完成，您可以继续使用。</p>
          <button className="button" onClick={onClose} style={{ marginTop: 24, width: '100%' }}>
            关闭
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CloudConfigModal({ onConfirm, onCancel, type = 'empty' }) {
  const isConflict = type === 'conflict';
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={isConflict ? "配置冲突提示" : "云端同步提示"}
      onClick={isConflict ? undefined : onCancel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 12, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CloudIcon width="20" height="20" />
            <span>{isConflict ? '发现配置冲突' : '云端暂无配置'}</span>
          </div>
          {!isConflict && (
            <button className="icon-button" onClick={onCancel} style={{ border: 'none', background: 'transparent' }}>
              <CloseIcon width="20" height="20" />
            </button>
          )}
        </div>
        <p className="muted" style={{ marginBottom: 20, fontSize: '14px', lineHeight: '1.6' }}>
          {isConflict
            ? '检测到本地配置与云端不一致，请选择操作：'
            : '是否将本地配置同步到云端？'}
        </p>
        <div className="row" style={{ flexDirection: 'column', gap: 12 }}>
          <button className="button" onClick={onConfirm}>
            {isConflict ? '保留本地 (覆盖云端)' : '同步本地到云端'}
          </button>
          <button className="button secondary" onClick={onCancel}>
            {isConflict ? '使用云端 (覆盖本地)' : '暂不同步'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText = "确定删除" }) {
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 10002 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        style={{ maxWidth: '400px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 12 }}>
          <TrashIcon width="20" height="20" className="danger" />
          <span>{title}</span>
        </div>
        <p className="muted" style={{ marginBottom: 24, fontSize: '14px', lineHeight: '1.6' }}>
          {message}
        </p>
        <div className="row" style={{ gap: 12 }}>
          <button className="button secondary" onClick={onCancel} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>取消</button>
          <button className="button danger" onClick={onConfirm} style={{ flex: 1 }}>{confirmText}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GroupManageModal({ groups, onClose, onSave }) {
  const [items, setItems] = useState(groups);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, name }

  const handleReorder = (newOrder) => {
    setItems(newOrder);
  };

  const handleRename = (id, newName) => {
    const truncatedName = (newName || '').slice(0, 8);
    setItems(prev => prev.map(item => item.id === id ? { ...item, name: truncatedName } : item));
  };

  const handleDeleteClick = (id, name) => {
    const itemToDelete = items.find(it => it.id === id);
    const isNew = !groups.find(g => g.id === id);
    const isEmpty = itemToDelete && (!itemToDelete.codes || itemToDelete.codes.length === 0);

    if (isNew || isEmpty) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setDeleteConfirm({ id, name });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      setItems(prev => prev.filter(item => item.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleAddRow = () => {
    const newGroup = {
      id: `group_${Date.now()}`,
      name: '',
      codes: []
    };
    setItems(prev => [...prev, newGroup]);
  };

  const handleConfirm = () => {
    const hasEmpty = items.some(it => !it.name.trim());
    if (hasEmpty) return;
    onSave(items);
    onClose();
  };

  const isAllValid = items.every(it => it.name.trim() !== '');

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="管理分组"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        style={{ maxWidth: '500px', width: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SettingsIcon width="20" height="20" />
            <span>管理分组</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div className="group-manage-list-container" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
          {items.length === 0 ? (
            <div className="empty-state muted" style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: 12, opacity: 0.5 }}>📂</div>
              <p>暂无自定义分组</p>
            </div>
          ) : (
            <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="group-manage-list">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    className="group-manage-item glass"
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                      mass: 1,
                      layout: { duration: 0.2 }
                    }}
                  >
                    <div className="drag-handle" style={{ cursor: 'grab', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                      <DragIcon width="18" height="18" className="muted" />
                    </div>
                    <input
                      className={`input group-rename-input ${!item.name.trim() ? 'error' : ''}`}
                      value={item.name}
                      onChange={(e) => handleRename(item.id, e.target.value)}
                      placeholder="请输入分组名称..."
                      style={{
                        flex: 1,
                        height: '36px',
                        background: 'rgba(0,0,0,0.2)',
                        border: !item.name.trim() ? '1px solid var(--danger)' : 'none'
                      }}
                    />
                    <button
                      className="icon-button danger"
                      onClick={() => handleDeleteClick(item.id, item.name)}
                      title="删除分组"
                      style={{ width: '36px', height: '36px', flexShrink: 0 }}
                    >
                      <TrashIcon width="16" height="16" />
                    </button>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}
          <button
            className="add-group-row-btn"
            onClick={handleAddRow}
            style={{
              width: '100%',
              marginTop: 12,
              padding: '10px',
              borderRadius: '12px',
              border: '1px dashed var(--border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--muted)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <PlusIcon width="16" height="16" />
            <span>新增分组</span>
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          {!isAllValid && (
            <div className="error-text" style={{ marginBottom: 12, textAlign: 'center' }}>
              所有分组名称均不能为空
            </div>
          )}
          <button
            className="button"
            onClick={handleConfirm}
            disabled={!isAllValid}
            style={{ width: '100%', opacity: isAllValid ? 1 : 0.6 }}
          >
            完成
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {deleteConfirm && (
          <ConfirmModal
            title="删除确认"
            message={`确定要删除分组 "${deleteConfirm.name}" 吗？分组内的基金不会被删除。`}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AddFundToGroupModal({ allFunds, currentGroupCodes, onClose, onAdd }) {
  const [selected, setSelected] = useState(new Set());

  // 过滤出未在当前分组中的基金
  const availableFunds = (allFunds || []).filter(f => !(currentGroupCodes || []).includes(f.code));

  const toggleSelect = (code) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        style={{ maxWidth: '500px', width: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PlusIcon width="20" height="20" />
            <span>添加基金到分组</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>

        <div className="group-manage-list-container" style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '4px' }}>
          {availableFunds.length === 0 ? (
            <div className="empty-state muted" style={{ textAlign: 'center', padding: '40px 0' }}>
              <p>所有基金已在该分组中</p>
            </div>
          ) : (
            <div className="group-manage-list">
              {availableFunds.map((fund) => (
                <div
                  key={fund.code}
                  className={`group-manage-item glass ${selected.has(fund.code) ? 'selected' : ''}`}
                  onClick={() => toggleSelect(fund.code)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="checkbox" style={{ marginRight: 12 }}>
                    {selected.has(fund.code) && <div className="checked-mark" />}
                  </div>
                  <div className="fund-info" style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{fund.name}</div>
                    <div className="muted" style={{ fontSize: '12px' }}>#{fund.code}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="row" style={{ marginTop: 24, gap: 12 }}>
          <button className="button secondary" onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>取消</button>
          <button
            className="button"
            onClick={() => onAdd(Array.from(selected))}
            disabled={selected.size === 0}
            style={{ flex: 1 }}
          >
            确定 ({selected.size})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GroupModal({ onClose, onConfirm }) {
  const [name, setName] = useState('');
  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="新增分组"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass card modal"
        style={{ maxWidth: '400px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PlusIcon width="20" height="20" />
            <span>新增分组</span>
          </div>
          <button className="icon-button" onClick={onClose} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon width="20" height="20" />
          </button>
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="muted" style={{ display: 'block', marginBottom: 8, fontSize: '14px' }}>分组名称（最多 8 个字）</label>
          <input
            className="input"
            autoFocus
            placeholder="请输入分组名称..."
            value={name}
            onChange={(e) => {
              const v = e.target.value || '';
              // 限制最多 8 个字符（兼容中英文），超出部分自动截断
              setName(v.slice(0, 8));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && name.trim()) onConfirm(name.trim());
            }}
          />
        </div>
        <div className="row" style={{ gap: 12 }}>
          <button className="button secondary" onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}>取消</button>
          <button className="button" onClick={() => name.trim() && onConfirm(name.trim())} disabled={!name.trim()} style={{ flex: 1 }}>确定</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 数字滚动组件
function CountUp({ value, prefix = '', suffix = '', decimals = 2, className = '', style = {} }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;

    const start = previousValue.current;
    const end = value;
    const duration = 600; // 0.6秒动画
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);

      const current = start + (end - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousValue.current = value;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className={className} style={style}>
      {prefix}{Math.abs(displayValue).toFixed(decimals)}{suffix}
    </span>
  );
}

function GroupSummary({ funds, holdings, groupName, getProfit }) {
  const [showPercent, setShowPercent] = useState(true);
  const rowRef = useRef(null);
  const [assetSize, setAssetSize] = useState(24);
  const [metricSize, setMetricSize] = useState(18);
  const [winW, setWinW] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWinW(window.innerWidth);
      const onR = () => setWinW(window.innerWidth);
      window.addEventListener('resize', onR);
      return () => window.removeEventListener('resize', onR);
    }
  }, []);

  const summary = useMemo(() => {
    let totalAsset = 0;
    let totalProfitToday = 0;
    let totalHoldingReturn = 0;
    let totalCost = 0;
    let hasHolding = false;

    funds.forEach(fund => {
      const holding = holdings[fund.code];
      const profit = getProfit(fund, holding);

      if (profit) {
        hasHolding = true;
        totalAsset += profit.amount;
        totalProfitToday += profit.profitToday;
        if (profit.profitTotal !== null) {
          totalHoldingReturn += profit.profitTotal;
          if (holding && typeof holding.cost === 'number' && typeof holding.share === 'number') {
            totalCost += holding.cost * holding.share;
          }
        }
      }
    });

    const returnRate = totalCost > 0 ? (totalHoldingReturn / totalCost) * 100 : 0;

    return { totalAsset, totalProfitToday, totalHoldingReturn, hasHolding, returnRate };
  }, [funds, holdings, getProfit]);

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const height = el.clientHeight;
    // 使用 80px 作为更严格的阈值，因为 margin/padding 可能导致实际占用更高
    const tooTall = height > 80;
    if (tooTall) {
      setAssetSize(s => Math.max(16, s - 1));
      setMetricSize(s => Math.max(12, s - 1));
    } else {
      // 如果高度正常，尝试适当恢复字体大小，但不要超过初始值
      // 这里的逻辑可以优化：如果当前远小于阈值，可以尝试增大，但为了稳定性，主要处理缩小的场景
      // 或者：如果高度非常小（例如远小于80），可以尝试+1，但要小心死循环
    }
  }, [winW, summary.totalAsset, summary.totalProfitToday, summary.totalHoldingReturn, summary.returnRate, showPercent, assetSize, metricSize]); // 添加 assetSize, metricSize 到依赖，确保逐步缩小生效

  if (!summary.hasHolding) return null;

  return (
    <div className="glass card" style={{ marginBottom: 16, padding: '16px 20px', background: 'rgba(255, 255, 255, 0.03)' }}>
      <div ref={rowRef} className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div className="muted" style={{ fontSize: '12px', marginBottom: 4 }}>{groupName}</div>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            <span style={{ fontSize: '16px', marginRight: 2 }}>¥</span>
            <CountUp value={summary.totalAsset} style={{ fontSize: assetSize }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ textAlign: 'right' }}>
            <div className="muted" style={{ fontSize: '12px', marginBottom: 4 }}>当日收益</div>
            <div
              className={summary.totalProfitToday > 0 ? 'up' : summary.totalProfitToday < 0 ? 'down' : ''}
              style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            >
              <span style={{ marginRight: 1 }}>{summary.totalProfitToday > 0 ? '+' : summary.totalProfitToday < 0 ? '-' : ''}</span>
              <CountUp value={Math.abs(summary.totalProfitToday)} style={{ fontSize: metricSize }} />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="muted" style={{ fontSize: '12px', marginBottom: 4 }}>持有收益{showPercent ? '(%)' : ''}</div>
            <div
              className={summary.totalHoldingReturn > 0 ? 'up' : summary.totalHoldingReturn < 0 ? 'down' : ''}
              style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
              onClick={() => setShowPercent(!showPercent)}
              title="点击切换金额/百分比"
            >
              <span style={{ marginRight: 1 }}>{summary.totalHoldingReturn > 0 ? '+' : summary.totalHoldingReturn < 0 ? '-' : ''}</span>
              {showPercent ? (
                <CountUp value={Math.abs(summary.returnRate)} suffix="%" style={{ fontSize: metricSize }} />
              ) : (
                <>
                  <CountUp value={Math.abs(summary.totalHoldingReturn)} style={{ fontSize: metricSize }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef(null);
  const refreshingRef = useRef(false);
  const isLoggingOutRef = useRef(false);

  // 刷新频率状态
  const [refreshMs, setRefreshMs] = useState(30000);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempSeconds, setTempSeconds] = useState(30);

  // 全局刷新状态
  const [refreshing, setRefreshing] = useState(false);

  // 初始加载状态
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 收起/展开状态
  const [collapsedCodes, setCollapsedCodes] = useState(new Set());

  // 自选状态
  const [favorites, setFavorites] = useState(new Set());
  const [groups, setGroups] = useState([]); // [{ id, name, codes: [] }]
  const [currentTab, setCurrentTab] = useState('all');
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupManageOpen, setGroupManageOpen] = useState(false);
  const [addFundToGroupOpen, setAddFundToGroupOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  // 排序状态
  const [sortBy, setSortBy] = useState('default'); // default, name, yield, holding
  const [sortOrder, setSortOrder] = useState('desc'); // asc | desc

  // 视图模式
  const [viewMode, setViewMode] = useState('card'); // card, list

  // 用户认证状态
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  const userAvatar = useMemo(() => {
    if (!user?.id) return '';
    return createAvatar(glass, {
      seed: user.id,
      size: 80
    }).toDataUri();
  }, [user?.id]);

  // 反馈弹窗状态
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackNonce, setFeedbackNonce] = useState(0);

  // 搜索相关状态
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedSearchIndex, setFocusedSearchIndex] = useState(-1);
  const [addResultOpen, setAddResultOpen] = useState(false);
  const [addFailures, setAddFailures] = useState([]);
  const [holdingModal, setHoldingModal] = useState({ open: false, fund: null });
  const [actionModal, setActionModal] = useState({ open: false, fund: null });
  const [tradeModal, setTradeModal] = useState({ open: false, fund: null, type: 'buy' }); // type: 'buy' | 'sell'
  const [clearConfirm, setClearConfirm] = useState(null); // { fund }
  const [donateOpen, setDonateOpen] = useState(false);
  const [holdings, setHoldings] = useState({}); // { [code]: { share: number, cost: number } }
  const [percentModes, setPercentModes] = useState({}); // { [code]: boolean }
  const [isTradingDay, setIsTradingDay] = useState(true); // 默认为交易日，通过接口校正
  const tabsRef = useRef(null);
  const [fundDeleteConfirm, setFundDeleteConfirm] = useState(null); // { code, name }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [isMobile, setIsMobile] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth <= 640);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // 检查更新
  const [hasUpdate, setHasUpdate] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/hzm0321/real-time-fund/releases/latest');
        if (!res.ok) return;
        const data = await res.json();
        if (data.tag_name) {
          const remoteVersion = data.tag_name.replace(/^v/, '');
          if (remoteVersion !== packageJson.version) {
            setHasUpdate(true);
            setLatestVersion(remoteVersion);
            setUpdateContent(data.body || '');
          }
        }
      } catch (e) {
        console.error('Check update failed:', e);
      }
    };

    checkUpdate();
    const interval = setInterval(checkUpdate, 10 * 60 * 1000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  // 存储当前被划开的基金代码
  const [swipedFundCode, setSwipedFundCode] = useState(null);

  // 点击页面其他区域时收起删除按钮
  useEffect(() => {
    const handleClickOutside = (e) => {
      // 检查点击事件是否来自删除按钮
      // 如果点击的是 .swipe-action-bg 或其子元素，不执行收起逻辑
      if (e.target.closest('.swipe-action-bg')) {
        return;
      }

      if (swipedFundCode) {
        setSwipedFundCode(null);
      }
    };

    if (swipedFundCode) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [swipedFundCode]);

  // 检查交易日状态
  const checkTradingDay = () => {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    // 周末直接判定为非交易日
    if (isWeekend) {
      setIsTradingDay(false);
      return;
    }

    // 工作日通过上证指数判断是否为节假日
    // 接口返回示例: v_sh000001="1~上证指数~...~20260205150000~..."
    // 第30位是时间字段
    const script = document.createElement('script');
    script.src = `https://qt.gtimg.cn/q=sh000001&_t=${Date.now()}`;
    script.onload = () => {
      const data = window.v_sh000001;
      if (data) {
        const parts = data.split('~');
        if (parts.length > 30) {
          const dateStr = parts[30].slice(0, 8); // 20260205
          const currentStr = todayStr.replace(/-/g, '');

          if (dateStr === currentStr) {
            setIsTradingDay(true); // 日期匹配，确认为交易日
          } else {
            // 日期不匹配 (显示的是旧数据)
            // 如果已经过了 09:30 还是旧数据，说明今天休市
            const minutes = now.getHours() * 60 + now.getMinutes();
            if (minutes >= 9 * 60 + 30) {
              setIsTradingDay(false);
            } else {
              // 9:30 之前，即使是旧数据，也默认是交易日（盘前）
              setIsTradingDay(true);
            }
          }
        }
      }
      document.body.removeChild(script);
    };
    script.onerror = () => {
      document.body.removeChild(script);
      // 接口失败，降级为仅判断周末
      setIsTradingDay(!isWeekend);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    checkTradingDay();
    // 每分钟检查一次
    const timer = setInterval(checkTradingDay, 60000);
    return () => clearInterval(timer);
  }, []);

  // 计算持仓收益
  const getHoldingProfit = (fund, holding) => {
    if (!holding || typeof holding.share !== 'number') return null;

    const now = new Date();
    const isAfter9 = now.getHours() >= 9;
    const hasTodayData = fund.jzrq === todayStr;
    const hasTodayValuation = typeof fund.gztime === 'string' && fund.gztime.startsWith(todayStr);
    const canCalcTodayProfit = hasTodayData || hasTodayValuation;

    // 如果是交易日且9点以后，且今日净值未出，则强制使用估值（隐藏涨跌幅列模式）
    const useValuation = isTradingDay && isAfter9 && !hasTodayData;

    let currentNav;
    let profitToday;

    if (!useValuation) {
      // 使用确权净值 (dwjz)
      currentNav = Number(fund.dwjz);
      if (!currentNav) return null;

      if (canCalcTodayProfit) {
        const amount = holding.share * currentNav;
        // 优先用 zzl (真实涨跌幅), 降级用 gszzl
        const rate = fund.zzl !== undefined ? Number(fund.zzl) : (Number(fund.gszzl) || 0);
        profitToday = amount - (amount / (1 + rate / 100));
      } else {
        profitToday = null;
      }
    } else {
      // 否则使用估值
      currentNav = fund.estPricedCoverage > 0.05
        ? fund.estGsz
        : (typeof fund.gsz === 'number' ? fund.gsz : Number(fund.dwjz));

      if (!currentNav) return null;

      if (canCalcTodayProfit) {
        const amount = holding.share * currentNav;
        // 估值涨跌幅
        const gzChange = fund.estPricedCoverage > 0.05 ? fund.estGszzl : (Number(fund.gszzl) || 0);
        profitToday = amount - (amount / (1 + gzChange / 100));
      } else {
        profitToday = null;
      }
    }

    // 持仓金额
    const amount = holding.share * currentNav;

    // 总收益 = (当前净值 - 成本价) * 份额
    const profitTotal = typeof holding.cost === 'number'
      ? (currentNav - holding.cost) * holding.share
      : null;

    return {
      amount,
      profitToday,
      profitTotal
    };
  };

  const profitCache = useMemo(() => {
    const cache = {};
    funds.forEach(f => {
      cache[f.code] = getHoldingProfit(f, holdings[f.code]);
    });
    return cache;
  }, [funds, holdings, isTradingDay, todayStr]);


  // 过滤和排序后的基金列表
  const displayFunds = funds
    .filter(f => {
      if (currentTab === 'all') return true;
      if (currentTab === 'fav') return favorites.has(f.code);
      const group = groups.find(g => g.id === currentTab);
      return group ? group.codes.includes(f.code) : true;
    })
    .sort((a, b) => {
      if (sortBy === 'yield') {
        const valA = typeof a.estGszzl === 'number' ? a.estGszzl : (Number(a.gszzl) || 0);
        const valB = typeof b.estGszzl === 'number' ? b.estGszzl : (Number(b.gszzl) || 0);
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      if (sortBy === 'holding') {
        const pa = profitCache[a.code];
        const pb = profitCache[b.code];
        const valA = pa?.profitTotal ?? Number.NEGATIVE_INFINITY;
        const valB = pb?.profitTotal ?? Number.NEGATIVE_INFINITY;
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name, 'zh-CN') : b.name.localeCompare(a.name, 'zh-CN');
      }
      return 0;
    });

  // 自动滚动选中 Tab 到可视区域
  useEffect(() => {
    if (!tabsRef.current) return;
    if (currentTab === 'all') {
      tabsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    const activeTab = tabsRef.current.querySelector('.tab.active');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentTab]);

  // 鼠标拖拽滚动逻辑
  const [isDragging, setIsDragging] = useState(false);
  // Removed startX and scrollLeft state as we use movementX now
  const [tabsOverflow, setTabsOverflow] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const handleSaveHolding = (code, data) => {
    setHoldings(prev => {
      const next = { ...prev };
      if (data.share === null && data.cost === null) {
        delete next[code];
      } else {
        next[code] = data;
      }
      storageHelper.setItem('holdings', JSON.stringify(next));
      return next;
    });
    setHoldingModal({ open: false, fund: null });
  };

  const handleAction = (type, fund) => {
    setActionModal({ open: false, fund: null });
    if (type === 'edit') {
      setHoldingModal({ open: true, fund });
    } else if (type === 'clear') {
      setClearConfirm({ fund });
    } else if (type === 'buy' || type === 'sell') {
      setTradeModal({ open: true, fund, type });
    }
  };

  const handleClearConfirm = () => {
    if (clearConfirm?.fund) {
      handleSaveHolding(clearConfirm.fund.code, { share: null, cost: null });
    }
    setClearConfirm(null);
  };

  const handleTrade = (fund, data) => {
    const current = holdings[fund.code] || { share: 0, cost: 0 };
    const isBuy = tradeModal.type === 'buy';

    let newShare, newCost;

    if (isBuy) {
      newShare = current.share + data.share;

      // 如果传递了 totalCost（即买入总金额），则用它来计算新成本
      // 否则回退到用 share * price 计算（减仓或旧逻辑）
      const buyCost = data.totalCost !== undefined ? data.totalCost : (data.price * data.share);

      // 加权平均成本 = (原持仓成本 * 原份额 + 本次买入总花费) / 新总份额
      // 注意：这里默认将手续费也计入成本（如果 totalCost 包含了手续费）
      newCost = (current.cost * current.share + buyCost) / newShare;
    } else {
      newShare = Math.max(0, current.share - data.share);
      // 减仓不改变单位成本，只减少份额
      newCost = current.cost;
      if (newShare === 0) newCost = 0;
    }

    handleSaveHolding(fund.code, { share: newShare, cost: newCost });
    setTradeModal({ open: false, fund: null, type: 'buy' });
  };

  const handleMouseDown = (e) => {
    if (!tabsRef.current) return;
    setIsDragging(true);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    tabsRef.current.scrollLeft -= e.movementX;
  };

  const handleWheel = (e) => {
    if (!tabsRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    tabsRef.current.scrollLeft += delta;
  };

  const updateTabOverflow = () => {
    if (!tabsRef.current) return;
    const el = tabsRef.current;
    setTabsOverflow(el.scrollWidth > el.clientWidth);
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateTabOverflow();
    const onResize = () => updateTabOverflow();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [groups, funds.length, favorites.size]);

  // 成功提示弹窗
  const [successModal, setSuccessModal] = useState({ open: false, message: '' });
  // 轻提示 (Toast)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' }); // type: 'info' | 'success' | 'error'
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'info') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message, type });
    const isAutoClose = type !== 'error';
    if (isAutoClose) {
      toastTimeoutRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const hideToast = () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast((prev) => ({ ...prev, show: false }));
  };

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [cloudConfigModal, setCloudConfigModal] = useState({ open: false, userId: null });
  const syncDebounceRef = useRef(null);
  const lastSyncedRef = useRef('');
  const skipSyncRef = useRef(false);
  const userIdRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    userIdRef.current = user?.id || null;
  }, [user]);

  const scheduleSync = useCallback(() => {
    if (!userIdRef.current) return;
    if (skipSyncRef.current) return;
    if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current);
    syncDebounceRef.current = setTimeout(() => {
      const payload = collectLocalPayload();
      const next = getComparablePayload(payload);
      if (next === lastSyncedRef.current) return;
      lastSyncedRef.current = next;
      syncUserConfig(userIdRef.current, false);
    }, 2000);
  }, []);

  const storageHelper = useMemo(() => {
    const keys = new Set(['funds', 'favorites', 'groups', 'collapsedCodes', 'refreshMs', 'holdings']);
    const triggerSync = (key) => {
      if (keys.has(key)) {
        if (!skipSyncRef.current) {
          window.localStorage.setItem('localUpdatedAt', new Date().toISOString());
        }
        scheduleSync();
      }
    };
    return {
      setItem: (key, value) => {
        window.localStorage.setItem(key, value);
        triggerSync(key);
      },
      removeItem: (key) => {
        window.localStorage.removeItem(key);
        triggerSync(key);
      },
      clear: () => {
        window.localStorage.clear();
        if (!skipSyncRef.current) {
          window.localStorage.setItem('localUpdatedAt', new Date().toISOString());
        }
        scheduleSync();
      }
    };
  }, [scheduleSync]);

  useEffect(() => {
    const keys = new Set(['funds', 'favorites', 'groups', 'collapsedCodes', 'refreshMs', 'holdings']);
    const onStorage = (e) => {
      if (!e.key || keys.has(e.key)) scheduleSync();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current);
    };
  }, [scheduleSync]);

  const toggleFavorite = (code) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      storageHelper.setItem('favorites', JSON.stringify(Array.from(next)));
      if (next.size === 0) setCurrentTab('all');
      return next;
    });
  };

  const toggleCollapse = (code) => {
    setCollapsedCodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      // 同步到本地存储
      storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleAddGroup = (name) => {
    const newGroup = {
      id: `group_${Date.now()}`,
      name,
      codes: []
    };
    const next = [...groups, newGroup];
    setGroups(next);
    storageHelper.setItem('groups', JSON.stringify(next));
    setCurrentTab(newGroup.id);
    setGroupModalOpen(false);
  };

  const handleRemoveGroup = (id) => {
    const next = groups.filter(g => g.id !== id);
    setGroups(next);
    storageHelper.setItem('groups', JSON.stringify(next));
    if (currentTab === id) setCurrentTab('all');
  };

  const handleUpdateGroups = (newGroups) => {
    setGroups(newGroups);
    storageHelper.setItem('groups', JSON.stringify(newGroups));
    // 如果当前选中的分组被删除了，切换回“全部”
    if (currentTab !== 'all' && currentTab !== 'fav' && !newGroups.find(g => g.id === currentTab)) {
      setCurrentTab('all');
    }
  };

  const handleAddFundsToGroup = (codes) => {
    if (!codes || codes.length === 0) return;
    const next = groups.map(g => {
      if (g.id === currentTab) {
        return {
          ...g,
          codes: Array.from(new Set([...g.codes, ...codes]))
        };
      }
      return g;
    });
    setGroups(next);
    storageHelper.setItem('groups', JSON.stringify(next));
    setAddFundToGroupOpen(false);
    setSuccessModal({ open: true, message: `成功添加 ${codes.length} 支基金` });
  };

  const removeFundFromCurrentGroup = (code) => {
    const next = groups.map(g => {
      if (g.id === currentTab) {
        return {
          ...g,
          codes: g.codes.filter(c => c !== code)
        };
      }
      return g;
    });
    setGroups(next);
    storageHelper.setItem('groups', JSON.stringify(next));
  };

  const toggleFundInGroup = (code, groupId) => {
    const next = groups.map(g => {
      if (g.id === groupId) {
        const has = g.codes.includes(code);
        return {
          ...g,
          codes: has ? g.codes.filter(c => c !== code) : [...g.codes, code]
        };
      }
      return g;
    });
    setGroups(next);
    storageHelper.setItem('groups', JSON.stringify(next));
  };

  // 按 code 去重，保留第一次出现的项，避免列表重复
  const dedupeByCode = (list) => {
    const seen = new Set();
    return list.filter((f) => {
      const c = f?.code;
      if (!c || seen.has(c)) return false;
      seen.add(c);
      return true;
    });
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('funds') || '[]');
      if (Array.isArray(saved) && saved.length) {
        const deduped = dedupeByCode(saved);
        setFunds(deduped);
        storageHelper.setItem('funds', JSON.stringify(deduped));
        const codes = Array.from(new Set(deduped.map((f) => f.code)));
        if (codes.length) refreshAll(codes);
      }
      const savedMs = parseInt(localStorage.getItem('refreshMs') || '30000', 10);
      if (Number.isFinite(savedMs) && savedMs >= 5000) {
        setRefreshMs(savedMs);
        setTempSeconds(Math.round(savedMs / 1000));
      }
      // 加载收起状态
      const savedCollapsed = JSON.parse(localStorage.getItem('collapsedCodes') || '[]');
      if (Array.isArray(savedCollapsed)) {
        setCollapsedCodes(new Set(savedCollapsed));
      }
      // 加载自选状态
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (Array.isArray(savedFavorites)) {
        setFavorites(new Set(savedFavorites));
      }
      // 加载分组状态
      const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
      if (Array.isArray(savedGroups)) {
        setGroups(savedGroups);
      }
      // 加载持仓数据
      const savedHoldings = JSON.parse(localStorage.getItem('holdings') || '{}');
      if (savedHoldings && typeof savedHoldings === 'object') {
        setHoldings(savedHoldings);
      }
    } catch (e) {
      console.warn('[初始化] 加载本地数据失败:', e?.message || e);
    }
    setIsInitialLoading(false);
  }, []);

  // 初始化认证状态监听
  useEffect(() => {
    const clearAuthState = () => {
      setUser(null);
      setUserMenuOpen(false);
    };

    const handleSession = async (session, event) => {
      if (!session?.user) {
        if (event === 'SIGNED_OUT' && !isLoggingOutRef.current) {
          setLoginError('会话已过期，请重新登录');
          setLoginModalOpen(true);
        }
        isLoggingOutRef.current = false;
        clearAuthState();
        return;
      }
      if (session.expires_at && session.expires_at * 1000 <= Date.now()) {
        isLoggingOutRef.current = true;
        await supabase.auth.signOut({ scope: 'local' });
        try {
          const storageKeys = Object.keys(localStorage);
          storageKeys.forEach((key) => {
            if (key === 'supabase.auth.token' || (key.startsWith('sb-') && key.endsWith('-auth-token'))) {
              storageHelper.removeItem(key);
            }
          });
        } catch (e) { console.warn('[登出] 清理 localStorage 失败:', e?.message); }
        try {
          const sessionKeys = Object.keys(sessionStorage);
          sessionKeys.forEach((key) => {
            if (key === 'supabase.auth.token' || (key.startsWith('sb-') && key.endsWith('-auth-token'))) {
              sessionStorage.removeItem(key);
            }
          });
        } catch (e) { console.warn('[登出] 清理 sessionStorage 失败:', e?.message); }
        clearAuthState();
        setLoginError('会话已过期，请重新登录');
        showToast('会话已过期，请重新登录', 'error');
        setLoginModalOpen(true);
        return;
      }
      setUser(session.user);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        setLoginModalOpen(false);
        setLoginEmail('');
        setLoginSuccess('');
        setLoginError('');
      }
      fetchCloudConfig(session.user.id);
    };

    supabase.auth.getSession().then(async ({ data, error }) => {
      if (error) {
        clearAuthState();
        return;
      }
      await handleSession(data?.session ?? null, 'INITIAL_SESSION');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      await handleSession(session ?? null, event);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`user-configs-${user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_configs', filter: `user_id=eq.${user.id}` }, async (payload) => {
        const incoming = payload?.new?.data;
        if (!incoming || typeof incoming !== 'object') return;
        const incomingComparable = getComparablePayload(incoming);
        if (!incomingComparable || incomingComparable === lastSyncedRef.current) return;
        await applyCloudConfig(incoming, payload.new.updated_at);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_configs', filter: `user_id=eq.${user.id}` }, async (payload) => {
        const incoming = payload?.new?.data;
        if (!incoming || typeof incoming !== 'object') return;
        const incomingComparable = getComparablePayload(incoming);
        if (!incomingComparable || incomingComparable === lastSyncedRef.current) return;
        await applyCloudConfig(incoming, payload.new.updated_at);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginEmail.trim()) {
      setLoginError('请输入邮箱地址');
      return;
    }
    if (!emailRegex.test(loginEmail.trim())) {
      setLoginError('请输入有效的邮箱地址');
      return;
    }

    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: loginEmail.trim(),
        options: {
          shouldCreateUser: true
        }
      });
      if (error) throw error;
      setLoginSuccess('验证码已发送，请查收邮箱输入验证码完成注册/登录');
    } catch (err) {
      if (err.message?.includes('rate limit')) {
        setLoginError('请求过于频繁，请稍后再试');
      } else if (err.message?.includes('network')) {
        setLoginError('网络错误，请检查网络连接');
      } else {
        setLoginError(err.message || '发送验证码失败，请稍后再试');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    setLoginError('');
    if (!loginOtp || loginOtp.length < 4) {
      setLoginError('请输入邮箱中的验证码');
      return;
    }
    try {
      setLoginLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email: loginEmail.trim(),
        token: loginOtp.trim(),
        type: 'email'
      });
      if (error) throw error;
      if (data?.user) {
        setLoginModalOpen(false);
        setLoginEmail('');
        setLoginOtp('');
        setLoginSuccess('');
        setLoginError('');
        fetchCloudConfig(data.user.id);
      }
    } catch (err) {
      setLoginError(err.message || '验证失败，请检查验证码或稍后再试');
    }
    setLoginLoading(false);
  };

  // 登出
  const handleLogout = async () => {
    isLoggingOutRef.current = true;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error && error.code !== 'session_not_found') {
          throw error;
        }
      }
    } catch (err) {
      showToast(err.message, 'error')
      console.error('登出失败', err);
    } finally {
      try {
        await supabase.auth.signOut({ scope: 'local' });
      } catch (e) { console.warn('[登出] signOut 失败:', e?.message); }
      try {
        const storageKeys = Object.keys(localStorage);
        storageKeys.forEach((key) => {
          if (key === 'supabase.auth.token' || (key.startsWith('sb-') && key.endsWith('-auth-token'))) {
            storageHelper.removeItem(key);
          }
        });
      } catch (e) { console.warn('[登出] 清理 localStorage 失败:', e?.message); }
      try {
        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach((key) => {
          if (key === 'supabase.auth.token' || (key.startsWith('sb-') && key.endsWith('-auth-token'))) {
            sessionStorage.removeItem(key);
          }
        });
      } catch (e) { console.warn('[登出] 清理 sessionStorage 失败:', e?.message); }
      setLoginModalOpen(false);
      setLoginError('');
      setLoginSuccess('');
      setLoginEmail('');
      setLoginOtp('');
      setUserMenuOpen(false);
      setUser(null);
    }
  };

  // 关闭用户菜单（点击外部时）
  const userMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const codes = Array.from(new Set(funds.map((f) => f.code)));
      if (codes.length) refreshAll(codes);
    }, refreshMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [funds, refreshMs]);

  // --- 辅助：JSONP 数据抓取逻辑 ---
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        if (document.body.contains(script)) document.body.removeChild(script);
        resolve();
      };
      script.onerror = () => {
        if (document.body.contains(script)) document.body.removeChild(script);
        reject(new Error('数据加载失败'));
      };
      document.body.appendChild(script);
    });
  };

  let jsonpIdCounter = 0;

  const jsonpRequest = (url, callbackName) => {
    return new Promise((resolve, reject) => {
      const uid = ++jsonpIdCounter;
      const uniqueCbName = `_jsonp_${callbackName}_${uid}_${Date.now()}`;
      const timeoutMs = 8000;
      let settled = false;

      const cleanup = () => {
        if (window[uniqueCbName]) {
          try { delete window[uniqueCbName]; } catch { window[uniqueCbName] = undefined; }
        }
      };

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error(`JSONP 超时: ${callbackName}`));
      }, timeoutMs);

      window[uniqueCbName] = (data) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        cleanup();
        resolve(data);
      };

      const script = document.createElement('script');
      script.src = url.includes('callback=')
        ? url
        : `${url}${url.includes('?') ? '&' : '?'}callback=${uniqueCbName}`;

      script.async = true;
      script.onerror = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        cleanup();
        if (document.body.contains(script)) document.body.removeChild(script);
        reject(new Error(`JSONP 加载失败: ${callbackName}`));
      };
      script.onload = () => {
        setTimeout(() => {
          if (document.body.contains(script)) document.body.removeChild(script);
        }, 100);
      };

      document.body.appendChild(script);
    });
  };

  const majorIndices = {
    'sh000300': '沪深300',
    'sh000905': '中证500',
    'sh000001': '上证指数',
    'sz399001': '深证成指',
    'sz399006': '创业板指',
    'sh000016': '上证50',
    'sh000852': '中证1000',
    'sh000688': '科创50'
  };

  const fetchMajorIndicesData = () => {
    return new Promise((resolve) => {
      const indicesStr = Object.keys(majorIndices).join(',');
      const url = `https://qt.gtimg.cn/q=${indicesStr}`;

      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        const indicesData = {};
        Object.entries(majorIndices).forEach(([code, name]) => {
          const varName = `v_${code}`;
          const data = window[varName];
          if (data && typeof data === 'string') {
            const parts = data.split('~');
            if (parts.length > 5) {
              indicesData[code] = {
                name,
                change: parseFloat(parts[5]) || 0,
                price: parseFloat(parts[3]) || 0
              };
            }
          }
        });
        if (document.body.contains(script)) document.body.removeChild(script);
        resolve(indicesData);
      };
      script.onerror = () => {
        if (document.body.contains(script)) document.body.removeChild(script);
        resolve({});
      };
      document.body.appendChild(script);
    });
  };

  let cachedIndicesData = null;
  let indicesCacheTime = 0;
  const INDICES_CACHE_DURATION = 30000;

  const getIndicesData = async () => {
    const now = Date.now();
    if (!cachedIndicesData || (now - indicesCacheTime) > INDICES_CACHE_DURATION) {
      cachedIndicesData = await fetchMajorIndicesData();
      indicesCacheTime = now;
    }
    return cachedIndicesData;
  };

  // 当估值接口无法获取数据时，使用腾讯接口获取基金基本信息和净值（回退方案）
  const fetchFundDataFallback = async (c) => {
    return new Promise(async (resolve, reject) => {
      // 先通过东方财富搜索接口获取基金名称
      const searchCallbackName = `SuggestData_fallback_${Date.now()}`;
      const searchUrl = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&key=${encodeURIComponent(c)}&callback=${searchCallbackName}&_=${Date.now()}`;

      let fundName = '';

      try {
        await new Promise((resSearch, rejSearch) => {
          window[searchCallbackName] = (data) => {
            if (data && data.Datas && data.Datas.length > 0) {
              const found = data.Datas.find(d => d.CODE === c);
              if (found) {
                fundName = found.NAME || found.SHORTNAME || '';
              }
            }
            delete window[searchCallbackName];
            resSearch();
          };

          const script = document.createElement('script');
          script.src = searchUrl;
          script.async = true;
          script.onload = () => {
            if (document.body.contains(script)) document.body.removeChild(script);
          };
          script.onerror = () => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[searchCallbackName];
            rejSearch(new Error('搜索接口失败'));
          };
          document.body.appendChild(script);

          // 超时处理
          setTimeout(() => {
            if (window[searchCallbackName]) {
              delete window[searchCallbackName];
              resSearch();
            }
          }, 3000);
        });
      } catch (e) {
        // 搜索失败，继续尝试腾讯接口
      }

      // 使用腾讯接口获取净值数据
      const tUrl = `https://qt.gtimg.cn/q=jj${c}`;
      const tScript = document.createElement('script');
      tScript.src = tUrl;
      tScript.onload = () => {
        const v = window[`v_jj${c}`];
        if (v && v.length > 5) {
          const p = v.split('~');
          // p[1]: 基金名称, p[5]: 单位净值, p[7]: 涨跌幅, p[8]: 净值日期
          const name = fundName || p[1] || `未知基金(${c})`;
          const dwjz = p[5];
          const zzl = parseFloat(p[7]);
          const jzrq = p[8] ? p[8].slice(0, 10) : '';

          if (dwjz) {
            // 成功获取净值数据
            resolve({
              code: c,
              name: name,
              dwjz: dwjz,
              gsz: null, // 无估值数据
              gztime: null,
              jzrq: jzrq,
              gszzl: null, // 无估值涨跌幅
              zzl: !isNaN(zzl) ? zzl : null,
              noValuation: true, // 标记为无估值数据
              holdings: []
            });
          } else {
            reject(new Error('未能获取到基金数据'));
          }
        } else {
          reject(new Error('未能获取到基金数据'));
        }
        if (document.body.contains(tScript)) document.body.removeChild(tScript);
      };
      tScript.onerror = () => {
        if (document.body.contains(tScript)) document.body.removeChild(tScript);
        reject(new Error('基金数据加载失败'));
      };
      document.body.appendChild(tScript);
    });
  };

  const fetchFundData = async (c) => {
    return new Promise(async (resolve, reject) => {
      let gzDataResolved = false;

      // 腾讯接口识别逻辑优化
      const getTencentPrefix = (code) => {
        if (code.startsWith('6') || code.startsWith('9')) return 'sh';
        if (code.startsWith('0') || code.startsWith('3')) return 'sz';
        if (code.startsWith('4') || code.startsWith('8')) return 'bj';
        return 'sz';
      };

      const gzUrl = `https://fundgz.1234567.com.cn/js/${c}.js?rt=${Date.now()}`;

      // 使用更安全的方式处理全局回调，避免并发覆盖
      const currentCallback = `jsonpgz_${c}_${Math.random().toString(36).slice(2, 7)}`;

      // 动态拦截并处理 jsonpgz 回调
      const scriptGz = document.createElement('script');
      // 东方财富接口固定调用 jsonpgz，我们通过修改全局变量临时捕获它
      scriptGz.src = gzUrl;

      const originalJsonpgz = window.jsonpgz;
      window.jsonpgz = (json) => {
        if (gzDataResolved) return;
        gzDataResolved = true;
        window.jsonpgz = originalJsonpgz; // 立即恢复
        if (!json || typeof json !== 'object') {
          // 估值数据无法获取时，尝试使用腾讯接口获取基金基本信息和净值
          fetchFundDataFallback(c).then(resolve).catch(reject);
          return;
        }
        const gszzlNum = Number(json.gszzl);
        const gzData = {
          code: json.fundcode,
          name: json.name,
          dwjz: json.dwjz,
          gsz: json.gsz,
          gztime: json.gztime,
          jzrq: json.jzrq,
          gszzl: Number.isFinite(gszzlNum) ? gszzlNum : json.gszzl
        };

        // 并行获取：1. 腾讯接口获取最新确权净值和涨跌幅；2. 东方财富接口获取持仓
        const tencentPromise = new Promise((resolveT) => {
          const tUrl = `https://qt.gtimg.cn/q=jj${c}`;
          const tScript = document.createElement('script');
          tScript.src = tUrl;
          tScript.onload = () => {
            const v = window[`v_jj${c}`];
            if (v) {
              const p = v.split('~');
              // p[5]: 单位净值, p[7]: 涨跌幅, p[8]: 净值日期
              resolveT({
                dwjz: p[5],
                zzl: parseFloat(p[7]),
                jzrq: p[8] ? p[8].slice(0, 10) : ''
              });
            } else {
              resolveT(null);
            }
            if (document.body.contains(tScript)) document.body.removeChild(tScript);
          };
          tScript.onerror = () => {
            if (document.body.contains(tScript)) document.body.removeChild(tScript);
            resolveT(null);
          };
          document.body.appendChild(tScript);
        });

        const holdingsPromise = new Promise((resolveH) => {
          const holdingsUrl = `https://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${c}&topline=10&year=&month=&_=${Date.now()}`;
          loadScript(holdingsUrl).then(async () => {
            let holdings = [];
            const html = window.apidata?.content || '';
            const headerRow = (html.match(/<thead[\s\S]*?<tr[\s\S]*?<\/tr>[\s\S]*?<\/thead>/i) || [])[0] || '';
            const headerCells = (headerRow.match(/<th[\s\S]*?>([\s\S]*?)<\/th>/gi) || []).map(th => th.replace(/<[^>]*>/g, '').trim());
            let idxCode = -1, idxName = -1, idxWeight = -1;
            headerCells.forEach((h, i) => {
              const t = h.replace(/\s+/g, '');
              if (idxCode < 0 && (t.includes('股票代码') || t.includes('证券代码'))) idxCode = i;
              if (idxName < 0 && (t.includes('股票名称') || t.includes('证券名称'))) idxName = i;
              if (idxWeight < 0 && (t.includes('占净值比例') || t.includes('占比'))) idxWeight = i;
            });
            const rows = html.match(/<tbody[\s\S]*?<\/tbody>/i) || [];
            const dataRows = rows.length ? rows[0].match(/<tr[\s\S]*?<\/tr>/gi) || [] : html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
            for (const r of dataRows) {
              const tds = (r.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/gi) || []).map(td => td.replace(/<[^>]*>/g, '').trim());
              if (!tds.length) continue;
              let code = '';
              let name = '';
              let weight = '';
              if (idxCode >= 0 && tds[idxCode]) {
                const m = tds[idxCode].match(/(\d{6})/);
                code = m ? m[1] : tds[idxCode];
              } else {
                const codeIdx = tds.findIndex(txt => /^\d{6}$/.test(txt));
                if (codeIdx >= 0) code = tds[codeIdx];
              }
              if (idxName >= 0 && tds[idxName]) {
                name = tds[idxName];
              } else if (code) {
                const i = tds.findIndex(txt => txt && txt !== code && !/%$/.test(txt));
                name = i >= 0 ? tds[i] : '';
              }
              if (idxWeight >= 0 && tds[idxWeight]) {
                const wm = tds[idxWeight].match(/([\d.]+)\s*%/);
                weight = wm ? `${wm[1]}%` : tds[idxWeight];
              } else {
                const wIdx = tds.findIndex(txt => /\d+(?:\.\d+)?\s*%/.test(txt));
                weight = wIdx >= 0 ? tds[wIdx].match(/([\d.]+)\s*%/)?.[1] + '%' : '';
              }
              if (code || name || weight) {
                holdings.push({ code, name, weight, change: null });
              }
            }
            holdings = holdings.slice(0, 10);
            const needQuotes = holdings.filter(h => /^\d{6}$/.test(h.code) || /^\d{5}$/.test(h.code));
            if (needQuotes.length) {
              try {
                const tencentCodes = needQuotes.map(h => {
                  const cd = String(h.code || '');
                  if (/^\d{6}$/.test(cd)) {
                    const pfx = cd.startsWith('6') || cd.startsWith('9') ? 'sh' : ((cd.startsWith('4') || cd.startsWith('8')) ? 'bj' : 'sz');
                    return `s_${pfx}${cd}`;
                  }
                  if (/^\d{5}$/.test(cd)) {
                    return `s_hk${cd}`;
                  }
                  return null;
                }).filter(Boolean).join(',');
                if (!tencentCodes) {
                  resolveH(holdings);
                  return;
                }
                const quoteUrl = `https://qt.gtimg.cn/q=${tencentCodes}`;
                await new Promise((resQuote) => {
                  const scriptQuote = document.createElement('script');
                  scriptQuote.src = quoteUrl;
                  scriptQuote.onload = () => {
                    needQuotes.forEach(h => {
                      const cd = String(h.code || '');
                      let varName = '';
                      if (/^\d{6}$/.test(cd)) {
                        const pfx = cd.startsWith('6') || cd.startsWith('9') ? 'sh' : ((cd.startsWith('4') || cd.startsWith('8')) ? 'bj' : 'sz');
                        varName = `v_s_${pfx}${cd}`;
                      } else if (/^\d{5}$/.test(cd)) {
                        varName = `v_s_hk${cd}`;
                      } else {
                        return;
                      }
                      const dataStr = window[varName];
                      if (dataStr) {
                        const parts = dataStr.split('~');
                        if (parts.length > 5) {
                          h.change = parseFloat(parts[5]);
                        }
                      }
                    });
                    if (document.body.contains(scriptQuote)) document.body.removeChild(scriptQuote);
                    resQuote();
                  };
                  scriptQuote.onerror = () => {
                    if (document.body.contains(scriptQuote)) document.body.removeChild(scriptQuote);
                    resQuote();
                  };
                  document.body.appendChild(scriptQuote);
                });
              } catch (e) { }
            }
            resolveH(holdings);
          }).catch(() => resolveH([]));
        });

        Promise.all([tencentPromise, holdingsPromise]).then(async ([tData, holdings]) => {
          if (tData) {
            if (tData.jzrq && (!gzData.jzrq || tData.jzrq >= gzData.jzrq)) {
              gzData.dwjz = tData.dwjz;
              gzData.jzrq = tData.jzrq;
              gzData.zzl = tData.zzl;
            }
          }

          const validHoldings = holdings.filter(h => h.weight && h.change !== null && h.change !== undefined);
          const holdingCoverage = validHoldings.reduce((sum, h) => {
            const w = parseFloat(h.weight) / 100;
            return sum + w;
          }, 0);

          const indicesData = await getIndicesData();

          const isLikelyIndexFund = gzData.name && (
            /指数|ETF|ETF联接|沪深300|中证500|中证1000|创业板|科创板|上证50/i.test(gzData.name) ||
            /跟踪|被动/i.test(gzData.name || '')
          );

          if (validHoldings.length >= 3 && holdingCoverage > 0.15) {
            let holdingWeightedChange = 0;
            validHoldings.forEach(h => {
              const w = parseFloat(h.weight) / 100;
              holdingWeightedChange += w * h.change;
            });

            const normalizedChange = holdingCoverage > 0 ? holdingWeightedChange / holdingCoverage : 0;
            const officialChange = typeof gzData.gszzl === 'number' ? gzData.gszzl : null;
            const officialGsz = typeof gzData.gsz === 'number' ? gzData.gsz : null;

            let bestEstimate = null;
            let bestConfidence = 0;

            if (officialChange !== null && officialGsz !== null && typeof gzData.dwjz === 'number' && gzData.dwjz > 0) {
              const coverageFactor = Math.min(holdingCoverage * 2, 0.9);
              const combinedChange = coverageFactor * normalizedChange + (1 - coverageFactor) * officialChange;
              const estGsz = Number(gzData.dwjz) * (1 + combinedChange / 100);
              bestEstimate = { change: combinedChange, gsz: estGsz };
              bestConfidence = 0.8;
            }

            if (isLikelyIndexFund && indicesData['sh000300'] && indicesData['sh000300'].change !== 0) {
              const hsz300Change = indicesData['sh000300'].change;
              const hsz300Weight = Math.abs(normalizedChange - hsz300Change) < 0.5 ? 0.3 : 0;
              if (hsz300Weight > 0 && bestEstimate) {
                bestEstimate.change = bestEstimate.change * (1 - hsz300Weight) + hsz300Change * hsz300Weight;
                bestEstimate.gsz = Number(gzData.dwjz) * (1 + bestEstimate.change / 100);
                bestConfidence = Math.max(bestConfidence, 0.85);
              }
            }

            if (bestEstimate && typeof gzData.dwjz === 'number' && gzData.dwjz > 0) {
              gzData.estGsz = bestEstimate.gsz;
              gzData.estGszzl = bestEstimate.change;
              gzData.estPricedCoverage = holdingCoverage;
              gzData.holdingEstimated = true;
              gzData.enhancedConfidence = bestConfidence >= 0.85 ? 'high' : (bestConfidence >= 0.6 ? 'medium' : 'low');
            } else if (normalizedChange !== 0 && typeof gzData.dwjz === 'number' && gzData.dwjz > 0) {
              const estGsz = Number(gzData.dwjz) * (1 + normalizedChange / 100);
              gzData.estGsz = estGsz;
              gzData.estGszzl = normalizedChange;
              gzData.estPricedCoverage = holdingCoverage;
              gzData.holdingEstimated = true;
              gzData.enhancedConfidence = holdingCoverage >= 0.5 ? 'high' : (holdingCoverage >= 0.3 ? 'medium' : 'low');
            }
          } else if (isLikelyIndexFund && !gzData.estGsz && typeof gzData.dwjz === 'number' && gzData.dwjz > 0) {
            let bestIndexChange = null;
            if (indicesData['sh000300'] && indicesData['sh000300'].change !== 0) {
              bestIndexChange = indicesData['sh000300'].change;
              gzData.relatedIndex = '沪深300';
            } else if (indicesData['sz399006'] && indicesData['sz399006'].change !== 0) {
              bestIndexChange = indicesData['sz399006'].change;
              gzData.relatedIndex = '创业板指';
            }

            if (bestIndexChange !== null) {
              gzData.estGszzl = bestIndexChange;
              gzData.estGsz = Number(gzData.dwjz) * (1 + bestIndexChange / 100);
              gzData.estPricedCoverage = 0;
              gzData.holdingEstimated = true;
              gzData.enhancedConfidence = 'low';
            }
          }

          gzData.holdings = holdings;
          resolve(gzData);
        });
      };

      scriptGz.onerror = () => {
        window.jsonpgz = originalJsonpgz;
        if (document.body.contains(scriptGz)) document.body.removeChild(scriptGz);
        reject(new Error('基金数据加载失败'));
      };

      document.body.appendChild(scriptGz);

      const gzTimeout = setTimeout(() => {
        window.jsonpgz = originalJsonpgz;
        if (document.body.contains(scriptGz)) document.body.removeChild(scriptGz);
        if (!gzDataResolved) {
          gzDataResolved = true;
          fetchFundDataFallback(c).then(resolve).catch(reject);
        }
      }, 8000);
    });
  };

  const performSearch = async (val) => {
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    // 使用 JSONP 方式获取数据，添加 callback 参数
    const callbackName = `SuggestData_${Date.now()}`;
    const url = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&key=${encodeURIComponent(val)}&callback=${callbackName}&_=${Date.now()}`;

    try {
      await new Promise((resolve, reject) => {
        window[callbackName] = (data) => {
          if (data && data.Datas) {
            // 过滤出基金类型的数据 (CATEGORY 为 700 是公募基金)
            const fundsOnly = data.Datas.filter(d =>
              d.CATEGORY === 700 ||
              d.CATEGORY === "700" ||
              d.CATEGORYDESC === "基金"
            );
            setSearchResults(fundsOnly);
          }
          delete window[callbackName];
          resolve();
        };

        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => {
          if (document.body.contains(script)) document.body.removeChild(script);
        };
        script.onerror = () => {
          if (document.body.contains(script)) document.body.removeChild(script);
          delete window[callbackName];
          reject(new Error('搜索请求失败'));
        };
        document.body.appendChild(script);
      });
    } catch (e) {
      console.error('搜索失败', e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => performSearch(val), 300);
  };

  const toggleSelectFund = (fund) => {
    setSelectedFunds(prev => {
      const exists = prev.find(f => f.CODE === fund.CODE);
      if (exists) {
        return prev.filter(f => f.CODE !== fund.CODE);
      }
      return [...prev, fund];
    });
  };

  const batchAddFunds = async () => {
    if (selectedFunds.length === 0) return;
    setLoading(true);
    setError('');

    try {
      const newFunds = [];
      for (const f of selectedFunds) {
        if (funds.some(existing => existing.code === f.CODE)) continue;
        try {
          const data = await fetchFundData(f.CODE);
          newFunds.push(data);
        } catch (e) {
          console.error(`添加基金 ${f.CODE} 失败`, e);
        }
      }

      if (newFunds.length > 0) {
        const updated = dedupeByCode([...newFunds, ...funds]);
        setFunds(updated);
        storageHelper.setItem('funds', JSON.stringify(updated));

        setCollapsedCodes(prev => {
          const nextSet = new Set(prev);
          newFunds.forEach(f => nextSet.add(f.code));
          storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(nextSet)));
          return nextSet;
        });
      }

      setSelectedFunds([]);
      setSearchTerm('');
      setSearchResults([]);
    } catch (e) {
      setError('批量添加失败');
    } finally {
      setLoading(false);
    }
  };

  const refreshAll = async (codes) => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;
    setRefreshing(true);
    const uniqueCodes = Array.from(new Set(codes));
    try {
      const updated = [];
      for (const c of uniqueCodes) {
        try {
          const data = await fetchFundData(c);
          updated.push(data);
        } catch (e) {
          console.error(`刷新基金 ${c} 失败`, e);
          // 失败时从当前 state 中寻找旧数据
          setFunds(prev => {
            const old = prev.find((f) => f.code === c);
            if (old) updated.push(old);
            return prev;
          });
        }
      }

      if (updated.length > 0) {
        setFunds(prev => {
          // 将更新后的数据合并回当前最新的 state 中，防止覆盖掉刚刚导入的数据
          const merged = [...prev];
          updated.forEach(u => {
            const idx = merged.findIndex(f => f.code === u.code);
            if (idx > -1) {
              merged[idx] = u;
            } else {
              merged.push(u);
            }
          });
          const deduped = dedupeByCode(merged);
          storageHelper.setItem('funds', JSON.stringify(deduped));
          return deduped;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      refreshingRef.current = false;
      setRefreshing(false);
    }
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'card' ? 'list' : 'card';
    setViewMode(nextMode);
  };

  const requestRemoveFund = (fund) => {
    const h = holdings[fund.code];
    const hasHolding = h && typeof h.share === 'number' && h.share > 0;
    if (hasHolding) {
      setFundDeleteConfirm({ code: fund.code, name: fund.name });
    } else {
      removeFund(fund.code);
    }
  };

  const addFund = async (e) => {
    e?.preventDefault?.();
    setError('');
    const manualTokens = String(searchTerm || '')
      .split(/[^0-9A-Za-z]+/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
    const selectedCodes = Array.from(new Set([
      ...selectedFunds.map(f => f.CODE),
      ...manualTokens.filter(t => /^\d{6}$/.test(t))
    ]));
    if (selectedCodes.length === 0) {
      setError('请输入或选择基金代码');
      return;
    }
    setLoading(true);
    try {
      const newFunds = [];
      const failures = [];
      const nameMap = {};
      selectedFunds.forEach(f => { nameMap[f.CODE] = f.NAME; });
      for (const c of selectedCodes) {
        if (funds.some((f) => f.code === c)) continue;
        try {
          const data = await fetchFundData(c);
          newFunds.push(data);
        } catch (err) {
          failures.push({ code: c, name: nameMap[c] });
        }
      }
      if (newFunds.length === 0) {
        setError('未添加任何新基金');
      } else {
        const next = dedupeByCode([...newFunds, ...funds]);
        setFunds(next);
        storageHelper.setItem('funds', JSON.stringify(next));

        setCollapsedCodes(prev => {
          const nextSet = new Set(prev);
          newFunds.forEach(f => nextSet.add(f.code));
          storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(nextSet)));
          return nextSet;
        });
      }
      setSearchTerm('');
      setSelectedFunds([]);
      setShowDropdown(false);
      if (failures.length > 0) {
        setAddFailures(failures);
        setAddResultOpen(true);
      }
    } catch (e) {
      setError(e.message || '添加失败');
    } finally {
      setLoading(false);
    }
  };

  const removeFund = (removeCode) => {
    const next = funds.filter((f) => f.code !== removeCode);
    setFunds(next);
    storageHelper.setItem('funds', JSON.stringify(next));

    // 同步删除分组中的失效代码
    const nextGroups = groups.map(g => ({
      ...g,
      codes: g.codes.filter(c => c !== removeCode)
    }));
    setGroups(nextGroups);
    storageHelper.setItem('groups', JSON.stringify(nextGroups));

    // 同步删除展开收起状态
    setCollapsedCodes(prev => {
      if (!prev.has(removeCode)) return prev;
      const nextSet = new Set(prev);
      nextSet.delete(removeCode);
      storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(nextSet)));
      return nextSet;
    });

    // 同步删除自选状态
    setFavorites(prev => {
      if (!prev.has(removeCode)) return prev;
      const nextSet = new Set(prev);
      nextSet.delete(removeCode);
      storageHelper.setItem('favorites', JSON.stringify(Array.from(nextSet)));
      if (nextSet.size === 0) setCurrentTab('all');
      return nextSet;
    });

    // 同步删除持仓数据
    setHoldings(prev => {
      if (!prev[removeCode]) return prev;
      const next = { ...prev };
      delete next[removeCode];
      storageHelper.setItem('holdings', JSON.stringify(next));
      return next;
    });
  };

  const manualRefresh = async () => {
    if (refreshingRef.current) return;
    const codes = Array.from(new Set(funds.map((f) => f.code)));
    if (!codes.length) return;
    await refreshAll(codes);
  };

  const saveSettings = (e) => {
    e?.preventDefault?.();
    const ms = Math.max(10, Number(tempSeconds)) * 1000;
    setRefreshMs(ms);
    storageHelper.setItem('refreshMs', String(ms));
    setSettingsOpen(false);
  };

  const importFileRef = useRef(null);
  const [importMsg, setImportMsg] = useState('');

  function getComparablePayload(payload) {
    if (!payload || typeof payload !== 'object') return '';
    return JSON.stringify({
      funds: Array.isArray(payload.funds) ? payload.funds : [],
      favorites: Array.isArray(payload.favorites) ? payload.favorites : [],
      groups: Array.isArray(payload.groups) ? payload.groups : [],
      collapsedCodes: Array.isArray(payload.collapsedCodes) ? payload.collapsedCodes : [],
      refreshMs: Number.isFinite(payload.refreshMs) ? payload.refreshMs : 30000,
      holdings: payload.holdings && typeof payload.holdings === 'object' ? payload.holdings : {}
    });
  }

  const collectLocalPayload = () => {
    try {
      const funds = JSON.parse(localStorage.getItem('funds') || '[]');
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      const collapsedCodes = JSON.parse(localStorage.getItem('collapsedCodes') || '[]');
      const fundCodes = new Set(
        Array.isArray(funds)
          ? funds.map((f) => f?.code).filter(Boolean)
          : []
      );
      const holdings = JSON.parse(localStorage.getItem('holdings') || '{}');
      const cleanedHoldings = holdings && typeof holdings === 'object' && !Array.isArray(holdings)
        ? Object.entries(holdings).reduce((acc, [code, value]) => {
          if (!fundCodes.has(code) || !value || typeof value !== 'object') return acc;
          const parsedShare = typeof value.share === 'number'
            ? value.share
            : typeof value.share === 'string'
              ? Number(value.share)
              : NaN;
          const parsedCost = typeof value.cost === 'number'
            ? value.cost
            : typeof value.cost === 'string'
              ? Number(value.cost)
              : NaN;
          const nextShare = Number.isFinite(parsedShare) ? parsedShare : null;
          const nextCost = Number.isFinite(parsedCost) ? parsedCost : null;
          if (nextShare === null && nextCost === null) return acc;
          acc[code] = {
            ...value,
            share: nextShare,
            cost: nextCost
          };
          return acc;
        }, {})
        : {};
      const cleanedFavorites = Array.isArray(favorites)
        ? favorites.filter((code) => fundCodes.has(code))
        : [];
      const cleanedCollapsed = Array.isArray(collapsedCodes)
        ? collapsedCodes.filter((code) => fundCodes.has(code))
        : [];
      const cleanedGroups = Array.isArray(groups)
        ? groups.map((group) => ({
          ...group,
          codes: Array.isArray(group?.codes)
            ? group.codes.filter((code) => fundCodes.has(code))
            : []
        }))
        : [];
      return {
        funds,
        favorites: cleanedFavorites,
        groups: cleanedGroups,
        collapsedCodes: cleanedCollapsed,
        refreshMs: parseInt(localStorage.getItem('refreshMs') || '30000', 10),
        holdings: cleanedHoldings,
        exportedAt: new Date().toISOString()
      };
    } catch (e) {
      console.warn('[导出] 收集本地数据失败:', e?.message);
      return {
        funds: [],
        favorites: [],
        groups: [],
        collapsedCodes: [],
        refreshMs: 30000,
        holdings: {},
        exportedAt: new Date().toISOString()
      };
    }
  };

  const applyCloudConfig = async (cloudData, cloudUpdatedAt) => {
    if (!cloudData || typeof cloudData !== 'object') return;
    skipSyncRef.current = true;
    try {
      if (cloudUpdatedAt) {
        storageHelper.setItem('localUpdatedAt', new Date(cloudUpdatedAt).toISOString());
      }
      const nextFunds = Array.isArray(cloudData.funds) ? dedupeByCode(cloudData.funds) : [];
      setFunds(nextFunds);
      storageHelper.setItem('funds', JSON.stringify(nextFunds));

      const nextFavorites = Array.isArray(cloudData.favorites) ? cloudData.favorites : [];
      setFavorites(new Set(nextFavorites));
      storageHelper.setItem('favorites', JSON.stringify(nextFavorites));

      const nextGroups = Array.isArray(cloudData.groups) ? cloudData.groups : [];
      setGroups(nextGroups);
      storageHelper.setItem('groups', JSON.stringify(nextGroups));

      const nextCollapsed = Array.isArray(cloudData.collapsedCodes) ? cloudData.collapsedCodes : [];
      setCollapsedCodes(new Set(nextCollapsed));
      storageHelper.setItem('collapsedCodes', JSON.stringify(nextCollapsed));

      const nextRefreshMs = Number.isFinite(cloudData.refreshMs) && cloudData.refreshMs >= 5000 ? cloudData.refreshMs : 30000;
      setRefreshMs(nextRefreshMs);
      setTempSeconds(Math.round(nextRefreshMs / 1000));
      storageHelper.setItem('refreshMs', String(nextRefreshMs));

      if (cloudData.viewMode === 'card' || cloudData.viewMode === 'list') {
        setViewMode(cloudData.viewMode);
      }

      const nextHoldings = cloudData.holdings && typeof cloudData.holdings === 'object' ? cloudData.holdings : {};
      setHoldings(nextHoldings);
      storageHelper.setItem('holdings', JSON.stringify(nextHoldings));

      if (nextFunds.length) {
        const codes = Array.from(new Set(nextFunds.map((f) => f.code)));
        if (codes.length) await refreshAll(codes);
      }

      const payload = collectLocalPayload();
      lastSyncedRef.current = getComparablePayload(payload);
    } finally {
      skipSyncRef.current = false;
    }
  };

  const fetchCloudConfig = async (userId) => {
    if (!userId) return;
    try {
      const { data, error } = await supabase
        .from('user_configs')
        .select('id, data, updated_at')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw error;
      if (!data?.id) {
        const { error: insertError } = await supabase
          .from('user_configs')
          .insert({ user_id: userId });
        if (insertError) throw insertError;
        setCloudConfigModal({ open: true, userId, type: 'empty' });
        return;
      }
      if (data?.data && typeof data.data === 'object' && Object.keys(data.data).length > 0) {
        const localPayload = collectLocalPayload();
        const localComparable = getComparablePayload(localPayload);
        const cloudComparable = getComparablePayload(data.data);

        if (localComparable !== cloudComparable) {
          // 如果数据不一致，无论时间戳如何，都提示用户
          // 用户可以选择使用本地数据覆盖云端，或者使用云端数据覆盖本地
          setCloudConfigModal({ open: true, userId, type: 'conflict', cloudData: data.data });
          return;
        }

        await applyCloudConfig(data.data, data.updated_at);
        return;
      }
      setCloudConfigModal({ open: true, userId, type: 'empty' });
    } catch (e) {
      console.error('获取云端配置失败', e);
    }
  };

  const syncUserConfig = async (userId, showTip = true) => {
    if (!userId) {
      showToast(`userId 不存在，请重新登录`, 'error');
      return;
    }
    try {
      setIsSyncing(true);
      const payload = collectLocalPayload();
      const now = new Date().toISOString();
      const { data: upsertData, error: updateError } = await supabase
        .from('user_configs')
        .upsert(
          { 
            user_id: userId, 
            data: payload, 
            updated_at: now
          }, 
          { onConflict: 'user_id' }
        )
        .select();

      if (updateError) throw updateError;
      if (!upsertData || upsertData.length === 0) {
        throw new Error('同步失败：未写入任何数据，请检查账号状态或重新登录');
      }
      
      storageHelper.setItem('localUpdatedAt', now);

      if (showTip) {
        setSuccessModal({ open: true, message: '已同步云端配置' });
      }
    } catch (e) {
      console.error('同步云端配置异常', e);
      showToast(`同步云端配置异常:${e}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncLocalConfig = async () => {
    const userId = cloudConfigModal.userId;
    setCloudConfigModal({ open: false, userId: null });
    await syncUserConfig(userId);
  };

  const exportLocalData = async () => {
    try {
      const payload = {
        funds: JSON.parse(localStorage.getItem('funds') || '[]'),
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        groups: JSON.parse(localStorage.getItem('groups') || '[]'),
        collapsedCodes: JSON.parse(localStorage.getItem('collapsedCodes') || '[]'),
        refreshMs: parseInt(localStorage.getItem('refreshMs') || '30000', 10),
        holdings: JSON.parse(localStorage.getItem('holdings') || '{}'),
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: `realtime-fund-config-${Date.now()}.json`,
          types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        setSuccessModal({ open: true, message: '导出成功' });
        setSettingsOpen(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `realtime-fund-config-${Date.now()}.json`;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        URL.revokeObjectURL(url);
        setSuccessModal({ open: true, message: '导出成功' });
        setSettingsOpen(false);
      };
      const onVisibility = () => {
        if (document.visibilityState === 'hidden') return;
        finish();
        document.removeEventListener('visibilitychange', onVisibility);
      };
      document.addEventListener('visibilitychange', onVisibility, { once: true });
      a.click();
      setTimeout(finish, 3000);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const handleImportFileChange = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      const data = JSON.parse(text);
      if (data && typeof data === 'object') {
        // 从 localStorage 读取最新数据进行合并，防止状态滞后导致的数据丢失
        const currentFunds = JSON.parse(localStorage.getItem('funds') || '[]');
        const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const currentGroups = JSON.parse(localStorage.getItem('groups') || '[]');
        const currentCollapsed = JSON.parse(localStorage.getItem('collapsedCodes') || '[]');

        let mergedFunds = currentFunds;
        let appendedCodes = [];

        if (Array.isArray(data.funds)) {
          const incomingFunds = dedupeByCode(data.funds);
          const existingCodes = new Set(currentFunds.map(f => f.code));
          const newItems = incomingFunds.filter(f => f && f.code && !existingCodes.has(f.code));
          appendedCodes = newItems.map(f => f.code);
          mergedFunds = [...currentFunds, ...newItems];
          setFunds(mergedFunds);
          storageHelper.setItem('funds', JSON.stringify(mergedFunds));
        }

        if (Array.isArray(data.favorites)) {
          const mergedFav = Array.from(new Set([...currentFavorites, ...data.favorites]));
          setFavorites(new Set(mergedFav));
          storageHelper.setItem('favorites', JSON.stringify(mergedFav));
        }

        if (Array.isArray(data.groups)) {
          // 合并分组：如果 ID 相同则合并 codes，否则添加新分组
          const mergedGroups = [...currentGroups];
          data.groups.forEach(incomingGroup => {
            const existingIdx = mergedGroups.findIndex(g => g.id === incomingGroup.id);
            if (existingIdx > -1) {
              mergedGroups[existingIdx] = {
                ...mergedGroups[existingIdx],
                codes: Array.from(new Set([...mergedGroups[existingIdx].codes, ...(incomingGroup.codes || [])]))
              };
            } else {
              mergedGroups.push(incomingGroup);
            }
          });
          setGroups(mergedGroups);
          storageHelper.setItem('groups', JSON.stringify(mergedGroups));
        }

        if (Array.isArray(data.collapsedCodes)) {
          const mergedCollapsed = Array.from(new Set([...currentCollapsed, ...data.collapsedCodes]));
          setCollapsedCodes(new Set(mergedCollapsed));
          storageHelper.setItem('collapsedCodes', JSON.stringify(mergedCollapsed));
        }

        if (typeof data.refreshMs === 'number' && data.refreshMs >= 5000) {
          setRefreshMs(data.refreshMs);
          setTempSeconds(Math.round(data.refreshMs / 1000));
          storageHelper.setItem('refreshMs', String(data.refreshMs));
        }
        if (data.viewMode === 'card' || data.viewMode === 'list') {
          setViewMode(data.viewMode);
        }

        if (data.holdings && typeof data.holdings === 'object') {
          const mergedHoldings = { ...JSON.parse(localStorage.getItem('holdings') || '{}'), ...data.holdings };
          setHoldings(mergedHoldings);
          storageHelper.setItem('holdings', JSON.stringify(mergedHoldings));
        }

        // 导入成功后，仅刷新新追加的基金
        if (appendedCodes.length) {
          // 这里需要确保 refreshAll 不会因为闭包问题覆盖掉刚刚合并好的 mergedFunds
          // 我们直接传入所有代码执行一次全量刷新是最稳妥的，或者修改 refreshAll 支持增量更新
          const allCodes = mergedFunds.map(f => f.code);
          await refreshAll(allCodes);
        }

        setSuccessModal({ open: true, message: '导入成功' });
        setSettingsOpen(false); // 导入成功自动关闭设置弹框
        if (importFileRef.current) importFileRef.current.value = '';
      }
    } catch (err) {
      console.error('Import error:', err);
      setImportMsg('导入失败，请检查文件格式');
      setTimeout(() => setImportMsg(''), 4000);
      if (importFileRef.current) importFileRef.current.value = '';
    }
  };

  useEffect(() => {
    const isAnyModalOpen =
      settingsOpen ||
      feedbackOpen ||
      addResultOpen ||
      addFundToGroupOpen ||
      groupManageOpen ||
      groupModalOpen ||
      successModal.open ||
      cloudConfigModal.open ||
      logoutConfirmOpen ||
      holdingModal.open ||
      actionModal.open ||
      tradeModal.open ||
      !!clearConfirm ||
      donateOpen ||
      !!fundDeleteConfirm ||
      updateModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [
    settingsOpen,
    feedbackOpen,
    addResultOpen,
    addFundToGroupOpen,
    groupManageOpen,
    groupModalOpen,
    successModal.open,
    cloudConfigModal.open,
    logoutConfirmOpen,
    holdingModal.open,
    actionModal.open,
    tradeModal.open,
    clearConfirm,
    donateOpen,
    updateModalOpen
  ]);

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape' && settingsOpen) setSettingsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settingsOpen]);

  const getGroupName = () => {
    if (currentTab === 'all') return '全部资产';
    if (currentTab === 'fav') return '自选资产';
    const group = groups.find(g => g.id === currentTab);
    return group ? `${group.name}资产` : '分组资产';
  };

  return (
    <div className="container content">
      <Announcement />
      <div className="navbar glass">
        {refreshing && <div className="loading-bar"></div>}
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2" />
            <path d="M5 14c2-4 7-6 14-5" stroke="var(--primary)" strokeWidth="2" />
          </svg>
          <span>基估宝</span>
          <AnimatePresence>
            {isSyncing && (
              <motion.div
                key="sync-icon"
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}
                title="正在同步到云端..."
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" stroke="var(--primary)" />
                  <path d="M12 12v9" stroke="var(--accent)" />
                  <path d="m16 16-4-4-4 4" stroke="var(--accent)" />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="actions">
          {hasUpdate && (
            <div
              className="badge"
              title={`发现新版本 ${latestVersion}，点击前往下载`}
              style={{ cursor: 'pointer', borderColor: 'var(--success)', color: 'var(--success)' }}
              onClick={() => setUpdateModalOpen(true)}
            >
              <UpdateIcon width="14" height="14" />
            </div>
          )}
          <img alt="项目Github地址" src={githubImg.src} style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => window.open("https://github.com/hzm0321/real-time-fund")} />
          <div className="badge" title="当前刷新频率">
            <span>刷新</span>
            <strong>{Math.round(refreshMs / 1000)}秒</strong>
          </div>
          <button
            className="icon-button"
            aria-label="立即刷新"
            onClick={manualRefresh}
            disabled={refreshing || funds.length === 0}
            aria-busy={refreshing}
            title="立即刷新"
          >
            <RefreshIcon className={refreshing ? 'spin' : ''} width="18" height="18" />
          </button>
          {/*<button*/}
          {/*  className="icon-button"*/}
          {/*  aria-label="打开设置"*/}
          {/*  onClick={() => setSettingsOpen(true)}*/}
          {/*  title="设置"*/}
          {/*  hidden*/}
          {/*>*/}
          {/*  <SettingsIcon width="18" height="18" />*/}
          {/*</button>*/}
          {/* 用户菜单 */}
          <div className="user-menu-container" ref={userMenuRef}>
            <button
              className={`icon-button user-menu-trigger ${user ? 'logged-in' : ''}`}
              aria-label={user ? '用户菜单' : '登录'}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title={user ? (user.email || '用户') : '用户菜单'}
            >
              {user ? (
                <div className="user-avatar-small">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="用户头像"
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                  ) : (
                    (user.email?.charAt(0).toUpperCase() || 'U')
                  )}
                </div>
              ) : (
                <UserIcon width="18" height="18" />
              )}
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  className="user-menu-dropdown glass"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: 'top right' }}
                >
                  {user ? (
                    <>
                      <div className="user-menu-header">
                        <div className="user-avatar-large">
                          {userAvatar ? (
                            <img
                              src={userAvatar}
                              alt="用户头像"
                              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                            />
                          ) : (
                            (user.email?.charAt(0).toUpperCase() || 'U')
                          )}
                        </div>
                        <div className="user-info">
                          <span className="user-email">{user.email}</span>
                          <span className="user-status">已登录</span>
                        </div>
                      </div>
                      <div className="user-menu-divider" />
                      <button
                        className="user-menu-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setSettingsOpen(true);
                        }}
                      >
                        <SettingsIcon width="16" height="16" />
                        <span>设置</span>
                      </button>
                      <button
                        className="user-menu-item danger"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setLogoutConfirmOpen(true);
                        }}
                      >
                        <LogoutIcon width="16" height="16" />
                        <span>登出</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="user-menu-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setLoginModalOpen(true);
                        }}
                      >
                        <LoginIcon width="16" height="16" />
                        <span>登录</span>
                      </button>
                      <button
                        className="user-menu-item"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setSettingsOpen(true);
                        }}
                      >
                        <SettingsIcon width="16" height="16" />
                        <span>设置</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12 glass card add-fund-section" role="region" aria-label="添加基金">
          <div className="title" style={{ marginBottom: 12 }}>
            <PlusIcon width="20" height="20" />
            <span>添加基金</span>
            <span className="muted">搜索并选择基金（支持名称或代码）</span>
          </div>

          <div className="search-container" ref={dropdownRef}>
            <form className="form" onSubmit={addFund}>
              <div className="search-input-wrapper" style={{ flex: 1, gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {selectedFunds.length > 0 && (
                  <div className="selected-inline-chips">
                    {selectedFunds.map(fund => (
                      <div key={fund.CODE} className="fund-chip">
                        <span>{fund.NAME}</span>
                        <button onClick={() => toggleSelectFund(fund)} className="remove-chip">
                          <CloseIcon width="14" height="14" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  className="input"
                  placeholder="搜索基金名称或代码..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  onFocus={() => {
                    setShowDropdown(true);
                    setFocusedSearchIndex(-1);
                  }}
                  onKeyDown={(e) => {
                    if (!showDropdown || searchResults.length === 0) return;
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setFocusedSearchIndex(prev =>
                        prev < searchResults.length - 1 ? prev + 1 : 0
                      );
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setFocusedSearchIndex(prev =>
                        prev > 0 ? prev - 1 : searchResults.length - 1
                      );
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      if (focusedSearchIndex >= 0 && focusedSearchIndex < searchResults.length) {
                        const fund = searchResults[focusedSearchIndex];
                        const isAlreadyAdded = funds.some(f => f.code === fund.CODE);
                        if (!isAlreadyAdded) toggleSelectFund(fund);
                      }
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      setShowDropdown(false);
                      setFocusedSearchIndex(-1);
                    }
                  }}
                />
                {isSearching && <div className="search-spinner" />}
              </div>
              <button
                className="button"
                type="submit"
                disabled={loading || refreshing}
                style={{pointerEvents: refreshing ? 'none' : 'auto', opacity: refreshing ? 0.6 : 1}}
              >
                {loading ? '添加中…' : '添加'}
              </button>
            </form>

            <AnimatePresence>
              {showDropdown && (searchTerm.trim() || searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="search-dropdown glass"
                >
                  {searchResults.length > 0 ? (
                    <div className="search-results">
                      {searchResults.map((fund, idx) => {
                        const isSelected = selectedFunds.some(f => f.CODE === fund.CODE);
                        const isAlreadyAdded = funds.some(f => f.code === fund.CODE);
                        const isFocused = idx === focusedSearchIndex;
                        return (
                          <div
                            key={fund.CODE}
                            className={`search-item ${isSelected ? 'selected' : ''} ${isAlreadyAdded ? 'added' : ''} ${isFocused ? 'focused' : ''}`}
                            onClick={() => {
                              if (isAlreadyAdded) return;
                              toggleSelectFund(fund);
                            }}
                            onMouseEnter={() => setFocusedSearchIndex(idx)}
                          >
                            <div className="fund-info">
                              <span className="fund-name">{fund.NAME}</span>
                              <span className="fund-code muted">#{fund.CODE} | {fund.TYPE}</span>
                            </div>
                            {isAlreadyAdded ? (
                              <span className="added-label">已添加</span>
                            ) : (
                              <div className="checkbox">
                                {isSelected && <div className="checked-mark" />}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : searchTerm.trim() && !isSearching ? (
                    <div className="no-results muted">未找到相关基金</div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>



          {error && <div className="muted" style={{ marginTop: 8, color: 'var(--danger)' }}>{error}</div>}
        </div>

        <div className="col-12">
          <div className="filter-bar" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div className="tabs-container">
              <div
                className="tabs-scroll-area"
                data-mask-left={canLeft}
                data-mask-right={canRight}
              >
                <div
                  className="tabs"
                  ref={tabsRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeaveOrUp}
                  onMouseUp={handleMouseLeaveOrUp}
                  onMouseMove={handleMouseMove}
                  onWheel={handleWheel}
                  onScroll={updateTabOverflow}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      key="all"
                      className={`tab ${currentTab === 'all' ? 'active' : ''}`}
                      onClick={() => setCurrentTab('all')}
                      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
                    >
                      全部 ({funds.length})
                    </motion.button>
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      key="fav"
                      className={`tab ${currentTab === 'fav' ? 'active' : ''}`}
                      onClick={() => setCurrentTab('fav')}
                      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
                    >
                      自选 ({favorites.size})
                    </motion.button>
                    {groups.map(g => (
                      <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={g.id}
                        className={`tab ${currentTab === g.id ? 'active' : ''}`}
                        onClick={() => setCurrentTab(g.id)}
                        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
                      >
                        {g.name} ({g.codes.length})
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              {groups.length > 0 && (
                <button
                  className="icon-button manage-groups-btn"
                  onClick={() => setGroupManageOpen(true)}
                  title="管理分组"
                >
                  <SortIcon width="16" height="16" />
                </button>
              )}
              <button
                className="icon-button add-group-btn"
                onClick={() => setGroupModalOpen(true)}
                title="新增分组"
              >
                <PlusIcon width="16" height="16" />
              </button>
            </div>

            <div className="sort-group" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="view-toggle" style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '2px' }}>
                <button
                  className={`icon-button ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => { setViewMode('card'); }}
                  style={{ border: 'none', width: '32px', height: '32px', background: viewMode === 'card' ? 'var(--primary)' : 'transparent', color: viewMode === 'card' ? '#05263b' : 'var(--muted)' }}
                  title="卡片视图"
                >
                  <GridIcon width="16" height="16" />
                </button>
                <button
                  className={`icon-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => { setViewMode('list'); }}
                  style={{ border: 'none', width: '32px', height: '32px', background: viewMode === 'list' ? 'var(--primary)' : 'transparent', color: viewMode === 'list' ? '#05263b' : 'var(--muted)' }}
                  title="表格视图"
                >
                  <ListIcon width="16" height="16" />
                </button>
              </div>

              <div className="divider" style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

              <div className="sort-items" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="muted" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <SortIcon width="14" height="14" />
                  排序
                </span>
                <div className="chips">
                  {[
                    { id: 'default', label: '默认' },
                    { id: 'yield', label: '涨跌幅' },
                    { id: 'holding', label: '持有收益' },
                    { id: 'name', label: '名称' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      className={`chip ${sortBy === s.id ? 'active' : ''}`}
                      onClick={() => {
                        if (sortBy === s.id) {
                          // 同一按钮重复点击，切换升序/降序
                          setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                        } else {
                          // 切换到新的排序字段，默认用降序
                          setSortBy(s.id);
                          setSortOrder('desc');
                        }
                      }}
                      style={{ height: '28px', fontSize: '12px', padding: '0 10px', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <span>{s.label}</span>
                      {s.id !== 'default' && sortBy === s.id && (
                        <span
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            lineHeight: 1,
                            fontSize: '8px',
                          }}
                        >
                          <span style={{ opacity: sortOrder === 'asc' ? 1 : 0.3 }}>▲</span>
                          <span style={{ opacity: sortOrder === 'desc' ? 1 : 0.3 }}>▼</span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isInitialLoading ? (
            <div className="glass card" style={{ padding: '32px 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    padding: '20px',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(90deg, var(--border-subtle) 25%, var(--border-default) 50%, var(--border-subtle) 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite'
                    }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{
                        width: '60%',
                        height: 16,
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, var(--border-subtle) 25%, var(--border-default) 50%, var(--border-subtle) 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite'
                      }} />
                      <div style={{
                        width: '40%',
                        height: 12,
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, var(--border-subtle) 25%, var(--border-default) 50%, var(--border-subtle) 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite'
                      }} />
                    </div>
                    <div style={{
                      width: 80,
                      height: 36,
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(90deg, var(--border-subtle) 25%, var(--border-default) 50%, var(--border-subtle) 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite'
                    }} />
                  </div>
                ))}
              </div>
            </div>
          ) : displayFunds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass card empty"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 40px',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                fontSize: 36
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: 'var(--text-primary)'
              }}>
                {funds.length === 0 ? '开始追踪您的基金' : '该分组暂无数据'}
              </h3>
              <p className="muted" style={{
                fontSize: 14,
                marginBottom: 24,
                maxWidth: 280,
                lineHeight: 1.6
              }}>
                {funds.length === 0
                  ? '在上方输入框输入基金代码，例如 110022 或 000001，开始实时追踪基金估值'
                  : '从全部基金中添加基金到此分组'}
              </p>
              <div style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {funds.length === 0 && (
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    {['110022', '000961', '161725'].map(code => (
                      <button
                        key={code}
                        className="chip"
                        onClick={() => {
                          setSearchTerm(code);
                          setTimeout(() => {
                            document.querySelector('.input')?.focus();
                          }, 100);
                        }}
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                )}
                {currentTab !== 'all' && currentTab !== 'fav' && funds.length > 0 && (
                  <button className="button" onClick={() => setAddFundToGroupOpen(true)}>
                    添加到此分组
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              <GroupSummary
                funds={displayFunds}
                holdings={holdings}
                groupName={getGroupName()}
                getProfit={getHoldingProfit}
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 8,
                marginBottom: 12
              }}>
                <button
                  className="chip"
                  onClick={() => {
                    const allCodes = displayFunds.map(f => f.code);
                    setCollapsedCodes(prev => {
                      const nextSet = new Set(prev);
                      allCodes.forEach(c => nextSet.add(c));
                      storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(nextSet)));
                      return nextSet;
                    });
                  }}
                  style={{ fontSize: 13 }}
                >
                  全部折叠
                </button>
                <button
                  className="chip"
                  onClick={() => {
                    const allCodes = displayFunds.map(f => f.code);
                    setCollapsedCodes(prev => {
                      const nextSet = new Set(prev);
                      allCodes.forEach(c => nextSet.delete(c));
                      storageHelper.setItem('collapsedCodes', JSON.stringify(Array.from(nextSet)));
                      return nextSet;
                    });
                  }}
                  style={{ fontSize: 13 }}
                >
                  全部展开
                </button>
              </div>

              {currentTab !== 'all' && currentTab !== 'fav' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="button-dashed"
                  onClick={() => setAddFundToGroupOpen(true)}
                  style={{
                    width: '100%',
                    height: '48px',
                    border: '2px dashed rgba(255,255,255,0.1)',
                    background: 'transparent',
                    borderRadius: '12px',
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.background = 'rgba(34, 211, 238, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <PlusIcon width="18" height="18" />
                  <span>添加基金到此分组</span>
                </motion.button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={viewMode === 'card' ? 'grid' : 'table-container glass'}
                >
                  <div className={viewMode === 'card' ? 'grid col-12' : ''} style={viewMode === 'card' ? { gridColumn: 'span 12', gap: 16 } : {}}>
                    {viewMode === 'list' && (
                      <div className="table-header-row">
                        <div className="table-header-cell">基金名称</div>
                        <div className="table-header-cell text-right">净值/估值</div>
                        <div className="table-header-cell text-right">涨跌幅</div>
                        <div className="table-header-cell text-right">估值时间</div>
                        <div className="table-header-cell text-right">持仓金额</div>
                        <div className="table-header-cell text-right">当日盈亏</div>
                        <div className="table-header-cell text-right">持有收益</div>
                        <div className="table-header-cell text-center">操作</div>
                      </div>
                    )}
                    <AnimatePresence mode="popLayout">
                      {displayFunds.map((f) => (
                        <motion.div
                          layout="position"
                          key={f.code}
                          className={viewMode === 'card' ? 'col-6' : 'table-row-wrapper'}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          style={{ position: 'relative', overflow: 'hidden' }}
                        >
                          {viewMode === 'list' && isMobile && (
                            <div
                              className="swipe-action-bg"
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止冒泡，防止触发全局收起导致状态混乱
                                if (refreshing) return;
                                requestRemoveFund(f);
                              }}
                              style={{ pointerEvents: refreshing ? 'none' : 'auto', opacity: refreshing ? 0.6 : 1 }}
                            >
                              <TrashIcon width="18" height="18" />
                              <span>删除</span>
                            </div>
                          )}
                          <motion.div
                            className={viewMode === 'card' ? 'glass card' : 'table-row'}
                            drag={viewMode === 'list' && isMobile ? "x" : false}
                            dragConstraints={{ left: -80, right: 0 }}
                            dragElastic={0.1}
                            // 增加 dragDirectionLock 确保在垂直滚动时不会轻易触发水平拖拽
                            dragDirectionLock={true}
                            // 调整触发阈值，只有明显的水平拖拽意图才响应
                            onDragStart={(event, info) => {
                              // 如果水平移动距离小于垂直移动距离，或者水平速度很小，视为垂直滚动意图，不进行拖拽处理
                              // framer-motion 的 dragDirectionLock 已经处理了大部分情况，但可以进一步微调体验
                            }}
                            // 如果当前行不是被选中的行，强制回到原点 (x: 0)
                            animate={viewMode === 'list' && isMobile ? { x: swipedFundCode === f.code ? -80 : 0 } : undefined}
                            onDragEnd={(e, { offset, velocity }) => {
                              if (viewMode === 'list' && isMobile) {
                                if (offset.x < -40) {
                                  setSwipedFundCode(f.code);
                                } else {
                                  setSwipedFundCode(null);
                                }
                              }
                            }}
                            onClick={(e) => {
                              // 阻止事件冒泡，避免触发全局的 click listener 导致立刻被收起
                              // 只有在已经展开的情况下点击自身才需要阻止冒泡（或者根据需求调整）
                              // 这里我们希望：点击任何地方都收起。
                              // 如果点击的是当前行，且不是拖拽操作，上面的全局 listener 会处理收起。
                              // 但为了防止点击行内容触发收起后又立即触发行的其他点击逻辑（如果有的话），
                              // 可以在这里处理。不过当前需求是“点击其他区域收起”，
                              // 实际上全局 listener 已经覆盖了“点击任何区域（包括其他行）收起”。
                              // 唯一的问题是：点击当前行的“删除按钮”时，会先触发全局 click 导致收起，然后触发删除吗？
                              // 删除按钮在底层，通常不会受影响，因为 React 事件和原生事件的顺序。
                              // 但为了保险，删除按钮的 onClick 应该阻止冒泡。

                              // 如果当前行已展开，点击行内容（非删除按钮）应该收起
                              if (viewMode === 'list' && isMobile && swipedFundCode === f.code) {
                                e.stopPropagation(); // 阻止冒泡，自己处理收起，避免触发全局再次处理
                                setSwipedFundCode(null);
                              }
                            }}
                            style={{
                              background: viewMode === 'list' ? 'var(--bg)' : undefined,
                              position: 'relative',
                              zIndex: 1
                            }}
                          >
                            {viewMode === 'list' ? (
                              <>
                                <div className="table-cell name-cell">
                                  {currentTab !== 'all' && currentTab !== 'fav' ? (
                                    <button
                                      className="icon-button fav-button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeFundFromCurrentGroup(f.code);
                                      }}
                                      title="从当前分组移除"
                                    >
                                      <ExitIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
                                    </button>
                                  ) : (
                                    <button
                                      className={`icon-button fav-button ${favorites.has(f.code) ? 'active' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(f.code);
                                      }}
                                      title={favorites.has(f.code) ? "取消自选" : "添加自选"}
                                    >
                                      <StarIcon width="18" height="18" filled={favorites.has(f.code)} />
                                    </button>
                                  )}
                                  <div className="title-text">
                                    <span
                                      className={`name-text ${f.jzrq === todayStr ? 'updated' : ''}`}
                                      title={f.jzrq === todayStr ? "今日净值已更新" : ""}
                                    >
                                      {f.name}
                                    </span>
                                    <span className="muted code-text">#{f.code}</span>
                                  </div>
                                </div>
                                {(() => {
                                  const now = new Date();
                                  const isAfter9 = now.getHours() >= 9;
                                  const hasTodayData = f.jzrq === todayStr;
                                  const shouldHideChange = isTradingDay && isAfter9 && !hasTodayData;

                                  if (!shouldHideChange) {
                                    // 如果涨跌幅列显示（即非交易时段或今日净值已更新），则显示单位净值和真实涨跌幅
                                    return (
                                      <>
                                        <div className="table-cell text-right value-cell">
                                          <span style={{ fontWeight: 700 }}>{f.dwjz ?? '—'}</span>
                                        </div>
                                        <div className="table-cell text-right change-cell">
                                          <span className={f.zzl > 0 ? 'up' : f.zzl < 0 ? 'down' : ''} style={{ fontWeight: 700 }}>
                                            {f.zzl !== undefined ? `${f.zzl > 0 ? '+' : ''}${Number(f.zzl).toFixed(2)}%` : ''}
                                          </span>
                                        </div>
                                      </>
                                    );
                                  } else {
                                    // 否则显示估值净值和估值涨跌幅
                                    // 如果是无估值数据的基金，直接显示净值数据
                                    if (f.noValuation) {
                                      return (
                                        <>
                                          <div className="table-cell text-right value-cell">
                                            <span style={{ fontWeight: 700 }}>{f.dwjz ?? '—'}</span>
                                          </div>
                                          <div className="table-cell text-right change-cell">
                                            <span className={f.zzl > 0 ? 'up' : f.zzl < 0 ? 'down' : ''} style={{ fontWeight: 700 }}>
                                              {f.zzl !== undefined && f.zzl !== null ? `${f.zzl > 0 ? '+' : ''}${Number(f.zzl).toFixed(2)}%` : '—'}
                                            </span>
                                          </div>
                                        </>
                                      );
                                    }
                                    return (
                                      <>
                                        <div className="table-cell text-right value-cell">
                                          <span style={{ fontWeight: 700 }}>{f.estPricedCoverage > 0.05 ? f.estGsz.toFixed(4) : (f.gsz ?? '—')}</span>
                                        </div>
                                        <div className="table-cell text-right change-cell">
                                          <span className={f.estPricedCoverage > 0.05 ? (f.estGszzl > 0 ? 'up' : f.estGszzl < 0 ? 'down' : '') : (Number(f.gszzl) > 0 ? 'up' : Number(f.gszzl) < 0 ? 'down' : '')} style={{ fontWeight: 700 }}>
                                            {f.estPricedCoverage > 0.05 ? `${f.estGszzl > 0 ? '+' : ''}${f.estGszzl.toFixed(2)}%` : (typeof f.gszzl === 'number' ? `${f.gszzl > 0 ? '+' : ''}${f.gszzl.toFixed(2)}%` : f.gszzl ?? '—')}
                                          </span>
                                        </div>
                                      </>
                                    );
                                  }
                                })()}
                                <div className="table-cell text-right time-cell">
                                  <span className="muted" style={{ fontSize: '12px' }}>{f.noValuation ? (f.jzrq || '-') : (f.gztime || f.time || '-')}</span>
                                </div>
                                {!isMobile && (() => {
                                  const profit = profitCache[f.code];
                                  const amount = profit ? profit.amount : null;
                                  if (amount === null) {
                                    return (
                                      <div
                                        className="table-cell text-right holding-amount-cell"
                                        title="设置持仓"
                                        onClick={(e) => { e.stopPropagation(); setHoldingModal({ open: true, fund: f }); }}
                                      >
                                        <span className="muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '12px', cursor: 'pointer' }}>
                                          未设置 <SettingsIcon width="12" height="12" />
                                        </span>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div
                                      className="table-cell text-right holding-amount-cell"
                                      title="点击设置持仓"
                                      onClick={(e) => { e.stopPropagation(); setActionModal({ open: true, fund: f }); }}
                                    >
                                      <span style={{ fontWeight: 700, marginRight: 6 }}>¥{amount.toFixed(2)}</span>
                                      <button
                                        className="icon-button"
                                        onClick={(e) => { e.stopPropagation(); setActionModal({ open: true, fund: f }); }}
                                        title="编辑持仓"
                                        style={{ border: 'none', width: '28px', height: '28px', marginLeft: -6 }}
                                      >
                                        <SettingsIcon width="14" height="14" />
                                      </button>
                                    </div>
                                  );
                                })()}
                                {(() => {
                                  const profit = profitCache[f.code];
                                  const profitValue = profit ? profit.profitToday : null;
                                  const hasProfit = profitValue !== null;

                                  return (
                                    <div className="table-cell text-right profit-cell">
                                      <span
                                        className={hasProfit ? (profitValue > 0 ? 'up' : profitValue < 0 ? 'down' : '') : 'muted'}
                                        style={{ fontWeight: 700 }}
                                      >
                                        {hasProfit
                                          ? `${profitValue > 0 ? '+' : profitValue < 0 ? '-' : ''}¥${Math.abs(profitValue).toFixed(2)}`
                                          : ''}
                                      </span>
                                    </div>
                                  );
                                })()}
                                {!isMobile && (() => {
                                  const profit = profitCache[f.code];
                                  const total = profit ? profit.profitTotal : null;
                                  const holding = holdings[f.code];
                                  const principal = holding && holding.cost && holding.share ? holding.cost * holding.share : 0;
                                  const asPercent = percentModes[f.code];
                                  const hasTotal = total !== null;
                                  const formatted = hasTotal
                                    ? (asPercent && principal > 0
                                      ? `${total > 0 ? '+' : total < 0 ? '-' : ''}${Math.abs((total / principal) * 100).toFixed(2)}%`
                                      : `${total > 0 ? '+' : total < 0 ? '-' : ''}¥${Math.abs(total).toFixed(2)}`)
                                    : '';
                                  const cls = hasTotal ? (total > 0 ? 'up' : total < 0 ? 'down' : '') : 'muted';
                                  return (
                                    <div
                                      className="table-cell text-right holding-cell"
                                      title="点击切换金额/百分比"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (hasTotal) {
                                          setPercentModes(prev => ({ ...prev, [f.code]: !prev[f.code] }));
                                        }
                                      }}
                                      style={{ cursor: hasTotal ? 'pointer' : 'default' }}
                                    >
                                      <span className={cls} style={{ fontWeight: 700 }}>{formatted}</span>
                                    </div>
                                  );
                                })()}
                                <div className="table-cell text-center action-cell" style={{ gap: 4 }}>
                                  <button
                                    className="icon-button danger"
                                    onClick={() => !refreshing && requestRemoveFund(f)}
                                    title="删除"
                                    disabled={refreshing}
                                    style={{ width: '28px', height: '28px', opacity: refreshing ? 0.6 : 1, cursor: refreshing ? 'not-allowed' : 'pointer' }}
                                  >
                                    <TrashIcon width="14" height="14" />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="row" style={{ marginBottom: 10 }}>
                                  <div className="title">
                                    {currentTab !== 'all' && currentTab !== 'fav' ? (
                                      <button
                                        className="icon-button fav-button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeFundFromCurrentGroup(f.code);
                                        }}
                                        title="从当前分组移除"
                                      >
                                        <ExitIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
                                      </button>
                                    ) : (
                                      <button
                                        className={`icon-button fav-button ${favorites.has(f.code) ? 'active' : ''}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(f.code);
                                        }}
                                        title={favorites.has(f.code) ? "取消自选" : "添加自选"}
                                      >
                                        <StarIcon width="18" height="18" filled={favorites.has(f.code)} />
                                      </button>
                                    )}
                                    <div className="title-text">
                                      <span
                                        className={`name-text ${f.jzrq === todayStr ? 'updated' : ''}`}
                                        title={f.jzrq === todayStr ? "今日净值已更新" : ""}
                                      >
                                        {f.name}
                                      </span>
                                      <span className="muted">#{f.code}</span>
                                    </div>
                                  </div>

                                  <div className="actions">
                                    <div className="badge-v">
                                      <span>{f.noValuation ? '净值日期' : '估值时间'}</span>
                                      <strong>{f.noValuation ? (f.jzrq || '-') : (f.gztime || f.time || '-')}</strong>
                                    </div>
                                    <div className="row" style={{ gap: 4 }}>
                                      <button
                                        className="icon-button danger"
                                        onClick={() => !refreshing && requestRemoveFund(f)}
                                        title="删除"
                                        disabled={refreshing}
                                        style={{ width: '28px', height: '28px', opacity: refreshing ? 0.6 : 1, cursor: refreshing ? 'not-allowed' : 'pointer' }}
                                      >
                                        <TrashIcon width="14" height="14" />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="row" style={{ marginBottom: 12 }}>
                                  <Stat label="单位净值" value={f.dwjz ?? '—'} />
                                  {f.noValuation ? (
                                    // 无估值数据的基金，直接显示净值涨跌幅，不显示估值相关字段
                                    <Stat
                                      label="涨跌幅"
                                      value={f.zzl !== undefined && f.zzl !== null ? `${f.zzl > 0 ? '+' : ''}${Number(f.zzl).toFixed(2)}%` : '—'}
                                      delta={f.zzl}
                                    />
                                  ) : (
                                    <>
                                      {(() => {
                                        const now = new Date();
                                        const isAfter9 = now.getHours() >= 9;
                                        const hasTodayData = f.jzrq === todayStr;
                                        const shouldHideChange = isTradingDay && isAfter9 && !hasTodayData;

                                        if (shouldHideChange) return null;

                                        return (
                                          <Stat
                                            label="涨跌幅"
                                            value={f.zzl !== undefined ? `${f.zzl > 0 ? '+' : ''}${Number(f.zzl).toFixed(2)}%` : ''}
                                            delta={f.zzl}
                                          />
                                        );
                                      })()}
                                      <Stat label="估值净值" value={f.estPricedCoverage > 0.05 ? f.estGsz.toFixed(4) : (f.gsz ?? '—')} />
                                      <Stat
                                        label="估值涨跌幅"
                                        value={f.estPricedCoverage > 0.05 ? `${f.estGszzl > 0 ? '+' : ''}${f.estGszzl.toFixed(2)}%` : (typeof f.gszzl === 'number' ? `${f.gszzl > 0 ? '+' : ''}${f.gszzl.toFixed(2)}%` : f.gszzl ?? '—')}
                                        delta={f.estPricedCoverage > 0.05 ? f.estGszzl : (Number(f.gszzl) || 0)}
                                      />
                                    </>
                                  )}
                                </div>

                                <div className="row" style={{ marginBottom: 12 }}>
                                  {(() => {
                                    const profit = profitCache[f.code];
                                    const holding = holdings[f.code];

                                    if (!profit) {
                                      return (
                                        <div className="stat" style={{ flexDirection: 'column', gap: 4 }}>
                                          <span className="label">持仓金额</span>
                                          <div
                                            className="value muted"
                                            style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                                            onClick={() => setHoldingModal({ open: true, fund: f })}
                                          >
                                            未设置 <SettingsIcon width="12" height="12" />
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <>
                                        <div
                                          className="stat"
                                          style={{ cursor: 'pointer', flexDirection: 'column', gap: 4 }}
                                          onClick={() => setActionModal({ open: true, fund: f })}
                                        >
                                          <span className="label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            持仓金额 <SettingsIcon width="12" height="12" style={{ opacity: 0.7 }} />
                                          </span>
                                          <span className="value">¥{profit.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="stat" style={{ flexDirection: 'column', gap: 4 }}>
                                          <span className="label">当日盈亏</span>
                                          <span className={`value ${profit.profitToday > 0 ? 'up' : profit.profitToday < 0 ? 'down' : ''}`}>
                                            {profit.profitToday > 0 ? '+' : profit.profitToday < 0 ? '-' : ''}¥{Math.abs(profit.profitToday).toFixed(2)}
                                          </span>
                                        </div>
                                        {profit.profitTotal !== null && (
                                          <div
                                            className="stat"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setPercentModes(prev => ({ ...prev, [f.code]: !prev[f.code] }));
                                            }}
                                            style={{ cursor: 'pointer', flexDirection: 'column', gap: 4 }}
                                            title="点击切换金额/百分比"
                                          >
                                            <span className="label">持有收益{percentModes[f.code] ? '(%)' : ''}</span>
                                            <span className={`value ${profit.profitTotal > 0 ? 'up' : profit.profitTotal < 0 ? 'down' : ''}`}>
                                              {profit.profitTotal > 0 ? '+' : profit.profitTotal < 0 ? '-' : ''}
                                              {percentModes[f.code]
                                                ? `${Math.abs((holding.cost * holding.share) ? (profit.profitTotal / (holding.cost * holding.share)) * 100 : 0).toFixed(2)}%`
                                                : `¥${Math.abs(profit.profitTotal).toFixed(2)}`
                                              }
                                            </span>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
                                </div>

                                {f.estPricedCoverage > 0.05 && (
                                  <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: -8, marginBottom: 10, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                                    <span style={{ opacity: 0.7 }}>
                                      持仓估算 {Math.round(f.estPricedCoverage * 100)}%
                                      {f.enhancedConfidence === 'high' && ' ⚡'}
                                      {f.enhancedConfidence === 'medium' && ' ○'}
                                    </span>
                                  </div>
                                )}
                                <div
                                  style={{ marginBottom: 8, cursor: 'pointer', userSelect: 'none' }}
                                  className="title"
                                  onClick={() => toggleCollapse(f.code)}
                                >
                                  <div className="row" style={{ width: '100%', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <span>前10重仓股票</span>
                                      <ChevronIcon
                                        width="16"
                                        height="16"
                                        className="muted"
                                        style={{
                                          transform: collapsedCodes.has(f.code) ? 'rotate(-90deg)' : 'rotate(0deg)',
                                          transition: 'transform 0.2s ease'
                                        }}
                                      />
                                    </div>
                                    <span className="muted">涨跌幅 / 占比</span>
                                  </div>
                                </div>
                                <AnimatePresence>
                                  {!collapsedCodes.has(f.code) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                      style={{ overflow: 'hidden' }}
                                    >
                                      {Array.isArray(f.holdings) && f.holdings.length ? (
                                        <div className="list">
                                          {f.holdings.map((h, idx) => (
                                            <div className="item" key={idx}>
                                              <span className="name">{h.name}</span>
                                              <div className="values">
                                                {typeof h.change === 'number' && (
                                                  <span className={`badge ${h.change > 0 ? 'up' : h.change < 0 ? 'down' : ''}`} style={{ marginRight: 8 }}>
                                                    {h.change > 0 ? '+' : ''}{h.change.toFixed(2)}%
                                                  </span>
                                                )}
                                                <span className="weight">{h.weight}</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="muted" style={{ padding: '8px 0' }}>暂无重仓数据</div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            )}
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {fundDeleteConfirm && (
          <ConfirmModal
            title="删除确认"
            message={`基金 "${fundDeleteConfirm.name}" 存在持仓记录。删除后将移除该基金及其持仓数据，是否继续？`}
            confirmText="确定删除"
            onConfirm={() => {
              removeFund(fundDeleteConfirm.code);
              setFundDeleteConfirm(null);
            }}
            onCancel={() => setFundDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {logoutConfirmOpen && (
          <ConfirmModal
            title="确认登出"
            message="确定要退出当前账号吗？"
            confirmText="确认登出"
            onConfirm={() => {
              setLogoutConfirmOpen(false);
              handleLogout();
            }}
            onCancel={() => setLogoutConfirmOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="footer">
        <p style={{ marginBottom: 8 }}>数据源：实时估值与重仓直连东方财富，仅供个人学习及参考使用。数据可能存在延迟，不作为任何投资建议</p>
        <p style={{ marginBottom: 12 }}>注：估算数据与真实结算数据会有1%左右误差，非股票型基金误差较大</p>
        <div style={{ marginTop: 12, opacity: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ margin: 0 }}>
            遇到任何问题或需求建议可
            <button
              className="link-button"
              onClick={() => {
                setFeedbackNonce((n) => n + 1);
                setFeedbackOpen(true);
              }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0 4px', textDecoration: 'underline', fontSize: 'inherit', fontWeight: 600 }}
            >
              点此提交反馈
            </button>
          </p>
          <button
            onClick={() => setDonateOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span>☕</span>
            <span>点此请作者喝杯咖啡</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {feedbackOpen && (
          <FeedbackModal
            key={feedbackNonce}
            onClose={() => setFeedbackOpen(false)}
            user={user}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addResultOpen && (
          <AddResultModal
            failures={addFailures}
            onClose={() => setAddResultOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addFundToGroupOpen && (
          <AddFundToGroupModal
            allFunds={funds}
            currentGroupCodes={groups.find(g => g.id === currentTab)?.codes || []}
            onClose={() => setAddFundToGroupOpen(false)}
            onAdd={handleAddFundsToGroup}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {actionModal.open && (
          <HoldingActionModal
            fund={actionModal.fund}
            onClose={() => setActionModal({ open: false, fund: null })}
            onAction={(type) => handleAction(type, actionModal.fund)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tradeModal.open && (
          <TradeModal
            type={tradeModal.type}
            fund={tradeModal.fund}
            onClose={() => setTradeModal({ open: false, fund: null, type: 'buy' })}
            onConfirm={(data) => handleTrade(tradeModal.fund, data)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {clearConfirm && (
          <ConfirmModal
            title="清空持仓"
            message={`确定要清空“${clearConfirm.fund?.name}”的所有持仓记录吗？此操作不可恢复。`}
            onConfirm={handleClearConfirm}
            onCancel={() => setClearConfirm(null)}
            confirmText="确认清空"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {holdingModal.open && (
          <HoldingEditModal
            fund={holdingModal.fund}
            holding={holdings[holdingModal.fund?.code]}
            onClose={() => setHoldingModal({ open: false, fund: null })}
            onSave={(data) => handleSaveHolding(holdingModal.fund?.code, data)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {donateOpen && (
          <div className="modal-overlay" onClick={() => setDonateOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass card modal"
              style={{ maxWidth: '360px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="title" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>☕ 请作者喝杯咖啡</span>
                </div>
                <button className="icon-button" onClick={() => setDonateOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <CloseIcon width="20" height="20" />
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <DonateTabs />
              </div>

              <div className="muted" style={{ fontSize: '12px', textAlign: 'center', lineHeight: 1.5 }}>
                感谢您的支持！您的鼓励是我持续维护和更新的动力。
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {groupManageOpen && (
          <GroupManageModal
            groups={groups}
            onClose={() => setGroupManageOpen(false)}
            onSave={handleUpdateGroups}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {groupModalOpen && (
          <GroupModal
            onClose={() => setGroupModalOpen(false)}
            onConfirm={handleAddGroup}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successModal.open && (
          <SuccessModal
            message={successModal.message}
            onClose={() => setSuccessModal({ open: false, message: '' })}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cloudConfigModal.open && (
          <CloudConfigModal
            type={cloudConfigModal.type}
            onConfirm={handleSyncLocalConfig}
            onCancel={() => {
              if (cloudConfigModal.type === 'conflict' && cloudConfigModal.cloudData) {
                applyCloudConfig(cloudConfigModal.cloudData);
              }
              setCloudConfigModal({ open: false, userId: null });
            }}
          />
        )}
      </AnimatePresence>

      {settingsOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="设置" onClick={() => setSettingsOpen(false)}>
          <div className="glass card modal" onClick={(e) => e.stopPropagation()}>
            <div className="title" style={{ marginBottom: 12 }}>
              <SettingsIcon width="20" height="20" />
              <span>设置</span>
              <span className="muted">配置刷新频率</span>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <div className="muted" style={{ marginBottom: 8, fontSize: '0.8rem' }}>刷新频率</div>
              <div className="chips" style={{ marginBottom: 12 }}>
                {[10, 30, 60, 120, 300].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`chip ${tempSeconds === s ? 'active' : ''}`}
                    onClick={() => setTempSeconds(s)}
                    aria-pressed={tempSeconds === s}
                  >
                    {s} 秒
                  </button>
                ))}
              </div>
              <input
                className="input"
                type="number"
                min="10"
                step="5"
                value={tempSeconds}
                onChange={(e) => setTempSeconds(Number(e.target.value))}
                placeholder="自定义秒数"
              />
              {tempSeconds < 10 && (
                <div className="error-text" style={{ marginTop: 8 }}>
                  最小 10 秒
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <div className="muted" style={{ marginBottom: 8, fontSize: '0.8rem' }}>数据导出</div>
              <div className="row" style={{ gap: 8 }}>
                <button type="button" className="button" onClick={exportLocalData}>导出配置</button>
              </div>
              <div className="muted" style={{ marginBottom: 8, fontSize: '0.8rem', marginTop: 26 }}>数据导入</div>
              <div className="row" style={{ gap: 8, marginTop: 8 }}>
                <button type="button" className="button" onClick={() => importFileRef.current?.click?.()}>导入配置</button>
              </div>
              <input
                ref={importFileRef}
                type="file"
                accept="application/json"
                style={{ display: 'none' }}
                onChange={handleImportFileChange}
              />
              {importMsg && (
                <div className="muted" style={{ marginTop: 8 }}>
                  {importMsg}
                </div>
              )}
            </div>

            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="button" onClick={saveSettings} disabled={tempSeconds < 10}>保存并关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* 更新提示弹窗 */}
      <AnimatePresence>
        {updateModalOpen && (
          <motion.div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="更新提示"
            onClick={() => setUpdateModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 10002 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass card modal"
              style={{ maxWidth: '400px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="title" style={{ marginBottom: 12 }}>
                <UpdateIcon width="20" height="20" style={{color: 'var(--success)'}} />
                <span>更新提示</span>
              </div>
              <div style={{ marginBottom: 24 }}>
                <p className="muted" style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: 12 }}>
                  检测到新版本，是否刷新浏览器以更新？
                  <br/>
                  更新内容如下：
                </p>
                {updateContent && (
                  <div style={{ 
                    background: 'rgba(0,0,0,0.2)', 
                    padding: '12px', 
                    borderRadius: '8px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {updateContent}
                  </div>
                )}
              </div>
              <div className="row" style={{ gap: 12 }}>
                <button 
                  className="button secondary" 
                  onClick={() => setUpdateModalOpen(false)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text)' }}
                >
                  取消
                </button>
                <button 
                  className="button" 
                  onClick={() => window.location.reload()} 
                  style={{ flex: 1, background: 'var(--success)', color: '#fff', border: 'none' }}
                >
                  刷新浏览器
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 登录模态框 */}
      {loginModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="登录"
          onClick={() => {
            setLoginModalOpen(false);
            setLoginError('');
            setLoginSuccess('');
            setLoginEmail('');
          }}
        >
          <div className="glass card modal login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="title" style={{ marginBottom: 16 }}>
              <MailIcon width="20" height="20" />
              <span>邮箱登录</span>
              <span className="muted">使用邮箱验证登录</span>
            </div>

            <form onSubmit={handleSendOtp}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <div style={{
                  marginBottom: 12,
                  padding: '8px 12px',
                  background: 'rgba(230, 162, 60, 0.1)',
                  border: '1px solid rgba(230, 162, 60, 0.2)',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#e6a23c',
                  lineHeight: '1.4'
                }}>
                  ⚠️ 登录功能目前正在测试，使用过程中如遇到问题欢迎大家在 <a href="https://github.com/hzm0321/real-time-fund/issues" target="_blank" style={{ textDecoration: 'underline', color: 'inherit' }}>Github</a> 上反馈
                </div>
                <div className="muted" style={{ marginBottom: 8, fontSize: '0.8rem' }}>
                  请输入邮箱，我们将发送验证码到您的邮箱
                </div>
                <input
                  style={{width: '100%'}}
                  className="input"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={loginLoading || !!loginSuccess}
                />
              </div>

              {loginSuccess && (
                <div className="login-message success" style={{ marginBottom: 12 }}>
                  <span>{loginSuccess}</span>
                </div>
              )}

              {loginSuccess && (
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <div className="muted" style={{ marginBottom: 8, fontSize: '0.8rem' }}>
                    请输入邮箱验证码以完成注册/登录
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="输入验证码"
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    disabled={loginLoading}
                    maxLength={6}
                  />
                </div>
              )}
              {loginError && (
                <div className="login-message error" style={{ marginBottom: 12 }}>
                  <span>{loginError}</span>
                </div>
              )}
              <div className="row" style={{ justifyContent: 'flex-end', gap: 12 }}>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    setLoginModalOpen(false);
                    setLoginError('');
                    setLoginSuccess('');
                    setLoginEmail('');
                    setLoginOtp('');
                  }}
                  disabled={loginLoading}
                >
                  取消
                </button>
                <button
                  className="button"
                  type={loginSuccess ? 'button' : 'submit'}
                  onClick={loginSuccess ? handleVerifyEmailOtp : undefined}
                  disabled={loginLoading || (loginSuccess && !loginOtp)}
                >
                  {loginLoading ? '处理中...' : loginSuccess ? '确认验证码' : '发送邮箱验证码'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 全局轻提示 Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{
              position: 'fixed',
              top: 24,
              left: '50%',
              zIndex: 9999,
              padding: '10px 20px',
              background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                          toast.type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 
                          'rgba(30, 41, 59, 0.9)',
              color: '#fff',
              borderRadius: '8px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              maxWidth: '90vw',
              whiteSpace: 'nowrap'
            }}
          >
            {toast.type === 'error' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {toast.type === 'success' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <span style={{ flex: 1 }}>{toast.message}</span>
            {toast.type === 'error' && (
              <button
                onClick={hideToast}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
