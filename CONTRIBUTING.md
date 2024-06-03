# Contributing

Contributions are welcome! Please open an issue and/or a pull request.

## Development

Most of the repo consists of static, no-build HTML files. You can use any development server, like `python -m http.server` to host these files locally.

Some demos ([React](react) and [server validation](server-validation)) have builds. View their specific readme files to learn about their specific development workflows.

## Tests

We have Playwright tests that run in CI and spot-check each demo and ensure all versions are the same.

## Bumping the `@qualified-embed` Version

When a new version of [`@qualified/embed`](https://www.npmjs.com/package/@qualified/embed) is released, manually bump the package version in the [React](react) demo in this repo and rebuild the React dist files.

Once React works, run `npm run update-script-tags` to sync the `@qualified/embed` version from React's [package.json](react/package.json) across all static HTML files.

Make sure to test all demos before committing. Some package bumps involve breaking changes.

The [server validation](server-validation) app will also need manual bumping and testing.

Also make sure to update any readmes or descriptions that point to docs or mention parts of the API to align with the current version.
