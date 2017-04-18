'use strict';

module.exports = {
    /**
     * Prompts a user for project information that is not already known.
     *
     * @param {Object} gen Reference to the generator that is invoking
     *        the prompts.
     * @param {Booleabn} force A parameter that forces re prompting even if
     *        values exist in the config file.
     * @return {Promise} A promise that is resolved/rejected after user input
     *         is completed.
     */
    getProjectInfo: function(gen, force) {
        const properties = [
            'projectName',
            'projectDescription'
        ];
        const config = {};
        properties.forEach((propName) => {
            config[propName] = gen.config.get(propName);
        });

        const prompts = [ ];

        if(!config.projectName || force) {
            prompts.push({
                type: 'input',
                name: 'projectName',
                message: 'Project name?',
                default: (config.projectName || gen.appname).replace(/\s/g, '-')
            });
        }

        if(!config.projectDescription || force) {
            prompts.push({
                type: 'input',
                name: 'projectDescription',
                message: 'Project description?',
                default: config.projectDescription ||
                            'Node.js library'
            });
        }

        return gen.prompt(prompts).then((props) => {
            gen.props = gen.props || {};
            properties.forEach((propName) => {
                const propValue = props[propName] || config[propName];

                gen.props[propName] = propValue;
                gen.config.set(propName, propValue);
            });
        });
    },

    /**
     * Prompts a user for author information that is not already known.
     *
     * @param {Object} gen Reference to the generator that is invoking
     *        the prompts.
     * @param {Booleabn} force A parameter that forces re prompting even if
     *        values exist in the config file.
     * @return {Promise} A promise that is resolved/rejected after user input
     *         is completed.
     */
    getAuthorInfo: function(gen, force) {
        const properties = [
            'authorName',
            'authorEmail',
            'githubUsername'
        ];
        const config = {};
        properties.forEach((propName) => {
            config[propName] = gen.config.get(propName);
        });

        const prompts = [ ];

        if(!config.authorName || force) {
            prompts.push({
                type: 'input',
                name: 'authorName',
                message: 'Author name?',
                default: config.authorName || '__NA__'
            });
        }

        if(!config.authorEmail || force) {
            prompts.push({
                type: 'input',
                name: 'authorEmail',
                message: 'Author email?',
                default: config.authorEmail || '__NA__'
            });
        }

        if(!config.githubUsername || force) {
            prompts.push({
                type: 'input',
                name: 'githubUsername',
                message: 'Github username?',
                default: config.githubUsername || '__NA__'
            });
        }

        return gen.prompt(prompts).then((props) => {
            gen.props = gen.props || {};
            properties.forEach((propName) => {
                const propValue = props[propName] || config[propName];

                gen.props[propName] = propValue;
                gen.config.set(propName, propValue);
            });
        });
    }
};
