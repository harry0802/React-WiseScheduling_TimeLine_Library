import styled from 'styled-components'

//! =============== 1. Styled Components ===============

/**
 * Styled label for hamburger menu with SVG animation
 * Supports size and color customization via props
 */
export const StyledHamburgerLabel = styled.label`
  /* Layout & Positioning */
  display: inline-block;

  /* Box Model */
  font-size: ${(props) => props.size || '1rem'};

  /* Visual Styles */
  color: ${(props) => props.color || 'white'};

  /* Other */
  cursor: pointer;

  /* Hidden checkbox for state management */
  input {
    display: none;
  }

  /* SVG container with rotation animation */
  svg {
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* SVG line styles */
  .line {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  /* Checked state animations */
  input:checked + svg {
    transform: rotate(-45deg);
  }

  input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`
