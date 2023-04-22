# CommitAssist

[![NPM](https://img.shields.io/npm/v/commit-assist.svg)](https://www.npmjs.com/package/commit-assist)

Auto generate commit messages using ChatGPT

![Preview](https://raw.githubusercontent.com/dejorrit/commit-assist/main/preview.gif)

## Installation

To install CommitAssist, simply run the following command:

```bash
yarn global add commit-assist
```

## Usage

To generate commit messages using CommitAssist, follow these simple steps:

Stage the files you want to commit. Then run:

```bash
git-ca
```

The first time you run the tool, it will prompt you for your OpenAI API key. If you don't have one, you can get yours by visiting the [OpenAI API Keys](https://platform.openai.com/account/api-keys) page.

### Resetting your API Key

If you need to reset your API Key for any reason, simply run the following command:

```bash
git-ca reset
```

## Important Information

Please note that using the OpenAI API is not free. However, OpenAI offers each new user $18 worth of credit to get started.
