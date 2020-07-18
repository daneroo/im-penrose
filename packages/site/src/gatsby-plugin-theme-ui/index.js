import nightOwl from '@theme-ui/prism/presets/night-owl.json'
// import solarizedlight from "@theme-ui/prism/presets/prism-solarizedlight.json";
// import shadesOfPurple from "@theme-ui/prism/presets/shades-of-purple.json";
// import prism from '@theme-ui/prism/presets/theme-ui'

import colors from './colors'
import headings from './headings'

import 'typeface-roboto' // npm i typeface-roboto
import 'typeface-roboto-mono' // npm i typeface-roboto-mono
import '../../../typeface-tondo' // npm i typeface-tondo

const prismTheme = nightOwl

const transition = '0.2s ease-out'
// const systemFonts = "-apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif";

export default {
  initialColorMode: 'light',
  colors,
  fonts: {
    // body: systemFonts,
    body: `"Tondo Regular", sans-serif`,
    // body: '"Roboto", sans-serif',

    // heading: systemFonts,
    heading: '"Tondo Bold", sans-serif',
    // heading: '"Roboto", sans-serif',

    // monospace: "Menlo, monospace"
    // monospace: `"Operator Mono", monospace`
    monospace: '"Roboto Mono", monospace'

  },
  fontSizes: [12, 14, 16, 24, 28, 36, 48, 64],
  fontWeights: {
    body: 400,
    monospace: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em'
  },
  breakpoints: [
    ['phone_small', 320],
    ['phone', 376],
    ['phablet', 540],
    ['tablet', 735],
    ['desktop', 1070],
    ['desktop_medium', 1280],
    ['desktop_large', 1440]
  ],
  transition,
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      ...headings
    },
    ...headings,
    p: {
      my: 3 // titghten these up: 4->3 (32->16)
    },
    a: {
      color: 'secondary',
      transition: `color ${transition} `,
      ':hover,:focus': {
        color: 'text'
      }
    },
    pre: {
      ...prismTheme,
      // fontFamily: `"Operator Mono", monospace`,
      fontFamily: 'monospace',
      fontWeight: 'monospace',
      fontSize: '0.9rem',
      tabSize: 4,
      hyphens: 'none',
      overflow: 'auto',
      borderRadius: 6,
      p: 3,
      my: 4
    },
    inlineCode: {
      color: 'primary',
      background: 'rgba(233, 218, 172, 0.15)',
      borderRadius: 3,
      px: '0.4rem',
      py: '0.2rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    }
  }
}
