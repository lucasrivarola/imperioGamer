module.exports =(sequelize,dataType) => {
    const Product = sequelize.define("products",{

        product_name:{
            type: dataType.STRING
        },

        price:{
            type: dataType.INTEGER
        },

        prod_description:{
            type: dataType.STRING
        },

        discount:{
            type: dataType.INTEGER
        },

        platform_id:{
            type: dataType.INTEGER
        },

        language_id:{
            type: dataType.INTEGER
        },
        
        category_id:{
            type: dataType.INTEGER
        },

        createdAt:{
            type: dataType.DATE
        },

        updatedAt:{
            type: dataType.DATE
        },

        image:{
            type: dataType.STRING
        },

        section:{
            type: dataType.STRING
        }

        
    },
    )

    Product.associate = function(models){
        Product.belongsToMany(models.carritos,{
            as:"carritos",
            through: "carrito_producto",
            foreignKey: "product_id",
            otherKey: "carrito_id",
            timestamps: false
        })

        Product.belongsTo(models.platforms,{
            as:"platforms",
            foreignKey: "platform_id"
        })

        Product.belongsTo(models.languages,{
            as:"languages",
            foreignKey: "language_id"
        })

        
        Product.belongsTo(models.categories,{
            as:"categories",
            foreignKey: "category_id"
        })
    }
    return Product
}