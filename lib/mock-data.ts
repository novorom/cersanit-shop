export interface Product {
  id: number
  sku: string
  name: string
  slug: string
  brand: string
  collection: string
  product_type: string
  format: string
  surface: string
  color: string
  material_type: string
  application: string
  rooms: string[]
  thickness: string
  pieces_per_box: number
  sqm_per_box: number
  country: string
  price_retail: number
  price_official: number | null
  currency: string
  stock_yanino: number
  stock_factory: number
  description: string
  images: string[]
  main_image: string
  is_new: boolean
  is_bestseller: boolean
  is_discount: boolean
  rating: number
  reviews_count: number
}

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  count: number
}

export interface Collection {
  id: number
  name: string
  slug: string
  image: string
  product_count: number
}

export const categories: Category[] = [
  { id: 1, name: "Керамическая плитка", slug: "keramicheskaya-plitka", image: "/images/categories/ceramic.jpg", count: 342 },
  { id: 2, name: "Керамогранит", slug: "keramogranit", image: "/images/categories/porcelain.jpg", count: 256 },
  { id: 3, name: "Мозаика", slug: "mozaika", image: "/images/categories/mosaic.jpg", count: 89 },
  { id: 4, name: "Ступени", slug: "stupeni", image: "/images/categories/steps.jpg", count: 64 },
]

export const collections: Collection[] = [
  { id: 1, name: "Marble Charm", slug: "marble-charm", image: "/images/tiles/marble-white.jpg", product_count: 24 },
  { id: 2, name: "Wood Concept", slug: "wood-concept", image: "/images/tiles/wood-beige.jpg", product_count: 18 },
  { id: 3, name: "Loft Brick", slug: "loft-brick", image: "/images/tiles/gray-concrete.jpg", product_count: 12 },
  { id: 4, name: "Mediterranean", slug: "mediterranean", image: "/images/tiles/mosaic-blue.jpg", product_count: 15 },
  { id: 5, name: "Dark Elegance", slug: "dark-elegance", image: "/images/tiles/black-stone.jpg", product_count: 20 },
]

