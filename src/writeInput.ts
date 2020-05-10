import { Input } from "../types/entities";
import { promisify } from "util";
import { writeFile } from "fs";
import { join } from "path";
import { parseInput } from "../parsers/ts";

export default async (input: Input) => {
  await promisify(writeFile)(
    join('packages/types', `${ input.name }.ts`),
    parseInput(input)
  )
}
