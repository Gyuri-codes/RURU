import { ChapterData } from '../types';

export const CHAPTERS: ChapterData[] = [
  {
    id: 'approach',
    number: '01',
    kanjiNumber: '零一',
    title: 'THE APPROACH',
    kanjiTitle: '参道',
    subtitle: 'SHADOWS ALONG CEDAR RIDGES',
    quote: 'Where the mountain keeps its secrets.',
    lore: 'A dark mountain pathway carved through weeping hinoki cypress. Rainwater gathers in shallow stone ruts, reflecting cold starlight between ancient roots.',
    timeCode: '21:14 JST',
    elevation: '480M MSL',
    soundNote: 'Distant mountain wind, falling raindrops on wet needles',
    scrollPosition: 0.05,
    frame: {
      frameNumber: 'FRAME 01',
      title: 'MOSSY COBBLESTEPS',
      time: '21:14',
      category: 'NIGHT TRAIL',
      description: 'Hand-chiseled granite steps slick with nocturnal dew and damp pine needles.',
      palette: ['#0b0e14', '#1f2d3a', '#c84b31', '#d8d4c7'],
      specs: '35mm / f1.4 / 1/15s / ISO 3200'
    }
  },
  {
    id: 'gate',
    number: '02',
    kanjiNumber: '零二',
    title: 'THE GATE',
    kanjiTitle: '大鳥居',
    subtitle: 'THRESHOLD OF VERMILION AND MIST',
    quote: 'Passing beneath sacred wood where silence begins.',
    lore: 'A grand vermilion torii looms out of the drifting cloud layer. Paper shide amulets twist gently in the nocturnal thermal currents, marking the boundary of human affairs.',
    timeCode: '22:05 JST',
    elevation: '520M MSL',
    soundNote: 'Hollow resonance of a distant bronze bell, temple wind',
    scrollPosition: 0.28,
    frame: {
      frameNumber: 'FRAME 02',
      title: 'TORII UNDER MIST',
      time: '22:05',
      category: 'BOUNDARY SACRED',
      description: 'Weathered vermilion lacquer peeling on the southern pillar amidst drifting vapor.',
      palette: ['#0d1117', '#c84b31', '#e89f41', '#b5baa9'],
      specs: '50mm / f1.8 / 1/8s / ISO 1600'
    }
  },
  {
    id: 'garden',
    number: '03',
    kanjiNumber: '零三',
    title: 'THE GARDEN',
    kanjiTitle: '枯山水',
    subtitle: 'STILL WATER AND RAKED GRAVEL',
    quote: 'Moonlight tracing waves upon motionless stone.',
    lore: 'Raked white gravel mimics ripples across an unseen cosmic sea. A tranquil water basin catches the orange reflection of the distant vermilion moon.',
    timeCode: '22:52 JST',
    elevation: '560M MSL',
    soundNote: 'Water droplet dripping into stone tsukubai basin',
    scrollPosition: 0.52,
    frame: {
      frameNumber: 'FRAME 03',
      title: 'GRAVEL WAVES & MOON',
      time: '22:52',
      category: 'KARESANSUI',
      description: 'Concentric rings raked into crushed granite beneath weeping maple branches.',
      palette: ['#090d14', '#2d3748', '#8fa3b0', '#f4efe2'],
      specs: '28mm / f2.0 / 1/4s / ISO 800'
    }
  },
  {
    id: 'sanctuary',
    number: '04',
    kanjiNumber: '零四',
    title: 'THE SANCTUARY',
    kanjiTitle: '奥之院',
    subtitle: 'AMBER GLOW OF THOUSAND-YEAR CEDAR',
    quote: 'The deepest chamber where ancient prayers linger in smoke.',
    lore: 'Massive unpainted cedar pillars hold up sweeping eaves. Paper shoji lanterns cast warm amber pools on polished dark floorboards, scenting the damp night with cypress oil and incense.',
    timeCode: '23:41 JST',
    elevation: '595M MSL',
    soundNote: 'Low resonant woodblock tap, gentle crackle of lantern wick',
    scrollPosition: 0.75,
    frame: {
      frameNumber: 'FRAME 04',
      title: 'INNER SHOJI & LANTERN',
      time: '23:41',
      category: 'INNER SANCTUARY',
      description: 'Handmade washi paper glowing from the heart of a cast-bronze hanging lantern.',
      palette: ['#0a0807', '#3d2518', '#e89f41', '#ffde9c'],
      specs: '40mm / f1.2 / 1/25s / ISO 1250'
    }
  },
  {
    id: 'afterlight',
    number: '05',
    kanjiNumber: '零五',
    title: 'AFTERLIGHT',
    kanjiTitle: '残照',
    subtitle: 'MOUNTAIN OVERLOOK AT MIDNIGHT',
    quote: 'Some places disappear when you leave them. Others follow you home.',
    lore: 'Stepping onto the open wooden engawa terrace overlooking the mist-filled Kyoto basin. The vermilion moon hangs low across rolling blue ridges as the temple recedes into silence.',
    timeCode: '00:30 JST',
    elevation: '620M MSL',
    soundNote: 'Wide nocturnal mountain air, distant cricket song',
    scrollPosition: 0.95,
    frame: {
      frameNumber: 'FRAME 05',
      title: 'MIST RIDGE HORIZON',
      time: '00:30',
      category: 'NIGHT PANORAMA',
      description: 'Endless blue charcoal ridges dissolving into the soft glow of the night sky.',
      palette: ['#06080e', '#1a2332', '#c84b31', '#dbe4ee'],
      specs: '85mm / f2.8 / 1/2s / ISO 640'
    }
  }
];
