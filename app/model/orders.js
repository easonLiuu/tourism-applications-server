module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Orders = app.model.define('orders', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderNumber: STRING(20),
      userId: INTEGER,
      houseId: INTEGER,
      isPayed: {
        type: INTEGER,
        defaultValue: 0
      },
      createTime: {
        type: DATE,
        get(){
          return new Date(this.getDataValue('createTime')).getTime()
        }
      },
      updateTime: {
        type: DATE,
        get(){
          return new Date(this.getDataValue('updateTime')).getTime()
        }
      }
    });
  
    return Orders;
  }