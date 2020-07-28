module.exports =(sequelize,dataType) => {
    const CarritoProdcuto = sequelize.define("carritoProductos",{

        carrito_id:{
            type: dataType.INTEGER
        },

        product_id:{
            type: dataType.INTEGER
        },

        cantidad:{
            type: dataType.INTEGER
        },
        
        price:{
            type: dataType.INTEGER
        }
    },
    {
        tableName: "carrito_producto",
        timestamps: false
    }
    )   
    return CarritoProdcuto
}