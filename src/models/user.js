module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};

// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Users extends Model {
//     static associate(models) {
//       // define association here
//     }
//   }
//   Users.init(
//     {
//       password: DataTypes.STRING,
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//       isAdmin: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "User",
//       underscored: true,
//       timestamps: false,
//     }
//   );
//   return Users;
// };
