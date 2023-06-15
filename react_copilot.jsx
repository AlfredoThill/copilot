function getPokemonList() {
	return new Promise((resolve, reject) => {
  	fetch('https://pokeapi.co/api/v2/pokemon?limit=100').then(resp => resp.json().then(data => resolve(data)))
  });
}
  
function getPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(resp => resp.json().then(data => resolve(data)));
  })
}

class Hello extends React.Component {
    render() {
      return (<div>Hello {this.props.name}</div>);
    }
}

// refactor Hello class component to a functional component
const Hello = (props) => {
    return (<div>Hello {props.name}</div>);
}

// render a list of pokemons base on getPokemonList() as a functional component. The list should display up to 5 entries, add a pagination button to navitage between each set of 5 entries.
const PokemonList = () => {
    const [pokemonList, setPokemonList] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(5);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        getPokemonList().then(data => {
            setPokemonList(data.results);
            setTotal(data.count);
        });
    }, []);

    const handlePagination = (type) => {
        if (type === 'prev') {
            setOffset(offset - limit);
        } else {
            setOffset(offset + limit);
        }
    }

    return (
        <div>
            <ul>
                {pokemonList.slice(offset, offset + limit).map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={() => handlePagination('prev')} disabled={offset === 0}>Prev</button>
                <button onClick={() => handlePagination('next')} disabled={offset + limit >= total}>Next</button>
            </div>
        </div>
    );
}

// write jest unit test for PokemonList
describe('PokemonList', () => {
    it('should render PokemonList', () => {
        const wrapper = shallow(<PokemonList />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render PokemonList with 5 items', () => {
        const wrapper = shallow(<PokemonList />);
        expect(wrapper.find('li').length).toEqual(5);
    });
    
    it('should go to the next page', () => {
        const wrapper = shallow(<PokemonList />);
        wrapper.find('button').at(1).simulate('click');
        expect(wrapper.find('li').length).toEqual(5);
    })
})