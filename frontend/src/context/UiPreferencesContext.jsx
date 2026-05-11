import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { theme as antdTheme } from 'antd';

const UiPreferencesContext = createContext(null);

const STORAGE_KEYS = {
  colorMode: 'cets_color_mode',
  textScale: 'cets_text_scale'
};

const readStored = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

export const UiPreferencesProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(() => readStored(STORAGE_KEYS.colorMode, 'dark'));
  const [textScale, setTextScale] = useState(() => readStored(STORAGE_KEYS.textScale, 'large'));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.colorMode, colorMode);
      localStorage.setItem(STORAGE_KEYS.textScale, textScale);
    } catch {
      // ignore
    }
  }, [colorMode, textScale]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', colorMode === 'dark');
    root.classList.toggle('theme-light', colorMode !== 'dark');
    root.classList.toggle('text-large', textScale === 'large');
    root.classList.toggle('text-xlarge', textScale === 'xlarge');
  }, [colorMode, textScale]);

  const antdConfig = useMemo(() => {
    const isDark = colorMode === 'dark';
    const baseFontSize = textScale === 'xlarge' ? 20 : textScale === 'large' ? 16 : 14;
    return {
      theme: {
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#da291c',
          colorInfo: '#da291c',
          colorSuccess: '#03904a',
          colorWarning: '#f13a2c',
          colorError: '#da291c',
          colorText: isDark ? '#ffffff' : '#181818',
          colorTextSecondary: isDark ? '#b7b7b7' : '#666666',
          colorBorder: isDark ? 'rgba(255, 255, 255, 0.16)' : '#d6d6d6',
          colorBgLayout: isDark ? '#181818' : '#f4f4f4',
          colorBgContainer: isDark ? '#242424' : '#ffffff',
          colorBgElevated: isDark ? '#303030' : '#ffffff',
          borderRadius: 4,
          borderRadiusLG: 8,
          fontSize: baseFontSize,
          fontFamily: "'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif",
          boxShadowSecondary: isDark ? '0 16px 36px rgba(0, 0, 0, 0.38)' : '0 16px 36px rgba(24, 24, 24, 0.12)'
        },
        components: {
          Card: {
            borderRadiusLG: 8,
            headerFontSize: baseFontSize + 1
          },
          Button: {
            controlHeight: textScale === 'xlarge' ? 52 : textScale === 'large' ? 44 : 40,
            borderRadius: 4,
            fontWeight: 700
          },
          Input: { borderRadius: 4 },
          Select: { borderRadius: 4 },
          Modal: { borderRadiusLG: 8 },
          Table: { borderRadiusLG: 8 }
        }
      }
    };
  }, [colorMode, textScale]);

  const value = useMemo(() => ({
    colorMode,
    setColorMode,
    textScale,
    setTextScale,
    antdConfig
  }), [colorMode, textScale, antdConfig]);

  return <UiPreferencesContext.Provider value={value}>{children}</UiPreferencesContext.Provider>;
};

export const useUiPreferences = () => {
  const ctx = useContext(UiPreferencesContext);
  if (!ctx) {
    throw new Error('useUiPreferences must be used inside UiPreferencesProvider');
  }
  return ctx;
};
