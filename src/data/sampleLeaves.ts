import { SampleLeaf } from '../types/plant';

// Helper to encode SVG string to data URI
function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

const tomatoEarlyBlightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="leafGrad" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="60%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </radialGradient>
    <radialGradient id="lesion1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#291605" />
      <stop offset="40%" stop-color="#542e0c" />
      <stop offset="70%" stop-color="#854d0e" />
      <stop offset="100%" stop-color="#eab308" />
    </radialGradient>
    <radialGradient id="lesion2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1917" />
      <stop offset="50%" stop-color="#451a03" />
      <stop offset="80%" stop-color="#a16207" />
      <stop offset="100%" stop-color="#facc15" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="6" stdDeviation="6" flood-opacity="0.25" flood-color="#052e16" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#f1f5f9" />
  
  <!-- Leaf Stem -->
  <path d="M 200,370 Q 200,280 200,200" stroke="#14532d" stroke-width="9" stroke-linecap="round" fill="none" />
  
  <!-- Main Leaf Body (Compound Tomato Leaflet) -->
  <path d="M 200,45 C 270,70 330,130 310,230 C 290,290 240,330 200,360 C 160,330 110,290 90,230 C 70,130 130,70 200,45 Z"
        fill="url(#leafGrad)" filter="url(#shadow)" stroke="#166534" stroke-width="3"/>
  
  <!-- Leaf Veins -->
  <path d="M 200,55 L 200,350" stroke="#166534" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  <path d="M 200,120 Q 250,110 280,140" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>
  <path d="M 200,120 Q 150,110 120,140" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>
  <path d="M 200,180 Q 260,170 290,200" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>
  <path d="M 200,180 Q 140,170 110,200" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>
  <path d="M 200,240 Q 250,235 275,260" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>
  <path d="M 200,240 Q 150,235 125,260" stroke="#166534" stroke-width="2.5" fill="none" opacity="0.5"/>

  <!-- Early Blight Concentric Target Ring Lesions -->
  <!-- Main large lesion -->
  <circle cx="160" cy="170" r="38" fill="url(#lesion1)" opacity="0.95"/>
  <circle cx="160" cy="170" r="28" stroke="#1f2937" stroke-width="2" fill="none" opacity="0.8"/>
  <circle cx="160" cy="170" r="18" stroke="#374151" stroke-width="2" fill="none" opacity="0.9"/>
  <circle cx="160" cy="170" r="8" fill="#18181b" />

  <!-- Second Lesion with chlorotic halo -->
  <ellipse cx="245" cy="225" rx="30" ry="24" fill="url(#lesion2)" opacity="0.92"/>
  <ellipse cx="245" cy="225" rx="20" ry="16" stroke="#262626" stroke-width="2" fill="none" opacity="0.8"/>
  <ellipse cx="245" cy="225" rx="10" ry="8" fill="#171717"/>

  <!-- Smaller satellite lesions -->
  <circle cx="210" cy="110" r="14" fill="url(#lesion1)" opacity="0.85"/>
  <circle cx="140" cy="265" r="18" fill="url(#lesion2)" opacity="0.88"/>
  <circle cx="255" cy="150" r="12" fill="url(#lesion1)" opacity="0.8"/>

  <!-- Chlorotic yellow leaf edge senescence -->
  <path d="M 290,210 Q 315,245 295,280 C 275,255 285,230 290,210 Z" fill="#facc15" opacity="0.6"/>
  <path d="M 110,210 Q 85,245 105,280 C 125,255 115,230 110,210 Z" fill="#facc15" opacity="0.6"/>
