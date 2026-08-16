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
} from "lucide-react";

const STAYS_PAGE_SIZE = 12;

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

const REGIONS = [
  {
    id: "sofia",
    name: "Околностите на София",
    tagline: "Планина на прага на столицата",
    icon: Mountain,
    pois: [
      {
        name: "Природен парк Витоша",
        blurb:
          "Билкови пътеки и скални венци, до които се стига с трамвай от центъра на София.",
      },
      {
        name: "Боянска църква",
        blurb:
          "Средновековни стенописи от XIII век, включени в списъка на ЮНЕСКО.",
      },
      {
        name: "Драгалевски манастир",
        blurb: "Тих двор в полите на планината, любимо място за неделна разходка.",
      },
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
],
  },
  {
    id: "rila-pirin",
    name: "Рила и Пирин",
    tagline: "Най-високите върхове на Балканите",
    icon: TreePine,
    pois: [
      {
        name: "Рилски манастир",
        blurb: "Най-големият манастир в страната, забележителност от значението на ЮНЕСКО.",
      },
      {
        name: "Седемте рилски езера",
        blurb: "Верига ледникови езера, свързани с еднодневен преход от хижа Рилски езера.",
      },
      {
        name: "Връх Вихрен",
        blurb: "Вторият по височина връх в България, изходна точка от Бъндеришка хижа.",
      },
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
],
  },
  {
    id: "rhodopes",
    name: "Родопите",
    tagline: "Тайнствени пещери и запазен фолклор",
    icon: Landmark,
    pois: [
      {
        name: "Дяволското гърло",
        blurb: "Пещера с подземен водопад, една от най-посещаваните в Родопите.",
      },
      {
        name: "Перперикон",
        blurb: "Скално светилище с история, простираща се хиляди години назад.",
      },
      {
        name: "Широка лъка",
        blurb: "Архитектурен резерват, известен с автентичните родопски къщи.",
      },
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
],
  },
  {
    id: "blacksea",
    name: "Черноморие",
    tagline: "Стари градове край брега",
    icon: Waves,
    pois: [
      {
        name: "Старият град на Несебър",
        blurb: "Полуостровен град с антични и средновековни църкви, обект на ЮНЕСКО.",
      },
      {
        name: "Созопол",
        blurb: "Рибарско градче с дървени къщи и тесни калдъръмени улици.",
      },
      {
        name: "Нос Калиакра",
        blurb: "Скалист нос над морето с крепостни останки и легенди.",
      },
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
],
  },
  {
    id: "north",
    name: "Северна България",
    tagline: "Крепости над меандрите на Янтра",
    icon: Landmark,
    pois: [
      {
        name: "Царевец",
        blurb: "Средновековна крепост над Велико Търново, вечерно светлинно шоу.",
      },
      {
        name: "Арбанаси",
        blurb: "Село с укрепени възрожденски къщи и стенописни църкви.",
      },
      {
        name: "Русенски Лом",
        blurb: "Природен парк със скални манастири, издълбани във варовика.",
      },
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
],
  },
  {
    id: "south",
    name: "Южна България",
    tagline: "Най-старият непрекъснато населен град в Европа",
    icon: Compass,
    pois: [
      {
        name: "Старият град на Пловдив",
        blurb: "Възрожденски къщи и античен театър, все още в active употреба.",
      },
      {
        name: "Бачковски манастир",
        blurb: "Втори по значение манастир в страната, основан през XI век.",
      },
      {
        name: "Асенова крепост",
        blurb: "Крепост над Асеновград с църква на скален ръб.",
      },
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
],
  },
  {
    id: "northwest",
    name: "Северозападна България",
    tagline: "Скални феномени и тиха провинция",
    icon: Mountain,
    pois: [
      {
        name: "Белоградчишки скали",
        blurb: "Червени пясъчникови формации с крепост от римско време.",
      },
      {
        name: "Пещера Магура",
        blurb: "Праисторически рисунки, направени с прилепен гуано преди хиляди години.",
      },
      {
        name: "Крепостта Баба Вида",
        blurb: "Единствената напълно запазена средновековна крепост в България, край Дунав.",
      },
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
],
  },
];

const WEEKLY_PICK = {
  region: "Родопите",
  name: "Шиpoка лъка през есента",
  blurb:
    "Дървените къщи и звукът на Родопската държавна консерватория, вплетен в мъглата на долината — есента е тихият сезон, в който селото се вижда най-добре.",
};

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

export default function BGtoGo() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0].id);
  const [showAllStays, setShowAllStays] = useState(false);
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
      p.blurb.toLowerCase().includes(q)
  );
  const filteredStays = region.stays.filter(
    (s) => !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  );

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
          <a href="#regions" style={{ color: "inherit", textDecoration: "none" }}>
            Региони
          </a>
          <a href="#pick" style={{ color: "inherit", textDecoration: "none" }}>
            Препоръка
          </a>
          <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>
            Контакт
          </a>
        </nav>
      </header>

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
                onClick={() => {
                  setSelectedRegion(r.id);
                  setShowAllStays(false);
                }}
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
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 14,
            }}
          >
            {filteredPois.map((p) => (
              <div
                key={p.name}
                className="bgtogo-card"
                style={{
                  background: TOKENS.surface,
                  border: `1px solid ${TOKENS.line}`,
                  borderRadius: 12,
                  padding: "16px 16px 18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <MapPin size={15} color={TOKENS.gold} />
                  <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15 }}>
                    {p.name}
                  </span>
                </div>
                <p style={{ color: TOKENS.inkDim, fontSize: 13.5, margin: 0 }}>
                  {p.blurb}
                </p>
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
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 14,
              }}
            >
              {(showAllStays ? filteredStays : filteredStays.slice(0, STAYS_PAGE_SIZE)).map((s) => (
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
                    <PillPrice price={s.priceRange} />
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
            {!showAllStays && filteredStays.length > STAYS_PAGE_SIZE && (
              <button
                onClick={() => setShowAllStays(true)}
                style={{
                  marginTop: 16,
                  background: "transparent",
                  border: `1px solid ${TOKENS.goldDim}`,
                  color: TOKENS.gold,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Покажи всички {filteredStays.length} места
              </button>
            )}
          </>
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

      <footer
        style={{
          borderTop: `1px solid ${TOKENS.line}`,
          padding: "20px clamp(16px,4vw,48px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 13,
          color: TOKENS.inkDim,
        }}
      >
        <span>BG to GO — независим пътеводител, без връзка с трети платформи.</span>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mail size={14} /> hello@bgtogo.example
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Phone size={14} /> +359 00 000 000
          </span>
        </div>
      </footer>
    </div>
  );
}
