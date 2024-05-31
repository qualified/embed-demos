# Contributing

Contributions are welcome! Please open an issue and/or a pull request.

## Development

Most of the repo consists of static, no-build HTML files. You can use any development server, like `python -m http.server` to host these files locally.

Some demos have builds. View their specific readme files to learn about their specific development workflows.

## Updating Script Tags

When a new version of [`@qualified/embed`](https://www.npmjs.com/package/@qualified/embed) is released, manually bump the package version in the [react](/react) application in this repo, then run `node scripts/update-script-tags` to sync the version across all static HTML files.
