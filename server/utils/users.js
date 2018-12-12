// Data structure
// [{
//     id : '/#asdfds',
//     name : 'Andrew',
//     room : 'The office fans'
// }]

// Method
// addUser(id, name, room)
// removeUser (id)
// getUser(id)
// getUserList(room)

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var returnUser = this.getUser(id);

        if(returnUser){
            this.users = this.users.filter(function(user){
                return user.id !== id;
            });
        }

        return returnUser;
    }

    getUser(id){
        return this.users.filter(function(user){
            return user.id === id;
        })[0];
    }
    
    getUserList(room){
        var users = this.users.filter(function(user){
            return user.room === room;
        });

        var namesArray = users.map(function(user){
            return user.name;
        });

        return namesArray;
    }
}

module.exports= {Users};