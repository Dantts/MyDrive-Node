module.exports = (sequelize, dataType) => {
    const Users = sequelize.define('users', {
        username: {
            type: dataType.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataType.STRING,
            allowNull: false,
        },
        email: {
            type: dataType.STRING,
            allowNull: false
        },
        urlProfile: {
            type: dataType.STRING,
            allowNull: true
        },
        pathProfile: {
            type: dataType.STRING,
            allowNull: true
        },
        storageSize: {
            type: dataType.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        storageTotalSize: {
            type: dataType.DOUBLE,
            allowNull: false,
            defaultValue: 10737418240
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.files, { foreignKey: 'usersId'})
    }

    Users.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        delete values.pathProfile;
        delete values.updatedAt;
        return values;
    };

    return Users;
}