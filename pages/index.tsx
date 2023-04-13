import { NextPage } from 'next'
import { MainLayout } from '../components/layouts';
import { GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';
import { Grid } from '@nextui-org/react';

interface Props {
    pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ( { pokemons } ) => {
    return (
        <MainLayout title="Pokemon x">
            <Grid.Container gap={ 2 } justify='flex-start'>
                {
                    pokemons.map ( (pokemon) => (
                        <PokemonCard pokemon = { pokemon } key={ pokemon.id } />
                    ))
                }
            </Grid.Container>
        </MainLayout>
    )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemons: SmallPokemon[] = data.results.map ( (poke, ind) => {
        return {
            name:  poke.name,
            url:   poke.url,
            id:    ind + 1,
            img:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ind + 1}.svg`
        }
    })

    return {
        props: {
            pokemons: pokemons
        }
    }
}

export default Home
