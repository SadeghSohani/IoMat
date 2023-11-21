import {INTEGER, STRING, BOOLEAN, UUIDV4, UUID, DECIMAL} from 'sequelize';
import sequelize from '#root/utils/database';

const Vessel = sequelize.define('vessel', {
    vesselId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    ownerEmail: {
        type: STRING,
    },
    vesselSerial: {
        type: STRING,
    },
    vesselName: {
        type: STRING,
    },
    vesselType: {
        type: STRING,
    },
    about: {
        type: STRING,
    },
    vesselSize: {
        type: STRING,
    },
    flag: {
        type: STRING,
    },
    inTransit: {
        type: BOOLEAN,
    },
    lastLatitude: {
        type: DECIMAL,
    },
    lastLongitude: {
        type: DECIMAL,
    },
    originPort: {
        type: UUID,
    },
    destinationPort: {
        type: UUID,
    },
}, {
    tableName: 'vessels'
});
// make database if needed.
// await sequelize.sync({ force: true });
export default Vessel;