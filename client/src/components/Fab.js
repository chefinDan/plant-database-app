import React, { useState } from 'react';
import { Fab, Grid, makeStyles, Container, AppBar, Tabs, Tab, Box, Typography, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Form from './form';
import SearchInput from './searchInput';

const useStyles = makeStyles(theme =>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5)
    },
    tabBar:{
      backgroundColor: '#fff',
      marginBottom: '1rem'
    }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function FloatingActionButton({onCLick}){
  const classes = useStyles();
  const theme = useTheme();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
     <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        <AddIcon style={{ color: 'white' }} />
      </Fab>    
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <AppBar position='static' className={classes.tabBar}>
          <Tabs
            variant="fullWidth"
            indicatorColor="secondary"
            textColor='secondary'
            value={tab} 
            onChange={handleTabChange}
          >
            <Tab label="Search" />
            <Tab label="New" />
          </Tabs>
        </AppBar>
        <DialogContent>
          <TabPanel value={tab} index={0} dir={theme.direction}>
            <SearchInput handleChange={setQuery}/>
          </TabPanel>
          <TabPanel value={tab} index={1} dir={theme.direction}>
            <Form />
          </TabPanel>  
        </DialogContent>
        <DialogActions>
        <TabPanel value={tab} index={0} dir={theme.direction}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Link to={`/search?q=${query}`}>
            <Button onClick={handleClose} color="primary">
              Search
            </Button>
          </Link>
        </TabPanel>
        </DialogActions>
      </Dialog>
    </div>
  );
}