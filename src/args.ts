import color from 'kleur';

export function getArgs(command: 'ecp' | 'emv' | 'erm') {
  try {
    const args = process.argv.slice(2);
    return command === 'erm' ? parseDeleteArgs(args) : parseArgs(args);
  } catch (err) {
    console.log(color.red('error: ' + err.message));
    console.log(`\nRun \`$ ${command} --help\` for more info.`);
    process.exit(1);
  }
}

function parseArgs(args: string[]) {
  const from: string[] = [];
  const to: string[] = [];

  let state = 'getting-from';
  let hasFromFlag = false;
  let hasToFlag = false;

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const argLower = arg.toLowerCase();

      if (argLower == '--from') {
        state = 'getting-from';
        hasFromFlag = true;
        continue;
      } else if (argLower == '--to') {
        state = 'getting-to';
        hasToFlag = true;
        continue;
      } else {
        throw new Error(`unknown argument: ${arg}`);
      }
    }

    if (state === 'getting-from') {
      from.push(arg);
    } else if (state === 'getting-to') {
      to.push(arg);
    }
  }

  if (hasFromFlag && !hasToFlag) {
    throw new Error('--to is required when using --from');
  } else if (hasToFlag && !hasFromFlag) {
    throw new Error('--from is required when using --to');
  }

  if (to.length > 1 && from.length !== to.length) {
    throw new Error(
      'number of source paths does not match number of destination paths'
    );
  }

  if (to.length === 0 && from.length < 2) {
    throw new Error(
      'at least one source path and one destination path is required'
    );
  }

  if (to.length === 0) {
    return { from: from.slice(0, -1), to: from.slice(-1) };
  }

  return { from, to };
}

function parseDeleteArgs(args: string[]) {
  const from: string[] = [];

  for (const arg of args) {
    if (arg.startsWith('--')) {
      throw new Error(`unknown argument: ${arg}`);
    }

    from.push(arg);
  }

  if (from.length === 0) {
    throw new Error('at least one path is required');
  }

  return { from, to: [] };
}
