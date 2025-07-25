import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";
import SidenavRoot from "examples/Sidenav/SidenavRoot";

import { useVisionUIController, setMiniSidenav, setTransparentSidenav } from "context";
import logoImage from "assets/images/AutoFiC-logo.png";

function Sidenav({ color, brandName, routes, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const { pathname } = useLocation();
  const collapseName = pathname.split("/")[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    const handleResize = () => setMiniSidenav(dispatch, window.innerWidth < 1200);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, false);
    }
  }, [dispatch]);

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    if (type === "collapse") {
      const CollapseComponent = (
        <SidenavCollapse
          color={color}
          name={name}
          icon={icon}
          active={key === collapseName}
          noCollapse={noCollapse}
        />
      );

      return href ? (
        <Link href={href} key={key} target="_blank" rel="noreferrer" sx={{ textDecoration: "none" }}>
          {CollapseComponent}
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          {CollapseComponent}
        </NavLink>
      );
    }

    if (type === "title") {
      return (
        <VuiTypography
          key={key}
          color="white"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </VuiTypography>
      );
    }

    if (type === "divider") return <Divider light key={key} />;
    return null;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <VuiBox pt={3.5} pb={0.5} px={4} textAlign="center" sx={{ overflow: "unset !important" }}>
        <VuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <VuiTypography variant="h6" color="text">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </VuiTypography>
        </VuiBox>

        <VuiBox component={NavLink} to="/" display="flex" alignItems="center">
          <VuiBox
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <VuiBox
              display="flex"
              sx={{
                mr: miniSidenav && transparentSidenav ? 0 : 1,
              }}
            >
              <img src={logoImage} alt="AutoFiC Logo" style={{ width: "60px", height: "60px" }} />
            </VuiBox>
            <VuiTypography
              variant="h4"
              textGradient
              color="logo"
              fontSize={26}
              letterSpacing={0.5}
              sx={{
                opacity: miniSidenav && transparentSidenav ? 0 : 1,
                maxWidth: miniSidenav && transparentSidenav ? 0 : "100%",
                margin: "0 auto",
              }}
            >
              {brandName}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>

      <Divider light />
      <List>{renderRoutes}</List>

      <VuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: { pt: 2 },
          [breakpoints.only("xl")]: { pt: 1 },
          [breakpoints.down("xl")]: { pt: 2 },
        })}
      >
        <SidenavCard color={color} />
        <VuiBox mt={2}>
          <VuiButton
            component="a"
            href="https://AutoFiC.github.io/"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
            sx={{
              background: "linear-gradient(90deg, #5f4dee, #7f59e0, #996cfb) !important",
              color: "#fff !important",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "12px",
              textTransform: "none",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, rgb(87, 68, 236), rgb(108, 70, 206), #996cfb)",
              },
            }}
          >
            Learn More About AutoFiC
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "info",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
