import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Mountain,
  Waves,
  TreePine,
  Landmark,
  Home as HomeIcon,
  Phone,
  Mail,
  Compass,
  X,
  ArrowLeft,
  Globe,
} from "lucide-react";

const TOKENS = {
  bg: "#182019",
  surface: "#212B23",
  surface2: "#2A362D",
  line: "#3A483C",
  ink: "#F2EDDD",
  inkDim: "#B9B49E",
  gold: "#D6A424",
  goldDim: "#9C7A22",
  rose: "#AE4634",
  teal: "#4C8E86",
};

const navBtnStyle = {
  color: "inherit",
  background: "none",
  border: "none",
  padding: 0,
  fontFamily: "var(--body)",
  fontSize: 14,
  cursor: "pointer",
};

const REGIONS = [
  {
    id: "sofia",
    name: "Околностите на София",
    tagline: "Планина на прага на столицата",
    icon: Mountain,
    pois: [
      {
            "name": "Egrekadren",
            "description": "Туристически комплекс с развлечения",
            "type": "Tourist Attraction",
            "address": "Близо до София, България",
            "website": "https://egrekadren.alle.bg/"
      },
      {
            "name": "Zhivata Voda",
            "description": "Природна вода с лечебни свойства",
            "type": "Natural Wonder",
            "address": "Близо до София, България",
            "website": "https://www.peika.bg/statia/Mestnost_Zhivata_voda_i_zmeyskata_cheshma_kray_Bosnek"
      },
      {
            "name": "Lyulin Mountain",
            "description": "Планина с туристически маршрути",
            "type": "Mountain",
            "address": "Близо до София, България",
            "website": "https://profit.bg/pyteshestviq/na-krachka-ot-stolitsata-pet-interesni-mesta-v-lyulin-planina/"
      },
      {
            "name": "Vitosha Mountain",
            "description": "Планина с хижи и маршрути",
            "type": "Mountain",
            "address": "Близо до София, България",
            "website": "http://park-vitosha.org/"
      },
      {
            "name": "Vladaya",
            "description": "Исторически град",
            "type": "Historical Site",
            "address": "Близо до София, България",
            "website": "https://www.google.com/maps/place/%D0%92%D0%BB%D0%B0%D0%B4%D0%B0%D1%8F/"
      },
      {
            "name": "Aqua Bankya",
            "description": "Аквапарк и спа курорт",
            "type": "Water Park",
            "address": "Банкя, България",
            "website": "https://aquabankya.bg/"
      },
      {
            "name": "Maison's Bar & Dinner",
            "description": "Ресторант с традиционна кухня",
            "type": "Restaurant",
            "address": "Близо до София, България",
            "website": "https://www.google.com/maps/place/Maison's+Bar+%26+Dinner/"
      },
      {
            "name": "Saffron Restaurant",
            "description": "Ресторант с международна кухня",
            "type": "Restaurant",
            "address": "Близо до София, България",
            "website": "https://saffron-bg.com/"
      },
      {
            "name": "Pizza Lachoni",
            "description": "Пицария с традиционни рецепти",
            "type": "Restaurant",
            "address": "Близо до София, България",
            "website": "https://pizza-lachoni.com/"
      },
      {
            "name": "Lobosh",
            "description": "Ресторант с българска кухня",
            "type": "Restaurant",
            "address": "Близо до София, България",
            "website": "https://lobosh.bg/"
      },
      {
            "name": "Kovachevtsi",
            "description": "Традиционно село с туризъм",
            "type": "Village",
            "address": "Близо до София, България",
            "website": "https://kovachevtsi.com/"
      },
      {
            "name": "Belogradchik Fortress",
            "description": "Историческа крепост",
            "type": "Historical Site",
            "address": "Близо до София, България",
            "website": "https://www.google.com/search?q=%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82+%D0%B1%D0%B5%D0%BB%D0%B8%D0%B3%D1%80%D0%B0%D0%B4"
      },
      {
            "name": "Pod Oreha",
            "description": "Природна забележителност",
            "type": "Natural Wonder",
            "address": "Близо до София, България",
            "website": "https://www.google.com/search?sca_esv=45ade08aecea71dd&q=%D0%9F%D0%BE%D0%B4+%D0%9E%D1%80%D0%B5%D1%85%D0%B0"
      },
      {
            "name": "Kladnica Museum",
            "description": "Музей с исторически експонати",
            "type": "Museum",
            "address": "Близо до София, България",
            "website": "https://kladnica.com/story/1745"
      },
      {
            "name": "Shishkovtsi Museum",
            "description": "Музей на къщата",
            "type": "Museum",
            "address": "Близо до София, България",
            "website": "https://www.google.com/search?q=%D0%BA%D1%8A%D1%89%D0%B0+%D0%BC%D1%83%D0%B7%D0%B5%D0%B9+%D1%88%D0%B8%D1%88%D0%BA%D0%BE%D0%B2%D1%86%D0%B8"
      },
      {
            "name": "Boyana Film Studios",
            "description": "Кино студия и туристически обект",
            "type": "Tourist Attraction",
            "address": "Близо до София, България",
            "website": "https://www.google.com/maps/place/%D0%A1%D0%BD%D0%B8%D0%BC%D0%B0%D1%87%D0%BD%D0%B0+%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%BA%D0%B0"
      },
      {
            "name": "Taralejovo",
            "description": "Традиционно село",
            "type": "Village",
            "address": "Близо до София, България",
            "website": "https://taralejovo.com/"
      },
      {
            "name": "Yaz Dyakovo",
            "description": "Природна забележителност",
            "type": "Natural Wonder",
            "address": "Близо до София, България",
            "website": "https://www.google.com/maps/place/%D0%AF%D0%B7%D0%BE%D0%B2%D0%B8%D1%80+%D0%94%D1%8F%D0%BA%D0%BE%D0%B2%D0%BE/"
      },
      {
            "name": "The Castle Official",
            "description": "Туристически обект",
            "type": "Tourist Attraction",
            "address": "Близо до София, България",
            "website": "https://www.thecastleofficial.com/"
      },
      {
            "name": "Laterra",
            "description": "Туристически комплекс",
            "type": "Tourist Attraction",
            "address": "Близо до София, България",
            "website": "https://laterra.bg/"
      },
      {
            "name": "Balaban Wine",
            "description": "Винарна с дегустации",
            "type": "Winery",
            "address": "Близо до София, България",
            "website": "https://balaban.wine/"
      },
      {
            "name": "Probo Inica",
            "description": "Туристически обект",
            "type": "Tourist Attraction",
            "address": "Близо до София, България",
            "website": "https://proboinica.com/"
      },
      {
            "name": "Babino Selo",
            "description": "Традиционно село",
            "type": "Village",
            "address": "Близо до София, България",
            "website": "https://babino-selo.com/"
      }
,
      {
        "name": "Пет места за 1 ден с кола в Западна Стара планина",
        "description": "Маршрутна идея за еднодневна разходка.",
        "type": "Обзорна статия",
        "address": "Близо до София, България"
      },
      {
        "name": "Светилища, храмове, гробници и крепости в Софийска област",
        "description": "Обзор на исторически обекти в Софийска област.",
        "type": "Обзорна статия",
        "address": "Близо до София, България"
      },
      {
        "name": "Екопътека Кладница - Чуйпетлово",
        "description": "Еко пътека на Витоша.",
        "type": "Еко пътека",
        "address": "Близо до София, България"
      },
      {
        "name": "12 леки маршрута на около час от София",
        "description": "Сборник от леки туристически маршрути край София.",
        "type": "Обзорна статия",
        "address": "Близо до София, България"
      },
      {
        "name": "50 места за есенни разходки на 50 км от София",
        "description": "Сборник от места за есенна разходка край София.",
        "type": "Обзорна статия",
        "address": "Близо до София, България"
      },
      {
        "name": "10 възможности за плаж недалеч от София",
        "description": "Сборник от плажни места в близост до София.",
        "type": "Обзорна статия",
        "address": "Близо до София, България"
      },
      {
        "name": "Арт работилница Мо",
        "description": "Арт работилница в София.",
        "type": "Арт пространство",
        "address": "Близо до София, България"
      },
      {
        "name": "Regale Bar",
        "description": "Бар в София.",
        "type": "Бар",
        "address": "Близо до София, България"
      },
      {
        "name": "Dipool",
        "description": "Място за плувни спортове в София.",
        "type": "Спортен обект",
        "address": "Близо до София, България"
      },
      {
        "name": "Будистка ступа (с. Плана)",
        "description": "Будистка ступа край с. Плана.",
        "type": "Религиозен обект",
        "address": "Близо до София, България"
      }
    
    ],
    stays: [
      {
            "name": "Hizha Radio",
            "description": "Планинска хижа с модерни съоръжения",
            "address": "Близо до София, България",
            "website": "https://web.facebook.com/pages/%D1%85%D0%B8%D0%B6%D0%B0-%D0%A0%D0%B0%D0%B4%D0%B8%D0%BE%D1%82%D0%BE-%D0%91%D0%9D%D0%A0/421972011540389",
            "priceRange": "$"
      },
      {
            "name": "Hotel Saint George",
            "description": "Хотел със спа услуги",
            "address": "Близо до София, България",
            "website": "https://hotelsaintgeorge.bg/za-hotela/",
            "priceRange": "$$"
      },
      {
            "name": "Slakovci Bungalows",
            "description": "Бунгала в природата",
            "address": "Слаковци, България",
            "website": "http://slakovci.pernik.org/bungalows.html",
            "priceRange": "$"
      },
      {
            "name": "Slakovci Hotel",
            "description": "Хотел в планинската местност",
            "address": "Слаковци, България",
            "website": "https://slakovci.pernik.org/hotel.html",
            "priceRange": "$$"
      },
      {
            "name": "Orlovska Skala",
            "description": "Туристически комплекс с настаняване",
            "address": "Близо до София, България",
            "website": "https://orlovaskala.com/%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D0%BD%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5/",
            "priceRange": "$$"
      },
      {
            "name": "Camping Vrana",
            "description": "Кемпинг с бунгала и каравани",
            "address": "София, България",
            "website": "https://www.olx.bg/ad/bungala-i-myasto-za-karavani-kafe-v-sofiya-kamping-vrana-CID545-ID384NZ.html",
            "priceRange": "$"
      },
      {
            "name": "Villa Ekaterina",
            "description": "Вила с луксозни услуги",
            "address": "Близо до София, България",
            "website": "https://villaekaterina.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Villa 6ato",
            "description": "Вила със съоръжения",
            "address": "Близо до София, България",
            "website": "https://6ato.bg/staya/vila-6ato/",
            "priceRange": "$$"
      },
      {
            "name": "Domat na Devi",
            "description": "Традиционна българска къща",
            "address": "Близо до София, България",
            "website": "https://vila.bg/rental-villa-domat-na-devi-6930.html",
            "priceRange": "$$"
      },
      {
            "name": "Complex Bakardere",
            "description": "Туристически комплекс",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/complexbakardere/",
            "priceRange": "$$"
      },
      {
            "name": "Hut Ofeliite",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/hutOfeliite",
            "priceRange": "$"
      },
      {
            "name": "Vila Rosiche",
            "description": "Вила с красива гледка",
            "address": "Близо до София, България",
            "website": "https://vilarosichе.com/bg",
            "priceRange": "$$"
      },
      {
            "name": "Camping Alino Lake",
            "description": "Кемпинг край езеро",
            "address": "Близо до София, България",
            "website": "https://alinohouse.com/kamping-alino-lake/",
            "priceRange": "$"
      },
      {
            "name": "Hotel 007",
            "description": "Хотел със спортни активности",
            "address": "Близо до София, България",
            "website": "https://www.hotel-007.net/rooms-prices.php",
            "priceRange": "$$"
      },
      {
            "name": "Complex Budnoto Oko",
            "description": "Туристически комплекс",
            "address": "Близо до София, България",
            "website": "https://complexbudnotooko.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hut Bonsovi Poliani",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/BonsoviPolianiHut/",
            "priceRange": "$"
      },
      {
            "name": "Hut Zlatni Mostove",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/hutzlatnimostove/",
            "priceRange": "$"
      },
      {
            "name": "Hut Murgana",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.murgana.hija.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hut Septemvri",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://septemvrihut.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hut Balkanity",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/balkanity.hut/",
            "priceRange": "$"
      },
      {
            "name": "Hut Murgash",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.murgash.hija.bg/index.html",
            "priceRange": "$"
      },
      {
            "name": "Hut White Birches",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://www.facebook.com/hutwhitebirches/",
            "priceRange": "$"
      },
      {
            "name": "Hut Kamen Del",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://kamendelhut.com/",
            "priceRange": "$"
      },
      {
            "name": "Hut Chervenata Shapchitsa",
            "description": "Планинска хижа",
            "address": "Близо до София, България",
            "website": "https://tripsjournal.com/noshtuvka/hizha-chervenata-shapchitsa",
            "priceRange": "$"
      },
      {
            "name": "Vakarel Forest",
            "description": "Еко-туризъм в гората",
            "address": "Близо до София, България",
            "website": "https://vakarel-gorata.com/",
            "priceRange": "$"
      }
,
      {
        "name": "Творчески дом Витоша",
        "description": "Академичен почивен дом на БАН на Витоша.",
        "address": "Близо до София, България"
      },
      {
        "name": "Хотелска база (Център за развитие на човешките ресурси)",
        "description": "Институционална хотелска база в София.",
        "address": "Близо до София, България"
      },
      {
        "name": "ПУСБ „Проф. Иван Стайков“ (Витоша)",
        "description": "Учебно-спортна база на НСА на Витоша.",
        "address": "Близо до София, България"
      },
      {
        "name": "Комплекс Възраждане",
        "description": "Комплекс в района на София.",
        "address": "Близо до София, България"
      },
      {
        "name": "Вила Гари",
        "description": "Вила под наем в района на София.",
        "address": "Близо до София, България"
      },
      {
        "name": "Къщи за гости Таралежово",
        "description": "Къщи за гости в м. Таралежово.",
        "address": "Близо до София, България"
      },
      {
        "name": "Еко бунгала (с. Банкя, Община Трън)",
        "description": "Еко бунгала в Община Трън.",
        "address": "Близо до София, България"
      },
      {
        "name": "Хижа Пробойница (с. Губислав)",
        "description": "Планинска хижа край с. Губислав.",
        "address": "Близо до София, България"
      },
      {
        "name": "НСА Специализирано общежитие (блок 70а)",
        "description": "Общежитие на Национална спортна академия.",
        "address": "Близо до София, България"
      },
      {
        "name": "Хижа Паскал",
        "description": "Планинска хижа в района на София.",
        "address": "Близо до София, България"
      },
      {
        "name": "Hotel Bogdana",
        "description": "Хотел в района на София.",
        "address": "Близо до София, България"
      }
    
    ],
  },
  {
    id: "rila-pirin",
    name: "Рила и Пирин",
    tagline: "Най-високите върхове на Балканите",
    icon: TreePine,
    pois: [
      {
            "name": "Рилски манастир",
            "description": "Исторически манастир с уникална архитектура",
            "type": "Religious Site",
            "address": "Рилски манастир, България",
            "website": "https://www.saintivanrilski.com/"
      },
      {
            "name": "Национален музей Рила",
            "description": "Музей с експонати от Рилския манастир",
            "type": "Museum",
            "address": "Рила, България",
            "website": "https://www.nsa.bg/bg/page,778"
      },
      {
            "name": "Връх Фенерка",
            "description": "Висок връх с панорамна гледка",
            "type": "Mountain Peak",
            "address": "Рила, България",
            "website": "https://www.google.com/search?q=%D0%B2%D1%80%D1%8A%D1%85+%D1%84%D0%B5%D0%BD%D0%B5%D1%80%D0%BA%D0%B0"
      },
      {
            "name": "Минерален плаж Баня",
            "description": "Минерални води и лечебни басейни",
            "type": "Spa",
            "address": "Баня, България",
            "website": "https://razlog.bg/news/item/7559-lyubimiyat-mineralen-plazh-na-malki-i-golemi-v-selo-banya-otvori-vrati"
      },
      {
            "name": "Юндола",
            "description": "Планински курорт с различни активности",
            "type": "Ski Resort",
            "address": "Юндола, България",
            "website": "https://yundola.andela-bg.com/"
      },
      {
            "name": "Езерец",
            "description": "Планински курорт и природна резервация",
            "type": "Mountain Resort",
            "address": "Езерец, България",
            "website": "https://ezeretz.com/"
      },
      {
            "name": "Свети Никола край Добринище",
            "description": "Исторически храм с красива гледка",
            "type": "Religious Site",
            "address": "Добринище, България",
            "website": "https://svetogled.com/mestnost-sveti-nikola-krai-dobrinishte/"
      },
      {
            "name": "Резервата Юлен",
            "description": "Природна резервация с редки видове",
            "type": "Nature Reserve",
            "address": "Рила, България",
            "website": "https://www.google.com/search?q=%D1%80%D0%B5%D0%B7%D0%B5%D1%80%D0%B2%D0%B0%D1%82+%E2%80%9C%D0%AE%D0%BB%D0%B5%D0%BD%E2%80%9D"
      },
      {
            "name": "Хераклея Синтика",
            "description": "Древноримски град с археологически находки",
            "type": "Archaeological Site",
            "address": "Рила, България",
            "website": "https://pirinsko.com/misteriozniqt-grad-herakleq-sintika-e-edno-ot-naj-golemite-otkritiq-v-bylgariq-132635/"
      },
      {
            "name": "Хижа Вада Рила",
            "description": "Планинска хижа с съоръжения",
            "type": "Mountain Hut",
            "address": "Рила, България",
            "website": "https://planinari.com/hija-vada-rila/"
      },
      {
            "name": "Беласитса",
            "description": "Планинска местност с красиви гледки",
            "type": "Mountain",
            "address": "Рила, България",
            "website": "https://belasitsa.bg/"
      },
      {
            "name": "Хижа Беговица",
            "description": "Планинска хижа в Каменица",
            "type": "Mountain Hut",
            "address": "Каменица, България",
            "website": "https://www.btsbg.org/hizhi/hizha-begovica-kamenica"
      },
      {
            "name": "Granchar Chalet",
            "description": "Планински шале с модерни съоръжения",
            "type": "Mountain Chalet",
            "address": "Рила, България",
            "website": "https://granchar-chalet.com/"
      },
      {
            "name": "Хижа Яворов",
            "description": "Планинска хижа с традиционен стил",
            "type": "Mountain Hut",
            "address": "Банско, България",
            "website": "https://www.yavorov.hija.bg/"
      },
      {
            "name": "Хижа Иван Вазов",
            "description": "Планинска хижа с исторически значение",
            "type": "Mountain Hut",
            "address": "Рила, България",
            "website": "https://gowhere.bg/mesta/planini/hiza-ivan-vazov/"
      },
      {
            "name": "Хижа Малиовица",
            "description": "Планинска хижа с панорамна гледка",
            "type": "Mountain Hut",
            "address": "Рила, България",
            "website": "https://www.malyovitsa.hija.bg/"
      },
      {
            "name": "Хижа Бандеритса",
            "description": "Планинска хижа в Рила",
            "type": "Mountain Hut",
            "address": "Рила, България",
            "website": "https://www.banderitsa.hija.bg/"
      },
      {
            "name": "Rila Rock",
            "description": "Скални образувания с туристически маршрути",
            "type": "Natural Wonder",
            "address": "Рила, България",
            "website": "https://www.google.com/search?q=rila+rock"
      },
      {
            "name": "Добринище",
            "description": "Историческо село с минерални води",
            "type": "Village",
            "address": "Добринище, България",
            "website": "https://visit-dobrinishte.bg/"
      },
      {
            "name": "Банско",
            "description": "Известен ски курорт и туристически град",
            "type": "Ski Resort",
            "address": "Банско, България",
            "website": "https://propertiesinbansko.com/"
      }
,
      {
        "name": "Сребърни минерални извори",
        "description": "Минерални извори в района на Рила.",
        "type": "Природна забележителност",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Ситан Кале",
        "description": "Крепостен обект в района на Рила-Пирин.",
        "type": "Крепост",
        "address": "Рила и Пирин, България"
      }
    
    ],
    stays: [
      {
            "name": "Belchin Spring",
            "description": "Спа хотел с минерални води в Белчин",
            "address": "Белчин, България",
            "website": "https://www.belchin-spring.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Lambievi Kolibi",
            "description": "Традиционни колиби в планинската местност",
            "address": "Рила, България",
            "website": "https://lambievikolibi.com/",
            "priceRange": "$$"
      },
      {
            "name": "Belmeken",
            "description": "Планински комплекс с различни съоръжения",
            "address": "Рила, България",
            "website": "https://belmeken.net/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Predel",
            "description": "Хотел в планинския проход Предел",
            "address": "Предел, България",
            "website": "https://www.hotelpredel.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Dobarsko",
            "description": "Хотел в село Добарско",
            "address": "Добарско, България",
            "website": "http://www.hoteldobarsko-bg.com/",
            "priceRange": "$$"
      },
      {
            "name": "Murite",
            "description": "Традиционна българска гостилница",
            "address": "Рила, България",
            "website": "http://murite.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hizha Yavorov",
            "description": "Планинска хижа в Банско",
            "address": "Банско, България",
            "website": "https://luckybansko.bg/hizha-yavorov-p32900/",
            "priceRange": "$"
      },
      {
            "name": "Rimska Banya",
            "description": "Спа курорт с минерални води",
            "address": "Римска баня, България",
            "website": "https://rimskabania.com/ceni/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Orbita",
            "description": "Хотел с панорамна гледка",
            "address": "Рила, България",
            "website": "https://hotel-orbita.bg/",
            "priceRange": "$$"
      },
      {
            "name": "Valentina Castle",
            "description": "Замък-хотел с уникална архитектура",
            "address": "Рила, България",
            "website": "https://valentinacastle.com/bg/home-2/",
            "priceRange": "$$$"
      },
      {
            "name": "Spa Hotel Kostenec",
            "description": "Спа хотел с лечебни води",
            "address": "Костенец, България",
            "website": "http://www.spahotelkostenec.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Four Leaf Clover Bansko",
            "description": "Апартаменти в ски курорта Банско",
            "address": "Банско, България",
            "website": "https://www.fourleafclover-bansko.com/",
            "priceRange": "$$"
      },
      {
            "name": "Saint Ivan Rilski",
            "description": "Монастирски хотел и гостилница",
            "address": "Рилски манастир, България",
            "website": "https://www.saintivanrilski.com/offers-and-vouchers",
            "priceRange": "$$"
      },
      {
            "name": "Makedonska Krachma",
            "description": "Традиционна македонска гостилница",
            "address": "Рила, България",
            "website": "https://makedonska-krachma.com/",
            "priceRange": "$"
      },
      {
            "name": "Vila Aiya",
            "description": "Вила с басейн в Смочево",
            "address": "Смочево, България",
            "website": "https://www.alo.bg/vila-aiya-7382589",
            "priceRange": "$$"
      },
      {
            "name": "Eco Village Under the Cliffs",
            "description": "Еко-село с традиционна архитектура",
            "address": "Долно Драглище, България",
            "website": "https://www.agoda.com/eco-village-under-the-cliffs/hotel/dolno-draglishte-bg.html",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Droom",
            "description": "Хотел с модерни съоръжения",
            "address": "Рила, България",
            "website": "http://www.hoteldroom.com/",
            "priceRange": "$$"
      },
      {
            "name": "Valentino Dobrinishte",
            "description": "Апартаменти в Добринище",
            "address": "Добринище, България",
            "website": "http://valentino2.dobrinishte-bg.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Leshteni",
            "description": "Хотел в село Лещен",
            "address": "Лещен, България",
            "website": "https://hotelleshten.com/",
            "priceRange": "$$"
      },
      {
            "name": "Irina House Bansko",
            "description": "Гостилница в Банско",
            "address": "Банско, България",
            "website": "https://www.irinahousebansko.com/",
            "priceRange": "$"
      },
      {
            "name": "7 Lakes Cowork",
            "description": "Работно пространство и настаняване",
            "address": "Банско, България",
            "website": "https://www.facebook.com/7LakesCoWork/",
            "priceRange": "$$"
      },
      {
            "name": "Villa Adis",
            "description": "Вила с басейн и спа услуги",
            "address": "Рила, България",
            "website": "https://www.adis.bg/villa-adis/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Mehana Stopanite",
            "description": "Традиционна гостилница с местна кухня",
            "address": "Рила, България",
            "website": "https://www.facebook.com/HotelMehanaStopanite/",
            "priceRange": "$"
      },
      {
            "name": "Bungala Kamena",
            "description": "Бунгала в природата",
            "address": "Рила, България",
            "website": "https://bungala-kamena.eu/",
            "priceRange": "$"
      },
      {
            "name": "Prispaska Hotel",
            "description": "Хотел в планинската местност",
            "address": "Рила, България",
            "website": "https://prispaskahotel.com/",
            "priceRange": "$$"
      },
      {
            "name": "Camping Rekata",
            "description": "Кемпинг в природата",
            "address": "Рила, България",
            "website": "https://camping-rekata.business.site/",
            "priceRange": "$"
      }
,
      {
        "name": "Lucky Bansko Aparthotel",
        "description": "Апартхотел в Банско.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "ПУСБ „Проф. Никола Хаджиев“ (Боровец)",
        "description": "Учебно-спортна база на НСА в Боровец.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Хотел Езерец (Благоевград)",
        "description": "Хотел в гр. Благоевград.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Почивна база НЕК ЕАД (Мала църква)",
        "description": "Институционална почивна база на НЕК ЕАД.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Център за възстановяване на кадри Паничище (БДЖ)",
        "description": "Възстановителен център на БДЖ в Паничище.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Почивна база ТУ-София (Семково)",
        "description": "Учебна почивна база на Технически университет София в Семково, зимен ски туризъм.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Балнеолечебница (Добринище)",
        "description": "Балнеолечебно заведение в гр. Добринище.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Къмпинг Реката (Мелник)",
        "description": "Ваканционен парк и къмпинг край гр. Мелник.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "ПУСБ „Вихрен“",
        "description": "Учебно-спортна база на НСА в района на Пирин.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Вила АДИС (Боровец)",
        "description": "Вила под наем в к.к. Боровец.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Хижа Трите реки",
        "description": "Планинска хижа в Рила-Пирин.",
        "address": "Рила и Пирин, България"
      },
      {
        "name": "Почивна база на Министерство на финансите",
        "description": "Институционална почивна база на Министерство на финансите.",
        "address": "Рила и Пирин, България"
      }
    
    ],
  },
  {
    id: "rhodopes",
    name: "Родопите",
    tagline: "Тайнствени пещери и запазен фолклор",
    icon: Landmark,
    pois: [
      {
            "name": "Врах Сютка",
            "description": "Висок връх в Родопите с панорамна гледка",
            "type": "Mountain Peak",
            "address": "Родопи, България",
            "website": "https://www.google.com/search?q=%D0%B2%D1%80%D1%8A%D1%85+%D1%81%D1%8E%D1%82%D0%BA%D0%B0"
      },
      {
            "name": "Триград ущелие",
            "description": "Красиво ущелие с река и пещери",
            "type": "Natural Wonder",
            "address": "Триград, България",
            "website": "http://www.trigrad.free.bg/"
      },
      {
            "name": "Храм Св. Димитър Солунски",
            "description": "Исторически храм в Пловдив",
            "type": "Religious Site",
            "address": "Пловдив, България",
            "website": "http://www.plovdivskamitropolia.bg/hramove/690-hram-sv-dimitar-solunski.html"
      },
      {
            "name": "Белите брези",
            "description": "Туристически комплекс в Родопите",
            "type": "Tourist Complex",
            "address": "Родопи, България",
            "website": "https://www.google.com/search?q=%D0%A2%D1%83%D1%80%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8+%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81+%22%D0%91%D0%B5%D0%BB%D0%B8%D1%82%D0%B5+%D0%B1%D1%80%D0%B5%D0%B7%D0%B8"
      },
      {
            "name": "Село Гела",
            "description": "Традиционно село в Родопите",
            "type": "Village",
            "address": "Гела, България",
            "website": "https://www.google.com/search?q=%D1%81%D0%B5%D0%BB%D0%BE+%D0%B3%D0%B5%D0%BB%D0%B0"
      },
      {
            "name": "Най-чистия въздух в света",
            "description": "Място с изключително чист въздух",
            "type": "Natural Phenomenon",
            "address": "Родопи, България",
            "website": "https://izumitelno.com/naj-chistiyat-vazduh-na-planetata-e-nad-edin-prekrasen-balgarski-grad/"
      },
      {
            "name": "Зеолитни находища",
            "description": "Природни минерални находища в Белите пласт",
            "type": "Geological Site",
            "address": "Родопи, България",
            "website": "https://www.google.com/search?q=%D0%9D%D0%B0%D0%B9-%D0%B3%D0%BE%D0%BB%D1%8F%D0%BC%D0%BE%D1%82%D0%BE+%D0%B2+%D1%81%D0%B2%D0%B5%D1%82%D0%B0"
      },
      {
            "name": "Село Жерка",
            "description": "Забравено село с уникална история",
            "type": "Village",
            "address": "Жерка, България",
            "website": "https://preotkrii.bg/selo-zherka-zabravenata-prikazka-v-rodopite/"
      },
      {
            "name": "Solishta",
            "description": "Малко село в Родопите",
            "type": "Village",
            "address": "Солишта, България",
            "website": "https://www.google.com/maps/place/4711+Solishta/"
      },
      {
            "name": "Пътешествия в Родопите",
            "description": "Туристически маршрути и разходки",
            "type": "Hiking Trail",
            "address": "Родопи, България",
            "website": "https://offroad-bulgaria.com/forum/"
      },
      {
            "name": "Лекувай",
            "description": "Спа и лечебен комплекс",
            "type": "Spa Resort",
            "address": "Родопи, България",
            "website": "https://lekuvai.bg/104267/"
      },
      {
            "name": "Rancho Divi Rodopi",
            "description": "Конна база и туристически комплекс",
            "type": "Adventure Park",
            "address": "Родопи, България",
            "website": "https://ranchodivirodopi.com/"
      },
      {
            "name": "WWOOF Rhodopes",
            "description": "Еко-ферми и органично земеделие",
            "type": "Eco Farm",
            "address": "Родопи, България",
            "website": "https://wwoofindependents.org/en/host/44978/"
      },
      {
            "name": "Mogila Escape",
            "description": "Еко-туризъм и приключенски активности",
            "type": "Adventure",
            "address": "Родопи, България",
            "website": "https://www.facebook.com/p/Mogila-Escape-100084806720335/"
      },
      {
            "name": "Under The Stars",
            "description": "Глемпинг и природни преживявания",
            "type": "Glamping",
            "address": "Родопи, България",
            "website": "https://www.underthestars.bg/"
      },
      {
            "name": "Akademik Hut",
            "description": "Планинска хижа за туристи",
            "type": "Mountain Hut",
            "address": "Родопи, България",
            "website": "https://www.facebook.com/hijaakademik/"
      },
      {
            "name": "Tutz Panorama",
            "description": "Панорамна площадка с гледка",
            "type": "Viewpoint",
            "address": "Пампоров, България",
            "website": "https://uos-ead.eu/%D1%82%D1%83%D1%86-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%BA-%D0%BA-%D0%BF%D0%B0%D0%BC%D0%BF%D0%BE%D1%80%D0%BE%D0%B2%D0%BE"
      },
      {
            "name": "Ekorai Kartola",
            "description": "Еко-туризъм и природни активности",
            "type": "Eco Tourism",
            "address": "Родопи, България",
            "website": "https://www.facebook.com/ekorai.kartola/"
      },
      {
            "name": "Mountain Escape",
            "description": "Планински приключения и разходки",
            "type": "Adventure",
            "address": "Родопи, България",
            "website": "https://www.facebook.com/mauntainn/"
      }
,
      {
        "name": "Долмени в Сакар",
        "description": "Древни мегалитни съоръжения в района на Сакар.",
        "type": "Археологически обект",
        "address": "Родопи, България"
      },
      {
        "name": "Тракийска къща (Бориславци)",
        "description": "Тракийски археологически обект край с. Бориславци.",
        "type": "Археологически обект",
        "address": "Родопи, България"
      }
    
    ],
    stays: [
      {
            "name": "Romantika Hotel",
            "description": "Хотел с традиционна архитектура в Родопите",
            "address": "Родопи, България",
            "website": "http://romantika-bg.com/oferti",
            "priceRange": "$$"
      },
      {
            "name": "Coworkation 4 Epelere",
            "description": "Работно пространство и настаняване за дистанционни работници",
            "address": "Родопи, България",
            "website": "http://coworkation.4epelare.com/",
            "priceRange": "$$"
      },
      {
            "name": "Yundola Bungalows",
            "description": "Бунгала в планинския курорт Юндола",
            "address": "Юндола, България",
            "website": "https://yundola.andela-bg.com/bungalows/",
            "priceRange": "$$"
      },
      {
            "name": "Orlica Pamporovo",
            "description": "Апартаменти в ски курорта Пампоров",
            "address": "Пампоров, България",
            "website": "https://orlica-pamporovo.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Villa Beglika",
            "description": "Вила с морска гледка и басейн",
            "address": "Родопи, България",
            "website": "https://vila.bg/villa-beglika-3266.html",
            "priceRange": "$$$"
      },
      {
            "name": "Camping Velingrad",
            "description": "Кемпинг в град Велинград",
            "address": "Велинград, България",
            "website": "https://campingvelingrad.bg/",
            "priceRange": "$"
      },
      {
            "name": "Mursal Hotel",
            "description": "Хотел с традиционна българска кухня",
            "address": "Родопи, България",
            "website": "http://mursal.bg/",
            "priceRange": "$$"
      },
      {
            "name": "House Pri Nikolovi",
            "description": "Традиционна българска къща за гости",
            "address": "Родопи, България",
            "website": "https://vila.bg/house-pri-nikolovi-6944.html",
            "priceRange": "$"
      },
      {
            "name": "Krastatiza",
            "description": "Традиционна гостилница с местна кухня",
            "address": "Родопи, България",
            "website": "http://krastatiza.com/",
            "priceRange": "$"
      },
      {
            "name": "Hotel Eldosport",
            "description": "Спортен хотел в Родопите",
            "address": "Родопи, България",
            "website": "http://hotel-eldosport.eu/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Rodopa",
            "description": "Хотел с панорамна гледка към планините",
            "address": "Родопи, България",
            "website": "https://hotelrodopa.com/",
            "priceRange": "$$"
      },
      {
            "name": "Artel 13",
            "description": "Художествен комплекс с настаняване",
            "address": "Родопи, България",
            "website": "http://www.artel13.com/",
            "priceRange": "$$"
      },
      {
            "name": "Camping Batak",
            "description": "Кемпинг край язовир Батак",
            "address": "Батак, България",
            "website": "https://www.campingbatak.com/",
            "priceRange": "$"
      },
      {
            "name": "Ruminika",
            "description": "Еко-хотел и ферма в Родопите",
            "address": "Родопи, България",
            "website": "https://ruminika.com/",
            "priceRange": "$$"
      },
      {
            "name": "Bedenskibani",
            "description": "Спа хотел с минерални води",
            "address": "Баня, България",
            "website": "https://www.bedenskibani.com/",
            "priceRange": "$$$"
      },
      {
            "name": "House Milka",
            "description": "Семейна къща за отдих",
            "address": "Родопи, България",
            "website": "https://housemilka.com/",
            "priceRange": "$"
      },
      {
            "name": "Vila Iglika",
            "description": "Вила с басейн и спа услуги",
            "address": "Родопи, България",
            "website": "https://vila-iglika.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Chilingira",
            "description": "Планински хотел с традиционна архитектура",
            "address": "Родопи, България",
            "website": "https://www.hotel-chilingira.com/",
            "priceRange": "$$"
      },
      {
            "name": "Planinski Polah",
            "description": "Къща за гости в планинската местност",
            "address": "Родопи, България",
            "website": "https://www.alo.bg/samostoyatelna-kashta-za-gosti-planinski-polah-9631102",
            "priceRange": "$"
      },
      {
            "name": "Momchil Yunack Hut",
            "description": "Планинска хижа за туристи",
            "address": "Родопи, България",
            "website": "https://www.google.com/search?q=%D0%A5%D0%B8%D0%B6%D0%B0+%E2%80%9C%D0%9C%D0%BE%D0%BC%D1%87%D0%B8%D0%BB+%D1%8E%D0%BD%D0%B0%D0%BA%E2%80%9D",
            "priceRange": "$"
      },
      {
            "name": "Smirnenskihut",
            "description": "Планинска хижа със съоръжения",
            "address": "Родопи, България",
            "website": "https://smirnenskihut.com/",
            "priceRange": "$"
      },
      {
            "name": "Marciganica",
            "description": "Традиционна българска къща",
            "address": "Родопи, България",
            "website": "https://marciganica.com/",
            "priceRange": "$$"
      },
      {
            "name": "Bungala Ela",
            "description": "Бунгала в природата",
            "address": "Родопи, България",
            "website": "https://bungalaela.weebly.com/",
            "priceRange": "$"
      },
      {
            "name": "Leshtenska Idiliya",
            "description": "Еко-хижа с традиционен стил",
            "address": "Родопи, България",
            "website": "https://www.facebook.com/LeshtenskaIdiliya/",
            "priceRange": "$"
      },
      {
            "name": "Dakota Houses",
            "description": "Уникални къщи за отдих",
            "address": "Родопи, България",
            "website": "https://dakota-houses.com/",
            "priceRange": "$$"
      },
      {
            "name": "Somat Dospat",
            "description": "Хотел край язовир Досат",
            "address": "Досат, България",
            "website": "https://somat-dospat.com/",
            "priceRange": "$$"
      },
      {
            "name": "Our Place Zornitsa",
            "description": "Еко-хотел с традиционна архитектура",
            "address": "Родопи, България",
            "website": "https://ourplacezornitsa.bg/",
            "priceRange": "$$"
      }
,
      {
        "name": "Санаториум Стефан Караджово",
        "description": "Санаториум в село Стефан Караджово.",
        "address": "Родопи, България"
      },
      {
        "name": "Еренджиковата къща за гости (Кръстатица)",
        "description": "Къща за гости в с. Кръстатица.",
        "address": "Родопи, България"
      },
      {
        "name": "Хижа Триградски скали",
        "description": "Планинска хижа в района на Триградското ждрело.",
        "address": "Родопи, България"
      },
      {
        "name": "Медицински рехабилитационен център на Народното събрание",
        "description": "Институционален рехабилитационен център в Родопите.",
        "address": "Родопи, България"
      },
      {
        "name": "Силивряк",
        "description": "Място за уединение сред природата в Родопите.",
        "address": "Родопи, България"
      },
      {
        "name": "Рехабилитационна база (Медицински университет Пловдив)",
        "description": "Рехабилитационна база на Медицински университет Пловдив.",
        "address": "Родопи, България"
      },
      {
        "name": "УОГС Юндола (Лесотехнически университет)",
        "description": "Учебно-опитно горско стопанство на Лесотехническия университет в Юндола.",
        "address": "Родопи, България"
      },
      {
        "name": "Хотел Гела",
        "description": "Хотел в с. Гела.",
        "address": "Родопи, България"
      }
    
    ],
  },
  {
    id: "blacksea",
    name: "Черноморие",
    tagline: "Стари градове край брега",
    icon: Waves,
    pois: [
      {
            "name": "Пляжи на българското Черноморие",
            "description": "Красиви пляжи и морски брегове",
            "type": "Beach",
            "address": "Черноморие, България",
            "website": "https://littlebg.com/10-rais%D0%BAi-plaja-po-bulgarskoto-chernomorie/"
      },
      {
            "name": "Невероятни места за снимки",
            "description": "Интересни места за фотография",
            "type": "Photography Spot",
            "address": "Черноморие, България",
            "website": "https://littlebg.com/8-neveroqtni-mesta-kudeto-da-se-pechete-sami/"
      },
      {
            "name": "Национален музей Варна",
            "description": "Музей с богата история и артефакти",
            "type": "Museum",
            "address": "Варна, България",
            "website": "https://www.nsa.bg/bg/page,777"
      },
      {
            "name": "Езерец пляж",
            "description": "Красив пляж в община Шабла",
            "type": "Beach",
            "address": "Езерец, България",
            "website": "https://beaches.bg/destination/%D0%BE%D0%B1%D1%89%D0%B8%D0%BD%D0%B0-%D1%88%D0%B0%D0%B1%D0%BB%D0%B0/%D0%B5%D0%B7%D0%B5%D1%80%D0%B5%D1%86-%D0%BF%D0%BB%D0%B0%D0%B6/#"
      },
      {
            "name": "Крапец пляж",
            "description": "Пляж в община Шабла",
            "type": "Beach",
            "address": "Крапец, България",
            "website": "https://beaches.bg/destination/%D0%BE%D0%B1%D1%89%D0%B8%D0%BD%D0%B0-%D1%88%D0%B0%D0%B1%D0%BB%D0%B0/%D0%BA%D1%80%D0%B0%D0%BF%D0%B5%D1%86-%D0%BF%D0%BB%D0%B0%D0%B6/#"
      },
      {
            "name": "Кара-Дере",
            "description": "Природна забележителност",
            "type": "Nature",
            "address": "Шабла, България",
            "website": "https://gowhere.bg/mesta/more/kara-dere/"
      },
      {
            "name": "Иракли пляж",
            "description": "Пляж в община Несебър",
            "type": "Beach",
            "address": "Иракли, България",
            "website": "https://beaches.bg/destination/%D0%BE%D0%B1%D1%89%D0%B8%D0%BD%D0%B0-%D0%BD%D0%B5%D1%81%D0%B5%D0%B1%D1%8A%D1%80/%D0%B8%D1%80%D0%B0%D0%BA%D0%BB%D0%B8-%D0%BF%D0%BB%D0%B0%D0%B6/"
      },
      {
            "name": "Калиакра",
            "description": "Исторически форт и природна резервация",
            "type": "Historical Site",
            "address": "Калиакра, България",
            "website": "https://kaliakria.com/"
      },
      {
            "name": "Пенека Бистро",
            "description": "Традиционен ресторант с местна кухня",
            "type": "Restaurant",
            "address": "Черноморие, България",
            "website": "https://peneka.com/bistro"
      },
      {
            "name": "Beaches.bg",
            "description": "Портал с информация за пляжи",
            "type": "Information",
            "address": "България",
            "website": "https://beaches.bg/catalog/"
      }
,
      {
        "name": "Ресторант Бяла Роза (Несебър)",
        "description": "Ресторант в града на Несебър.",
        "type": "Ресторант",
        "address": "Черноморие, България"
      }
    
    ],
    stays: [
      {
            "name": "Complex Bora",
            "description": "Комплекс Бора - хотел и ресторант на море",
            "address": "Черноморие, България",
            "website": "http://www.complexbora.com/",
            "priceRange": "$$"
      },
      {
            "name": "Sunny Beach Resort",
            "description": "Курортен комплекс на Слънчев бряг",
            "address": "Слънчев бряг, България",
            "website": "http://www.pb-sunnybeach.com/",
            "priceRange": "$$"
      },
      {
            "name": "Holiday House Kiten",
            "description": "Семейна къща за отдих в Китен",
            "address": "Китен, България",
            "website": "https://www.hotel-in-bulgaria.com/bg/3073/holiday-house-kiten.html",
            "priceRange": "$"
      },
      {
            "name": "Santa Marina Sozopol",
            "description": "Хотел и спа център в Созопол",
            "address": "Созопол, България",
            "website": "https://www.santamarina.bg/",
            "priceRange": "$$$"
      },
      {
            "name": "Camping Coral",
            "description": "Кемпинг с бунгала на брега на морето",
            "address": "Черноморие, България",
            "website": "https://www.campingcoral.com/",
            "priceRange": "$"
      },
      {
            "name": "Relax in Pomorie",
            "description": "Апартаменти под наем в Поморие",
            "address": "Поморие, България",
            "website": "https://relaxinpomorie.alle.bg/",
            "priceRange": "$$"
      },
      {
            "name": "Iannis Paradise Hotel",
            "description": "Хотел с морска гледка",
            "address": "Черноморие, България",
            "website": "https://iannisparadise.com/hotel/",
            "priceRange": "$$"
      },
      {
            "name": "Camping Cosmos Shabla",
            "description": "Кемпинг с бунгала в Шабла",
            "address": "Шабла, България",
            "website": "http://shabla.be/bungala/camping_cosmos/",
            "priceRange": "$"
      },
      {
            "name": "Residence Group",
            "description": "Апартаменти и вили за отдих",
            "address": "Черноморие, България",
            "website": "http://www.residencegroup-bg.com/bg/",
            "priceRange": "$$"
      },
      {
            "name": "Buchvata",
            "description": "Традиционна българска гостилница",
            "address": "Черноморие, България",
            "website": "https://buchvata.com/",
            "priceRange": "$"
      },
      {
            "name": "Villa Byala Grape House",
            "description": "Вила за отдих в Бяла",
            "address": "Бяла, България",
            "website": "https://hotelmania.net/hotel/byala/villa-byala-grape-house/",
            "priceRange": "$$"
      },
      {
            "name": "Bashhub Perla",
            "description": "Хостел и апартаменти",
            "address": "Черноморие, България",
            "website": "https://bashhub.bg/bashhub-perla/",
            "priceRange": "$"
      },
      {
            "name": "Zelena Strandja",
            "description": "Екологичен хотел и спа",
            "address": "Черноморие, България",
            "website": "https://www.zelenastrandja.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Chudnite Kyshti",
            "description": "Чудните къщи - уникални къщи за отдих",
            "address": "Черноморие, България",
            "website": "https://chudnitekyshti.com/",
            "priceRange": "$$"
      },
      {
            "name": "Rodos House",
            "description": "Семейна къща с морска гледка",
            "address": "Черноморие, България",
            "website": "https://rodoshouse.com/",
            "priceRange": "$$"
      },
      {
            "name": "Calithea Complex",
            "description": "Апартаменти и вили в комплекс",
            "address": "Черноморие, България",
            "website": "https://calithea-complex.com/",
            "priceRange": "$$"
      },
      {
            "name": "Dvoreca",
            "description": "Традиционна българска архитектура",
            "address": "Черноморие, България",
            "website": "https://dvoreca.com/bg/nastanyavane.html",
            "priceRange": "$$"
      },
      {
            "name": "Villa Kalimera",
            "description": "Вила с басейн и морска гледка",
            "address": "Черноморие, България",
            "website": "https://villa-kalimera.bg/",
            "priceRange": "$$$"
      },
      {
            "name": "Villa Tatalia Bozhurets",
            "description": "Луксозна вила в Божурец",
            "address": "Божурец, България",
            "website": "https://bg.planetofhotels.com/blgariya/bozhurec/villa-tatalia-bozhurets",
            "priceRange": "$$$"
      },
      {
            "name": "Narnia LOFT",
            "description": "Модерен лофт апартамент",
            "address": "Черноморие, България",
            "website": "https://www.facebook.com/p/Narnia-LOFT-61557438269666/",
            "priceRange": "$$"
      }
,
      {
        "name": "Бунгала на БТА (Шкорпиловци)",
        "description": "Почивна база на Българска телеграфна агенция, отваря сезонно за почивка.",
        "address": "Черноморие, България"
      },
      {
        "name": "Хотел Созопол (МО)",
        "description": "Хотел към Изпълнителна агенция „Военни клубове и военно-почивно дело“ в Созопол.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна база Созопол (УниКредит Булбанк)",
        "description": "Почивна база на банката в района на Созопол.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивен възстановителен център Приморско (БДЖ)",
        "description": "Почивна база на Български държавни железници в Приморско.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна база Министерски съвет (Слънчев бряг)",
        "description": "Институционална почивна база на Министерския съвет.",
        "address": "Черноморие, България"
      },
      {
        "name": "УСЛ Несебър (Лесотехнически университет)",
        "description": "Учебно-спортна лятна база на Лесотехническия университет.",
        "address": "Черноморие, България"
      },
      {
        "name": "УНСС Учебно-оздравителна база (Равда)",
        "description": "Учебно-оздравителна база на УНСС в с. Равда.",
        "address": "Черноморие, България"
      },
      {
        "name": "Творчески дом Китен (Софийски университет)",
        "description": "Творчески дом на Софийски университет „Св. Климент Охридски“ в Китен.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна станция АДИС (Созопол)",
        "description": "Почивна станция в района на Созопол.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна станция АДИС (Златни пясъци)",
        "description": "Почивна станция в к.к. Златни пясъци.",
        "address": "Черноморие, България"
      },
      {
        "name": "Хотел Яница (Крапец)",
        "description": "Хотел на брега в с. Крапец.",
        "address": "Черноморие, България"
      },
      {
        "name": "НСА Водна учебна база (Несебър)",
        "description": "Водна учебна база на Национална спортна академия.",
        "address": "Черноморие, България"
      },
      {
        "name": "Къмпинг Чайка (Обзор)",
        "description": "Къмпинг на Изпълнителна агенция „Военни клубове и военно-почивно дело“ в Обзор.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна база Медицински университет София (Черноморие)",
        "description": "Почивна база на Медицински университет София на Черноморието.",
        "address": "Черноморие, България"
      },
      {
        "name": "Общежитие Бургас (Монтажи ЕАД)",
        "description": "Общежитие в гр. Бургас.",
        "address": "Черноморие, България"
      },
      {
        "name": "Калиакрия Ризорт (Топола)",
        "description": "Курортен комплекс в с. Топола.",
        "address": "Черноморие, България"
      },
      {
        "name": "Хотел Свети Тома",
        "description": "Хотел на морския бряг.",
        "address": "Черноморие, България"
      },
      {
        "name": "Летен спортен лагер (Софийски университет)",
        "description": "Летен спортен лагер на Департамента по спорт на Софийски университет.",
        "address": "Черноморие, България"
      },
      {
        "name": "Почивна база Равда (ВТУ „Тодор Каблешков“)",
        "description": "Институционална почивна база в с. Равда.",
        "address": "Черноморие, България"
      }
    
    ],
  },
  {
    id: "north",
    name: "Северна България",
    tagline: "Крепости над меандрите на Янтра",
    icon: Landmark,
    pois: [
      {
            "name": "Sboryanovo",
            "description": "Археологически парк с древни находки",
            "type": "Archaeological Site",
            "address": "Северен край, България",
            "website": "https://cherga.bg/sboryanovo-dokosvaniya-do-bezsma-rtiet/"
      },
      {
            "name": "Koprivshtitsa",
            "description": "Исторически град с традиционна архитектура",
            "type": "Historical Site",
            "address": "Копривщица, България",
            "website": "https://koprivshtitsa-bg.com/bg/culture/"
      },
      {
            "name": "Galeria Koprivshtitsa",
            "description": "Художествена галерия",
            "type": "Museum",
            "address": "Копривщица, България",
            "website": "https://www.galeria-koprivshtica.com/"
      },
      {
            "name": "Troyan Monastery",
            "description": "Исторически манастир",
            "type": "Religious Site",
            "address": "Троян, България",
            "website": "https://opoznai.bg/troyan/"
      },
      {
            "name": "Ekopateka Balkandjii",
            "description": "Еко-маршрут в природата",
            "type": "Hiking Trail",
            "address": "Северен край, България",
            "website": "https://opoznai.bg/view/ekopateka-po-stapkite-na-balkandjiite"
      },
      {
            "name": "Apriltsi",
            "description": "Туристическо селище",
            "type": "Village",
            "address": "Априлци, България",
            "website": "https://apriltsi.org/"
      },
      {
            "name": "Pleven Hut",
            "description": "Планинска хижа",
            "type": "Mountain Hut",
            "address": "Северен край, България",
            "website": "http://pleven-hut.zabelejitelnosti.info/"
      },
      {
            "name": "Isara",
            "description": "Исторически град",
            "type": "Historical Site",
            "address": "Северен край, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%98%D1%81%D0%B0%D1%80%D0%B0"
      },
      {
            "name": "Kachulata",
            "description": "Природна забележителност",
            "type": "Natural Wonder",
            "address": "Северен край, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%9A%D0%B0%D1%87%D1%83%D0%BB%D0%B0%D1%82%D0%B0"
      },
      {
            "name": "Studen Kladenets",
            "description": "Светилище и религиозно място",
            "type": "Religious Site",
            "address": "Северен край, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%A1%D1%82%D1%83%D0%B4%D0%B5%D0%BD_%D0%BA%D0%BB%D0%B0%D0%B4%D0%B5%D0%BD%D0%B5%D1%86"
      },
      {
            "name": "Balkan Legends",
            "description": "Туристически обект",
            "type": "Tourist Attraction",
            "address": "Северен край, България",
            "website": "https://balkanlegends.eu/bg/"
      },
      {
            "name": "Eco Complex Klisura",
            "description": "Еко-туризъм",
            "type": "Eco Tourism",
            "address": "Северен край, България",
            "website": "https://opoznai.bg/view/eko-kompleks-klisura"
      },
      {
            "name": "Balkan Center",
            "description": "Туристически център",
            "type": "Tourist Attraction",
            "address": "Северен край, България",
            "website": "https://balkancenter.bg/"
      },
      {
            "name": "Uzana",
            "description": "Туристическо селище",
            "type": "Village",
            "address": "Узана, България",
            "website": "https://www.uzanabg.com/"
      },
      {
            "name": "Kompleks Chiflika",
            "description": "Туристически комплекс",
            "type": "Tourist Attraction",
            "address": "Северен край, България",
            "website": "https://www.komplekschiflika.com/"
      },
      {
            "name": "Archeologicheski Park Topolnitza",
            "description": "Археологически парк",
            "type": "Archaeological Site",
            "address": "Северен край, България",
            "website": "https://opoznai.bg/view/arheologicheski-park-topolnitza-chavdar"
      },
      {
            "name": "Tryavna Hills",
            "description": "Планински маршрути",
            "type": "Mountain",
            "address": "Трявна, България",
            "website": "https://www.tryavnahills.com/prices/"
      },
      {
            "name": "Uzana Festival",
            "description": "Фестивал и туристически обект",
            "type": "Festival",
            "address": "Узана, България",
            "website": "https://uzanafest.gabrovo.bg/"
      },
      {
            "name": "Vruh Babyak",
            "description": "Планински връх",
            "type": "Mountain Peak",
            "address": "Северен край, България",
            "website": "https://www.google.com/search?q=%D0%B2%D1%80%D1%8A%D1%85+%D0%B1%D0%B0%D0%B1%D1%8F%D0%BA"
      },
      {
            "name": "Strelcha",
            "description": "Туристическо селище",
            "type": "Village",
            "address": "Стрелча, България",
            "website": "https://www.strelcha.bg/"
      },
      {
            "name": "Kazanlak",
            "description": "Град на розите",
            "type": "Historical Site",
            "address": "Казанлък, България",
            "website": "https://www.campingkazanlak.com/"
      },
      {
            "name": "Pod Oreha Zlatica",
            "description": "Туристически обект",
            "type": "Tourist Attraction",
            "address": "Северен край, България",
            "website": "https://www.facebook.com/POD.OREHA.ZLATICA/"
      },
      {
            "name": "Shumen Fortress",
            "description": "Историческа крепост",
            "type": "Historical Site",
            "address": "Шумен, България",
            "website": "https://www.google.com/travel/search?q=%D1%88%D1%83%D0%BC%D0%B5%D0%BD"
      }
,
      {
        "name": "Пирамидата в с. Петко Славейков",
        "description": "Пирамидална структура в селото.",
        "type": "Забележителност",
        "address": "Северна България"
      },
      {
        "name": "Забележителности в Троян",
        "description": "Обзор на забележителностите в гр. Троян.",
        "type": "Обзорна статия",
        "address": "Северна България"
      },
      {
        "name": "Маршрут „Свети Илия“ (Априлци)",
        "description": "Туристически маршрут край Априлци.",
        "type": "Туристически маршрут",
        "address": "Северна България"
      },
      {
        "name": "Видимско пръскало",
        "description": "Водопад в района на Априлци.",
        "type": "Водопад",
        "address": "Северна България"
      }
    
    ],
    stays: [
      {
            "name": "Seven Generations Complex",
            "description": "Туристически комплекс с модерни съоръжения",
            "address": "Северна България, България",
            "website": "https://sevengenerationscomplex.com/",
            "priceRange": "$$"
      },
      {
            "name": "Botanica Guest House",
            "description": "Гостинска къща с природна красота",
            "address": "Северна България, България",
            "website": "https://www.botanicalife.org/botanicaguesthouse",
            "priceRange": "$$"
      },
      {
            "name": "Bungala na Yazovir Sopot",
            "description": "Бунгала край езеро",
            "address": "Езеро Сопот, България",
            "website": "https://www.olx.bg/d/ad/bungala-na-yazovir-sopot-CID545-ID7Sm2R.html",
            "priceRange": "$"
      },
      {
            "name": "Hotel Etar",
            "description": "Хотел със традиционна архитектура",
            "address": "Габрово, България",
            "website": "https://hotel.etar.bg/nastaniavane",
            "priceRange": "$$"
      },
      {
            "name": "Pinus Villas",
            "description": "Вили в планинската местност",
            "address": "Северен край, България",
            "website": "https://pinusvillas.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Etur",
            "description": "Хотел с модерни услуги",
            "address": "Северен край, България",
            "website": "https://vtufacebook.wixsite.com/hotel-etur",
            "priceRange": "$$"
      },
      {
            "name": "Vodenicata",
            "description": "Традиционна българска гостилница",
            "address": "Северен край, България",
            "website": "https://vodenicata.weebly.com/",
            "priceRange": "$"
      },
      {
            "name": "Planinata Hotel",
            "description": "Хотел в планинската местност",
            "address": "Северен край, България",
            "website": "https://www.planinata-bg.com/index.html",
            "priceRange": "$$"
      },
      {
            "name": "Azareiya",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://www.azareiya.com/bg/prices.html",
            "priceRange": "$$"
      },
      {
            "name": "Eco Complex Klisura",
            "description": "Еко-комплекс в природата",
            "address": "Северен край, България",
            "website": "https://web.facebook.com/EcoComplexKlisura/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel 19 Vek",
            "description": "Хотел със исторически стил",
            "address": "Копривщица, България",
            "website": "https://hotel19vek.com/",
            "priceRange": "$$"
      },
      {
            "name": "Balani Hotel",
            "description": "Хотел с луксозни услуги",
            "address": "Северен край, България",
            "website": "https://balani-bg.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Balkan Chanove",
            "description": "Хотел с традиционна кухня",
            "address": "Северен край, България",
            "website": "https://balkanskichanove.hotelonia.com/",
            "priceRange": "$$"
      },
      {
            "name": "Zamak Hotel",
            "description": "Луксозен хотел",
            "address": "Северен край, България",
            "website": "https://zamakbg.eu/tseni/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Dobrudzha",
            "description": "Хотел в град Шумен",
            "address": "Шумен, България",
            "website": "https://planetofhotels.com/bg/blgariya/shumen/hotel-dobrudzha",
            "priceRange": "$$"
      },
      {
            "name": "La Piazza Hotel",
            "description": "Хотел със съвременен дизайн",
            "address": "Шумен, България",
            "website": "https://la-piazza-hotel-shumen.hotelmix.bg/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Chukani",
            "description": "Хотел с традиционна атмосфера",
            "address": "Северен край, България",
            "website": "https://hotelchukani.eu/",
            "priceRange": "$$"
      },
      {
            "name": "Utrina Rosa",
            "description": "Хотел със спа услуги",
            "address": "Северен край, България",
            "website": "https://utrinnarosa.eu/",
            "priceRange": "$$$"
      },
      {
            "name": "Nebesnitе Pasbishta",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://nebesnitepasbishta.com/",
            "priceRange": "$$"
      },
      {
            "name": "Trapezitca 1902",
            "description": "Исторически хотел",
            "address": "Северен край, България",
            "website": "https://trapezitca1902.com/bg",
            "priceRange": "$$"
      },
      {
            "name": "Camping Kazanlak",
            "description": "Кемпинг със съоръжения",
            "address": "Казанлък, България",
            "website": "https://www.campingkazanlak.com/",
            "priceRange": "$"
      },
      {
            "name": "Momina Krepost",
            "description": "Туристически комплекс с исторически значение",
            "address": "Северен край, България",
            "website": "https://www.momina-krepost.com/bg",
            "priceRange": "$$"
      },
      {
            "name": "Malavi Guest House",
            "description": "Гостинска къща",
            "address": "Северен край, България",
            "website": "https://malavi.bg/accommodation/malavi-%d0%ba%d1%8a%d1%89%d0%b0-%d0%b7%d0%b0-%d0%b3%d0%be%d1%81%d1%82%d0%b8",
            "priceRange": "$"
      },
      {
            "name": "Family Hotel Balkanci",
            "description": "Семейна хотел",
            "address": "Северен край, България",
            "website": "https://familyhotelbalkanci.com/",
            "priceRange": "$$"
      },
      {
            "name": "Uzana Edelwais",
            "description": "Хотел в планинската местност",
            "address": "Узана, България",
            "website": "https://uzana-edelvais.com/",
            "priceRange": "$$"
      },
      {
            "name": "Partizanska Pesen",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://partizanska-pesen.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hut Uzana",
            "description": "Планинска хижа",
            "address": "Узана, България",
            "website": "https://hija-uzana.com/",
            "priceRange": "$"
      },
      {
            "name": "Complex Chalet",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://complexchalet.com/",
            "priceRange": "$$"
      },
      {
            "name": "Vila Dragana",
            "description": "Вила със съоръжения",
            "address": "Северен край, България",
            "website": "https://vila.bg/house-dragana-3898.html",
            "priceRange": "$$"
      },
      {
            "name": "Bulgarka Hut",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://bulgarka-hut.com/",
            "priceRange": "$"
      },
      {
            "name": "Hut Pleven",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://www.pleven.hija.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hut Zlatitsa",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://zlatitsa.com/portfolio-item/",
            "priceRange": "$"
      },
      {
            "name": "Gorski Rai",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://gorski-rai.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hut Tajga",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://apriltsi.net/",
            "priceRange": "$"
      },
      {
            "name": "Hut Benkovski",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://www.benkovski.hija.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hut Trastenaya",
            "description": "Планинска хижа",
            "address": "Северен край, България",
            "website": "https://gowhere.bg/mesta/planini/hiza-trastenaya/",
            "priceRange": "$"
      },
      {
            "name": "Bedouin",
            "description": "Туристически комплекс",
            "address": "Северен край, България",
            "website": "https://bedouin.bg/",
            "priceRange": "$$"
      }
,
      {
        "name": "Бонита Хотел Спа (Стрелча)",
        "description": "Хотел спа в гр. Стрелча.",
        "address": "Северна България"
      },
      {
        "name": "Илиевата къща (Стрелча)",
        "description": "Частен хотел в национален балнеоложки курорт гр. Стрелча.",
        "address": "Северна България"
      },
      {
        "name": "Шарените къщи за гости",
        "description": "Къщи за гости в Северна България.",
        "address": "Северна България"
      },
      {
        "name": "Семеен хотел Пролет",
        "description": "Семеен хотел в Северна България.",
        "address": "Северна България"
      },
      {
        "name": "The Orchard - Термален Къмпинг",
        "description": "Термален къмпинг в Северна България.",
        "address": "Северна България"
      },
      {
        "name": "Хотел Рибарица (Военни клубове)",
        "description": "Хотел на Изпълнителна агенция „Военни клубове и военно-почивно дело“ в с. Рибарица.",
        "address": "Северна България"
      },
      {
        "name": "Учебна и хотелска база Петрохан (с. Бързия)",
        "description": "Учебно-опитно горско стопанство с хотелска база.",
        "address": "Северна България"
      },
      {
        "name": "Хотел Рачев Резиденс (Арбанаси)",
        "description": "Хотел в с. Арбанаси.",
        "address": "Северна България"
      },
      {
        "name": "Аква Вила (Правец)",
        "description": "Къща за гости под наем в гр. Правец.",
        "address": "Северна България"
      },
      {
        "name": "НСА Учебно-плувна база Мадара",
        "description": "Учебно-плувна база на Национална спортна академия в района на Мадара.",
        "address": "Северна България"
      }
    
    ],
  },
  {
    id: "south",
    name: "Южна България",
    tagline: "Най-старият непрекъснато населен град в Европа",
    icon: Compass,
    pois: [
      {
            "name": "Скумсале",
            "description": "Исторически град с археологически находки",
            "type": "Archaeological Site",
            "address": "Южна България, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%A1%D0%BA%D1%83%D0%BC%D1%81%D0%B0%D0%BB%D0%B5"
      },
      {
            "name": "Леново село",
            "description": "Традиционно село с исторически значение",
            "type": "Village",
            "address": "Леново, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%9B%D0%B5%D0%BD%D0%BE%D0%B2%D0%BE_(%D1%81%D0%B5%D0%BB%D0%BE)"
      },
      {
            "name": "Кабиле древен град",
            "description": "Древен град с крепост и музей",
            "type": "Archaeological Site",
            "address": "Кабиле, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%9A%D0%B0%D0%B1%D0%B8%D0%BB%D0%B5_(%D0%B4%D1%80%D0%B5%D0%B2%D0%B5%D0%BD_%D0%B3%D1%80%D0%B0%D0%B4)"
      },
      {
            "name": "Заичи връх",
            "description": "Планински връх с панорамна гледка",
            "type": "Mountain Peak",
            "address": "Южна България, България",
            "website": "https://www.aircrashconsult.info/BG/Rabbit_peak/Zaichi_vruh.htm"
      },
      {
            "name": "Халката",
            "description": "Природна формация с туристически маршрути",
            "type": "Natural Wonder",
            "address": "Южна България, България",
            "website": "https://www.aircrashconsult.info/BG/Halkata_BG/Halkata.htm"
      },
      {
            "name": "Чирпански манастир",
            "description": "Исторически манастир с уникална архитектура",
            "type": "Religious Site",
            "address": "Южна България, България",
            "website": "https://www.google.com/search?q=%D0%A7%D0%B8%D1%80%D0%BF%D0%B0%D0%BD%D1%81%D0%BA%D0%B8+%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80"
      },
      {
            "name": "Батакунска крепост",
            "description": "Исторична крепост с музей",
            "type": "Historical Site",
            "address": "Батакун, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%91%D0%B0%D1%82%D0%BA%D1%83%D0%BD%D1%81%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82"
      },
      {
            "name": "Батакунски манастир",
            "description": "Исторически манастир в планинската местност",
            "type": "Religious Site",
            "address": "Батакун, България",
            "website": "https://bg.wikipedia.org/wiki/%D0%91%D0%B0%D1%82%D0%BA%D1%83%D0%BD%D1%81%D0%BA%D0%B8_%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80"
      },
      {
            "name": "Паталеница",
            "description": "Планинско село с еко-туризъм",
            "type": "Village",
            "address": "Паталеница, България",
            "website": "https://uchiteli.bg/interesting/v-patalenica-vsichko-e-po-syrce-i-kristalniqt-vyzduh-i-prirodata/4563"
      },
      {
            "name": "Аквапарк Варвара",
            "description": "Водни развлечения и спортни активности",
            "type": "Water Park",
            "address": "Варвара, България",
            "website": "https://www.aquapark-varvara.com/"
      },
      {
            "name": "Братя Дасколови",
            "description": "Исторически място с археологически находки",
            "type": "Archaeological Site",
            "address": "Братя Дасколови, България",
            "website": "https://pochivka.bg/bratya-daskalovi-zabelezhitelnosti-g245"
      },
      {
            "name": "Одриско царство",
            "description": "Древно царство с музей и експозиция",
            "type": "Museum",
            "address": "Южна България, България",
            "website": "https://www.chambersz.com/novootkrit-centar-na-odriskoto-carstvo-do-bratya-daskalovi-32847"
      },
      {
            "name": "Вкаменена святба",
            "description": "Природна геологична формация",
            "type": "Natural Wonder",
            "address": "Южна България, България",
            "website": "https://www.google.com/maps/place/%D0%92%D0%BA%D0%B0%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B0%D1%82%D0%B0+%D1%81%D0%B2%D0%B0%D1%82%D0%B1%D0%B0"
      },
      {
            "name": "Мраморно езеро",
            "description": "Красиво езеро с минерални воды",
            "type": "Natural Wonder",
            "address": "Южна България, България",
            "website": "https://vila.bg/article/mramorno-ezero-pravoslav"
      },
      {
            "name": "Златноливаденски манастир",
            "description": "Исторически манастир със святи икони",
            "type": "Religious Site",
            "address": "Южна България, България",
            "website": "https://www.google.com/maps/place/%D0%97%D0%BB%D0%B0%D1%82%D0%BD%D0%BE%D0%BB%D0%B8%D0%B2%D0%B0%D0%B4%D0%B5%D0%BD%D1%81%D0%BA%D0%B8+%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80"
      },
      {
            "name": "Минерални бани Старозагора",
            "description": "Спа курорт с лечебни воды",
            "type": "Spa",
            "address": "Старозагорски минерални бани, България",
            "website": "https://www.plovdiv24.bg/novini/regionalni/Na-edin-chas-put-ot-Plovdiv-mineralni-bani-lekuvat-kup-bolesti-oshte-ot-rim-1685170"
      },
      {
            "name": "Besapara",
            "description": "Историческо място с археологически значение",
            "type": "Archaeological Site",
            "address": "Южна България, България",
            "website": "https://bg.m.wikipedia.org/wiki/%D0%91%D0%B5%D1%81%D0%B0%D0%BF%D0%B0%D1%80%D0%B0"
      },
      {
            "name": "Паракліс Св. Петър и Павел",
            "description": "Религиозна святиня с исторически значение",
            "type": "Religious Site",
            "address": "Южна България, България",
            "website": "https://www.google.com/maps/place/%D0%9F%D0%B0%D1%80%D0%B0%D0%BA%D0%BB%D0%B8%D1%81+%22%D0%A1%D0%B2.%D0%A1%D0%B2.%D0%9F%D0%B5%D1%82%D1%8A%D1%80+%D0%B8+%D0%9F%D0%B0%D0%B2%D0%B5%D0%BB%22"
      },
      {
            "name": "Благодатие",
            "description": "Еко-туризъм и природни преживявания",
            "type": "Eco Tourism",
            "address": "Южна България, България",
            "website": "https://blagodatie.com/bg/"
      },
      {
            "name": "Chemernik",
            "description": "Еко-туризъм и планински преживявания",
            "type": "Eco Tourism",
            "address": "Южна България, България",
            "website": "https://chemernik.wordpress.com/about/"
      },
      {
            "name": "Skitnika",
            "description": "Планинска хижа и туристически комплекс",
            "type": "Mountain Hut",
            "address": "Южна България, България",
            "website": "https://skitnika.bg/"
      }
,
      {
        "name": "Минерални бани (Пловдив)",
        "description": "Минерални бани от римско време край Пловдив.",
        "type": "Минерални бани",
        "address": "Южна България"
      }
    
    ],
    stays: [
      {
            "name": "Hills Beer",
            "description": "Крафт пивоварна с настаняване и ресторант",
            "address": "Южна България, България",
            "website": "https://hills.beer/",
            "priceRange": "$$"
      },
      {
            "name": "COB Camp Club",
            "description": "Кемпинг и туристически комплекс",
            "address": "Южна България, България",
            "website": "https://www.cobcampclub.com/",
            "priceRange": "$"
      },
      {
            "name": "Centar Otdih Zdrave Hrabrino",
            "description": "Център за отдих и здравословен туризъм",
            "address": "Храбрино, България",
            "website": "https://sites.google.com/view/centar-otdih-zdrave-hrabrino/home",
            "priceRange": "$$"
      },
      {
            "name": "Spa Hotel Mineraly Yagoda",
            "description": "Спа хотел с минерални води",
            "address": "Ягода, България",
            "website": "http://spahotelmineralyagoda.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Aspa Vila",
            "description": "Вила с модерни съоръжения",
            "address": "Южна България, България",
            "website": "http://hotel-aspavila.com/home-office/",
            "priceRange": "$$"
      },
      {
            "name": "Shiroka Luka Kalina",
            "description": "Традиционна българска гостилница",
            "address": "Широка лъка, България",
            "website": "http://shirokaluka-kalina.com/rezervacii/",
            "priceRange": "$"
      },
      {
            "name": "PG Zaimov",
            "description": "Хотел и туристически комплекс",
            "address": "Южна България, България",
            "website": "https://pgzaimov.com/kontakti/",
            "priceRange": "$$"
      },
      {
            "name": "EG Hotels Tiron",
            "description": "Спа хотел със специални оферти",
            "address": "Старозагорски минерални бани, България",
            "website": "http://eghotels.bg/tiron/offer-50-all-inclusive!-starozagorski-mineralni-bani!",
            "priceRange": "$$"
      },
      {
            "name": "Hostel Stadiona",
            "description": "Хостел с бюджетни цени",
            "address": "Южна България, България",
            "website": "https://hostelstadiona.com/",
            "priceRange": "$"
      },
      {
            "name": "Hotel Elegance",
            "description": "Елегантен хотел с модерни услуги",
            "address": "Южна България, България",
            "website": "https://hotelelegance.eu/",
            "priceRange": "$$"
      },
      {
            "name": "Mania Hotel",
            "description": "Хотел с традиционна архитектура",
            "address": "Южна България, България",
            "website": "https://maniahotel.com/",
            "priceRange": "$$"
      },
      {
            "name": "Ezero Starozagora",
            "description": "Хотел край езеро със спортни активности",
            "address": "Старозагора, България",
            "website": "https://www.ezeroto-sz.com/",
            "priceRange": "$$"
      },
      {
            "name": "Hotel Markovo",
            "description": "Спортен хотел с различни активности",
            "address": "Марково, България",
            "website": "https://hotelmarkovo.bg/sportni-aktivnosti/",
            "priceRange": "$$"
      },
      {
            "name": "Pelitko",
            "description": "Традиционна българска гостилница",
            "address": "Южна България, България",
            "website": "https://www.pelitko.com/",
            "priceRange": "$"
      },
      {
            "name": "Hotel Clepsydra Residence",
            "description": "Модерен хотел с луксозни услуги",
            "address": "Южна България, България",
            "website": "https://www.facebook.com/hotelclepsydraresidence/",
            "priceRange": "$$$"
      },
      {
            "name": "Bendida Winery",
            "description": "Винарна с настаняване и дегустации",
            "address": "Южна България, България",
            "website": "https://bendida.eu/",
            "priceRange": "$$"
      },
      {
            "name": "Eco Village Ruminika",
            "description": "Еко-село с традиционна архитектура",
            "address": "Южна България, България",
            "website": "https://www.facebook.com/pages/%D0%95%D0%BA%D0%BE-%D0%A1%D0%B5%D0%BB%D0%B8%D1%89%D0%B5-%D0%A0%D1%83%D0%BC%D0%B8%D0%BD%D0%B8%D0%BA%D0%B0/489892751072359",
            "priceRange": "$$"
      },
      {
            "name": "Kushtakala",
            "description": "Еко-хотел с органични храни",
            "address": "Южна България, България",
            "website": "https://kushtakala.com/about/",
            "priceRange": "$$"
      },
      {
            "name": "Flora Eco",
            "description": "Еко-туризъм и природни преживявания",
            "address": "Южна България, България",
            "website": "https://flora-eco.com/",
            "priceRange": "$$"
      },
      {
            "name": "Zaara Estate",
            "description": "Имение с винарна и настаняване",
            "address": "Южна България, България",
            "website": "https://zaaraestate.com/",
            "priceRange": "$$$"
      },
      {
            "name": "Hizha Buzludzha",
            "description": "Планинска хижа с панорамна гледка",
            "address": "Южна България, България",
            "website": "https://buzludzha-hut.com/",
            "priceRange": "$"
      },
      {
            "name": "Hizha Karandila",
            "description": "Планинска хижа в планинската местност",
            "address": "Южна България, България",
            "website": "https://www.facebook.com/hijakarandila/",
            "priceRange": "$"
      },
      {
            "name": "Hizha Buntovna",
            "description": "Планинска хижа със съоръжения",
            "address": "Южна България, България",
            "website": "https://tripsjournal.com/noshtuvka/hizha-buntovna",
            "priceRange": "$"
      },
      {
            "name": "Hizha Fenera",
            "description": "Планинска хижа с красива гледка",
            "address": "Южна България, България",
            "website": "https://www.facebook.com/p/%D0%A5%D0%98%D0%96%D0%90-%D0%A4%D0%B5%D0%BD%D0%B5%D1%80%D0%B0-100070136382069/",
            "priceRange": "$"
      },
      {
            "name": "Hizha Vasillevski",
            "description": "Планинска хижа с традиционен стил",
            "address": "Южна България, България",
            "website": "https://www.vasillevski.hija.bg/",
            "priceRange": "$"
      },
      {
            "name": "Hizha Haidushka Pesen",
            "description": "Планинска хижа със съоръжения",
            "address": "Южна България, България",
            "website": "https://www.haidushkapesen.hija.bg/",
            "priceRange": "$"
      }
,
      {
        "name": "Комплекс Варвара",
        "description": "Комплекс в района на Аквапарк Варвара.",
        "address": "Южна България"
      },
      {
        "name": "Hostigosti",
        "description": "Мрежа от къщи за гости в Южна България.",
        "address": "Южна България"
      },
      {
        "name": "Къща за гости Кала (Паталеница)",
        "description": "Къща за гости в с. Паталеница.",
        "address": "Южна България"
      }
    
    ],
  },
  {
    id: "northwest",
    name: "Северозападна България",
    tagline: "Скални феномени и тиха провинция",
    icon: Mountain,
    pois: [
      {
            "name": "Restaurant Ona",
            "description": "Традиционна българска кухня и атмосфера",
            "type": "Restaurant",
            "address": "Северозапад, България",
            "website": "https://www.facebook.com/restaurant.ona/"
      },
      {
            "name": "Bebeka Attraction",
            "description": "Туристически обект и природна красота",
            "type": "Tourist Attraction",
            "address": "Северен Западен край, България",
            "website": "https://bebeka.bg/bg/%D0%B7%D0%B0-bebeka-3/"
      },
      {
            "name": "Restaurant Ona",
            "description": "Ресторант с традиционна българска кухня, управляван от шеф готвач, предлагащ дине-ин услуга в атмосферично място в село Stakevci",
            "type": "Restaurant",
            "address": "улица 31-ва #1, Stakevci, България",
            "website": "https://www.facebook.com/restaurant.ona/"
      },
      {
            "name": "Belogradchik Rocks",
            "description": "Природен феномен - величествени скалисти образувания, един от най-красивите природни обекти в България, идеален за туризъм и фотография",
            "type": "Natural Attraction",
            "address": "Белоградчик, България",
            "website": "https://www.belogradchik.bg/"
      },
      {
            "name": "Belogradchik Fortress",
            "description": "Историческа крепост от османския период, построена на върха на скалите, предлагаща панорамни гледки към региона",
            "type": "Historical Site",
            "address": "Белоградчик, България",
            "website": "https://www.belogradchik.bg/"
      },
      {
            "name": "Vidin Fortress",
            "description": "Историческа крепост на Дунав, един от най-добре запазените османски укрепления в България",
            "type": "Historical Site",
            "address": "Видин, България",
            "website": "https://www.vidinfortress.bg/"
      },
      {
            "name": "Danube River",
            "description": "Река Дунав, втората по дължина река в Европа, предлагаща възможности за речни круизи и риболов",
            "type": "Natural Attraction",
            "address": "Видин, България",
            "website": "https://www.danube.bg/"
      },
      {
            "name": "Obrochishte Monastery",
            "description": "Древен манастир в планинския район на Северозапада, място на духовност и история",
            "type": "Religious Site",
            "address": "Оброчище, България",
            "website": "https://www.obrochishte.bg/"
      }
],
    stays: [
      {
            "name": "Restaurant Ona",
            "description": "Ресторант с настаняване в Северозапада",
            "address": "Северозапад, България",
            "website": "https://www.facebook.com/restaurant.ona/",
            "priceRange": "$$"
      },
      {
            "name": "Bebeka",
            "description": "Туристически комплекс и хотел",
            "address": "Северен Западен край, България",
            "website": "https://bebeka.bg/bg/%D0%B7%D0%B0-bebeka-3/",
            "priceRange": "$$"
      },
      {
            "name": "Bebeka Glamping",
            "description": "Луксозен глемпинг с преработени корабни контейнери, панорамни прозорци с гледка към Белоградчишки скали, спалня кралски размер, кухня, баня, климатик, безплатен WiFi и паркинг",
            "address": "ул. Васил Левски 25, Белоградчик, България",
            "website": "https://bebeka.bg/bg/%D0%B7%D0%B0-bebeka-3/",
            "priceRange": "$$$"
      },
      {
            "name": "Hotel Belogradchik",
            "description": "Хотел в центъра на град Белоградчик с удобни стаи и ресторант",
            "address": "Белоградчик, България",
            "website": "https://www.belogradchik.bg/",
            "priceRange": "$$"
      },
      {
            "name": "Camping Belogradchik",
            "description": "Кемпинг с бунгала и палатки близо до Белоградчишките скали",
            "address": "Белоградчик, България",
            "website": "https://www.campingbelogradchik.bg/",
            "priceRange": "$"
      },
      {
            "name": "Stakevci Village Accommodation",
            "description": "Традиционно село с възможност за престой в местни къщи и комплекси",
            "address": "Stakevci, България",
            "website": "https://www.stakevci.bg/",
            "priceRange": "$"
      },
      {
            "name": "Vidin Hotel",
            "description": "Хотел в град Видин с модерни удобства и ресторант",
            "address": "Видин, България",
            "website": "https://www.vidinhotel.bg/",
            "priceRange": "$$"
      }
,
      {
        "name": "Хижа Рай",
        "description": "Планинска хижа в Северозападна България.",
        "address": "Северозападна България"
      }
    
    ],
  },
];

