'use strict';

const Generator = require('yeoman-generator');
const _chalk = require('chalk');
const _yosay = require('yosay');

const _prompts = require('../../utils/prompts');
const _consts = require('../../utils/constants');
const _package = require('../../package.json');

module.exports = class extends Generator {
    /**
     * Initializes the generator.
     */
    constructor(args, opts) {
        super(args, opts);
    }

   /**
    * Gather basic project information.
    */
    gatherProjectInfo() {
        const generatorTitle = `${_consts.GENERATOR_NAME} v${_package.version}`;
        this.log(_yosay(
            `Node.js Library Generator.\n${_chalk.red(generatorTitle)} `
        ));
        return _prompts.getProjectInfo(this, true)
             .then(() => { return _prompts.getAuthorInfo(this, true); });
    }

    /**
     * Creates project files
     */
    createProjectFiles() {
        [
            'package.json',
            'Gruntfile.js',
            'buildspec.yml',
            'README.md',
            '_gitignore',
            '_npmignore',
            '_projections.json',
            '_eslintrc.json',
            '_esformatter',
            'src/index.js',
            'test/unit/index-spec.js'
        ].forEach((srcFile) => {
            const destFile = (srcFile.indexOf('_') === 0) ?
                                        srcFile.replace('_', '.'): srcFile;
            this.fs.copyTpl(
                this.templatePath(srcFile),
                this.destinationPath(destFile),
                this.props
            );
        });
    }

    /**
     * Finish the rest of the main flow by composing sub generators.
     */
    compose() {
        this.composeWith(`${_consts.GENERATOR_NAME}:${_consts.SUB_GEN_FINISH}`);
    }
};
