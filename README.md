# Readme Activity Feed
 
[![npm](https://img.shields.io/npm/v/readme-activity-feed)](https://www.npmjs.com/package/readme-activity-feed) [![build status](https://img.shields.io/github/workflow/status/MrBartusek/ReadmeActivityFeed/build)](https://github.com/MrBartusek/TechnologyShields/actions)

Simple NPM package for generating list of recent Github activity of a user to put in your profile `README.md`.
This works similarly to [github-activity-readme](https://github.com/jamesgeorge007/github-activity-readme) or
[activity-box](https://github.com/JasonEtco/activity-box) but it's a actually library rather than an action.

## Installation

```bash
npm install readme-activity-feed
```

## Usage

This library exports `generate` function with alias `Generate`. It takes 3 arguments:

| Parameter  | Type                   | Optional | Default                             | Description |
| ---------- | ---------------------- | :------: | ----------------------------------- | ----------- |
| username   | `string`               |          |                                     | Github username of a user. |
| maxEvents  | `number`               | ✓        | 8                                   | The maximum number of lines generated. |
| token      | `str`                  | ✓        | `GITHUB_TOKEN` environment variable | The [PAT](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) used for authentication to the Github API. This don't need to be provided but then, you can hit the ratelimit. |

### Usage

```js
const readmeActivityFeed = require("readme-activity-feed")

console.log(readmeActivityFeed.generate("MrBartusek"))
```

Example Output:

💪 Opened PR [#8](https://github.com/MrBartusek/ReadmeActivityFeed/pull/19370) in [MrBartusek/ReadmeActivityFeed](https://github.com/MrBartusek/ReadmeActivityFeed)<br>
🏷️ Published [v1.0.0](https://github.com/MrBartusek/ReadmeActivityFeed/releases/tag/v1.0.0) of [ReadmeActivityFeed](https://github.com/ReadmeActivityFeed)<br>
❗️ Closed [#42](https://github.com/MrBartusek/ReadmeActivityFeed/issues/42) in [MrBartusek/ReadmeActivityFeed](https://github.com/MrBartusek/ReadmeActivityFeed)<br>
🗣 Commented on [#42](https://github.com/MrBartusek/ReadmeActivityFeed/issues/42) in [MrBartusek/ReadmeActivityFeed](https://github.com/MrBartusek/ReadmeActivityFeed)<br>
🔀 Forked [MrBartusek/ReadmeActivityFeed](https://github.com/MrBartusek/ReadmeActivityFeed)<br>
🎉 Published [MrBartusek/ReadmeActivityFeed](https://github.com/MrBartusek/ReadmeActivityFeed)<br>
