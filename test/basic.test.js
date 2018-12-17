const assert = require('assert');

describe('basic.test', () => {
    it('should be true', (done) => {

        let value = false;
        value = true;
        assert.equal(value, true);

        done();
    });
});