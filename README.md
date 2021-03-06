This is the repository for Björn Borg's headless solution project. Follow this README for setting it up and scripts information.

## Available scripts

```
npm run dev
npm run performance
npm run dev:test
npm run lint
npm run e2e
```

## Requirements:

To run this project you will need:

- npm
- docker engine

## Version control

This project is version controled in github and should follow the standard master > development > branching pattern. New updates to the project should go through pull requests, and every commit should be test covered, comply with linter, should not break any tests, and should comply with the performance threshold.

## Quality Assurance

#### Commit treadmill:

On every commit the following scripts are run:

1.  The linter:

```
npm run lint
```

It will check for typos, code syntax warnings and actual errors. It will stop the commit with code 1 in two scenarios:

- There are errors
- There are more than 10 warnings

2. The jest test suites:

```
npm run test:pc
```

It will run all the suites that are related to the staged files for that commit and expect those files to have a minimum coverage. It will exit the commit with code 1 in two scenarios:

- Any of the tests don't pass
- The [coverage threshold](#jest-coverage) is not met

3. The lighthouse tests:

```
npm run performance
```

It will run the lighthouse test suite in quiet and headless mode and save the scores of that commit in the LighthouseReports.csv file. It will exit the commit with code 1 in two scenarios:

- The lighthouse fails to run, which means the project is not compiling
- One of the [lighthouse scores threshold](#performance-treshold) was not met

4. The e2e tests:

```
npm run e2e
```

It will run the cypress test suite in a separated container. The video of the tests run and the screenshot with errors will be stored in e2e/cypress/videos and e2e/cypress/screenshots, and the results of the run will be displayed in the console. It will exit the commit with code 1 in one scenario:

- Any of the tests don't pass

This treadmill enforces TDD and is higly recommended to be followed to maintain a bug free application. To activate this treadmill follow the Git Hooks section on how to activate the [git-hooks](#git-hooks).

#### <a name="git-hooks"></a> Git hooks

After cloning the repository run the following commands to make the git hooks executable:

- Change the path for the git hooks to the folder .githooks (this allows sharing the hooks):

```
git config core.hooksPath .githooks
```

- Make the hook executable:

```
chmod +x .githooks/*
```

This should be ran for any new hook, by everyone using it.

- In case you are to create a new hook follow this example executing all commands from root:

1. Create a new file inside .githooks/ in root with the name of the hook. You can use the following cli command substituting pre-push for the name of the hook you want to create:

```
touch .githooks/pre-push
```

2. Make the new hook file executable by running the following command:

```
chmod +x .githooks/*
```

3. Add content to your new hook file. Samples can be found inside .git/hooks and .githooks.

## Design pattern

The project leverages the nextJS routing and uses pages structure to organize each view.
The project is TDD. Every new feature needs unit, integration and e2e tests before merging to development.

### UI library

The project is addapted to use Mateial UI and should also be able to use AMP's UI components.

## Next steps on setup

- Set the first test suites in Cypress.
- Finish the pre-commit and pre-merge treadmills.
- Set up environments

### .env

The analytics script requires the environment variable GA_TRACKING_ID, the should hold the google analytics ID.

## TDD

To run unit and integration tests with jest in watch mode run the following script:

```
npm run dev:test
```

#### ESlint

The linter is set to run on every commit but I would also suggest running it more frequently to avoid ammounting lint fixes to the point of commit. To run the linter run the following script (with docker running):

```
npm run lint
```

#### <a name="jest-coverage"></a> Test coverage

The jest testing coverage right now is set to

- 80% functions
- 80% branches
- 80% lines
- -10 statements

If this threshold is not met the test suite will fail and the commit will be aborted.
If it is needed to change this threshold these values can be found in coverageThreshold in jest.config.js.
The coverageThreshold is set globaly, but can also be set to specific directories or files if needed.
For more config options check [jest docks](https://jestjs.io/docs/en/configuration#coveragethreshold-object)

#### <a name="performance-treshold"></a> Performance monitoring flow

The performance script is set to run on every commit. The hook will run google lighthouse and save the test results in a json file and an html file that can be opened in the browser. The files are saved localy in LighthouseOutput.
The resulting scores for the test are assessed and if any of the scores don't achieve the minimum standard it will break the commit. If the scores meet the requirements, they are saved in the LighthouseReports.csv in the root, and should be saved in the repo. Along with the scores the script will save the date and commit id so that performance changes can be tracked down in the commit tree.

- One thing to watch for
  How the csv file is going to behave during merges is still unkown, therefore, merges should be dealt with using caution. It is best to manually merge the file in the first attempts and then write a script for it later if it is needed.

- The current score tresholds are set to:

  - performance: 0.7 (70)
  - accessibility: 0.8 (80)
  - bestPractices: 0.8 (80)
  - seo: 0.8 (80)
  - pwa: 0

    _Should these minimum scores change for this project, they should be changed in reportReader.js inside the constant scoreThreshold. These scores should only change in accordance with the needs of the project._

## Getting Started

### Docker Container

This project runs in a docker container. There is a [<i>Dockerfile</i>](./Dockerfile) that containerize the application, and a <i>docker-compose.yml</i>
that exposes the port and creates the volumes of the container.  
To start the project in the container, run:

`npm run dev:start`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

and to stop it, you can either type Ctrl-X, or in a new terminal run:

`npm run dev:stop`

In case you need to install any dependencies to the project, in the terminal type:

`docker exec -it storefront /bin/bash`

and then you have a bash session inside the container. Once in there you can <i>npm install</i> dependencies as usual, and it will update the <i>packege.json</i> file.

### **Possible issues you might run into**

#### Docker image did not install the packages

During setup we ran into this issue. After running npm run dev:start the container exited with code 1 complaining that it couldn't find next. That happened because during the image build the node_modules didn't get installed. To fix this uncomment the lines indicated in the end of [the main docker compose file](./docker-compose.yml), than run:

```
docker-compose up
```

This will start the container with a placeholder command. Then open a new terminal tab and get inside the container by running:

```
docker-compose exec storefront bash
```

Once inside the container install all the dependencies by running:

```
npm i
npm i react-scripts@3.0.1 -g
```

Wait for it to finish installing the first npm i, than run the second command. Once both are done you can exit the container:

```
exit
```

Go into the first terminal window, the one that has docker running, **CTRL + C** there to kill the docker instance. Then go backk to [the main docker compose file](./docker-compose.yml) and comment out those lines that you uncommented in the first step.
And try running the development server again:

```
npm run dev:start
```

#### Running without docker **HIGLHLY NOT RECOMENDED**

If you ever need to run the project, or any of the scripts in package.json, without docker for debugging purposes, or because you don't have docker engine installed and want to develop without it (**HIGLHLY NOT RECOMENDED**), you will run into an access error for the folder .next and possibly for node_modules.
To bypass the access error in your machine run:

```
sudo chown -R <user> /home/<user>/<path_to_directory>/store_front/.next
```

and for node_modules:

```
sudo chown -R <user> /home/<user>/<path_to_directory>/store_front/node_modules
```

Test if it worked by running:

```
npm run dev
```

This will allow you to run the project without docker, however, keep in mind that some scripts are ready to be run in docker, including scripts that are added to the git hooks. So you might not get the full functionality of this setup for development if your not using docker. Also if you don't use docker because you don't have a docker engine installed, then the e2e tests will not run at all.