export const products: Product[] = [
  {
    id: 1,
    sku: "C-WG4H092D",
    name: "Marble Charm Белый 29.7x60",
    slug: "marble-charm-belyj-297x60",
    brand: "Cersanit",
    collection: "Marble Charm",
    product_type: "Керамическая плитка",
    format: "29.7x60",
    surface: "Глянцевая",
    color: "Белый",
    material_type: "Керамика",
    application: "Стена",
    rooms: ["Ванная", "Кухня"],
    thickness: "9 мм",
    pieces_per_box: 10,
    sqm_per_box: 1.78,
    country: "Россия",
    price_retail: 1290,
    price_official: 1490,
    currency: "RUB",
    stock_yanino: 450,
    stock_factory: 1200,
    description: "Керамическая настенная плитка из коллекции Marble Charm с изысканным мраморным дизайном. Глянцевая поверхность создает элегантный интерьер ванной комнаты или кухни.",
    images: ["/images/tiles/marble-white.jpg", "/images/tiles/marble-white.jpg", "/images/tiles/marble-white.jpg"],
    main_image: "/images/tiles/marble-white.jpg",
    is_new: true,
    is_bestseller: true,
    is_discount: false,
    rating: 4.8,
    reviews_count: 23,
  },
  {
    id: 2,
    sku: "C-WF4P093D",
    name: "Wood Concept Natural Бежевый 22x90",
    slug: "wood-concept-natural-bezhevyj-22x90",
    brand: "Cersanit",
    collection: "Wood Concept",
    product_type: "Керамогранит",
    format: "22x90",
    surface: "Матовая",
    color: "Бежевый",
    material_type: "Керамогранит",
    application: "Пол",
    rooms: ["Гостиная", "Спальня", "Кухня"],
    thickness: "10 мм",
    pieces_per_box: 7,
    sqm_per_box: 1.39,
    country: "Россия",
    price_retail: 1850,
    price_official: null,
    currency: "RUB",
    stock_yanino: 280,
    stock_factory: 800,
    description: "Керамогранит под дерево из коллекции Wood Concept Natural. Реалистичная текстура натурального дуба, матовая поверхность. Идеально подходит для пола в гостиной и спальне.",
    images: ["/images/tiles/wood-beige.jpg", "/images/tiles/wood-beige.jpg"],
    main_image: "/images/tiles/wood-beige.jpg",
    is_new: false,
    is_bestseller: true,
    is_discount: false,
    rating: 4.9,
    reviews_count: 41,
  },
  {
    id: 3,
    sku: "C-GR4S061D",
    name: "Loft Brick Серый 60x60",
    slug: "loft-brick-seryj-60x60",
    brand: "Cersanit",
    collection: "Loft Brick",
    product_type: "Керамогранит",
    format: "60x60",
    surface: "Матовая",
    color: "Серый",
    material_type: "Керамогранит",
    application: "Пол",
    rooms: ["Гостиная", "Прихожая"],
    thickness: "10 мм",
    pieces_per_box: 4,
    sqm_per_box: 1.44,
    country: "Россия",
    price_retail: 1650,
    price_official: 1890,
    currency: "RUB",
    stock_yanino: 120,
    stock_factory: 600,
    description: "Керамогранит в стиле лофт с текстурой бетона. Матовая поверхность с противоскользящими свойствами. Крупный формат 60x60 визуально расширяет пространство.",
    images: ["/images/tiles/gray-concrete.jpg", "/images/tiles/gray-concrete.jpg"],
    main_image: "/images/tiles/gray-concrete.jpg",
    is_new: false,
    is_bestseller: false,
    is_discount: true,
    rating: 4.6,
    reviews_count: 15,
  },
  {
    id: 4,
    sku: "C-MZ2M044D",
    name: "Mediterranean Мозаика Голубой 30x30",
    slug: "mediterranean-mozaika-goluboj-30x30",
    brand: "Cersanit",
    collection: "Mediterranean",
    product_type: "Мозаика",
    format: "30x30",
    surface: "Глянцевая",
    color: "Голубой",
    material_type: "Керамика",
    application: "Стена",
    rooms: ["Ванная", "Бассейн"],
    thickness: "8 мм",
    pieces_per_box: 12,
    sqm_per_box: 1.08,
    country: "Россия",
    price_retail: 2100,
    price_official: null,
    currency: "RUB",
    stock_yanino: 95,
    stock_factory: 300,
    description: "Мозаика в средиземноморском стиле. Голубые оттенки создают атмосферу морского побережья. Идеально подходит для ванных комнат и бассейнов.",
    images: ["/images/tiles/mosaic-blue.jpg", "/images/tiles/mosaic-blue.jpg"],
    main_image: "/images/tiles/mosaic-blue.jpg",
    is_new: true,
    is_bestseller: false,
    is_discount: false,
    rating: 4.7,
    reviews_count: 8,
  },
  {
    id: 5,
    sku: "C-DK4S071D",
    name: "Dark Elegance Чёрный 60x60",
    slug: "dark-elegance-chernyj-60x60",
    brand: "Cersanit",
    collection: "Dark Elegance",
    product_type: "Керамогранит",
    format: "60x60",
    surface: "Полированная",
    color: "Чёрный",
    material_type: "Керамогранит",
    application: "Пол",
    rooms: ["Гостиная", "Холл"],
    thickness: "10 мм",
    pieces_per_box: 4,
    sqm_per_box: 1.44,
    country: "Россия",
    price_retail: 2450,
    price_official: 2890,
    currency: "RUB",
    stock_yanino: 60,
    stock_factory: 400,
    description: "Элегантный чёрный керамогранит с полированной поверхностью. Придает интерьеру роскошный и изысканный вид. Подходит для пола в гостиных и холлах.",
    images: ["/images/tiles/black-stone.jpg", "/images/tiles/black-stone.jpg"],
    main_image: "/images/tiles/black-stone.jpg",
    is_new: false,
    is_bestseller: true,
    is_discount: true,
    rating: 4.9,
    reviews_count: 31,
  },
  {
    id: 6,
    sku: "C-WG4H101D",
    name: "Marble Charm Серый 29.7x60",
    slug: "marble-charm-seryj-297x60",
    brand: "Cersanit",
    collection: "Marble Charm",
    product_type: "Керамическая плитка",
    format: "29.7x60",
    surface: "Глянцевая",
    color: "Серый",
    material_type: "Керамика",
    application: "Стена",
    rooms: ["Ванная"],
    thickness: "9 мм",
    pieces_per_box: 10,
    sqm_per_box: 1.78,
    country: "Россия",
    price_retail: 1350,
    price_official: null,
    currency: "RUB",
    stock_yanino: 320,
    stock_factory: 900,
    description: "Настенная керамическая плитка с мраморным рисунком в серых тонах. Глянцевая поверхность идеально подходит для стен ванной комнаты.",
    images: ["/images/tiles/marble-white.jpg"],
    main_image: "/images/tiles/marble-white.jpg",
    is_new: false,
    is_bestseller: false,
    is_discount: false,
    rating: 4.5,
    reviews_count: 12,
  },
  {
    id: 7,
    sku: "C-ST2P081D",
    name: "Stone Steps Бежевый 30x60",
    slug: "stone-steps-bezhevyj-30x60",
    brand: "Cersanit",
    collection: "Stone Steps",
    product_type: "Ступени",
    format: "30x60",
    surface: "Матовая",
    color: "Бежевый",
    material_type: "Керамогранит",
    application: "Ступени",
    rooms: ["Улица", "Крыльцо"],
    thickness: "12 мм",
    pieces_per_box: 6,
    sqm_per_box: 1.08,
    country: "Россия",
    price_retail: 1980,
    price_official: null,
    currency: "RUB",
    stock_yanino: 180,
    stock_factory: 500,
    description: "Ступени из керамогранита с натуральной каменной текстурой. Матовая противоскользящая поверхность обеспечивает безопасность.",
    images: ["/images/tiles/wood-beige.jpg"],
    main_image: "/images/tiles/wood-beige.jpg",
    is_new: false,
    is_bestseller: false,
    is_discount: false,
    rating: 4.4,
    reviews_count: 6,
  },
  {
    id: 8,
    sku: "C-WC4H111D",
    name: "Wood Concept Rustic Коричневый 18.5x60",
    slug: "wood-concept-rustic-korichnevyj-185x60",
    brand: "Cersanit",
    collection: "Wood Concept",
    product_type: "Керамогранит",
    format: "18.5x60",
    surface: "Матовая",
    color: "Коричневый",
    material_type: "Керамогранит",
    application: "Пол",
    rooms: ["Кухня", "Прихожая"],
    thickness: "10 мм",
    pieces_per_box: 9,
    sqm_per_box: 1.0,
    country: "Россия",
    price_retail: 1590,
    price_official: 1790,
    currency: "RUB",
    stock_yanino: 200,
    stock_factory: 650,
    description: "Керамогранит под дерево с рустикальной текстурой. Тёплые коричневые тона создают уютную атмосферу.",
    images: ["/images/tiles/wood-beige.jpg"],
    main_image: "/images/tiles/wood-beige.jpg",
    is_new: true,
    is_bestseller: false,
    is_discount: false,
    rating: 4.7,
    reviews_count: 19,
  },
]

export const filterOptions = {
  collections: [...new Set(products.map((p) => p.collection))],
  formats: [...new Set(products.map((p) => p.format))],
  colors: [...new Set(products.map((p) => p.color))],
  surfaces: [...new Set(products.map((p) => p.surface))],
  product_types: [...new Set(products.map((p) => p.product_type))],
  applications: [...new Set(products.map((p) => p.application))],
  price_range: {
    min: Math.min(...products.map((p) => p.price_retail)),
    max: Math.max(...products.map((p) => p.price_retail)),
  },
}
