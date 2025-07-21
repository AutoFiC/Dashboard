import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      component="footer"
      py={2}
      px={3}
    >
      <VuiTypography variant="button" sx={{ fontWeight: 400 }} color="white">
        AutoFiC v1.0.1 | Last Updated: 2025-07-22
      </VuiTypography>

      <VuiBox
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        gap="36px"
        pr={{ xs: 0, lg: "60px" }}
        mt={{ xs: 2, lg: 0 }}
      >
        <VuiTypography
          component="a"
          href="https://github.com/"
          variant="body2"
          color="white"
        >
          GitHub
        </VuiTypography>
        <VuiTypography
          component="a"
          href="https://discord.com/"
          variant="body2"
          color="white"
        >
          Discord
        </VuiTypography>
        <VuiTypography
          component="a"
          href="https://slack.com/"
          variant="body2"
          color="white"
        >
          Slack
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

export default Footer;
