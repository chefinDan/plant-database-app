import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles, Typography } from "@material-ui/core";
import Loading from "../components/loading";
import { useRouteMatch } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  inline: {
    display: 'inline',
    fontSize: '0.8rem'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Settings(){
  const classes = useStyles();
  const { user, isLoading } = useAuth0();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    console.log(`url: ${url}, path: ${path}`)
  },[url, path]);

  if(isLoading){
    return (
      <Loading />
      );
  }
  const { email } = user;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant='body2'>
                Log out
              </Typography>
            } 
            secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {email}
              </Typography>}
          />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="List Item" />
        </ListItem>
        <ListItemLink href="#">
          <ListItemText primary="A Link" />
        </ListItemLink>
      </List>
    </div>
  );
}
