import { useState, useEffect, useCallback } from 'react'

//! =============== 1. Setup & Constants ===============

/**
 * Timing constants for selector initialization and transitions
 */
const SELECTOR_INIT_DELAY = 50
const SELECTOR_TOGGLE_DELAY = 300

//! =============== 2. Types & Interfaces ===============

/**
 * @typedef {Object} SelectorStyle
 * @property {number} top - Top offset in pixels
 * @property {number} left - Left offset in pixels
 * @property {number} width - Width in pixels
 * @property {number} height - Height in pixels
 */

/**
 * @typedef {Object} UseNavbarSelectorReturn
 * @property {SelectorStyle} selectorStyle - Current selector positioning and dimensions
 * @property {boolean} isInitialized - Whether the selector animation has been initialized
 * @property {Function} updateSelector - Function to recalculate selector position
 */

//! =============== 3. Core Functionality ===============

/**
 * Custom hook for managing navbar selector positioning and animation
 *
 * @description
 * Handles the animated selector that highlights the active navigation item.
 * Manages selector positioning, dimensions, and initialization state.
 *
 * @param {React.RefObject} navMenuRef - Ref to the nav menu container
 * @param {string} pathname - Current route pathname
 *
 * @returns {UseNavbarSelectorReturn} Selector state and update function
 *
 * @example
 * const navMenuRef = useRef(null)
 * const { selectorStyle, isInitialized, updateSelector } = useNavbarSelector(
 *   navMenuRef,
 *   location.pathname
 * )
 */
function useNavbarSelector(navMenuRef, pathname) {
  const [selectorStyle, setSelectorStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })
  const [isInitialized, setIsInitialized] = useState(false)

  /**
   * Calculate and update selector position based on active nav item
   *
   * @description
   * Finds the active navigation item and calculates its position and dimensions.
   * If no active item exists (non-navigation page), hides the selector.
   */
  const updateSelector = useCallback(() => {
    if (!navMenuRef.current) return

    const activeItem = navMenuRef.current.querySelector('.active')

    // Hide selector if no active item (non-navigation page)
    if (!activeItem) {
      setSelectorStyle({
        top: 0,
        left: 0,
        width: 0,
        height: 0
      })
      return
    }

    const activeParent = activeItem.parentElement
    const rect = activeParent.getBoundingClientRect()

    setSelectorStyle({
      top: activeParent.offsetTop,
      left: activeParent.offsetLeft,
      width: rect.width,
      height: rect.height
    })
  }, [navMenuRef])

  // Initialize selector and update on route change
  useEffect(() => {
    updateSelector()
    if (!isInitialized) {
      setTimeout(() => setIsInitialized(true), SELECTOR_INIT_DELAY)
    }
  }, [pathname, updateSelector, isInitialized])

  // Update selector on window resize
  useEffect(() => {
    window.addEventListener('resize', updateSelector)
    return () => window.removeEventListener('resize', updateSelector)
  }, [updateSelector])

  return {
    selectorStyle,
    isInitialized,
    updateSelector
  }
}

//! =============== 4. Utility Functions ===============

/**
 * Delayed selector update for toggle animations
 *
 * @param {Function} updateSelector - Selector update function
 * @returns {Promise<void>} Promise that resolves after update delay
 */
export const delayedSelectorUpdate = (updateSelector) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateSelector()
      resolve()
    }, SELECTOR_TOGGLE_DELAY)
  })
}

export default useNavbarSelector
