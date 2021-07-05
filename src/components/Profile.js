import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
const useStyles = makeStyles({
    Box: {
        margin: 'auto'
    }

});

const Hello = () => "hello"
export default function Profile() {
    const classes = useStyles();
    const {push} = useHistory();
    React.useEffect(() => {
        fetch('/auth', {
          method: 'GET',
          headers:{
            Accept:"appllication/json",
            "Content-Type":"application/json"
          },credentials:"include"
        }, {})
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          if(!data.id){
            push('/signup')
          }
        })
      },[push])

    return (
        <Box className={classes.Box} maxWidth="xs">
            <Hello/>
        </Box>
    );
}