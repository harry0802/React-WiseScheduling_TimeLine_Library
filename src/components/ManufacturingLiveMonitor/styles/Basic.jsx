import { createGlobalStyle } from "styled-components";

const GlobalTypography = createGlobalStyle`
  :root {
    /* 基礎字體大小變數 */
    --font-size-xs: 0.75rem;   /* 12px @ 16px 基礎 */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-base: 1rem;    /* 16px */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px */
    --font-size-3xl: 1.875rem; /* 30px */
    --font-size-4xl: 2.25rem;  /* 36px */
    --font-size-5xl: 3rem;     /* 48px */
    --font-size-6xl: 3.75rem;  /* 60px */
    --font-size-7xl: 4.5rem;   /* 72px */
  }

  /* 基礎字體大小類別 */
  .text-xs { font-size: var(--font-size-xs); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-xl { font-size: var(--font-size-xl); }
  .text-2xl { font-size: var(--font-size-2xl); }
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-4xl { font-size: var(--font-size-4xl); }
  .text-5xl { font-size: var(--font-size-5xl); }
  .text-6xl { font-size: var(--font-size-6xl); }
  .text-7xl { font-size: var(--font-size-7xl); }

  /* 寬螢幕斷點 (wide): 1440px - 適合寬螢幕桌機 */
  @media (min-width: 1440px) {
    :root {
      --font-size-xs: 0.8125rem;  /* 13px */
      --font-size-sm: 0.9375rem;  /* 15px */
      --font-size-base: 1.0625rem; /* 17px */
      --font-size-lg: 1.1875rem;  /* 19px */
      --font-size-xl: 1.375rem;   /* 22px */
      --font-size-2xl: 1.625rem;  /* 26px */
      --font-size-3xl: 2rem;      /* 32px */
      --font-size-4xl: 2.5rem;    /* 40px */
      --font-size-5xl: 3.25rem;   /* 52px */
      --font-size-6xl: 4rem;      /* 64px */
      --font-size-7xl: 5rem;      /* 80px */
    }
  }

  /* 超寬螢幕斷點 (ultrawide): 1920px - 適合超寬螢幕和小型電視 */
  @media (min-width: 1920px) {
    :root {
      --font-size-xs: 0.875rem;   /* 14px */
      --font-size-sm: 1rem;       /* 16px */
      --font-size-base: 1.125rem; /* 18px */
      --font-size-lg: 1.25rem;    /* 20px */
      --font-size-xl: 1.5rem;     /* 24px */
      --font-size-2xl: 1.75rem;   /* 28px */
      --font-size-3xl: 2.25rem;   /* 36px */
      --font-size-4xl: 2.75rem;   /* 44px */
      --font-size-5xl: 3.5rem;    /* 56px */
      --font-size-6xl: 4.5rem;    /* 72px */
      --font-size-7xl: 5.5rem;    /* 88px */
    }
  }

  /* 電視螢幕斷點 (tv): 2560px - 適合大型顯示器和中型電視 */
  @media (min-width: 2560px) {
    :root {
      --font-size-xs: 1rem;       /* 16px */
      --font-size-sm: 1.125rem;   /* 18px */
      --font-size-base: 1.25rem;  /* 20px */
      --font-size-lg: 1.5rem;     /* 24px */
      --font-size-xl: 1.75rem;    /* 28px */
      --font-size-2xl: 2rem;      /* 32px */
      --font-size-3xl: 2.5rem;    /* 40px */
      --font-size-4xl: 3rem;      /* 48px */
      --font-size-5xl: 4rem;      /* 64px */
      --font-size-6xl: 5rem;      /* 80px */
      --font-size-7xl: 6rem;      /* 96px */
    }
  }

  /* 大型電視螢幕斷點 (bigtv): 3440px - 適合超寬和大型電視 */
  @media (min-width: 3440px) {
    :root {
      --font-size-xs: 1.25rem;    /* 20px */
      --font-size-sm: 1.5rem;     /* 24px */
      --font-size-base: 1.75rem;  /* 28px */
      --font-size-lg: 2rem;       /* 32px */
      --font-size-xl: 2.25rem;    /* 36px */
      --font-size-2xl: 2.75rem;   /* 44px */
      --font-size-3xl: 3.25rem;   /* 52px */
      --font-size-4xl: 4rem;      /* 64px */
      --font-size-5xl: 5rem;      /* 80px */
      --font-size-6xl: 6rem;      /* 96px */
      --font-size-7xl: 7.5rem;    /* 120px */
    }
  }

  /* 50吋電視螢幕斷點 (tv50): 4096px+ - 適合50吋以上大型電視 */
  @media (min-width: 4096px) {
    :root {
      --font-size-xs: 1.5rem;     /* 24px */
      --font-size-sm: 1.75rem;    /* 28px */
      --font-size-base: 2rem;     /* 32px */
      --font-size-lg: 2.5rem;     /* 40px */
      --font-size-xl: 3rem;       /* 48px */
      --font-size-2xl: 3.5rem;    /* 56px */
      --font-size-3xl: 4rem;      /* 64px */
      --font-size-4xl: 5rem;      /* 80px */
      --font-size-5xl: 6rem;      /* 96px */
      --font-size-6xl: 7.5rem;    /* 120px */
      --font-size-7xl: 9rem;      /* 144px */
    }
  }
`;

export default GlobalTypography;
