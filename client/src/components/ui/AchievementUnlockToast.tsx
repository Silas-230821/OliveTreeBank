import { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface AchievementUnlockToastProps {
  achievementIds: string[];
  onDismiss: () => void;
  language?: string;
}

export function AchievementUnlockToast({ achievementIds, onDismiss, language }: AchievementUnlockToastProps) {
  const { t } = useTranslation(language);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!achievementIds.length) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 max-w-xs"
      style={{ transition: 'opacity 0.3s', opacity: visible ? 1 : 0 }}
    >
      {achievementIds.map((id) => (
        <div
          key={id}
          className="tq-card tq-card-padded mb-2 flex items-start gap-3"
          style={{ borderLeft: '4px solid var(--color-accent)' }}
        >
          <span className="text-2xl">🏆</span>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
              {t('achievements.unlocked')}
            </div>
            <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              {t(`achievements.${id}`) || id}
            </div>
          </div>
          <button
            onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
            className="ml-auto text-xs opacity-50 hover:opacity-100"
            style={{ color: 'var(--color-text)' }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
