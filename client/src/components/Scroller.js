import React, { useState, useEffect } from 'react';
import { 
    Container, 
    GridList, 
    GridListTile, 
    GridListTileBar, 
    IconButton,
    Button 
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

const testUrl = 'https://jsonplaceholder.typicode.com/photos';

const useStyles = makeStyles({
    container: {},
    loading: {
        height: "100px",
        margin: "30px"
    },
    loadingText: {
        display: props => props.loading ? "block" : "none"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
});

const Scroller = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    
    useEffect(() => {
        getPhotos(page);
    },[page]);

    const classes = useStyles({loading: loading});

    const getPhotos = (page) => {
        setLoading(true);

        fetch(testUrl + `?_page=${page}&_limit=12`)
            .then(async res => {
                const data = await res.json();
                console.log(data);
                setPhotos(state => {
                    return [...state, ...data];
                });
                setLoading(false);
            });
    }

    return(
        <Container>
            <GridList cellHeight={180} cols={3}>
                {photos.map((photo, idx) => (
                    <GridListTile key={idx}>
                        <img src={photo.url} alt={photo.title}/>
                        <GridListTileBar
                            title={photo.title}
                            actionIcon={
                                <IconButton aria-label={`info about ${photo.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
            <Container 
                className={classes.loading}
            >
                <span className={classes.loadingText}>Loading...</span>
                <Button onClick={e => setPage(state => state+1)}>Load More</Button>
            </Container>
        </Container>
    );
}

export default Scroller;