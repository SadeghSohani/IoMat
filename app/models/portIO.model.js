import {INTEGER, STRING, BOOLEAN, UUIDV4, UUID, DECIMAL} from 'sequelize';
import sequelize from '#root/utils/database';

const PortIO = sequelize.define('portIO', {
    id: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    portId: {
        defaultValue: UUIDV4,
        type: UUID,
    },
    vesselId: {
        defaultValue: UUIDV4,
        type: UUID,
    },
}, {
    tableName: 'portIO'
});

export default PortIO;