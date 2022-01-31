var generator = require('custom-template-generator')
var mergedirs = require('merge-dirs')
var rimraf = require('rimraf')
/* 
comp varaible needs to be passed by user, and files will be created under the respective folders/dir 
with the name '{comp}.*'
eg. comp=search
Created: pom\search\page\search.page.ts: 
Created: pom\search\data\search.data.json: 
Created: pom\search\test\G&N\search.test.ts:
*/
var component = process.argv.slice(2)[0].split('comp=').splice(-1)[0]

generator({
    componentName: component,
    // template folder path
    customTemplatesUrl: './templates/',
    // root folder, where file needs to be created
    dest: 'pom',
    // template folder name, under which template files exist
    templateName: 'web',
    autoIndent: true,
    data: {
        uiconfig: JSON.stringify({
            test: 42,
            lolo: {
                pop: 42,
                storme: 2,
            },
        }),
    },
})

//disable-eslint
setTimeout(() => {
    // https://github.com/m2omou/custom-template-generator/issues/9
    console.log('generating files...')
    /**  Above file generator creates new files every time under the given component folder, to get the files created in the
   correct location under the root folder, we need to move the newly created files into the right folders.*/
    mergedirs(`pom/${component}`, 'pom/', 'ask')
    // Mergedirs is merging the newly created files under the given comp={variable} folder into the respective folders under root dir.
    console.log('success...')
    // After merging the folders/dirs, we need to delete the newly created folder
    rimraf(`pom/${component}`, () => null)
}, 5000)

/**
 * Note: Before Using this template generator, we need to make sure we are passing the unique component name
 * which does not already exist in the root folders.
 *
 * It will overwrite the files if already exist.
 *
 * we can use this file generator via command -  node customfilegenerator.js --comp=test
 *
 */