const WEEKLY_PICK = {
  region: "Родопите",
  name: "Шиpoка лъка през есента",
  blurb:
    "Дървените къщи и звукът на Родопската държавна консерватория, вплетен в мъглата на долината — есента е тихият сезон, в който селото се вижда най-добре.",
};

const CULTURAL_CATEGORIES = {
  bg: {
    cultural_phenomena: "Културни феномени и забележителности",
    monasteries: "Манастири",
    natural_phenomena: "Природни феномени и забележителности",
    historical_sites: "Исторически места",
    abandoned_villages: "Изчезващи села",
    communist_heritage: "Наследство от комунизма",
    spa_tourism: "Спа туризъм",
    wine_tourism: "Винен туризъм",
    gourmet_tourism: "Гурме туризъм",
  },
  en: {
    cultural_phenomena: "Cultural Phenomena and Landmarks",
    monasteries: "Monasteries",
    natural_phenomena: "Natural Phenomena and Landmarks",
    historical_sites: "Historical Sites",
    abandoned_villages: "Abandoned Villages",
    communist_heritage: "Communist Heritage",
    spa_tourism: "Spa Tourism",
    wine_tourism: "Wine Tourism",
    gourmet_tourism: "Gourmet Tourism",
  },
};

const CULTURAL_UI = {
  bg: {
    title: "Места за културен туризъм",
    subtitle: "Открийте богатото културно наследство на България",
    back: "Назад",
    noResults: "Няма налични места за този вид туризъм",
    visitWebsite: "Посетете сайта",
    openingHours: "Работно време",
    entryFee: "Входна такса",
  },
  en: {
    title: "Cultural Tourism Places",
    subtitle: "Discover Bulgaria's rich cultural heritage",
    back: "Back",
    noResults: "No places available for this type of tourism",
    visitWebsite: "Visit Website",
    openingHours: "Opening Hours",
    entryFee: "Entry Fee",
  },
};

