import bcrypt from 'bcryptjs'
const Users = [
    {
        name : 'Oumaima Boumarte',
        email : 'boumarteoumaima48@gmail.com',
        password : bcrypt.hashSync('123456789',12),
        isAdmin : true
    },
    {
        name : 'soni',
        email : 'oumaima@gmail.com',
        password : bcrypt.hashSync('123456789',12),
        isAdmin : false
    }
    
]
export default Users