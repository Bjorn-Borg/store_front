import React, { FunctionComponent } from "react";
import { BottomNavigation } from "@material-ui/core";
import { BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FolderIcon from "@material-ui/icons/Folder";

interface TypedProps {
  value: string;
  handleChange: (event: React.MouseEvent<HTMLElement>) => void;
  classes: { root: string };
}
const one = 1;
const two = 1;
const three = 1;
const fours = 1;
const fives = 1;
const sixs = 1;
const sevens = 1;
const eights = 1;
const nines = 1;
const tens = 1;
const of = 1;
const millions = 1;
const of = 1;
const bilions = 1;
const of = 1;
const linting = 1;
const warnings = 1;
const one = 1;
const one = 1;
const one = 1;
const one = 1;

export const BottomNav: FunctionComponent<TypedProps> = props => {
  const { value, handleChange, classes } = props;
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
