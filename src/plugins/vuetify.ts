/**
 
plugins/vuetify.ts*
Framework documentation: https://vuetifyjs.com%60/
*/

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0E4749', // bluegreen
          secondary: '#DD4545', // red
          background: '#002626', // Add this line

        },
      },
    },
  },
})
