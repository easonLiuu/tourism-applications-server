module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Comment = app.model.define('comment', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: INTEGER,
      houseId: INTEGER,
      msg: STRING(500),
      createTime: DATE
    });

    //多表联查

    //多对一
    Comment.associate = () => {
        app.model.Comment.belongsTo(app.model.User, { foreignKey: 'userId'});
    }

  
    return Comment;
  }