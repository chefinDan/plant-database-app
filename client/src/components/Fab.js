import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Fab, 
  makeStyles, 
  useTheme, 
  AppBar, 
  Tabs, 
  Tab, 
  Box, 
  TextField 
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useFileUpload from '../hooks/useFileUpload';
import SearchInput from './searchInput';
import useFetch from '../hooks/useFetch';

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

export default function FloatingActionButton(){
  const classes = useStyles();
  const theme = useTheme();
  const {
    files,
    uploaded,
    status,
    onSubmit,
    onChange: fileInputChange,
  } = useFileUpload();
  const { getAccessTokenSilently } = useAuth0();
  const {protectedFetch, response, error} = useFetch();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    category: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    //TODO: validate and sanitize input
    console.log(`Submitting: `, formState);
    protectedFetch('/plants', {
      method: 'POST',
      body: JSON.stringify(formState)
    });
    handleClose();
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleUploadSuccess = (files) => {
    console.log(files);
  }

  const handleFormChange = (key) => ({target:{value}}) => {
    setFormState(state => ({
      ...formState,
      [key]: value
    }));
  }

  useEffect(() => {
    if(error){
      console.log(`Error from form post: `, error);
    }
    else{
      console.log(`Response from form post: `, response);
    }
  },[response, error]);

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
            <form>
              <TextField
                fullWidth 
                label="Name" 
                value={formState.name}
                onChange={handleFormChange('name')}
              />
              <br />
              <TextField
                fullWidth  
                label="Description"
                value={formState.description} 
                onChange={handleFormChange('description')}
              />
              <br />
              <TextField 
                fullWidth
                label="Category" 
                value={formState.category}
                onChange={handleFormChange('category')}
              />
            </form>
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
          <TabPanel value={tab} index={1} dir={theme.direction}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
          </TabPanel>
        </DialogActions>
      </Dialog>
    </div>
  );
}