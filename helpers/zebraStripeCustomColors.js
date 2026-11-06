function zebraStripeCustomColors(range) {
  const sheet = FORMSHEET;

  // Apply default row banding first, or use a theme base
  const banding = range.applyRowBanding();

  // Set custom colors using hex codes
  banding.setHeaderRowColor('white');
  banding.setFirstRowColor('#ffffff');      // First stripe color (white)
  banding.setSecondRowColor('#f7f5d2');     // Second stripe color (light gray)
}
