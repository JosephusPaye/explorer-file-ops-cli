# explorer-file-ops-cli

> Copy, move, and delete files and folders using the File Explorer GUI from the command line

This project is part of [#CreateWeekly](https://twitter.com/JosephusPaye/status/1214853295023411200), my attempt to create something new publicly every week in 2020.

## Why

It's easy to copy, move, and delete files and folders using the default `cp`, `mv` and `rm` commands. But this module has a number of advantages over it:

- Shows progress in the familiar File Explorer progress interface
- You can pause and cancel the operation
- You can undo and redo the operation
- You will be prompted to authenticate or elevate to admin if access to the source or destination paths is restricted
- Items you delete go to the Recycle Bin by default

## Installation

```bash
npm install -g @josephuspaye/explorer-file-ops-cli
```

## Usage

### Copy files and folders (`ecp`)

```
  Description
    Copy files and folders using File Explorer's GUI

  Usage
    $ ecp [src...] [dest] [options]

  Options
    -f, --from       Specify one or more source paths
    -t, --to         Specify a target directory or one or more target paths
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ ecp C:\file.zip X:\file-new.zip
    $ ecp C:\file.zip C:\another-file.pdf X:\destination
    $ ecp --from C:\file.zip C:\another-file.pdf --to X:\file-new.zip X:\folder\another-file-new.pdf
```

### Move files and folders (`emv`)

```
  Description
    Move files and folders using File Explorer's GUI

  Usage
    $ emv [src...] [dest] [options]

  Options
    -f, --from       Specify one or more source paths
    -t, --to         Specify a target directory or one or more target paths
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ emv C:\file.zip X:\file-moved.zip
    $ emv C:\file.zip C:\another-file.pdf X:\destination
    $ emv --from C:\file.zip C:\another-file.pdf --to X:\file-moved.zip X:\folder\another-file-moved.pdf
```

### Delete files and folders (`erm`)

```
  Description
    Delete files and folders using File Explorer's GUI

  Usage
    $ erm [src...] [dest] [options]

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ erm C:\file.zip
    $ erm C:\file.zip X:\directory \\MediaShare\Processed
```

## Related

- [@josephuspaye/explorer-file-ops](https://github.com/JosephusPaye/explorer-file-ops) a version of this module for programmatic use

## Licence

[MIT](LICENCE)
