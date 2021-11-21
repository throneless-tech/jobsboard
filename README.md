# ReproJobsBoard

This repository is a jobs board for ReproJobs using [Hugo](https://gohugo.io/).

# Using

1. [Install Hugo](https://gohugo.io/overview/installing/)
2. Clone this repository
```bash
git clone https://github.com/throneless-tech/jobsboard.git
cd jobsboard
```
3. Run Hugo and select the theme we're using for this site
```bash
hugo server -t hugo-clarity
```
5. Under `/content/` this repository contains the following:
- A section called `/post/` with sample markdown content
- A headless bundle called `homepage` that you may want to use for single page applications. You can find instructions about headless bundles over [here](https://gohugo.io/content-management/page-bundles/#headless-bundle)
- An `about.md` that is intended to provide the `/about/` page for a theme demo
6. If you intend to build a theme that does not fit in the content structure provided in this repository, then you are still more than welcome to submit it for review at the [Hugo Themes](https://github.com/gohugoio/hugoThemes/issues) respository
