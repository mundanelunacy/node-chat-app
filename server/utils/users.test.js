const expect = require('expect');
const {Users} = require('./users');



describe('Users', function(){

    var users ;
    beforeEach(function(){
        users = new Users();

        users.users = [{
            id: '1',
            name : 'Mike',
            room : 'Node Course'
        }, {
            id: '2',
            name : 'Jen',
            room : 'React Course'
        }, {
            id: '3',
            name : 'Julie',
            room : 'Node Course'
        }
    ]
    });
    

    it('should add new user', function(){
        
        var user = {
            id : '123',
            name : 'Toshi',
            room: 'The office fans'
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([{
            id: '1',
            name : 'Mike',
            room : 'Node Course'
        }, {
            id: '2',
            name : 'Jen',
            room : 'React Course'
        }, {
            id: '3',
            name : 'Julie',
            room : 'Node Course'
        },
        {
            id : '123',
            name : 'Toshi',
            room: 'The office fans'            
        }
        ]);
    });

    it('should return names for node course', function(){
        var userList = users.getUserList('Node Course');
        expect (userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React course', function(){
        var userList = users.getUserList('React Course');
        expect (userList).toEqual(['Jen']);
    });

    it('should remove a user', function(){
        var resUser = users.removeUser('1');
        expect(users.users.length).toBe(2);
        expect(users.users).toEqual([
            {
                id:'2',
                name:'Jen',
                room : 'React Course'
            },{
                id: '3',
                name : 'Julie',
                room : 'Node Course'
            }
        ]);
        expect(resUser).toEqual({
            id: '1',
            name : 'Mike',
            room : 'Node Course'
        });
        
    });

    it ('should not remove user', function(){
        var resUser = users.removeUser('123');
        expect(users.users.length).toBe(3);
        expect(users.users).toEqual([
            {
                id: '1',
                name : 'Mike',
                room : 'Node Course'
            }, {
                id: '2',
                name : 'Jen',
                room : 'React Course'
            }, {
                id: '3',
                name : 'Julie',
                room : 'Node Course'
            }
        ]);
        expect(resUser).toNotExist();
    });

    it('should find user', function(){

        var resUser = users.getUser('1');
        expect(resUser).toEqual({
            id: '1',
            name : 'Mike',
            room : 'Node Course'
        });
    });

    it('should not find user', function(){
        var resUser = users.getUser('123');
        expect(resUser).toNotExist();
    });


});