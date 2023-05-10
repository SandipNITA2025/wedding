module.exports = function (sequelize, DataTypes) {
    return sequelize.define("chatsettiing", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
        },
    
        isActive: {
            type: DataTypes.BOOLEAN,
            required: true,
        },
        weddingDate: {
            type: DataTypes.DATE,
            required: true,
        },

         
        weddingTime: {
            type: DataTypes.DATE,
            required: true,
        },
    },
    {
        indexes:[
            {    
                 name: 'chatsetting_index',
                 using: 'BTREE',
                 fields: ['id']
            }
           
        ]
    });
};
