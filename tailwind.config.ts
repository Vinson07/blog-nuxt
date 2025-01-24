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
        // 字体颜色
        'v-fc': '#363636',
        'v-fc-dark': '#f7f7fa', // 暗黑模式
        // 主题背景颜色
        'v-bg': '#f7f9fe',
        'v-bg-dark': '#18171d',
        // 透明背景
        'v-bg-trans': 'rgba(255,255,255,0.7)',
        'v-bg-trans-dark': 'rgba(38,38,38,0.7)',
        // 容器背景颜色
        'v-box-bg': 'white',
        'v-box-bg-dark': '#262626',
        // 高亮颜色
        'v-hc': '#f97316',
        'v-hc-dark': '#6366f1'
      },
      boxShadow: {
        // 容器阴影
        'v-box-sh': '0 1px 30px -4px #e8e8e8',
        'v-box-sh-dark': '0 1px 35px -8px rgba(26,26,26,0.6)', // 暗黑模式
        'v-box-sh-hover': '0 1px 20px 10px #e8e8e8',
        'v-box-sh-hover-dark': '0 1px 20px 0px rgb(99,102,241)'
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
