import {FC, ReactNode} from 'react'
import Head from 'next/head'
import { NavBar } from '../ui';

interface Props {
    children?: ReactNode
    title?: string
}

const origin = ( typeof window === 'undefined') ? '' : window.location.origin

export const MainLayout: FC<Props> = ( { children, title }) => {
    
    return (
        <>
            <Head>
                <title>{ title || 'Pokemon App NextJs' } </title>
                <meta name="author" content="Javier Armando Vargas Vega" />
                <meta name="description" content="Información sobre el pokemon XYZ" />
                <meta name="keywords" content="pokemons, pokedex, xxxx" />
                <meta property="og:title" content={`Información sobre el Pokemon ${ title }`} />
                <meta property="og:description" content={`Esta es la información sobreel poke ${ title }`} />
                <meta property="og:image" content={`${origin}/images/bannerPokemons.png`} />
            </Head>

            <NavBar />

            <main style={{
                padding: '0 45px'
            }}>
                { children}
            </main>
        </>
    )
}
