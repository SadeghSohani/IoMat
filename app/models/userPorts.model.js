import {INTEGER, STRING, BOOLEAN, UUIDV4, UUID, DECIMAL} from 'sequelize';
import sequelize from '#root/utils/database';

const UserPorts = sequelize.define('userPorts', {
    userPortId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    userEmail: {
        type: STRING,
    },
    portId: {
        type: UUID,
    },
}, {
    tableName: 'userPorts'
});
// make database if needed.
// await sequelize.sync({ force: true });
export default UserPorts;