const CULTURAL_PLACES = [
  {
    name: "Rila Monastery",
    description: "One of Bulgaria's most important medieval monasteries, UNESCO World Heritage Site",
    category: "monasteries",
    region: "Rila and Pirin",
    address: "Rila 2400, Bulgaria",
    phone: "+359 7054 2208",
    website: "https://www.rilamonastery.bg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rila_Monastery_-_Bulgaria_-_2019.jpg/1280px-Rila_Monastery_-_Bulgaria_-_2019.jpg",
    rating: "4.8",
    reviewCount: 2500,
    openingHours: "09:00-17:00",
    entryFee: "10 BGN",
  },
  {
    name: "Alexander Nevsky Cathedral",
    description: "One of the largest Eastern Orthodox cathedrals in the world, located in Sofia",
    category: "historical_sites",
    region: "Near Sofia",
    address: "1 Alexander Nevsky Sq, 1000 Sofia",
    phone: "+359 2 9181 772",
    website: "https://www.alexander-nevsky.bg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Alexander_Nevsky_Cathedral_Sofia_2010.jpg/1280px-Alexander_Nevsky_Cathedral_Sofia_2010.jpg",
    rating: "4.7",
    reviewCount: 1800,
    openingHours: "07:00-19:00",
    entryFee: "Free",
  },
  {
    name: "Boyana Church",
    description: "Medieval church with exceptional frescoes, UNESCO World Heritage Site",
    category: "historical_sites",
    region: "Near Sofia",
    address: "19 Boyanskiya Monastery St, 1616 Sofia",
    phone: "+359 2 9595 139",
    website: "https://www.boyanamuseum.bg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Boyana_Church_Sofia_Bulgaria_2010.jpg/1280px-Boyana_Church_Sofia_Bulgaria_2010.jpg",
    rating: "4.6",
    reviewCount: 1200,
    openingHours: "09:30-17:30",
    entryFee: "15 BGN",
  },
  {
    name: "Seven Rila Lakes",
    description: "Stunning natural phenomenon - seven glacial lakes at different altitudes",
    category: "natural_phenomena",
    region: "Rila and Pirin",
    address: "Rila Mountains, Bulgaria",
    website: "https://www.rilamountains.bg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Seven_Rila_Lakes.jpg/1280px-Seven_Rila_Lakes.jpg",
    rating: "4.9",
    reviewCount: 3000,
    openingHours: "24/7",
    entryFee: "Free",
  },
  {
    name: "Madara Rider",
    description: "Ancient rock relief carving, UNESCO World Heritage Site",
    category: "historical_sites",
    region: "Northern Bulgaria",
    address: "Madara, Bulgaria",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Madara_Rider.jpg/1280px-Madara_Rider.jpg",
    rating: "4.5",
    reviewCount: 800,
    openingHours: "24/7",
    entryFee: "Free",
  },
  {
    name: "Rose Valley Wine Region",
    description: "Famous Bulgarian wine region known for rose production and wine tourism",
    category: "wine_tourism",
    region: "Southern Bulgaria",
    address: "Rose Valley, Bulgaria",
    website: "https://www.rosevalley.bg",
    rating: "4.7",
    reviewCount: 1500,
    openingHours: "09:00-18:00",
    entryFee: "Free",
  },
  {
    name: "Pomorie Salt Pans",
    description: "Natural salt pans with therapeutic mud, popular spa tourism destination",
    category: "spa_tourism",
    region: "Black Sea",
    address: "Pomorie, Bulgaria",
    phone: "+359 596 24 511",
    website: "https://www.pomoriebay.bg",
    rating: "4.4",
    reviewCount: 600,
    openingHours: "09:00-17:00",
    entryFee: "20 BGN",
  },
  {
    name: "Koprivshtitsa",
    description: "Historic town with preserved 19th-century architecture and cultural heritage",
    category: "cultural_phenomena",
    region: "Central Bulgaria",
    address: "Koprivshtitsa, Bulgaria",
    website: "https://www.koprivshtitsa.bg",
    rating: "4.6",
    reviewCount: 900,
    openingHours: "24/7",
    entryFee: "Free",
  },
  {
    name: "Belogradchik Rocks",
    description: "Stunning natural rock formations with fortress and cultural significance",
    category: "natural_phenomena",
    region: "Northwest",
    address: "Belogradchik, Bulgaria",
    phone: "+359 90 76 30 80",
    website: "https://www.belogradchik.bg",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Belogradchik_Rocks.jpg/1280px-Belogradchik_Rocks.jpg",
    rating: "4.8",
    reviewCount: 2000,
    openingHours: "08:00-18:00",
    entryFee: "15 BGN",
  },
];

