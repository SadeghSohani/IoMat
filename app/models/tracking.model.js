import { DECIMAL, DATE, UUIDV4, UUID, INTEGER} from 'sequelize';
import sequelize from '#root/utils/database';

const Tracking = sequelize.define('tracking', {
    messageId: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: UUID,
    },
    vesselId: {
        type: UUID,
    },
    latitude: {
        type: DECIMAL,
    },
    longitude: {
        type: DECIMAL,
    },
    timestamp: {
        allowNull: false,
        type: DATE,
        defaultValue: sequelize.fn('NOW'),
    },
    status: {
        type: INTEGER,
    },
    accuracy: {
        type: INTEGER,
    },
    GpsStatus: {
        type: INTEGER,
    },
    batteryStatus: {
        type: INTEGER,
    },
    speed: {
        type: INTEGER,
    },
    originPort: {
        type: UUID,
    },
    destinationPort: {
        type: UUID,
    },
}, {
    tableName: 'tracking'
});
// make database if needed.
// await sequelize.sync({ force: true });
export default Tracking;