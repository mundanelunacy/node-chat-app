var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', function(){
    it('should generate the correct message object', function(done){
        // store res in variable
        var message = {
            from :'user', 
            text : 'some message'
        }
        var res = generateMessage(message.from, message.text);

        // asert from match 
        // asert text match
        // assert createdAt is number

        expect(res.from).toBe(message.from);
        expect(res.text).toBe(message.text);
        expect(res.createdAt).toBeA('number');
        done();

    });
});