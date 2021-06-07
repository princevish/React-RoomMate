
import { createMuiTheme } from '@material-ui/core/styles';
import {blue,pink} from '@material-ui/core/colors'

const Theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
      },
      typography:{
      fontFamily: ["Open Sans", "sans-serif"].join(','),
      h6:{fontWeight: 700}
    },
  
    overrides:{
      "@global":{
         
      },
      MuiCardHeader:{
        title:{
          fontWeight: 700
        }
      },
     
    }
});

export default Theme;
