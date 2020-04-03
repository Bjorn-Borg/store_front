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
  phrase: string;
}

export const BottomNav: FunctionComponent<TypedProps> = props => {
  const { value, handleChange, classes, phrase } = props;
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      phrase={phrase}
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
