import {
  createColor,
  createSprite,
  createStyle,
  createUiUnlitMaterial,
} from "../../lib/styledUnit";

export const { StyledSpace, Sprite, Color, Material } = createStyle({
  Sprite: {
    maru: createSprite({
      url: "neosdb:///427a01c03424b86b4b8ffba936e4eb6cbf4be4d6773fa1f45ec004cfb526d016.png",
      rect: [0, 0, 1, 1],
      borders: [0, 0, 0, 0],
      scale: 1,
    }),
    kadomaru: createSprite({
      url: "neosdb:///d8495d0372ef5bb0f9eec8ad864ebf7bf7f699e713176821e6ed0f7826b78091.png",
      rect: [1, 1, 1, 1],
      borders: [0.33333, 0.33333, 0.33333, 0.33333],
      scale: 0.1,
    }),
  },
  Color: {
    background: createColor([0.1, 0.1, 0.1, 1]),
    button: createColor([0.2, 0.2, 0.2, 1]),
    text: createColor([0.9, 0.9, 0.9, 1]),
    blue: createColor([0.4, 0.4, 0.8, 1.0]),
    gray: createColor([0.4, 0.4, 0.4, 1]),
    danger: createColor([0.8, 0.4, 0.4, 1.0]),
    green: createColor([0.2, 0.6, 0.4, 1.0]),
  },
  Material: {
    base: createUiUnlitMaterial({
      alphaClip: true,
      alphaCutoff: 0.5,
      offsetFactor: 10,
      offsetUnits: 500,
    }),
  },
});
