/**
 * The only Font Awesome icons the site uses, resolved at build time. They render as inline SVG, so the
 * 1.5 MB webfont kit from the old site is gone.
 */
import {
  faRoadBridge,
  faBuilding,
  faWater,
  faHouse,
  faBullseye,
  faEye,
  faArrowsToDot,
  faCertificate,
  faShieldHalved,
  faLightbulb,
  faArrowsRotate,
  faLeaf,
  faPhone,
  faEnvelope,
  faLocationDot,
  faMapLocationDot,
  faPlus,
  faChevronRight,
  faXmark,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export const ICONS = {
  road: faRoadBridge,
  building: faBuilding,
  dam: faWater,
  home: faHouse,
  mission: faBullseye,
  vision: faEye,
  goals: faArrowsToDot,
  certificate: faCertificate,
  shield: faShieldHalved,
  lightbulb: faLightbulb,
  sync: faArrowsRotate,
  leaf: faLeaf,
  phone: faPhone,
  email: faEnvelope,
  location: faLocationDot,
  map: faMapLocationDot,
  clock: faClock,
  plus: faPlus,
  chevron: faChevronRight,
  close: faXmark,
  down: faArrowDown,
  prev: faArrowLeft,
  next: faArrowRight,
} as const

export type IconName = keyof typeof ICONS
