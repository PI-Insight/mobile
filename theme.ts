import { extendTheme } from "native-base";
import chroma from "chroma-js";

interface IShades {
  [key: string | number]: string;
}
function createShades(middleColor: string) {
  const middle = chroma(middleColor);
  const shadeStorage: IShades = {};

  for (let i = 50; i <= 900; i += i === 50 ? 50 : 100) {
    shadeStorage[i] = middle.darken((i - 500) / 200).hex();
  }

  return shadeStorage;
}

const theme = extendTheme({
  colors: {
    primary: createShades("#DF2266"),
  },
  components: {
    // Button: {
    //   baseStyle: {
    //     h: '48px',
    //     rounded: 24,
    //     w: '100%',
    //     bg: 'primary.500'
    //   }
    // }
  },
});

export default theme;
