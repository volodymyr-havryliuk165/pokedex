import React, { useEffect, useState } from 'react';
import PokeCard from './PokeCard';
import type { ElementType } from './Element';

export type SelectProps = { select: (pokemon?: Pokemon) => void };
export type Pokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: ElementType;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name:
        | 'hp'
        | 'attack'
        | 'defence'
        | 'special-attack'
        | 'special-defense'
        | 'speed';
    };
  }[];
  weight: number;
  moves: {}[];
};
const DEFAULT_OFFSET = 12;

type Props = {
  filter?: ElementType | 'no filter';
} & SelectProps;

const PokeList = ({ select, filter }: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [index, setIndex] = useState({ start: 1, end: DEFAULT_OFFSET });
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    if (loading) return;
    console.log('i try to fetch');
    const fetchedPokemons = [];
    setLoading(true);
    for (let i = index.start; i <= index.end; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemon = (await response.json()) as Pokemon;
      fetchedPokemons.push(pokemon);
    }
    setLoading(false);
    setIndex({ start: index.end + 1, end: index.end + DEFAULT_OFFSET });
    setPokemons([...pokemons, ...fetchedPokemons]);
    select(undefined);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons =
    filter !== undefined && filter !== 'no filter'
      ? pokemons.filter((pokemon) => {
          return pokemon.types.some((t) => t.type.name === filter);
        })
      : pokemons;
  return (
    <div className='pokelist'>
      {filteredPokemons.map((pokemon) => {
        return (
          <PokeCard key={pokemon.name} pokemon={pokemon} select={select} />
        );
      })}
      <button className='pokelist__button' onClick={fetchPokemons}>
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default PokeList;
