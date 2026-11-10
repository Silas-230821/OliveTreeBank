import { useEffect, useState, type MouseEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, RoomsIcon, TrophyIcon, SettingsIcon, RewardsIcon } from '../icons/NavIcons';
import { CoinIcon } from '../icons/UIIcons';
import { UserAvatar } from '../shared/UserAvatar';
import { OliveTreeLogo } from '../shared/OliveTreeLogo';
import { useTranslation } from '../../hooks/useTranslation';
import type { User } from '../../hooks/useAuth';

interface SidebarProps {
  user: User;
  isMobileOpen?: boolean;
  onClose?: () => void;
  gamificationEnabled?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/#quiz-section', label: 'Quiz', Icon: TrophyIcon, sectionId: 'quiz-section' },
  { to: '/#shop-section', label: 'Rewards', Icon: RewardsIcon, sectionId: 'shop-section' },
  { to: '/#space-section', label: 'Rooms', Icon: RoomsIcon, sectionId: 'space-section' },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon },
];

const GAMIFICATION_ROUTES = new Set(['/leaderboard', '/rewards', '/achievements']);

export function Sidebar({ user, isMobileOpen = false, onClose, gamificationEnabled = true, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(user.language);
  const bankNames = ['橄榄树数字银行', 'Olive Tree Digital Bank', 'Olivenbaum Digitalbank'];
  const [bankNameIndex, setBankNameIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setBankNameIndex((index) => (index + 1) % bankNames.length), 3200);
    return () => window.clearInterval(timer);
  }, []);
  // A horizontal header should always keep its navigation visible on desktop.
  // The original props remain accepted for backwards-compatible app-shell wiring.
  const effectiveCollapsed = false;

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    if (sectionId && window.location.pathname === '/') {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${sectionId}`);
    }
    if (window.innerWidth <= 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 49,
            display: 'none',
          }}
          className="mobile-overlay"
        />
      )}

      <nav
        style={{
          width: effectiveCollapsed ? 60 : 240,
          minHeight: '100vh',
          backgroundColor: 'var(--warm-sidebar)',
          borderRight: '1.5px solid var(--warm-sidebar-border)',
          padding: effectiveCollapsed ? '24px 8px' : '24px 0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'width 0.3s ease, padding 0.3s ease',
        }}
        className={`sidebar olive-topbar ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        <div className="olive-brand" style={{ padding: effectiveCollapsed ? '0 8px' : '0 20px', marginBottom: effectiveCollapsed ? 8 : 36, display: 'flex', alignItems: 'center', justifyContent: effectiveCollapsed ? 'center' : 'flex-start', gap: effectiveCollapsed ? 0 : 12, position: 'relative' }}>
          {effectiveCollapsed && onToggle ? (
            <button
              onClick={onToggle}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                borderRadius: 8,
                color: 'var(--warm-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Expand sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 10h14M3 5h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ) : (
            <>
              <div className="olive-tree-badge" style={{
                width: 42, height: 42, borderRadius: 14,
                background: 'var(--warm-sidebar-active)',
                border: '1.5px solid var(--warm-sidebar-user-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <OliveTreeLogo />
              </div>
              <div style={{ flex: 1 }}>
                <div className="olive-brand-name bank-name-carousel" key={bankNameIndex} style={{ fontSize: 19, fontWeight: 900, color: 'var(--warm-text)', letterSpacing: -0.5 }}>{bankNames[bankNameIndex]}</div>
                <div className="olive-brand-slogan" style={{ fontSize: 10, color: 'var(--warm-text-light)', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                  聆听顺服 · 彼此相爱 · 尽力去做
                </div>
              </div>
              {onToggle && (
                <button
                  onClick={onToggle}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 8,
                    borderRadius: 8,
                    color: 'var(--warm-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                  }}
                  aria-label="Collapse sidebar"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10h14M3 5h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </>
          )}
          {onClose && !effectiveCollapsed && (
            <button
              onClick={onClose}
              className="mobile-only"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--warm-text-muted)',
                fontSize: 24,
                cursor: 'pointer',
                padding: 4,
                display: 'none',
              }}
              aria-label="Close menu"
            >
              ×
            </button>
          )}
        </div>

        <div className="olive-nav-links" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: effectiveCollapsed ? '0 8px' : '0 12px' }}>
          {navItems.filter((item) => gamificationEnabled || !GAMIFICATION_ROUTES.has(item.to)).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={{ textDecoration: 'none' }}
              onClick={(event) => handleNavClick(event, item.sectionId)}
            >
              {({ isActive }) => {
                const itemIsActive = item.sectionId
                  ? location.pathname === '/' && location.hash === `#${item.sectionId}`
                  : item.to === '/' ? isActive && !location.hash : isActive;
                return (
                <div
                  title={effectiveCollapsed ? t(`nav.${item.label.toLowerCase()}`) : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: effectiveCollapsed ? '11px 0' : '11px 16px',
                    justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
                    borderRadius: 14,
                    backgroundColor: itemIsActive ? 'var(--warm-sidebar-active)' : 'transparent',
                    borderLeft: itemIsActive ? '3px solid var(--warm-accent)' : '3px solid transparent',
                    transition: 'all 0.15s ease',
                  }}>
                  <span style={{ flexShrink: 0 }}><item.Icon active={itemIsActive} /></span>
                  {!effectiveCollapsed && (
                    <span style={{
                      fontSize: 14, fontWeight: itemIsActive ? 800 : 600,
                      color: itemIsActive ? 'var(--warm-accent)' : 'var(--warm-text-muted)',
                    }}>{t(`nav.${item.label.toLowerCase()}`)}</span>
                  )}
                </div>
                );
              }}
            </NavLink>
          ))}
        </div>

        <div className="olive-account" style={{ padding: effectiveCollapsed ? '0 8px' : '0 14px' }}>
          <div
            onClick={() => navigate('/profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: effectiveCollapsed ? 0 : 10,
              padding: effectiveCollapsed ? '8px' : '12px 14px',
              justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
              backgroundColor: 'var(--warm-sidebar-user-bg)', borderRadius: 16, border: '1.5px solid var(--warm-sidebar-user-border)',
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            {!effectiveCollapsed && (
              <div className="olive-student-toolbar">
                {gamificationEnabled && (
                  <button className="olive-coin-counter" onClick={(e) => { e.stopPropagation(); navigate('/#shop-section'); }} aria-label={`${user.coins} 滴橄榄油`}>
                    <CoinIcon /> <strong>{user.coins}</strong><span>滴橄榄油</span>
                  </button>
                )}
                <span className="olive-student-name">{user.displayName}</span>
              </div>
            )}
            <UserAvatar
              name={user.displayName}
              color={user.avatarColor}
              size={effectiveCollapsed ? 28 : 38}
              avatarType={user.avatarType}
              avatarPreset={user.avatarPreset}
              avatarPhotoUrl={user.avatarPhotoUrl}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
