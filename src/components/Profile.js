import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    Box: {
        margin: 'auto'
    }

});

const Hello = () => "hello"
export default function Profile() {
    const classes = useStyles();


    return (
        <Box className={classes.Box} maxWidth="xs">
            <Hello/>
        </Box>
    );
}