export function generateVibrantWarmBlueColor() {
  // Blue channel: High value to maintain the blue color
  const b = Math.floor(Math.random() * 192) + 64; // 128 to 255

  // Green channel: Moderate to high value to add a vibrant cyan or turquoise tone
  const g = Math.floor(Math.random() * 192) + 64; // 128 to 255

  // Red channel: Low to moderate value to add a slight warmth
  const r = Math.floor(Math.random() * 192) + 64; // 64 to 127

  // Combine into a 24-bit number
  const color = (r << 16) | (g << 8) | b;

  return color;
}
