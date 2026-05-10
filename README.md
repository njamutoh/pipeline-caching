# pipeline-caching


# NPM Pipeline Caching Lab

This is a small DevOps lab created to illustrate dependency caching in a CI/CD pipeline using GitHub Actions and npm.

## Purpose of the Lab

The goal of this project is to understand how pipeline caching helps reduce build time by reusing previously downloaded dependencies instead of downloading them from scratch on every pipeline run.

In real CI/CD environments, dependency installation can become slow, especially when applications have many packages. Caching helps make builds faster, more reliable, and more efficient.

## Tech Stack

- Node.js
- npm
- GitHub Actions
- GitHub-hosted Ubuntu runner

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── npm-cache.yml
├── index.js
├── package.json
├── package-lock.json
└── README.md
````

## How the Application Works

The sample Node.js app uses a few npm packages:

* `lodash` for formatting and grouping data
* `dayjs` for date calculations
* `validator` for email validation

The app processes a small list of users, validates their emails, groups them by role, and prints a formatted summary to the terminal.

## GitHub Actions Workflow

The pipeline is defined in:

```text
.github/workflows/npm-cache.yml
```

The workflow runs whenever code is pushed to the `main` branch.

Main pipeline steps:

1. Checkout the source code
2. Set up Node.js
3. Enable npm dependency caching
4. Install dependencies with `npm ci`
5. Run the application with `npm start`

## Pipeline Caching

This workflow uses:

```yaml
cache: npm
```

inside the `actions/setup-node` step.

Example:

```yaml
- name: Setup Node.js with npm cache
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
```

This tells GitHub Actions to cache npm’s package download cache.

## Why `package-lock.json` Matters

The cache is connected to the dependency lock file:

```text
package-lock.json
```

If `package-lock.json` stays the same, GitHub Actions can reuse the existing npm cache.

If `package-lock.json` changes, for example after installing a new dependency, GitHub Actions may create or restore a different cache.

Simple rule:

```text
Same package-lock.json = cache can be reused
Changed package-lock.json = cache key changes
```

## What I Observed

On the first pipeline run, GitHub Actions did not have an existing npm cache, so dependencies were installed normally.

On later runs, the workflow was able to restore the npm cache, reducing the need to download the same packages again.

This demonstrates how caching improves CI/CD efficiency.

## Key DevOps Lesson

Pipeline caching is not about skipping dependency installation completely.

The pipeline still runs:

```bash
npm ci
```

But caching helps npm retrieve dependencies faster because previously downloaded packages are already available in the runner’s cache.

## Interview Summary

In a CI/CD pipeline, I can implement npm dependency caching by using the CI platform’s native cache mechanism. In GitHub Actions, `actions/setup-node` supports npm caching through `cache: npm`. The cache is usually tied to the dependency lock file, such as `package-lock.json`, so the pipeline can reuse cached dependencies when the dependency set has not changed and refresh the cache when it has changed.

```
```
