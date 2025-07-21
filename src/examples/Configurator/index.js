/*!
=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Vision UI components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";

// Custom styles and context
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import {
  useVisionUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";

function Configurator() {
  const [controller, dispatch] = useVisionUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);

  const sidenavColors = ["primary", "info", "success", "warning", "error"];

  useEffect(() => {
    const handleDisabled = () => {
      setDisabled(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleDisabled);
    handleDisabled();
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  const sidenavTypeButtonsStyles = ({ functions: { pxToRem }, boxShadows: { buttonBoxShadow } }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,
    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <VuiBox
        backgroundColor="black"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <VuiBox>
          <VuiTypography color="white" variant="h5" fontWeight="bold">
            UI Customization Panel
          </VuiTypography>
          <VuiTypography variant="body2" color="white" fontWeight="bold">
            Adjust your preferences
          </VuiTypography>
        </VuiBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: `${white.main} !important`,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </VuiBox>

      <Divider light />

      <VuiBox pt={1.25} pb={3} px={3}>
        <VuiBox>
          <VuiTypography variant="h6" color="white">
            Sidenav Colors
          </VuiTypography>
          <VuiBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color ? dark.main : white.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),
                  "&:not(:last-child)": { mr: 1 },
                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </VuiBox>
        </VuiBox>

        {window.innerWidth >= 1440 && (
          <VuiBox mt={3} lineHeight={1}>
            <VuiTypography variant="h6" color="white">
              Sidenav Type
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Choose between 2 different sidenav types.
            </VuiTypography>

            <VuiBox sx={{ display: "flex", mt: 2 }}>
              <VuiButton
                color="info"
                variant={transparentSidenav ? "contained" : "outlined"}
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={{ mr: 1, ...sidenavTypeButtonsStyles }}
              >
                Transparent
              </VuiButton>
              <VuiButton
                color="info"
                variant={transparentSidenav ? "outlined" : "contained"}
                onClick={handleWhiteSidenav}
                disabled={disabled}
                fullWidth
                sx={sidenavTypeButtonsStyles}
              >
                Opaque
              </VuiButton>
            </VuiBox>
          </VuiBox>
        )}

        <VuiBox mt={3} mb={2} lineHeight={1}>
          <VuiTypography variant="h6" color="white">
            Navbar Fixed
          </VuiTypography>
          <VuiSwitch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" />
        </VuiBox>

        <Divider light />

        <VuiBox mt={3} mb={4}>
          <VuiButton
            component={Link}
            href="https://pypi.org/project/AutoFiC-core/"
            target="_blank"
            rel="noreferrer"
            color="info"
            variant="outlined"
            fullWidth
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#ffffff",
              borderColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#1A73E8",
                borderColor: "#ffffff",
              },
            }}
          >
            Install via PyPI
          </VuiButton>

          <VuiBox
            mt={3}
            px={2}
            py={2}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <VuiTypography
              variant="body1"
              sx={{
                color: "#ffffff",
                fontWeight: "medium",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Questions or Feedback?
            </VuiTypography>
            <VuiTypography
              variant="body2"
              sx={{
                color: "#cccccc",
                fontSize: "0.9rem",
              }}
            >
              Contact us at<br />
              <Link
                href="mailto:AutoFiC.whs@gmail.com"
                style={{ color: "#82b1ff", fontWeight: "bold" }}
              >
                AutoFiC.whs@gmail.com
              </Link>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
