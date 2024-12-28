/** @type {import('tailwindcss').Config} */
function generateSequentialEmSpacing(topLevel) {
  const spacing = {};
  for (let i = 1; i <= topLevel; i++) {
    spacing[i] = `${i}em`;
  }
  return spacing;
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'mono': ['monospace'],
    },
    extend: {
      spacing: generateSequentialEmSpacing(6),
    }
  },
}

