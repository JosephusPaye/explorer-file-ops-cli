#!/usr/bin/env node

import path from 'path';
import sade from 'sade';
import color from 'kleur';
import { copy } from '@josephuspaye/explorer-file-ops';

import { getArgs } from './args';

const pkg = require('../package.json');

const prog = sade('ecp [src...] [dest]', true)
  .version(pkg.version)
  .describe("Copy files and folders using File Explorer's GUI")
  .option('-f, --from', 'Specify one or more source paths')
  .option('-t, --to', 'Specify a target directory or one or more target paths')
  .example('C:\\file.zip X:\\file-copied.zip')
  .example('C:\\file.zip C:\\another-file.pdf X:\\destination')
  .example(
    '--from C:\\file.zip C:\\another-file.pdf --to X:\\file-copied.zip X:\\folder\\another-file-copied.pdf'
  )
  .action(async () => {
    let { from, to } = getArgs('ecp');

    const fromPaths = from.map((p) => {
      return path.win32.resolve(
        path.isAbsolute(p) ? p : path.join(process.cwd(), p)
      );
    });

    const toPaths = to.map((p) => {
      return path.win32.resolve(
        path.isAbsolute(p) ? p : path.join(process.cwd(), p)
      );
    });

    try {
      await copy(fromPaths, toPaths);
    } catch (err) {
      console.log(color.red(err.message));
      process.exit(1);
    }
  });

prog.parse(process.argv);
