import { CropInfo } from '../types/plant';

export const SUPPORTED_CROPS: CropInfo[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae (Nightshade)',
    description: 'High-value horticultural crop vulnerable to fungal leaf blights and viral mosaic strains.',
    commonDiseases: ['Early Blight (Alternaria solani)', 'Late Blight (Phytophthora infestans)', 'Bacterial Spot', 'Yellow Leaf Curl Virus'],
    icon: '🍅',
    optimalTemperature: '20°C - 27°C',
    wateringGuideline: 'Drip irrigation at base; avoid wetting foliage.'
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    family: 'Solanaceae (Nightshade)',
    description: 'Essential staple tuber crop requiring strict canopy protection against rapid fungal blights.',
    commonDiseases: ['Late Blight', 'Early Blight', 'Blackleg', 'Common Scab'],
    icon: '🥔',
    optimalTemperature: '15°C - 20°C',
    wateringGuideline: 'Even moisture during tuber initiation; morning watering.'
  },
  {
    id: 'pepper',
    name: 'Bell & Chili Pepper',
    scientificName: 'Capsicum annuum',
    family: 'Solanaceae',
    description: 'Warm-season crop susceptible to bacterial leaf spots, anthracnose, and powdery mildew.',
    commonDiseases: ['Bacterial Leaf Spot (Xanthomonas)', 'Anthracnose', 'Phytophthora Blight'],
    icon: '🫑',
    optimalTemperature: '21°C - 29°C',
    wateringGuideline: 'Deep weekly watering; ensure excellent soil drainage.'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    family: 'Poaceae (Grass)',
    description: 'Global cereal crop often impacted by northern corn leaf blight and common rust fungi.',
    commonDiseases: ['Northern Corn Leaf Blight (Exserohilum turcicum)', 'Common Rust', 'Gray Leaf Spot'],
    icon: '🌽',
    optimalTemperature: '18°C - 32°C',
    wateringGuideline: 'Crucial at silking and tasseling stages; furrow or pivot.'
  },
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    family: 'Poaceae',
    description: 'Vital food grain sensitive to blast lesions, bacterial blight, and sheath rot in humid zones.',
    commonDiseases: ['Rice Blast (Magnaporthe oryzae)', 'Bacterial Leaf Blight', 'Brown Spot'],
    icon: '🌾',
    optimalTemperature: '24°C - 30°C',
    wateringGuideline: 'Controlled flooding / Alternate Wetting and Drying (AWD).'
  },
  {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    family: 'Rosaceae',
    description: 'Temperate deciduous fruit tree prone to Venturia inaequalis (Apple Scab) and Cedar Apple Rust.',
    commonDiseases: ['Apple Scab', 'Cedar Apple Rust', 'Powdery Mildew', 'Fire Blight'],
    icon: '🍎',
    optimalTemperature: '18°C - 24°C',
    wateringGuideline: 'Deep root irrigation; avoid sprinkler contact with canopy.'
  },
  {
    id: 'grape',
    name: 'Grapevine',
    scientificName: 'Vitis vinifera',
    family: 'Vitaceae',
    description: 'Perennial vine crop highly prone to black rot, downy mildew, and powdery mildew.',
    commonDiseases: ['Black Rot (Guignardia bidwellii)', 'Downy Mildew', 'Powdery Mildew', 'Esca'],
    icon: '🍇',
    optimalTemperature: '20°C - 28°C',
    wateringGuideline: 'Drip lines along vine rows; moderate water deficit pre-harvest.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    family: 'Malvaceae',
    description: 'Major industrial cash fiber crop vulnerable to bacterial blight and fungal leaf spots.',
    commonDiseases: ['Bacterial Blight (Angular Leaf Spot)', 'Alternaria Leaf Spot', 'Fusarium Wilt'],
    icon: '🌱',
    optimalTemperature: '26°C - 35°C',
    wateringGuideline: 'Regulated deficit irrigation; avoid waterlogging during boll formation.'
  }
];
