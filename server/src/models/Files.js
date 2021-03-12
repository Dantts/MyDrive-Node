module.exports = (sequelize, dataType) => {
    const Files = sequelize.define('files', {
        name: {
            type: dataType.STRING,
            allowNull: false
        },
        keyName: {
            type: dataType.STRING,
            allowNull: false
        },
        url: {
            type: dataType.STRING,
            allowNull: false
        },
        path: {
            type: dataType.STRING,
            allowNull: false
        },
        size: {
            type: dataType.INTEGER,
            allowNull: false
        },
        public: {
            type: dataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Files.associate = (models) => {
        Files.belongsTo(models.users, {foreignKey: 'usersId'})
        Files.belongsTo(models.folders, {foreignKey: 'foldersId'})
    }

    Files.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.path;
        delete values.public;
        delete values.usersId;
        delete values.foldersId;
        delete values.updatedAt;
        delete values.keyName;
        return values;
    };

    return Files;
};