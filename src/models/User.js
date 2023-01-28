const User = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            displayName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
            underscored: true,
        });

    User.associate = ({ BlogPost }) => {
        User.hasMany(BlogPost, { foreignKey: 'userId', as: 'posts' });
    };

    return User;
};

module.exports = User;