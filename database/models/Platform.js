module.exports =(sequelize,dataType) => {
    const Platform = sequelize.define("platforms",{
        platform_name:{
            type: dataType.STRING
        }
    },
    {
        timestamps: false
    }
    )

    Platform.associate = function(modelos) {
        Platform.hasMany(modelos.products, {
            as: "products",
            foreignKey: "platform_id"
        })
    }
    return Platform
}

    
