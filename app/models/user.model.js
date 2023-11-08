import { STRING, BOOLEAN, UUID, UUIDV4 } from 'sequelize';
import sequelize from '#root/utils/database';

const User = sequelize.define('user', {
    userId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    email: {
        type: STRING,
    },
    password: {
        type: STRING,
    },
    firstName: {
        type: STRING,
    },
    lastName: {
        type: STRING,
    },
    legal: {
        type: BOOLEAN,
        default: false,
    },
    companyName: {
        type: STRING,
    },
    address: {
        type: STRING,
    },
    phoneNumber:{
        type: STRING,
    },
    verified: {
        type: BOOLEAN,
        default: false,
    },
    role:{
        type: STRING,
        default: "CUSTOMER",
    },

}, {
    tableName: 'users'
});
// make database if needed.
await sequelize.sync({ force: true });
export default User;