function Shevitsa({ color = TOKENS.gold, height = 14 }) {
  const id = useMemo(() => `shev-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg
      viewBox="0 0 64 16"
      width="100%"
      height={height}
      preserveAspectRatio="none"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M0 8 L4 2 L8 8 L12 2 L16 8 L12 14 L8 8 L4 14 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="64" height="16" fill={`url(#${id})`} />
    </svg>
  );
}

function HeroBackdrop() {
  return (
    <svg
      viewBox="0 0 800 320"
      preserveAspectRatio="xMidYMax slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <circle cx="640" cy="70" r="46" fill={TOKENS.gold} opacity="0.18" />
      <polygon points="0,320 120,160 240,320" fill={TOKENS.surface2} opacity="0.9" />
      <polygon points="140,320 300,120 460,320" fill={TOKENS.surface2} />
      <polygon points="360,320 520,170 700,320" fill={TOKENS.surface2} opacity="0.85" />
      <path
        d="M0 300 Q 100 280 200 300 T 400 300 T 600 300 T 800 300 V320 H0 Z"
        fill={TOKENS.teal}
        opacity="0.25"
      />
    </svg>
  );
}

function RegionIcon({ Icon }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "rgba(214,164,36,0.12)",
        color: TOKENS.gold,
        flexShrink: 0,
      }}
    >
      <Icon size={17} strokeWidth={1.75} />
    </span>
  );
}

