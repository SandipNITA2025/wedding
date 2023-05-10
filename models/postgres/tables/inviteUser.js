module.exports = function (sequelize, DataTypes) {
    return sequelize.define("invite_user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
        },
    
        isActive: {
            type: DataTypes.BOOLEAN,
            required: true,
        },
        
    },
    {
        indexes:[
            {    
                 name: 'invite_user_index',
                 using: 'BTREE',
                 fields: ['id']
            }
           
        ]
    });
};
