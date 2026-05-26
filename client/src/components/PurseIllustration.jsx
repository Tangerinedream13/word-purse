const sp = (cx, cy, r) => {
  const s = r * 0.22
  return `M ${cx},${cy - r} L ${cx + s},${cy - s} L ${cx + r},${cy} L ${cx + s},${cy + s} L ${cx},${cy + r} L ${cx - s},${cy + s} L ${cx - r},${cy} L ${cx - s},${cy - s} Z`
}

const sparkles = [
  { d: sp(42, 88, 13),  fill: "#C9A84C" },
  { d: sp(358, 72, 9),  fill: "#C9A84C" },
  { d: sp(368, 215, 7), fill: "#D4B460" },
  { d: sp(33, 278, 15), fill: "#C9A84C" },
  { d: sp(372, 332, 7), fill: "#C9A84C" },
  { d: sp(46, 378, 11), fill: "#D4B460" },
  { d: sp(344, 388, 10),fill: "#C9A84C" },
  { d: sp(200, 16, 9),  fill: "#C9A84C" },
  { d: sp(152, 424, 6), fill: "#D4B460" },
  { d: sp(252, 425, 8), fill: "#C9A84C" },
  { d: sp(382, 155, 5), fill: "#D4B460" },
  { d: sp(20, 198, 6),  fill: "#C9A84C" },
  { d: sp(310, 18, 7),  fill: "#D4B460" },
  { d: sp(88, 28, 8),   fill: "#C9A84C" },
]

const HANDLE = "#CC6D0D"
const BODY   = "#E8841A"
const FLAP   = "#CC6D0D"
const SHADOW = "#A85C0A"
const OUTLINE= "#2C1810"
const CREAM  = "#FAF6EE"
const GOLD   = "#C9A84C"

export default function PurseIllustration({ size = 300 }) {
  const h = Math.round(size * 1.1)
  return (
    <svg
      viewBox="0 0 400 440"
      width={size}
      height={h}
      aria-label="Illustrated Birkin bag"
      role="img"
      style={{ display: "block" }}
    >
      {/* Background sparkles */}
      {sparkles.map((s, i) => (
        <path key={i} d={s.d} fill={s.fill} opacity="0.85" />
      ))}

      {/* Drop shadow */}
      <rect x="77" y="149" width="260" height="195" rx="12" fill={SHADOW} opacity="0.28" />

      {/* Handles — drawn first so bag body covers their bases */}
      {/* Left handle dark outline */}
      <path d="M 138,143 C 112,28 200,25 187,143" stroke={OUTLINE} strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* Left handle fill */}
      <path d="M 138,143 C 112,28 200,25 187,143" stroke={HANDLE} strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Left handle stitching */}
      <path d="M 138,143 C 112,28 200,25 187,143" stroke={CREAM} strokeWidth="1.5" fill="none" strokeDasharray="5,4" strokeLinecap="round" />

      {/* Right handle dark outline */}
      <path d="M 218,143 C 208,25 292,28 268,143" stroke={OUTLINE} strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* Right handle fill */}
      <path d="M 218,143 C 208,25 292,28 268,143" stroke={HANDLE} strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Right handle stitching */}
      <path d="M 218,143 C 208,25 292,28 268,143" stroke={CREAM} strokeWidth="1.5" fill="none" strokeDasharray="5,4" strokeLinecap="round" />

      {/* Bag body */}
      <rect x="71" y="141" width="260" height="195" rx="12" fill={BODY} stroke={OUTLINE} strokeWidth="2.5" />

      {/* Bag flap */}
      <rect x="68" y="132" width="266" height="92" rx="10" fill={FLAP} stroke={OUTLINE} strokeWidth="2.5" />

      {/* Flap stitching */}
      <rect x="82" y="146" width="238" height="64" rx="5" fill="none" stroke={CREAM} strokeWidth="1.5" strokeDasharray="6,4" />

      {/* Lock shackle */}
      <path d="M 191,180 A 9,9 0 0,1 209,180" stroke={GOLD} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Lock body */}
      <rect x="187" y="178" width="26" height="20" rx="4" fill={GOLD} stroke={OUTLINE} strokeWidth="1.2" />
      {/* Keyhole */}
      <circle cx="200" cy="187" r="3.5" fill="#7A4A10" />
      <rect x="198.5" y="187" width="3" height="5" rx="1" fill="#7A4A10" />

      {/* Body stitching */}
      <rect x="85" y="242" width="232" height="86" rx="5" fill="none" stroke={CREAM} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.85" />

      {/* Handle attachment rings (small gold ovals) */}
      <ellipse cx="148" cy="143" rx="8" ry="5" fill={GOLD} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="255" cy="143" rx="8" ry="5" fill={GOLD} stroke={OUTLINE} strokeWidth="1" />

      {/* Bottom corner studs */}
      <circle cx="87"  cy="328" r="5.5" fill={GOLD} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="315" cy="328" r="5.5" fill={GOLD} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="87"  cy="150" r="4"   fill={GOLD} stroke={OUTLINE} strokeWidth="1" />
      <circle cx="315" cy="150" r="4"   fill={GOLD} stroke={OUTLINE} strokeWidth="1" />

      {/* Cute bow / ribbon on top-right corner of bag */}
      <path
        d="M 302,138 C 295,128 283,130 290,137 C 285,130 285,118 292,124 Z"
        fill={GOLD}
        stroke={OUTLINE}
        strokeWidth="1"
      />
      <path
        d="M 302,138 C 309,128 321,130 314,137 C 319,130 319,118 312,124 Z"
        fill={GOLD}
        stroke={OUTLINE}
        strokeWidth="1"
      />
      <circle cx="302" cy="137" r="3.5" fill={GOLD} stroke={OUTLINE} strokeWidth="1" />
    </svg>
  )
}