function PillPrice({ price }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: "0.04em",
        color: TOKENS.gold,
        border: `1px solid ${TOKENS.goldDim}`,
        borderRadius: 4,
        padding: "1px 6px",
      }}
    >
      {price}
    </span>
  );
}

function BackLink({ onClick, label = "Назад" }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        color: TOKENS.gold,
        fontSize: 14,
        cursor: "pointer",
        padding: 0,
        marginBottom: 24,
      }}
    >
      <ArrowLeft size={15} /> {label}
    </button>
  );
}

function LegalPage({ onBack, title, sections }) {
  return (
    <section style={{ padding: "40px clamp(16px,4vw,48px) 64px", maxWidth: 720 }}>
      <BackLink onClick={onBack} />
      <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 30, margin: "0 0 28px" }}>
        {title}
      </h1>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 26 }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, margin: "0 0 10px" }}>
            {s.heading}
          </h2>
          {s.paragraphs?.map((p, j) => (
            <p key={j} style={{ color: TOKENS.inkDim, fontSize: 14.5, margin: "0 0 10px" }}>
              {p}
            </p>
          ))}
          {s.list && (
            <ul style={{ color: TOKENS.inkDim, fontSize: 14.5, margin: "0 0 10px", paddingLeft: 20 }}>
              {s.list.map((li, k) => (
                <li key={k} style={{ marginBottom: 6 }}>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <p style={{ color: TOKENS.inkDim, fontSize: 12.5, marginTop: 32 }}>
        Последна актуализация: {new Date().toLocaleDateString("bg-BG")}
      </p>
    </section>
  );
}

function AboutPage({ onBack }) {
  return (
    <LegalPage
      onBack={onBack}
      title="За нас"
      sections={[
        {
          heading: "Добре дошли в BG to GO",
          paragraphs: [
            "BG to GO е вашият надежден спътник при планиране на пътешествия в България. Ние сме посветени на това да направим откритието на българските съкровища лесно, достъпно и вдъхновяващо.",
          ],
        },
        {
          heading: "Нашата мисия",
          paragraphs: [
            "Нашата мисия е да свържем туристите с най-добрите места за настаняване и туристически атракции в България. Вярваме, че всеки заслужава незабравимо пътешествие, пълно с автентични преживявания и открития.",
          ],
        },
        {
          heading: "Какво предлагаме",
          list: [
            "Всеобхватна информация — достъп до места за настаняване и туристически атракции, разделени по региони на България.",
            "Лесна навигация — интуитивен интерфейс за бързо намиране на точно това, което търсиш.",
            "Културен туризъм — манастири, природни феномени, винен и спа туризъм на едно място.",
            "Актуална информация — база данни, събрана от регионите на страната.",
          ],
        },
        {
          heading: "Защо да ни изберете",
          list: [
            "Специализирана база данни за България",
            "Подробна информация за всяко място",
            "Контактни данни и връзки за резервация",
            "Безплатен достъп без скрити такси",
          ],
        },
        {
          heading: "Свържете се с нас",
          paragraphs: [
            "Имате предложения, въпроси или желаете да добавите вашето място към нашата база данни? Свържете се с нас чрез контактната форма на приложението.",
            "Благодарим, че избрахте BG to GO като вашия туристически спътник!",
          ],
        },
      ]}
    />
  );
}

function TermsPage({ onBack }) {
  return (
    <LegalPage
      onBack={onBack}
      title="Условия на ползване"
      sections={[
        {
          heading: "1. Приемане на условията",
          paragraphs: [
            'Чрез достъп и ползване на приложението BG to GO ("Приложението"), вие се съгласявате да бъдете обвързани от настоящите условия на ползване. Ако не се съгласявате с някое от условията, моля не ползвайте приложението.',
          ],
        },
        {
          heading: "2. Описание на услугата",
          paragraphs: [
            "BG to GO е туристическо приложение, което предоставя информация за места за настаняване и туристически атракции в България. Приложението служи в информационни цели и не е агент на никое от представените места.",
          ],
        },
        {
          heading: "3. Ограничения на отговорността",
          paragraphs: [
            'Приложението се предоставя "както е" без никакви гаранции. Ние не гарантираме точността, пълнотата или актуалността на информацията. Потребителите ползват информацията на своя собствена отговорност.',
            "Ние не отговаряме за:",
          ],
          list: [
            "Неточна или остаряла информация",
            "Прекъсване или недостъпност на услугата",
            "Загуба на данни или технически проблеми",
            "Преки или косвени щети, произтичащи от ползването на приложението",
          ],
        },
        {
          heading: "4. Потребителско поведение",
          paragraphs: ["Потребителите се съгласяват да не:"],
          list: [
            "Използват приложението за незаконни цели",
            "Нарушават правата на други потребители",
            "Качват вредоносен софтуер или вирусни материали",
            "Се опитват да получат неоторизиран достъп до системите",
            "Публикуват обидно, дискриминиращо или незаконно съдържание",
          ],
        },
        {
          heading: "5. Интелектуална собственост",
          paragraphs: [
            "Съдържанието, дизайнът и функционалността на приложението са собственост на BG to GO. Забранено е копиране, модифициране или разпространение без писмено разрешение.",
          ],
        },
        {
          heading: "6. Промени на условията",
          paragraphs: [
            "Ние си запазваме правото да променяме тези условия по всяко време. Продължаващото ползване на приложението след промени означава приемането им.",
          ],
        },
        {
          heading: "7. Контакт",
          paragraphs: ["За въпроси относно тези условия, моля свържете се с нас чрез контактната форма на приложението."],
        },
      ]}
    />
  );
}

function PrivacyPage({ onBack }) {
  return (
    <LegalPage
      onBack={onBack}
      title="Политика за поверителност"
      sections={[
        {
          heading: "1. Въведение",
          paragraphs: [
            "BG to GO уважава вашата поверителност и е ангажирана да защити вашите лични данни. Настоящата политика обяснява как събираме, използваме и защитаваме вашата информация.",
          ],
        },
        {
          heading: "2. Събиране на данни",
          paragraphs: ["Приложението не изисква регистрация. Ние събираме следните видове информация:"],
          list: [
            "Информация от контактната форма: име, имейл и съобщение, ако изберете да ни пишете",
            "Информация за ползване: как ползвате приложението, включително преглеждани страници",
            "Техническа информация: тип браузър и други общи технически данни",
          ],
        },
        {
          heading: "3. Ползване на данни",
          paragraphs: ["Данните, които предоставяте чрез контактната форма, се използват за:"],
          list: ["Отговор на вашето запитване", "Подобряване на съдържанието и услугите"],
        },
        {
          heading: "4. Споделяне на данни",
          paragraphs: [
            "Ние не продаваме вашите лични данни на трети страни и не ги споделяме извън обхвата, необходим за отговор на запитването ви.",
          ],
        },
        {
          heading: "5. Бисквитки",
          paragraphs: [
            "Приложението може да използва бисквитки за подобряване на потребителския опит. Можете да управлявате настройките на бисквитките чрез браузъра си.",
          ],
        },
        {
          heading: "6. Ваши права",
          paragraphs: ["Имате право да поискате достъп, корекция или изтриване на данните, които сте ни предоставили чрез контактната форма."],
        },
        {
          heading: "7. Промени на политиката",
          paragraphs: ["Ние можем да обновим тази политика по всяко време. Ще посочим значителни промени тук."],
        },
        {
          heading: "8. Контакт",
          paragraphs: ["За въпроси относно вашите данни и тази политика, моля свържете се с нас чрез контактната форма на приложението."],
        },
      ]}
    />
  );
}

function CulturalTourismPage({ onBack }) {
  const [lang, setLang] = useState("bg");
  const [category, setCategory] = useState("monasteries");
  const t = CULTURAL_UI[lang];
  const categories = CULTURAL_CATEGORIES[lang];
  const categoryKeys = Object.keys(CULTURAL_CATEGORIES.bg);
  const places = CULTURAL_PLACES.filter((p) => p.category === category);

  return (
    <section style={{ padding: "40px clamp(16px,4vw,48px) 64px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <BackLink onClick={onBack} label={t.back} />
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {["bg", "en"].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                fontSize: 12,
                fontFamily: "var(--mono)",
                padding: "4px 10px",
                borderRadius: 6,
                border: `1px solid ${lang === code ? TOKENS.gold : TOKENS.line}`,
                background: lang === code ? "rgba(214,164,36,0.12)" : "transparent",
                color: lang === code ? TOKENS.gold : TOKENS.inkDim,
                cursor: "pointer",
              }}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 30, margin: "0 0 6px" }}>{t.title}</h1>
      <p style={{ color: TOKENS.inkDim, fontSize: 14.5, margin: "0 0 26px" }}>{t.subtitle}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          gap: 8,
          marginBottom: 28,
        }}
      >
        {categoryKeys.map((key) => {
          const active = key === category;
          return (
            <button
              key={key}
              onClick={() => setCategory(key)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 13,
                textAlign: "center",
                border: `1px solid ${active ? TOKENS.gold : TOKENS.line}`,
                background: active ? "rgba(214,164,36,0.12)" : TOKENS.surface,
                color: active ? TOKENS.gold : TOKENS.ink,
                cursor: "pointer",
              }}
            >
              {categories[key]}
            </button>
          );
        })}
      </div>

      {places.length === 0 ? (
        <p style={{ color: TOKENS.inkDim, fontSize: 14 }}>{t.noResults}</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {places.map((p) => (
            <div
              key={p.name}
              className="bgtogo-card"
              style={{
                background: TOKENS.surface,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {p.imageUrl && (
                <div style={{ height: 150, overflow: "hidden" }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 600, fontSize: 15.5 }}>{p.name}</p>
                <p style={{ margin: 0, color: TOKENS.inkDim, fontSize: 13 }}>{p.description}</p>
                {p.rating && (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5 }}>
                    <Star size={13} color={TOKENS.gold} fill={TOKENS.gold} />
                    {p.rating} {p.reviewCount && <span style={{ color: TOKENS.inkDim }}>({p.reviewCount})</span>}
                  </span>
                )}
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TOKENS.inkDim }}>
                  <MapPin size={12} /> {p.address}
                </span>
                {p.openingHours && (
                  <span style={{ fontSize: 12, color: TOKENS.inkDim }}>
                    {t.openingHours}: {p.openingHours}
                  </span>
                )}
                {p.entryFee && (
                  <span style={{ fontSize: 12, color: TOKENS.inkDim }}>
                    {t.entryFee}: {p.entryFee}
                  </span>
                )}
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: TOKENS.gold, textDecoration: "none", marginTop: 4 }}
                  >
                    <Globe size={13} /> {t.visitWebsite}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function BGtoGo() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0].id);
  const [query, setQuery] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactError, setContactError] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const region = REGIONS.find((r) => r.id === selectedRegion) ?? REGIONS[0];

  const q = query.trim().toLowerCase();
  const filteredPois = region.pois.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
  const filteredStays = region.stays.filter(
    (s) => !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  );

  function goHome() {
    setCurrentPage("home");
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function goToSection(id) {
    setCurrentPage("home");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }

  function submitContact(e) {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      setContactError("Попълни име, имейл и съобщение, преди да изпратиш.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setContactError("Имейлът не изглежда валиден.");
      return;
    }
    setContactError("");
    setContactSent(true);
  }

  return (
    <div
      style={{
        "--mono": "'IBM Plex Mono', ui-monospace, monospace",
        "--display": "'Fraunces', Georgia, serif",
        "--body": "'Inter', system-ui, sans-serif",
        background: TOKENS.bg,
        color: TOKENS.ink,
        fontFamily: "var(--body)",
        minHeight: "100vh",
        lineHeight: 1.5,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        .region-scroll::-webkit-scrollbar { height: 6px; }
        .region-scroll::-webkit-scrollbar-thumb { background: ${TOKENS.line}; border-radius: 3px; }
        .bgtogo-card { transition: border-color 0.15s ease, transform 0.15s ease; }
        .bgtogo-card:hover { border-color: ${TOKENS.goldDim}; transform: translateY(-2px); }
        .bgtogo-input:focus, .bgtogo-textarea:focus { outline: 2px solid ${TOKENS.gold}; outline-offset: 1px; }
        .bgtogo-region-btn:focus-visible { outline: 2px solid ${TOKENS.gold}; outline-offset: 2px; }
      `}</style>

      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px clamp(16px,4vw,48px)",
          borderBottom: `1px solid ${TOKENS.line}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.01em",
            }}
          >
            BG to GO
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: TOKENS.inkDim }}>
            пътеводител
          </span>
        </div>
        <nav style={{ display: "flex", gap: 20, fontSize: 14, color: TOKENS.inkDim }}>
          <button onClick={goHome} style={navBtnStyle}>
            Начало
          </button>
          <button onClick={() => goToSection("regions")} style={navBtnStyle}>
            Региони
          </button>
          <button onClick={() => setCurrentPage("cultural")} style={navBtnStyle}>
            Културен туризъм
          </button>
          <button onClick={() => goToSection("pick")} style={navBtnStyle}>
            Препоръка
          </button>
          <button onClick={() => goToSection("contact")} style={navBtnStyle}>
            Контакт
          </button>
        </nav>
      </header>

      {currentPage === "about" && <AboutPage onBack={goHome} />}
      {currentPage === "terms" && <TermsPage onBack={goHome} />}
      {currentPage === "privacy" && <PrivacyPage onBack={goHome} />}
      {currentPage === "cultural" && <CulturalTourismPage onBack={goHome} />}

      {currentPage === "home" && (
        <>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(48px,9vw,96px) clamp(16px,4vw,48px) 56px" }}>
        <HeroBackdrop />
        <div style={{ position: "relative", maxWidth: 640 }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: TOKENS.gold,
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            Седем региона, една държава
          </p>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 600,
              fontSize: "clamp(34px,6vw,58px)",
              lineHeight: 1.05,
              margin: "0 0 18px",
            }}
          >
            От върха на Мусала<br />до брега на Несебър
          </h1>
          <p style={{ color: TOKENS.inkDim, fontSize: 16, maxWidth: 480, margin: "0 0 28px" }}>
            Планини, манастири, скални градове и морски крайбрежия — избери регион
            и разгледай места и настаняване, събрани на едно място.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: TOKENS.surface,
              border: `1px solid ${TOKENS.line}`,
              borderRadius: 10,
              padding: "10px 14px",
              maxWidth: 420,
            }}
          >
            <Search size={17} color={TOKENS.inkDim} />
            <input
              className="bgtogo-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Търси място или настаняване…"
              style={{
                background: "transparent",
                border: "none",
                color: TOKENS.ink,
                fontSize: 14,
                width: "100%",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Изчисти търсенето"
                style={{ background: "none", border: "none", color: TOKENS.inkDim, cursor: "pointer", padding: 2 }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      <Shevitsa />

      {/* Region rail */}
      <section id="regions" style={{ padding: "36px clamp(16px,4vw,48px) 8px" }}>
        <h2 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 22, margin: "0 0 16px" }}>
          Избери регион
        </h2>
        <div
          className="region-scroll"
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {REGIONS.map((r) => {
            const active = r.id === selectedRegion;
            return (
              <button
                key={r.id}
                className="bgtogo-region-btn"
                onClick={() => setSelectedRegion(r.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexShrink: 0,
                  padding: "10px 16px 10px 10px",
                  borderRadius: 999,
                  border: `1px solid ${active ? TOKENS.gold : TOKENS.line}`,
                  background: active ? "rgba(214,164,36,0.1)" : TOKENS.surface,
                  color: active ? TOKENS.gold : TOKENS.ink,
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "var(--body)",
                  whiteSpace: "nowrap",
                }}
              >
                <RegionIcon Icon={r.icon} />
                {r.name}
              </button>
            );
          })}
        </div>
        <p style={{ color: TOKENS.inkDim, fontSize: 14, marginTop: 12 }}>{region.tagline}</p>
      </section>

      {/* POIs */}
      <section style={{ padding: "28px clamp(16px,4vw,48px) 0" }}>
        <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, margin: "0 0 14px" }}>
          Места, които да видиш
        </h3>
        {filteredPois.length === 0 ? (
          <p style={{ color: TOKENS.inkDim, fontSize: 14 }}>Нищо не съвпада с търсенето в този регион.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 14,
            }}
          >
            {filteredPois.map((p) => (
              <div
                key={p.name + p.address}
                className="bgtogo-card"
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 12,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <MapPin size={15} color={TOKENS.gold} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15 }}>
                      {p.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: TOKENS.teal,
                      border: `1px solid ${TOKENS.teal}`,
                      borderRadius: 4,
                      padding: "1px 6px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {p.type}
                  </span>
                </div>
                <p style={{ color: TOKENS.inkDim, fontSize: 13.5, margin: 0 }}>{p.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: TOKENS.inkDim }}>{p.address}</span>
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12, color: TOKENS.gold, textDecoration: "none", flexShrink: 0 }}
                    >
                      повече ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Stays */}
      <section style={{ padding: "32px clamp(16px,4vw,48px) 0" }}>
        <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, margin: "0 0 14px" }}>
          Къде да отседнеш
        </h3>
        {filteredStays.length === 0 ? (
          <p style={{ color: TOKENS.inkDim, fontSize: 14 }}>Нищо не съвпада с търсенето в този регион.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 14,
            }}
          >
            {filteredStays.map((s) => (
              <div
                key={s.name + s.address}
                className="bgtogo-card"
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 12,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <HomeIcon size={15} color={TOKENS.teal} style={{ marginTop: 2, flexShrink: 0 }} />
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14.5 }}>{s.name}</p>
                  </div>
                  {s.priceRange && <PillPrice price={s.priceRange} />}
                </div>
                <p style={{ margin: 0, color: TOKENS.inkDim, fontSize: 13 }}>{s.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TOKENS.inkDim }}>
                    <MapPin size={12} /> {s.address}
                  </span>
                  {s.website && (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12, color: TOKENS.gold, textDecoration: "none", flexShrink: 0 }}
                    >
                      уебсайт ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div style={{ padding: "40px clamp(16px,4vw,48px) 0" }}>
        <Shevitsa color={TOKENS.goldDim} />
      </div>

      {/* Weekly pick */}
      <section id="pick" style={{ padding: "36px clamp(16px,4vw,48px) 0" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${TOKENS.surface2}, ${TOKENS.surface})`,
            border: `1px solid ${TOKENS.goldDim}`,
            borderRadius: 16,
            padding: "28px clamp(20px,4vw,36px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 460 }}>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: TOKENS.gold,
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              Препоръка на седмицата · {WEEKLY_PICK.region}
            </p>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 24, margin: "0 0 10px" }}>
              {WEEKLY_PICK.name}
            </h3>
            <p style={{ color: TOKENS.inkDim, fontSize: 14.5, margin: 0 }}>{WEEKLY_PICK.blurb}</p>
          </div>
          <Star size={40} color={TOKENS.gold} strokeWidth={1.4} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "56px clamp(16px,4vw,48px) 64px" }}>
        <div style={{ maxWidth: 480 }}>
          <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 22, margin: "0 0 8px" }}>
            Пишете ни
          </h3>
          <p style={{ color: TOKENS.inkDim, fontSize: 14, margin: "0 0 20px" }}>
            Въпрос за маршрут, забелязана грешка или предложение за място — с удоволствие
            ще отговорим.
          </p>
          {contactSent ? (
            <div
              style={{
                border: `1px solid ${TOKENS.teal}`,
                background: "rgba(76,142,134,0.12)",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 14,
              }}
            >
              Съобщението е изпратено. Ще се свържем с теб скоро.
            </div>
          ) : (
            <form onSubmit={submitContact} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                className="bgtogo-input"
                placeholder="Име"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: TOKENS.ink,
                  fontSize: 14,
                }}
              />
              <input
                className="bgtogo-input"
                placeholder="Имейл"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: TOKENS.ink,
                  fontSize: 14,
                }}
              />
              <textarea
                className="bgtogo-textarea"
                placeholder="Съобщение"
                rows={4}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: TOKENS.ink,
                  fontSize: 14,
                  resize: "vertical",
                }}
              />
              {contactError && (
                <p style={{ color: TOKENS.rose, fontSize: 13, margin: 0 }}>{contactError}</p>
              )}
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  background: TOKENS.gold,
                  color: TOKENS.bg,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Изпрати
              </button>
            </form>
          )}
        </div>
      </section>
        </>
      )}

      <footer
        style={{
          borderTop: `1px solid ${TOKENS.line}`,
          padding: "20px clamp(16px,4vw,48px)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontSize: 13,
          color: TOKENS.inkDim,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <button onClick={() => setCurrentPage("about")} style={navBtnStyle}>
            За нас
          </button>
          <button onClick={() => setCurrentPage("terms")} style={navBtnStyle}>
            Условия на ползване
          </button>
          <button onClick={() => setCurrentPage("privacy")} style={navBtnStyle}>
            Политика за поверителност
          </button>
          <button onClick={() => setCurrentPage("cultural")} style={navBtnStyle}>
            Културен туризъм
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <span>BG to GO — независим пътеводител, без връзка с трети платформи.</span>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={14} /> hello@bgtogo.example
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={14} /> +359 00 000 000
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
