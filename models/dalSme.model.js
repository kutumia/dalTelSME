module.exports = (sequelize, Sequelize) => {
    const dalSme = sequelize.define("dalsme", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      dealer: {
        type: Sequelize.STRING
      },
      regi: {
        type: Sequelize.STRING
      },
      uddog: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.STRING
      },
      dd_id: {
        type: Sequelize.STRING
      },
    });
  
    return dalSme;
  };