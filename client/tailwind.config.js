// @type {import('tailwindcss').Config} 
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}",
],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/airo.jpg')",
      },
      colors: {
        "btn-color" : '#1597e4',
        "r-btn-color" : '#7a7a7a',
        "black-100" :"#00000092",
        'primary' : '#df2af7',
        'primary-dark':'#9015a1',
        'secondary':"#9685f2",
        'secondary-dark':'#7968d8',
        'border' :"#ccc",
        'lightGray':'#fafafa',
        'black-transparent' : '#00000003',
        'secondary-fade' : '#7968d822',
        'secondary-fade-1' : '#7968d844',
        'primary-transparent' : '#df2af703',
        'secondary-transparent' : '#7968d803',


      },
      width:{
        'w-sidebar':"180px",
        'quater':'25%',
        "half" : '50%',
        'full' : '100%'
      },
      screens: {
        'xs': '0px',
      },
    },
  },
  plugins: [],
  
}

