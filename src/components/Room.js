import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar,Tabs,Tab} from "@material-ui/core";

import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import Rooms from "./Rooms"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
    Height:"100vh",
    minHeight: "80vh"
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export default function Room() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Helmet>
        <title> RoomMate For Best Room Rental in India : RoomMate</title>
        <meta name="description" content="An Online Room Rental System will provide the Information
about Rooms/Flats/Houses which is available for Rent" />
    </Helmet>
      <AppBar position="static" color="default" style={{marginBottom: "1.5rem"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Room" icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab label="Hostel" icon={<LocationCityIcon />} {...a11yProps(1)} />
          <Tab label="PG" icon={<AssignmentIndIcon />} {...a11yProps(2)} />
          <Tab label="Patner" icon={<PeopleAltIcon />} {...a11yProps(3)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <Rooms type={"Room"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Rooms type={"Hostel"}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Rooms type={"PG"}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Rooms type={"Partner"}/>
      </TabPanel>

    </div>
  );
}
