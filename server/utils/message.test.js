var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', function(){
    it('should generate correct location object', function(done){
        var from = "Admin";
        var latitude = 1;
        var longitude = 1;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`; 

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({from,url});
        expect(message.createdAt).toBeA('number');
        done();
    });
});