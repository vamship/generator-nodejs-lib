'use strict';

const Generator = require('yeoman-generator');
const _pascalCase = require('pascalCase');
const _decamelize = require('decamelize');

const _prompts = require('../../utils/prompts');
const _consts = require('../../utils/constants');

module.exports = class extends Generator {
    /**
     * Initializes the generator.
     */
    constructor(args, opts) {
        super(args, opts);
    }

    /**
     * Shows a the title of the sub generator, and a brief description.
     */
    showTitle() {
        this.log(_consts.SEPARATOR);
        this.log('Create new class:');
        this.log();
    }

    /**
     * Gathers class information.
     */
    gatherClassInfo() {
        const prompts = [{
            type: 'input',
            name: 'className',
            message: 'Class name?',
            default: answer => `MyClass`,
            filter: answer => _pascalCase(answer)
        }, {
            type: 'input',
            name: 'classDescription',
            message: 'Class description?',
            default: 'My class'
        }];

        return _prompts.getProjectInfo(this, false)
            .then(() => {
                return this.prompt(prompts).then((props) => {
                    this.props = Object.assign(this.props || {}, props);
                });
            });
    }

    /**
     * Generates target file names.
     */
    generateTargetFileNames() {
        const classFile = _decamelize(this.props.className)
                                .replace(/_/g, '-');

        this.props.classFile = `${classFile}`;
        this.props.classSpecFile = `${classFile}-spec`;
    }

    /**
     * Creates the necessary files for the class
     */
     createClass() {
         this.fs.copyTpl(
             this.templatePath(`src/class.js`),
             this.destinationPath(`src/${this.props.classFile}.js`),
             this.props
         );
         this.fs.copyTpl(
             this.templatePath(`test/unit/class-spec.js`),
             this.destinationPath(`test/unit/${this.props.classSpecFile}.js`),
             this.props
         );
     }
};
