# Development Process

## Intro

This document is to outline the general development process for this project. The goals section of the [Read Me](../README.md) does go into it a bit in the road map, but isn't really the section to go into the actual development process.

## Goals

My goal for this project was to develop something that required some complex JavaScript and testing, the latter of which I've never handled. In addition, I wanted to use this project to practice using Git, npm, and Webpack since these technologies were fairly predominant in web development nowadays.

**Note:** A lot of the text is taken straight from the Read Me.

## Setup and Tooling

There's also a fair amount of tooling used in the project. The other goal for the project, as mentioned above, was to get comfortable using and configuring tooling that's currently predominant in web development. With that in mind, I wanted, at minimum, to include the following below in some form:
  - A file bundler/ task runner
    - these two are technically different things
  - A testing framework
  - A version control system
  - A package manager

I ended up selecting the below:
  - Git for version control
  - NPM for package management
    - the other option is Yarn, but I haven't looked at it yet
  - Jasmine as the testing framework
    - Jasmine has been around for a while and has everything bundled in so I chose it for the documentation/ ease of use
  - Karma for the test runner
    - Karma accompanies Jasmine as a test runner for spawning a web server and then running every test on whichever browsers are specified in the config.
    - Karma also integrates with Webpack with the inclusion of some middleware to let Karma communicate with Webpack
  - Webpack as the file bundler/ task runner
    - Webpack is a very powerful, modular file bundler that can also act as a task runner
    - Webpack and Karma require configuration in order for them to work though and isn't nearly as user-friendly to do though
  - Babel for transpiling code for older browsers
  - ESLint for code style