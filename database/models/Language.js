module.exports =(sequelize,dataType) => {
    const Lenguage = sequelize.define("languages",{
        language_name:{
            type: dataType.STRING
        }
    },
    {
        timestamps: false
    }
    )

    Lenguage.associate = function(modelos) {
        Lenguage.hasMany(modelos.products, {
            as: "products",
            foreignKey: "language_id"
        })
    }
    return Lenguage
}
    
