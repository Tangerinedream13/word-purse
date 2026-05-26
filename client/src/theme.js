import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      bg: "#FAF6EE",
      color: "#2C1810",
      fontFamily: '"Lato", system-ui, -apple-system, sans-serif',
    },
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
  },
  theme: {
    tokens: {
      colors: {
        hermes: {
          50:  { value: "#FFF4E6" },
          100: { value: "#FFE0BC" },
          200: { value: "#FFCC91" },
          300: { value: "#FFB766" },
          400: { value: "#FFA33B" },
          500: { value: "#E8841A" },
          600: { value: "#CC6D0D" },
          700: { value: "#B05600" },
          800: { value: "#944000" },
          900: { value: "#782A00" },
        },
        gold: {
          400: { value: "#D4B460" },
          500: { value: "#C9A84C" },
          600: { value: "#B8953B" },
        },
        cream: {
          50:  { value: "#FEFCF8" },
          100: { value: "#FAF6EE" },
          200: { value: "#F5ECD7" },
          300: { value: "#EDD9B8" },
        },
        chocolate: {
          500: { value: "#6B3A1F" },
          700: { value: "#4A2010" },
          900: { value: "#2C1810" },
        },
        cognac: {
          400: { value: "#B5784A" },
          500: { value: "#8B5E3C" },
          600: { value: "#6B4530" },
        },
      },
      fonts: {
        heading: { value: '"Playfair Display", Georgia, serif' },
        body:    { value: '"Lato", system-ui, -apple-system, sans-serif' },
      },
    },
  },
})

export default system
