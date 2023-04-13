import { Grid, Card } from "@nextui-org/react"
import { Router, useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ( { pokemonId }) => {

    const router = useRouter()

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${pokemonId}`);
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1}>
            <Card isHoverable css={{padding: 8}}>
                <Card.Image 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    alt={`${pokemonId}`}
                    width={'100%'}
                    height={140}
                    onClick={onFavoriteClicked}
                />
            </Card>
        </Grid>
    )
}
