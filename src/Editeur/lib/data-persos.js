import { CONTAINER_ESO } from './constantes';

const STRAP = 'strap';
const PAUSE = 'pause';
export const TC = 'telco';

export const root = {
  id: CONTAINER_ESO,
  nature: 'layer',
  initial: {
    className: 'container',
    content: [
      {
        id: 's01',
        statStyle: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'grid',
          gridColumn: 1,
          gridRow: 1,
        },
      },
    ],
  },
  listen: [{ event: 'leave-root', action: 'leave' }],
  actions: [{ name: 'leave', leave: true }],
};

export const textSample = {
  id: 'text-sample',
  nature: 'bloc',
  initial: {
    dimensions: { width: 421, height: 214 },
    className: 'toto',
    statStyle: {
      color: 'darkblue',
      fontWeight: 'bold',
      fontSize: '2rem',
      fontFamily: 'Antonio, Arial',
      padding: '8px',
      backgroundColor: 'palevioletred',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    attr: {
      'data-letter': 'alphabet',
    },
    content: 'dimanche',
  },
  emit: {
    mousedown: {
      event: { ns: STRAP, name: 'move' },
      data: { id: 'text-sample', event: 'move' },
    },
    click: {
      event: { ns: TC, name: PAUSE },
    },
  },

  listen: [
    { event: 'ev011', action: 'enter' },
    { event: 'ev012', action: 'step01' },
    { event: 'ev014', action: 'step02' },
    { event: 'move', action: 'move' },
  ],
  actions: [
    {
      name: 'move',
    },
    {
      name: 'enter',
      move: { layer: 'grid-01', slot: 'grid-01_s01' },
      statStyle: {
        fontSize: '12px',
        backgroundColor: '#ffff00',
        position: 'absolute',
      },
    },
    {
      name: 'step01',
      content: 'lundi',
      move: { layer: 'grid-01', slot: 'grid-01_s02' },
      transition: {
        to: {
          x: 100,
          y: 100,
          rotate: 200,
          scale: 0.4,
          fontSize: '48px',
          backgroundColor: 'green',
          color: '#0033FF',
        },
        duration: 2000, // race condition ?
      },
    },
    {
      name: 'step02',
      move: { layer: 'grid-01', slot: 'grid-01_s03' },
      transition: {
        to: {
          // x: 0,
          // y: 0,
          scale: 1.5,
          rotate: 40,
          // rotate: 360 * 4 + 45
          fontSize: '32px',
          backgroundColor: '#00ff00',
          color: '#3300FF',
        },
        duration: 1000,
      },
      content: 'arrivé',
    },
  ],
};

export const spriteSample = {
  id: 'sprite',
  nature: 'sprite',
  initial: {
    content: 'Mystery-80.png',
    dimensions: { height: 300 },
    // statStyle: { opacity: 0 },
    statStyle: { position: 'absolute' },
  },
  listen: [
    { event: 'ev011', action: 'enter' },
    { event: 'ev013', action: 'step01' },
    { event: 'ev015', action: 'exit' },
    { event: 'move-sprite', action: 'idle' },
    { event: 'leave-sprite', action: 'leave' },
  ],
  actions: [
    {
      name: 'enter',
      move: { layer: 'grid-01', slot: 'grid-01_s03' },
      transition: { to: { opacity: 1, x: -100, y: 10 } },
    },
    {
      name: 'step01',
      move: { layer: 'grid-01', slot: 'grid-01_s01' },
      transition: { to: { x: 100, y: 50, rotate: 15 } },
    },
    {
      name: 'exit',
      exit: true,
      transition: { to: 'fadeOut' },
    },
    {
      name: 'idle',
    },
    {
      name: 'leave',
      leave: true,
    },
  ],
  emit: {
    mousedown: {
      event: { ns: STRAP, name: 'move' },
      data: { id: 'sprite', event: 'move-sprite' },
    },
  },
};
