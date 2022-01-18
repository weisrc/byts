import { define } from "../define.ts";
import { StringFactory } from "../types/index.ts";

export const string: StringFactory = (encoding, headSd) =>
  define(
    (ctx, data) => {
      const head = ctx.i;
      headSd.ser(ctx, 0);
      const begin = ctx.i;
      encoding.encode(ctx, data);
      const end = ctx.i;
      const size = end - begin;
      ctx.i = head;
      headSd.ser(ctx, size);
      ctx.i = end;
    },
    (ctx) => encoding.decode(ctx, headSd.des(ctx))
  );
