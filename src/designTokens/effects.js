// Design Token - Effects
// 特效系統（陰影、clip-path等）

export const effects = {
  // 切角效果 - 用於按鈕和容器
  clipPath: {
    corner: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
    cornerSmall: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
    cornerXSmall: 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)',
    cornerMedium: 'polygon(1.5rem 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1.5rem), 0 1.5rem)',
    cornerLarge: 'polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)',
  },

  // 陰影
  shadows: {
    none: 'none',
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    large: '0 8px 16px rgba(0, 0, 0, 0.2)',
    xlarge: '0 12px 24px rgba(0, 0, 0, 0.25)',

    // 金色光暈效果
    goldGlow: '0 0 20px rgba(212, 175, 55, 0.3)',
    goldGlowHover: '0 0 30px rgba(212, 175, 55, 0.5)',
  },

  // 漸層
  gradients: {
    darkBackground: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
    goldAccent: 'linear-gradient(135deg, #d4af37 0%, #c19a2e 100%)',
    creamSurface: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
  },

  // 過渡動畫
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  }
};

export default effects;
