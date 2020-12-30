#!/usr/bin/env node

import path from 'path';
import sade from 'sade';
import color from 'kleur';
import { del } from '@josephuspaye/explorer-file-ops';

import { getArgs } from './args';

const pkg = require('../package.json');

const prog = sade('erm [path...]', true)
  .version(pkg.version)
  .describe("Delete files and folders using File Explorer's GUI")
  .example('C:\\file.zip')
  .example('C:\\file.zip X:\\directory \\\\MediaShare\\Processed')
  .action(async () => {
    let { from } = getArgs('erm');

    const fromPaths = from.map((p) => {
      return path.win32.resolve(
        path.isAbsolute(p) ? p : path.join(process.cwd(), p)
      );
    });

    try {
      await del(fromPaths);
    } catch (err) {
      console.log(color.red(err.message));
      process.exit(1);
    }
  });

prog.parse(process.argv);
