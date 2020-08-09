import React from 'react';
import { Grid, Typography, Link as MuiLink, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles({
  footer:{
    paddingTop: '100px',
  },
  reactTag:{
    fontSize:'0.7em',
  }
});

const StyledH6 = styled(Typography)`
  &.MuiTypography-h6 {
    color: grey;
    font-size: 1rem
  }
  &.MuiTypography-h6:hover{
    color: black;
    font-weight: 500;
  }
`;

const Footer = ({email, linkedin, github, resume}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  return(        
    <Grid 
      container 
      className={classes.footer}
      spacing={3}
      wrap={smScreen ? 'nowrap' : 'wrap'}
    >
      <Grid item container wrap='wrap' justify='flex-start'>
        <MuiLink href={`mailto:${email}`} target='_blank' rel="noopener noreferrer" underline='none'>
          <StyledH6 variant='h6'>
            {email}
          </StyledH6>
        </MuiLink>            
      </Grid>
      
      <Grid item container spacing={mdScreen ? 8 : 2} justify={smScreen ? 'flex-end' : 'flex-start'}>
        <Grid item>        
          <MuiLink href={linkedin} target='_blank' rel="noopener noreferrer" underline='none'>
            <StyledH6 variant='h6'>
              linkedIn
            </StyledH6>
          </MuiLink>
        </Grid>
        <Grid item>
          <MuiLink href={github} target='_blank' rel="noopener noreferrer" underline='none'>
            <StyledH6 variant='h6'>
              Github
            </StyledH6>
          </MuiLink>
        </Grid>
        <Grid item>
          <MuiLink href={resume} target='_blank' rel="noopener noreferrer" underline='none'>
            <StyledH6 variant='h6'>
              Resume
            </StyledH6>
          </MuiLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;