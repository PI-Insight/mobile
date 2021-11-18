import { Box, SimpleGrid, useTheme } from "native-base";
import React from "react";

export default function ColorPalete({ colorName }: { colorName: string }) {
  const { colors } = useTheme();
  return (
    <SimpleGrid columns={5}>
      {Object.keys(colors[colorName]).map((colorKey) => {
        console.log(colorKey);
        return <Box p={5} bg={`${colorName}.${colorKey}`} />;
      })}
    </SimpleGrid>
  );
}