</svg>
`;

const potatoLateBlightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="potatoLeaf" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#86efac" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#166534" />
    </radialGradient>
    <radialGradient id="blightDark" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#171717" />
      <stop offset="60%" stop-color="#3f3f46" />
      <stop offset="85%" stop-color="#713f12" />
      <stop offset="100%" stop-color="#a3e635" />
    </radialGradient>
    <filter id="pShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.2" flood-color="#0f172a" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#f8fafc" />

  <!-- Stem -->
  <path d="M 200,380 L 200,260" stroke="#14532d" stroke-width="8" stroke-linecap="round"/>

  <!-- Leaf Shape (Broad oval Potato Leaf) -->
  <path d="M 200,50 C 310,70 340,180 320,280 C 290,340 240,360 200,370 C 160,360 110,340 80,280 C 60,180 90,70 200,50 Z"
        fill="url(#potatoLeaf)" filter="url(#pShadow)" stroke="#15803d" stroke-width="2.5" />

  <!-- Veins -->
  <path d="M 200,60 L 200,360" stroke="#166534" stroke-width="3.5" opacity="0.6" />
  <path d="M 200,130 Q 260,110 300,140" stroke="#166534" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,130 Q 140,110 100,140" stroke="#166534" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,200 Q 270,185 310,215" stroke="#166534" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,200 Q 130,185 90,215" stroke="#166534" stroke-width="2" fill="none" opacity="0.5"/>

  <!-- Severe Late Blight Water-Soaked Necrotic Lesions (Phytophthora infestans) -->
  <!-- Margin necrosis -->
  <path d="M 250,70 C 330,110 340,210 270,220 C 220,180 230,110 250,70 Z" fill="url(#blightDark)" opacity="0.95" />
  <path d="M 150,150 C 90,170 75,260 140,280 C 190,250 170,180 150,150 Z" fill="url(#blightDark)" opacity="0.92" />
  
  <!-- Pale white fungal sporulation border on humid zone -->
  <path d="M 235,170 Q 255,200 275,225" stroke="#ffffff" stroke-dasharray="3,3" stroke-width="3" fill="none" opacity="0.85" />
  <path d="M 125,240 Q 150,265 170,260" stroke="#ffffff" stroke-dasharray="3,3" stroke-width="3" fill="none" opacity="0.85" />
</svg>
`;

const healthyMaizeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="maizeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <filter id="mShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="5" stdDeviation="6" flood-opacity="0.2" flood-color="#052e16" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#f1f5f9" />

  <!-- Long Arching Maize Blade -->
  <path d="M 200,380 Q 190,220 280,110 Q 320,60 340,30 Q 290,70 230,120 Q 120,220 180,380 Z"
        fill="url(#maizeGrad)" filter="url(#mShadow)" stroke="#166534" stroke-width="2"/>
        
  <!-- Parallel Veination (Monocot Characteristic) -->
  <path d="M 190,380 Q 185,220 280,110 Q 320,60 340,30" stroke="#86efac" stroke-width="3.5" fill="none" opacity="0.8"/>
  <path d="M 183,380 Q 175,225 260,120" stroke="#86efac" stroke-width="1.5" fill="none" opacity="0.6"/>
  <path d="M 196,380 Q 195,215 295,100" stroke="#86efac" stroke-width="1.5" fill="none" opacity="0.6"/>
  <path d="M 175,380 Q 165,235 240,140" stroke="#86efac" stroke-width="1.2" fill="none" opacity="0.5"/>

  <!-- Healthy Leaf Sheath Node & Dewdrops -->
  <circle cx="270" cy="130" r="5" fill="#e0f2fe" opacity="0.9"/>
  <circle cx="250" cy="160" r="3.5" fill="#e0f2fe" opacity="0.8"/>
  <circle cx="220" cy="210" r="4" fill="#e0f2fe" opacity="0.9"/>
</svg>
`;

const pepperBacterialSpotSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="pepperLeaf" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#86efac" />
      <stop offset="60%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#14532d" />
    </radialGradient>
    <filter id="pepShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="5" stdDeviation="5" flood-opacity="0.2" flood-color="#022c22" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#f8fafc" />

  <!-- Stem -->
  <path d="M 200,370 Q 200,280 200,220" stroke="#14532d" stroke-width="7" stroke-linecap="round"/>

  <!-- Pointed Bell Pepper Leaf Blade -->
  <path d="M 200,35 C 270,75 320,165 300,265 C 280,335 235,360 200,365 C 165,360 120,335 100,265 C 80,165 130,75 200,35 Z"
        fill="url(#pepperLeaf)" filter="url(#pepShadow)" stroke="#15803d" stroke-width="2.5"/>

  <!-- Veins -->
  <path d="M 200,45 L 200,360" stroke="#166534" stroke-width="3" opacity="0.6"/>
  <path d="M 200,120 Q 260,110 285,150" stroke="#166534" stroke-width="1.8" fill="none" opacity="0.5"/>
  <path d="M 200,120 Q 140,110 115,150" stroke="#166534" stroke-width="1.8" fill="none" opacity="0.5"/>
  <path d="M 200,190 Q 265,180 285,220" stroke="#166534" stroke-width="1.8" fill="none" opacity="0.5"/>
  <path d="M 200,190 Q 135,180 115,220" stroke="#166534" stroke-width="1.8" fill="none" opacity="0.5"/>

  <!-- Xanthomonas Bacterial Small Angular Punctate Spots -->
  <g fill="#262626" stroke="#ca8a04" stroke-width="1.5">
    <circle cx="160" cy="140" r="7"/>
    <circle cx="180" cy="165" r="5"/>
    <circle cx="150" cy="190" r="6"/>
    <circle cx="230" cy="150" r="8"/>
    <circle cx="250" cy="180" r="6"/>
    <circle cx="225" cy="210" r="7"/>
    <circle cx="170" cy="240" r="5"/>
    <circle cx="240" cy="250" r="6"/>
    <circle cx="190" cy="280" r="8"/>
    <circle cx="140" cy="225" r="6"/>
    <circle cx="260" cy="220" r="5"/>
    <circle cx="210" cy="110" r="5"/>
    <circle cx="155" cy="95" r="4"/>
  </g>
</svg>
`;

const appleScabSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="appleLeaf" cx="45%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#a7f3d0" />
      <stop offset="60%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </radialGradient>
    <radialGradient id="scabLesion" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1917" />
      <stop offset="50%" stop-color="#365314" />
      <stop offset="85%" stop-color="#713f12" />
      <stop offset="100%" stop-color="#84cc16" />
    </radialGradient>
    <filter id="aShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.2" flood-color="#022c22" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#f1f5f9" />

  <!-- Petiole -->
  <path d="M 200,375 Q 195,300 200,240" stroke="#065f46" stroke-width="7" stroke-linecap="round"/>

  <!-- Serrated Ovate Apple Leaf -->
  <path d="M 200,45 C 290,80 320,180 295,275 C 275,340 230,365 200,370 C 170,365 125,340 105,275 C 80,180 110,80 200,45 Z"
        fill="url(#appleLeaf)" filter="url(#aShadow)" stroke="#065f46" stroke-width="2.5"/>

  <!-- Veins -->
  <path d="M 200,55 L 200,360" stroke="#065f46" stroke-width="3" opacity="0.6"/>
  <path d="M 200,120 Q 255,105 285,135" stroke="#065f46" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,120 Q 145,105 115,135" stroke="#065f46" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,195 Q 260,180 285,215" stroke="#065f46" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M 200,195 Q 140,180 115,215" stroke="#065f46" stroke-width="2" fill="none" opacity="0.5"/>

  <!-- Venturia inaequalis Olive-Green Velvety Scab Spots with Irregular Margins -->
  <ellipse cx="170" cy="160" rx="28" ry="22" fill="url(#scabLesion)" opacity="0.95"/>
  <ellipse cx="235" cy="200" rx="32" ry="26" fill="url(#scabLesion)" opacity="0.95"/>
  <circle cx="215" cy="115" r="15" fill="url(#scabLesion)" opacity="0.88"/>
  <circle cx="150" cy="255" r="22" fill="url(#scabLesion)" opacity="0.9"/>
  <circle cx="260" cy="265" r="14" fill="url(#scabLesion)" opacity="0.85"/>
</svg>
`;

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-tomato-early-blight',
    title: 'Tomato Early Blight',
    plantName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    severity: 'Moderate',
    confidence: 93,
    description: 'Distinctive concentric target-like rings with chlorotic yellow halo on lower tomato canopy leaflets.',
    imageUrl: svgToDataUri(tomatoEarlyBlightSvg),
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'sample-potato-late-blight',
    title: 'Potato Late Blight',
    plantName: 'Potato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    severity: 'Severe',
    confidence: 96,
    description: 'Rapidly spreading dark water-soaked lesions with delicate white sporulation margins under humid conditions.',
    imageUrl: svgToDataUri(potatoLateBlightSvg),
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    id: 'sample-maize-healthy',
    title: 'Maize (Healthy Crop)',
    plantName: 'Maize (Corn)',
    diseaseName: 'Healthy (No Disease Detected)',
    severity: 'None',
    confidence: 98,
    description: 'Vibrant green monocot foliage with intact parallel veination, zero necrotic spotting, and uniform turgidity.',
    imageUrl: svgToDataUri(healthyMaizeSvg),
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'sample-pepper-bacterial-spot',
    title: 'Pepper Bacterial Leaf Spot',
    plantName: 'Pepper (Bell / Chili)',
    diseaseName: 'Bacterial Spot (Xanthomonas spp.)',
    severity: 'Mild',
    confidence: 91,
    description: 'Small, circular to angular water-soaked dark spots appearing on foliage, leading to premature leaf drop.',
    imageUrl: svgToDataUri(pepperBacterialSpotSvg),
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  {
    id: 'sample-apple-scab',
    title: 'Apple Scab',
    plantName: 'Apple',
    diseaseName: 'Apple Scab (Venturia inaequalis)',
    severity: 'Moderate',
    confidence: 94,
    description: 'Dull, olive-green to black velvety lesions with feathered margins spreading on upper leaf surface.',
    imageUrl: svgToDataUri(appleScabSvg),
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  }
];
