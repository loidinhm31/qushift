import { Box, useColorMode } from "@chakra-ui/react";

import { MenuButtonOption, SideMenu } from "@/components/SideMenu";
import { colors } from "@/styles/Theme/colors";

interface SideMenuLayoutProps {
  menuButtonOptions: MenuButtonOption[];
  children: React.ReactNode;
}

export const SideMenuLayout = (props: SideMenuLayoutProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box backgroundColor={colorMode === "light" ? colors.light.bg : colors.dark.bg} className="sm:overflow-hidden">
      <Box display="flex" flexDirection={["column", "row"]} h="full" gap={["0", "0", "0", "6"]} m={5}>
        <Box p={["3", "3", "3", "6"]} pr={["3", "3", "3", "0"]}>
          <SideMenu buttonOptions={props.menuButtonOptions} />
        </Box>
        <Box>{props.children}</Box>
      </Box>
    </Box>
  );
};
