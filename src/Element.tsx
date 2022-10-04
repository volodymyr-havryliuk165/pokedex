import React from 'react';

const colorMap = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  unknown: '#68A090',
  shadow: '#724880',
} as const;
export type ElementType = keyof typeof colorMap;

const Element = ({ name }: { name: ElementType }) => {
  return (
    <div
      className='pokemon__element'
      style={{ '--element-color': colorMap[name] }}
    >
      {name}
    </div>
  );
};

export default Element;
