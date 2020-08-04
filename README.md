# About this repo
This is an interview test from Dius. there is no real use case for this code but all technical discussions and challenges are welcome :blush:

# Question
https://github.com/DiUS/coding-tests/blob/master/dius_tennis.md

# Dependencies
* NodeJS 12 (nvm is preferred, .nvmrc exists)
* Yarn 1.22 or above
* Typescript 3.9.7
* Jest
* Es-Lint with typescript support

# Setup local :computer:
## Clone repo
```bash
git clone https://github.com/mahmood-sajjadi/dius_tennis.git
cd dius_tennis
```

## Install dependencies
npm is not allowed. please use yarn and gain benefit of having exact same dependecy versions with the help of yarn.lock
`yarn install`

## Run it :running:
This code dosent have any UI or CLI, it is creating a library. to use it, another project required. but always you are welcome to run test.
`yarn run test`

## Linting
As it is an small project not too many custom rules added, but default rules can be executed as follow
`yarn run lint`

## Building the project :fire:
jusr run following command and find the build result in folder named dist
`yarn run build`

## Debugging code and test cases :bug:
there are two ways to do that. by help of VSCode or any other IDE
### VSCode
there is folder in this project with the name of `.vscode`. this folder include the required configuration for you IDE.
Just open debug tab and run `Jest All`

### Other IDEs
run following command
`yarn run test:debug`
follow the command line messages by oppening chrome and attaching the debugger.

# Contributing
The original purpose of this repository is to pass the answer of this coding challenge back to Dius.
But I want to us this opportunity to ask all of you to review and suggest better way(perfomance and quality) to implement this logic.
I tried to implement everything in less than 2 hours(in cluding besic setup of repo, no boilerplate used) so there are many ways to improve this code, you are welcome to help me on this :wink:
to do that please
* create an issue in github in this repo https://github.com/mahmood-sajjadi/dius_tennis/issues
* or fork this project and do the changes.