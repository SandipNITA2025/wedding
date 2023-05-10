module.exports = function (sequelize, DataTypes) {
    return sequelize.define("weddingimages", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        
        imageName: {
            type: DataTypes.STRING(26000),
            allowNull: true,
        
        }
    },
    {
        indexes:[
            {    
                 name: 'wedding1_index',
                 using: 'BTREE',
                 fields: ['id']
            }
           
        ]
    });
};
