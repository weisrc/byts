import { uint16, uint32, uint8 } from "../index.ts";
import { Context, Serdes } from "../types/index.ts";

export function packSize(
  ctx: Context,
  size: number,
  a: number,
  b: number
) {
  if (size < 16) {
    uint8.ser(ctx, a + size);
  } else if (size < 65536) {
    uint8.ser(ctx, b);
    uint16.ser(ctx, size);
  } else {
    uint8.ser(ctx, b + 1);
    uint32.ser(ctx, size);
  }
}

export const strSize: Serdes<number> = {
  ser(ctx, size) {
    if (size < 32) {
      uint8.ser(ctx, 0xa0 + size);
    } else if (size < 256) {
      uint8.ser(ctx, 0xd9);
      uint8.ser(ctx, size);
    } else if (size < 65536) {
      uint8.ser(ctx, 0xda);
      uint16.ser(ctx, size);
    } else {
      uint8.ser(ctx, 0xdb);
      uint32.ser(ctx, size);
    }
  }
} as Serdes<number>;
