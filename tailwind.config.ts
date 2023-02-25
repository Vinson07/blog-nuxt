import type { Config } from 'tailwindcss'
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
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
          'linear-gradient(30deg,#475569,#475569 25%,#0007dc 50%,#5400dc 75%,#dc00bf)'
      }
    }
  }
}
