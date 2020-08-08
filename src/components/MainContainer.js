import React , {useState , useEffect} from 'react'
import classes from './main.module.css'
import { Container , Row , Col ,ListGroup } from 'react-bootstrap';
import ListCard from './ListCard'
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

function MainContainer() {
    const [apiData , setApiData] = useState([]);
    const [searchData , setSearchData] = useState([]);
    const [searchInputValue , setSearchInputValue] = useState('');
    
    let numberofpages = 0;         
    let items = [];

    const getData = async (page = 1) => {
       try {
            let URI = `https://rickandmortyapi.com/api/episode/?page=${page}`
            const res = await axios.get(URI);
            numberofpages = res.data.info.pages
            console.log(numberofpages);
            setApiData([...apiData , res.data.results])
       } catch (error) {
           return window.alert('Not found')
       }
    }

    const getDataByQuery = async () => {
       try {
            let URI = `https://rickandmortyapi.com/api/episode/?name=${searchInputValue}`
            const res = await axios.get(URI);  
            setSearchData([...searchData , res.data.results])
       } catch (error) {
            return window.alert('Not found')
       }
    }

    const change = e => setSearchInputValue(e.target.value)
   
    
    useEffect(() => {
        getData();
    }, []);

    var htmlvalue = '';
    apiData.map(element => {
        htmlvalue = element.map(value => {
            return <ListCard key={value.id} name={value.name} date={value.air_date} episode={value.episode}/>
        });
        return 0;
    });

    var searchValue = '';  
    searchData.map(element => {
        searchValue = element.map(value => {
            return <ListCard key={value.id} name={value.name} date={value.air_date} episode={value.episode}/>
        });
    });


    for (let i = 1; i <= 2; i++) {
        items.push(
        <Pagination.Item key={i} onClick={()=> getData(i)}>
            {i}
        </Pagination.Item>,
        );
    }

    const pagination = (
    <div>
        <Pagination size="sm">{items}</Pagination>
    </div>
    );


    const clearState = () => {
        setSearchInputValue('');
        setSearchData([]);
    }

    return (
        <React.Fragment>
                  <header className={classes.header}>
                    <div className={classes.logo}>
                    <div onClick={()=> clearState()} className={classes.logoName}>R{'&'}M Episodes</div>
                    </div>
                    <div className={classes.searchBar}>
                        <input onChange={e => change(e)} className={classes.logoInput} placeholder="Search Episode"></input>
                        <button onClick={() => getDataByQuery()} className={classes.inputBtn}><img src="https://img.icons8.com/pastel-glyph/2x/search.png" alt=""/></button>
                    </div>
                    <div>
                        <p className="somerandomcss"></p>
                    </div>
                </header>

            <Container fluid className={classes.marginTop , classes.background}>
                <ListGroup>
                    <Row>
                        {(searchData.length === 0) ? htmlvalue : searchValue}
                    </Row>
                </ListGroup>
                <hr/>
                <Row>
                    <Col md={5}></Col>
                    <Col md={4}>
                        <Pagination>
                            {(searchData.length === 0) ? pagination : null}
                        </Pagination>
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default MainContainer;
