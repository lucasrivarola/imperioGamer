module.exports =(sequelize,dataType) => {
    const Category = sequelize.define("categories",{

        category_name:{
            type: dataType.STRING
        }
        
    },{
        tableName: "categories",
        timestamps: false
    },
    {
        timestamps: false
    }
    )

    Category.associate = function(models){

        Category.hasMany(models.products,{
        as:"products",
        foreignKey: "category_id"
        })

    }
    return Category
}

