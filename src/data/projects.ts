export interface Project {
  id: string
  title: string
  /** Shorter title for cards. */
  shortTitle: string
  type: string
  summary: string
  status: string
  location: string
  /** First photo is the cover; the rest open in the lightbox. */
  photos: string[]
}

const COMPLETED = 'Successfully completed'

export const PROJECTS: Project[] = [
  {
    id: 'finna-anuba-dam',
    title: 'Finna Anuba Dam Project',
    shortTitle: 'Finna Anuba Dam & Appurtenant Structure',
    type: 'Zoned Earth Dam',
    summary:
      'The Finna Anuba Dam Project has been successfully completed, marking a significant milestone in the development of the West Hararge Zone, Oromia, Ethiopia. This project involved constructing a zoned earth dam and its related appurtenant structures.',
    status: COMPLETED,
    location: 'West Hararge Zone, Oromia, Ethiopia',
    photos: ['finna-dam-3.webp', 'finna-dam-1.webp', 'finna-dam-2.webp', 'finna-dam-4.webp'],
  },
  {
    id: 'adama-road-lot-1',
    title: 'Adama City Asphalt Road Project Lot-1',
    shortTitle: 'Adama City Asphalt Road Project Lot-1',
    type: 'Hot Mix Asphalt Concrete Road (AC)',
    summary:
      'The Adama City Asphalt Road Project Lot-1 is now complete, contributing to the improvement of road infrastructure in Adama City, Ethiopia. The construction utilized Hot Mix Asphalt Concrete Road (AC) technology, ensuring durable and reliable roads.',
    status: COMPLETED,
    location: 'Adama City, Ethiopia',
    photos: ['adama-road-4.webp', 'adama-road-1.webp', 'adama-road-2.webp'],
  },
  {
    id: 'sululta-administration-office',
    title: 'Sululta Town Administration Office Building (G+4)',
    shortTitle: 'Sululta Town Administration Office Building (G+4)',
    type: 'Building and Compound Work',
    summary:
      'The Sululta Town Administration Office Building (G+4) project has achieved successful completion, providing a new administrative hub for Sululta Town, Ethiopia. The construction involved both building and compound work, creating a functional and aesthetically pleasing office space.',
    status: COMPLETED,
    location: 'Sululta Town, Ethiopia',
    photos: ['sululta-office-3.webp', 'sululta-office-1.webp', 'sululta-office-2.webp'],
  },
  {
    id: 'adama-road',
    title: 'Adama Asphalt Road Project',
    shortTitle: 'Adama Asphalt Road Project',
    type: 'Hot Mix Asphalt Concrete Road (AC)',
    summary:
      'The Adama Asphalt Road Project is successfully completed, contributing to the enhancement of road infrastructure in Adama City, Ethiopia. This project involved the construction of Hot Mix Asphalt Concrete Road (AC), ensuring a smooth and durable road surface.',
    status: COMPLETED,
    location: 'Adama City, Ethiopia',
    photos: ['adama-road-3.webp', 'adama-road-4.webp'],
  },
  {
    id: 'addis-riverside',
    title: 'Pavement Work in Addis Ababa River Side Green Development Project Phase II (Central Square Section)',
    shortTitle: 'Pavement Work AA River Side Green Development Phase II',
    type: 'Hot Mix Asphalt Concrete Road (AC)',
    summary:
      'The Pavement Work in Addis Ababa River Side Green Development Project Phase II (Central Square Section) is now complete, enhancing the beauty and accessibility of Addis Ababa, Ethiopia. The project involved constructing Hot Mix Asphalt Concrete Road (AC), providing a durable and visually appealing pavement.',
    status: COMPLETED,
    location: 'Addis Ababa, Ethiopia',
    photos: ['addis-riverside-3.webp', 'addis-riverside-1.webp', 'addis-riverside-2.webp'],
  },
  {
    id: 'ifa-boru-school',
    title: 'Ifa Boru Telecho Secondary School',
    shortTitle: 'Ifa Boru Telecho Secondary School',
    type: 'Building and Compound Work',
    summary:
      'The Ifa Boru Telecho Secondary School project has successfully concluded, creating a favorable learning environment in Welmera Wereda, Oromia, Ethiopia. The construction included both building and compound work, ensuring a well-equipped and functional secondary school facility.',
    status: COMPLETED,
    location: 'Welmera Wereda, Oromia, Ethiopia',
    photos: ['ifa-boru-school-2.webp', 'ifa-boru-school-1.webp', 'ifa-boru-school-3.webp'],
  },
]
