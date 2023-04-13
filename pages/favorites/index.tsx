import { MainLayout } from '@/components/layouts'
import { FavoritePokemons } from '@/components/pokemon'
import { NoFavorites } from '@/components/ui'
import { localFavorites } from '@/utils'
import { useEffect, useState } from 'react'

const FavoritesPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

    // Cargamos los pokes que esán en localStorgae 
    useEffect(() => {
       setFavoritePokemons ( localFavorites.pokemons())
    }, [])
    

    return (
        <MainLayout title='Pokemons Favoritos'>
            {
                favoritePokemons.length === 0 
                ? (<NoFavorites />)
                : (<FavoritePokemons pokemons = { favoritePokemons }/>)
            }
            
        </MainLayout>
    )
}

export default FavoritesPage