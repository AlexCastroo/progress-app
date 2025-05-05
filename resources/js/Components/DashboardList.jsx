import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';


export default function DashboardList({ project }) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  console.log("Project => ", project);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
    <ListItemButton onClick={() => axios.get(route('project.list'))} >
        <ListItemIcon>
          <WebAssetRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Mis proyectos"/>
      </ListItemButton>
      <ListItemButton onClick={() => Inertia.visit(route('project.show', project.id)) }>
        <ListItemIcon>
          <DashboardRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={project.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => Inertia.visit(route('project.tasks', project.id)) }>
            <ListItemIcon>
              <TableChartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Tareas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => Inertia.visit(route('project.stats', project.id)) }>
            <ListItemIcon>
              <BarChartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Estadisticas" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => Inertia.visit(route('project.goals', project.id)) }>
            <ListItemIcon>
              <MilitaryTechRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logros" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
