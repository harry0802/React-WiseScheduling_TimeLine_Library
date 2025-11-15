import React from 'react';
import { Box } from '@mui/material';
import { colors } from '../designTokens';

/**
 * VerticalProgressBar Component
 *
 * A flexible progress bar that can be displayed vertically or horizontally.
 * Syncs with carousel scroll progress to show current position.
 *
 * @param {number} progress - Progress value from 0 to 1
 * @param {string} orientation - 'vertical' or 'horizontal' (default: 'vertical')
 */
const VerticalProgressBar = ({ progress = 0, orientation = 'vertical' }) => {
  const isVertical = orientation === 'vertical';

  return (
    <Box
      sx={{
        position: 'relative',
        width: isVertical ? '2px' : '100%',
        height: isVertical ? '100%' : '2px',
        backgroundColor: `${colors.accent.primary}30`, // 30% opacity background
        borderRadius: '1px',
        overflow: 'hidden',
      }}
    >
      {/* Filled portion that animates based on progress */}
      <Box
        sx={{
          position: 'absolute',
          [isVertical ? 'top' : 'left']: 0,
          [isVertical ? 'left' : 'top']: 0,
          width: isVertical ? '100%' : `${progress * 100}%`,
          height: isVertical ? `${progress * 100}%` : '100%',
          backgroundColor: colors.accent.primary,
          transition: 'all 0.3s ease',
          boxShadow: `0 0 20px ${colors.accent.primary}80`,
        }}
      />
    </Box>
  );
};

export default VerticalProgressBar;
