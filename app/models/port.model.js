import {INTEGER, STRING, BOOLEAN, UUIDV4, UUID, DECIMAL} from 'sequelize';
import sequelize from '#root/utils/database';

const Port = sequelize.define('port', {
    portId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    portSerial: {
        type: STRING,
    },
    portName: {
        type: STRING,
    },
    portType: {
        type: STRING,
    },
    about: {
        type: STRING,
    },
    country: {
        type: STRING,
    },
    latitude: {
        type: DECIMAL,
    },
    longitude: {
        type: DECIMAL,
    },
}, {
    tableName: 'ports'
});
// make database if needed.
// await sequelize.sync({ force: true });
export default Port;