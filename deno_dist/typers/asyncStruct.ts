import { AsyncStructMaker, AsyncTupleMaker, TypeOf } from "../types/index.ts";

export const asyncStruct: AsyncStructMaker = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    async encode(ctx, data) {
      for (const key in definition) {
        await definition[key].encode(ctx, data[key]);
      }
    },
    async decode(ctx) {
      const data = obj() as TypeOf<typeof this>;
      for (const key in definition) {
        data[key] = await definition[key].decode(ctx);
      }
      return data;
    }
  };
};

export const asyncTuple: AsyncTupleMaker = (...defintion) =>
  asyncStruct(defintion);
