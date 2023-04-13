import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { MainLayout } from '../../components/layouts/MainLayout';
import confetti from 'canvas-confetti';
import { pokeApi } from '@/api';
import { Pokemon, PokemonName as PokemonByNamePage } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '@/utils';
import { useState } from 'react';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage:NextPage<Props> = ( { pokemon }) => {

    const [isInFavorites, setisInFavorites] = useState( localFavorites.existPokemonInFavorites ( pokemon.id))

    const onToogleFavorite = () => {
        localFavorites.toggleFavorite (pokemon.id);
        setisInFavorites (!isInFavorites)

        if ( !isInFavorites ) {
            confetti ( {
                zIndex: 999,
                particleCount: 350,
                spread: 180,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            })
        }
    }

    return (
        <MainLayout
            title = { pokemon.name }
        >
            <Grid.Container gap={1.5}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={ { padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src= { pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt= { pokemon.name}
                                width="100%"
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs = {12} sm={8}>
                    <Card>
                        <Card.Header css = { { display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'> { pokemon.name} </Text>
                            <Button
                                color='gradient'
                                ghost={ !isInFavorites } 
                                onPress={onToogleFavorite}
                            >
                                { isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}> Sprites:</Text>
                            <Container display='flex' direction='row' gap={0}>
                                <Image 
                                    src = { pokemon.sprites.front_default }
                                    alt = { pokemon.name }
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src = { pokemon.sprites.back_default }
                                    alt = { pokemon.name }
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src = { pokemon.sprites.front_shiny }
                                    alt = { pokemon.name }
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src = { pokemon.sprites.back_shiny }
                                    alt = { pokemon.name }
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonByNamePage>(`/pokemon?limit=151`);
    const pokemonsNames = data.results.map(  (value, index) => `${ value.name }`)
    return {
        paths: pokemonsNames.map ( name => ({
            params: { name }
        })),
        fallback: "blocking"
        // fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string};
    const pokemon = await getPokemonInfo(name)

    if ( !pokemon ) {
        return {
            redirect: {
                destination: '/' ,
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400,
    }
}

export default PokemonByNamePage