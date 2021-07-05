/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
export type HualiIcon = string | JSX.Element;
export type MenuItemRoute = {
  pathname: string;
  displayName: string;
  header: JSX.Element;
  content?: JSX.Element;
  icon: HualiIcon;
};

export type SubMenuRoute = {
  pathname: string;
  displayName: string;
  content?: () => JSX.Element|JSX.Element;
  header?: () => JSX.Element|JSX.Element;
  subMenu?: SubMenuRoute[];
  icon: HualiIcon;
};

export type MenuItemRouteUnion = MenuItemRoute | SubMenuRoute;

export function isSubMenuRoute(
  menuRoute: MenuItemRouteUnion
): menuRoute is SubMenuRoute {
  return (menuRoute as SubMenuRoute).subMenu !== undefined;
}

export type MenuRoute = MenuItemRouteUnion[];
