const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
        'BlogPost',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            userId: {
                type: DataTypes.INTEGER,
                foreignKey: true,
            },
            content: {
                type: DataTypes.STRING,
            },
            published: {
                type: DataTypes.DATE,
            },
            updated: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'blog_posts',
            timestamps: false,
            underscored: true,
        });

    BlogPost.associate = ({ User }) => {
        BlogPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };

    return BlogPost;
};


module.exports = BlogPost;
