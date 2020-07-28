module.exports =(sequelize,dataType) => {
    const Carrito = sequelize.define("carritos",{

        usuario_id:{
            type: dataType.INTEGER
        }
        
    },
    {
        timestamps: false
    }
    )

    Carrito.associate = function(models){
        Carrito.belongsToMany(models.products,{
            as:"products",
            through: "carrito_producto",
            foreignKey: "carrito_id",
            otherKey: "product_id",
            timestamps: false
        })

        Carrito.belongsTo(models.usuarios,{
            as:"usuario",
            foreignKey: "usuario_id"
        })
    }
    return Carrito
}