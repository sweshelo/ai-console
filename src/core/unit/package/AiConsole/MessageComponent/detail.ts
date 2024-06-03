import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/mirage-x/unit/common";

const detail = {
  code: "AiConsole/MessageComponent",
  propsConfig: {
    name: UnitProp.String("Empty"),
    content: UnitProp.String(""),
    backgroundColor: UnitProp.Color([0.4, 0.4, 0.4, 1.0]),
    fontColor: UnitProp.Color([1.0, 1.0, 1.0, 1.0]),
  },
  children: "multi" as const,
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
