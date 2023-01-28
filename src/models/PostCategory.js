module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
        'PostCategory',
        {
            postId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                reference: {
                    model: 'BlogPost',
                    key: 'id'
                },
            },
            categoryId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                reference: {
                    model: 'Category',
                    key: 'id'
                },
            },
        },
        {
            tableName: 'post_categories',
            timestamps: false,
            underscored: true,
        }
    );

    PostCategory.associate = ({ BlogPost, Category }) => {
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            foreignKey: 'postId',
            otherKey: 'categoryId',
            through: PostCategory,
        });
        Category.belongsToMany(BlogPost, {
            as: 'blogpost',
            foreignKey: 'categoryId',
            otherKey: 'postId',
            through: PostCategory,
        });
    };

    return PostCategory;
};