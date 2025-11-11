// Design Tokens - Main Export
// 統一導出所有 Design Tokens

export { colors } from './colors';
export { borders } from './borders';
export { effects } from './effects';
export { spacing } from './spacing';
export { typography } from './typography';

// 完整的 Design Token 對象
import * as colorsModule from './colors';
import * as bordersModule from './borders';
import * as effectsModule from './effects';
import * as spacingModule from './spacing';
import * as typographyModule from './typography';

export const designTokens = {
  colors: colorsModule.colors,
  borders: bordersModule.borders,
  effects: effectsModule.effects,
  spacing: spacingModule.spacing,
  typography: typographyModule.typography,
};

export default designTokens;
