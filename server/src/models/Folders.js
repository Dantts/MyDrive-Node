module.exports = (sequelize, dataType) => {
    const Folders = sequelize.define('folders', {
        name: {
            type: dataType.STRING,
            allowNull: false
        },
        public: {
            type: dataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isMain: {
            type: dataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Folders.associate = (models) => {
        Folders.belongsTo(models.users, {foreignKey: 'usersId'})
    }

    Folders.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.public;
        delete values.usersId;
        delete values.updatedAt;
        delete values.createdAt;
        delete values.isMain;
        return values;
    };

    return Folders;
};