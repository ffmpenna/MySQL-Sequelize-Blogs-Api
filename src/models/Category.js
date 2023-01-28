const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'categories',
            timestamps: false,
            underscored: true,
        });

    return Category;
};

module.exports = Category;