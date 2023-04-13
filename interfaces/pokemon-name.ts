// Interfaces que devuelve los pokemons name

export interface PokemonName {
    count:    number;
    next:     string;
    previous: null;
    results:  ResultName[];
}

export interface ResultName {
    name: string;
    url:  string;
}
