import styled from 'styled-components'
import { Box } from '@mui/material'

//! =============== 1. Setup & Constants ===============

//! =============== 2. Styled Components ===============

/**
 * @component OctagonImage
 * @description 八角形圖片容器，使用與 ClippedCreamPaper 相同的切角效果
 *
 * @example
 * <OctagonImage>
 *   <img src="..." alt="..." loading="lazy" />
 * </OctagonImage>
 */
const OctagonImage = styled(Box)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    clip-path: polygon(
      1rem 0,
      calc(100% - 1rem) 0,
      100% 1rem,
      100% calc(100% - 1rem),
      calc(100% - 1rem) 100%,
      1rem 100%,
      0 calc(100% - 1rem),
      0 1rem
    );
  }

  @media (max-width: 768px) {
    max-width: 280px;
  }
`

export default OctagonImage
