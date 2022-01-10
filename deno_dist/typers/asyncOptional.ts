import { AsyncOptionalMaker } from "../types/index.ts";

export const asyncOptional: AsyncOptionalMaker = (typer) => ({
  async encode(ctx, data) {
    if (data == undefined) {
      ctx.view.setUint8(ctx.i++, 0);
    } else {
      ctx.view.setUint8(ctx.i++, 1);
      await typer.encode(ctx, data);
    }
  },
  async decode(ctx) {
    if (ctx.view.getUint8(ctx.i++)) {
      return await typer.decode(ctx);
    }
  }
});
