import { Spacer, Text, useTheme, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from 'next/link';


export const NavBar = () => {
    const { theme } = useTheme()
    return (
        <div style = {{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0 20px',
            color: 'black',
            backgroundColor: theme?.colors.gray900.value
        }}>
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="Iono de un Pokemon "
                width={70}
                height={70}
            />
            <NextLink href='/' passHref >
                <div style={{ display:'flex', alignItems:'center' }}>
                    <Text color='red' h2>P</Text>
                    <Text color='blue' h3>okemon</Text>
                </div>
            </NextLink>
            
            <Spacer css={{flex: 1}}/>
            <NextLink href='/favorites' passHref>
                <Text color='blue'>Favoritos</Text>
            </NextLink>

        </div>
    )
}
