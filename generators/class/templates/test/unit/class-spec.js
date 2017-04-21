/* jshint node:true, expr:true */
'use strict';

const _sinon = require('sinon');
const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;

const _rewire = require('rewire');
const _testHelper = require('wysknd-test');
const _testValueProvider = _testHelper.testValueProvider;
const ObjectMock = _testHelper.ObjectMock;
let <%= className %> = null;

describe('<%= className %>', () => {

    function _create<%= className %>() {
        //TODO: There will typically be some default initializations here.
        return new <%= className %>();
    }

    beforeEach(() => {
        <%= className %> = _rewire('../../src/<%= classFile %>');
    });

    describe('ctor()', () => {
        it('should return an object with expected methods and properties when invoked', () => {
            const instance = new <%= className %>();

            expect(instance).to.be.an('object');
            //TODO: Add tests for methods/properties
        });
    });
});
