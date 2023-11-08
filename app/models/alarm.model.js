import {INTEGER, STRING, BOOLEAN, UUIDV4, UUID, DECIMAL} from 'sequelize';
import sequelize from '#root/utils/database';

const Alarm = sequelize.define('alarm', {
    alarmId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    ownerEmail: {
        type: STRING,
    },
    vesselId: {
        type: UUID,
    },
    message: {
        type: STRING,
    },
    timestamp: {
        type: STRING,
    },
}, {
    tableName: 'alarms'
});
export default Alarm;