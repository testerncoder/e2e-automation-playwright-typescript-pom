## 📝 Table of Contents

-   [Prerequisite](#prerequisite)
-   [Framework Setup](#frameworkSetup)
    -   [Auto Module Generator](#moduleGenerator)
    -   [Code Quality Setup (Eslint + Prettier)](#codeQualitySetup)
    -   [Useful commands](#commands)

## 🧐 Prerequisite <a name = "prerequisite"></a>

-   [Node js (recommended version >=14.0.0)](https://nodejs.org)
-   [NPM (recommended version >=6.14.0)](https://npmjs.com)

## 🏁 Framework Setup <a name = "frameworkSetup"></a>

```
npm install
```

### 📁 Auto Modules/Files Generator <a name = "moduleGenerator"></a>

To ensure the naming convention of the file in every module are consistent. Also, to provide a standard file structure.

#### For web automation files:

```
node customfilegenerator.js --comp=filename
```

### 🥉 Code Quality Setup (Eslint + Prettier) <a name = "codeQualitySetup"></a>

-   This framework is using Airbnb Eslint rules to ensure javascript code standards.
-   Javascript code is written in ES6.
-   This framework is configured with prettier to ensure the code indentation is consistent across.

```
npm run lint
```

### 🚀 Useful commands <a name = "commands"></a>

## ⏳ Test Execution Control (Environment Specific) <a name = "testExecutionControl"></a>

This framework has the ability to decide, which test cases should be executed on which environment. Therefore, it executes the test cases on the basis of current environment in which the build is being deployed.

For Example, when a build is triggered on the **Test** it executes all the test cases available on the project as **Regression Test**, on the **Test** environment, similarly on **Staging**. But when build is finally triggered on **Non-Prod** environment, only the **PVT** test cases are executed.

## ✔️ API Schema Validation <a name = "apiSchemaValidation"></a>


