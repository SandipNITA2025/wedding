module.exports = function (sequelize, DataTypes) {
    return sequelize.define("welcomemessages", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        welcomemesages: {
            type: DataTypes.STRING(26000),
            allowNull: true,
        },
        welcomeimage: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        indexes:[
            {    
                 name: 'welcomemessages_index',
                 using: 'BTREE',
                 fields: ['id']
            }
           
        ]
    });
};
