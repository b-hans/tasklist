function zebraStripeCustomColors(range) {
  const sheet = FORMSHEET;

  // Apply default row banding first, or use a theme base
  const banding = range.applyRowBanding();

  // Set custom colors using hex codes
  banding.setHeaderRowColor('white');
  banding.setFirstRowColor('#f7f5d2');      // First stripe color (white)
  banding.setSecondRowColor('white');     // Second stripe color (light gray)
}
