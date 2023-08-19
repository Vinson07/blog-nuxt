import type { Config } from 'tailwindcss'
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // 主题背景和字体颜色
        'v-fontcolor': '#363636',
        'v-background': '#f7f9fe',
        'v-fontcolor-dark': '#f7f7fa',
        'v-background-dark': '#18171d'
      },
      animation: {
        'bounce-slow': 'bounce 3s ease infinite',
        'spin-slow': 'spin 3s linear infinite'
      },
      transitionProperty: {
        flow: 'background-position'
      },
      backgroundSize: {
        flow: '400% auto'
      },
      backgroundImage: {
        'nuxt-gradient':
          'linear-gradient(30deg,#475569,#475569 25%,#0007dc 50%,#5400dc 75%,#dc00bf)',
        'link-white-gradient':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 40%)',
        'link-black-gradien':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.9) 40%)'
      },
      fontSize: {
        15: ['0.9375rem', '1.375rem'],
        22: ['1.375rem', '1.875rem']
      },
      spacing: {
        '5px': '0.3125rem',
        '10px': '0.625rem',
        '15px': '0.9375rem',
        '25px': '1.5625rem',
        '30px': '1.875rem',
        '35px': '2.1875rem',
        '45px': '2.8125rem',
        '50px': '3.125rem',
        '55px': '3.4375rem'
      }
    }
  },
  plugins: [
    function ({ addBase }: any) {
      addBase({
        '.n-button': {
          'background-color': 'var(--n-color)'
        }
      })
    }
  ]
}
