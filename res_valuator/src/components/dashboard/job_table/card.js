import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './card.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobDescriptionCard({details, j_id}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width:"auto"}}>
      <CardHeader
        title={details?.job_title}
        subheader="July, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {details?.jd}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon /> 
          <p onClick={() =>  { navigator.clipboard.writeText(`http://localhost:3000/job/${j_id}`);  alert("Link Copied ")}} style={{marginLeft:'10px', fontSize:'15px'}}>http://localhost:3000/job/{j_id}</p>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {details?.weights ? (
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Weights:</Typography>
          <Typography >
          Education: {details?.weights[0]}
          </Typography>
          <Typography>
          Experience:{details?.weights[1]}
          </Typography>
          <Typography >
          Skills:{details?.weights[2]}
          </Typography>
          <Typography >
          Projects:{details?.weights[3]}
          </Typography>
          <Typography >
          Achievements:{details?.weights[4]}
          </Typography>
          <Typography >
          Coding Profile(s):{details?.weights[5]}
          </Typography>
          <Typography >
          Test Score:{details?.weights[6]}
          </Typography>
        </CardContent>
      </Collapse>):<></>}
    </Card>
  );
}
