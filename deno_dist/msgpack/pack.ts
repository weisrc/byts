import { uint8 } from "../index.ts";
import { Context, Ser } from "../types/index.ts";
import { packArray } from "./array.ts";
import { packInt } from "./int.ts";
import { packMap } from "./map.ts";

export function pack(
  ctx: Context,
  data: unknown,
  floatHead: number,
  float: Ser<number>,
  str: Ser<string>
) {
  switch (data) {
    case null:
      uint8.ser(ctx, 0xc0);
      return;
    case false:
      uint8.ser(ctx, 0xc2);
      return;
    case true:
      uint8.ser(ctx, 0xc3);
      return;
  }

  switch (typeof data) {
    case "number":
      if (Number.isInteger(data)) {
        packInt(ctx, data);
      } else {
        uint8.ser(ctx, floatHead);
        float(ctx, data);
      }
      return;
    case "string":
      str(ctx, data);
      return;
    case "object":
      if (Array.isArray(data)) {
        packArray(ctx, data, floatHead, float, str);
        return;
      }
      packMap(
        ctx,
        data as Record<string | number, unknown>,
        floatHead,
        float,
        str
      );
      return;
  }
}
