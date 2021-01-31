module.exports = (sequelize, Sequelize) => {
    const chakKa = sequelize.define("chakKa", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      moshur: {
        type: Sequelize.INTEGER
      },
      moshurAbadi: {
        type: Sequelize.INTEGER
      },
      mug: {
        type: Sequelize.INTEGER
      },
      mugAbadi: {
        type: Sequelize.INTEGER
      },
      mashkolai: {
        type: Sequelize.INTEGER
      },
      mashkolaiAbadi: {
        type: Sequelize.INTEGER
      },
      kheshari: {
        type: Sequelize.INTEGER
      },
      kheshariAbadi: {
        type: Sequelize.INTEGER
      },
      felon: {
        type: Sequelize.INTEGER
      },
      felonAbadi: {
        type: Sequelize.INTEGER
      },
      arohor: {
        type: Sequelize.INTEGER
      },
      arohorAbadi: {
        type: Sequelize.INTEGER
      },
      shorisha: {
        type: Sequelize.INTEGER
      },
      shorishaAbadi: {
        type: Sequelize.INTEGER
      },
      til: {
        type: Sequelize.INTEGER
      },
      tilAbadi: {
        type: Sequelize.INTEGER
      },
      soyabean: {
        type: Sequelize.INTEGER
      },
      soyabeanAbadi: {
        type: Sequelize.INTEGER
      },
      chinabadam: {
        type: Sequelize.INTEGER
      },
      chinabadamAbadi: {
        type: Sequelize.INTEGER
      },
      sunflower: {
        type: Sequelize.INTEGER
      },
      sunflowerAbadi: {
        type: Sequelize.INTEGER
      },
      onion: {
        type: Sequelize.INTEGER
      },
      onionAbadi: {
        type: Sequelize.INTEGER
      },
      roshun: {
        type: Sequelize.INTEGER
      },
      roshunAbadi: {
        type: Sequelize.INTEGER
      },
      holud: {
        type: Sequelize.INTEGER
      },
      holudAbadi: {
        type: Sequelize.INTEGER
      },
      morich: {
        type: Sequelize.INTEGER
      },
      morichAbadi: {
        type: Sequelize.INTEGER
      },
      ada: {
        type: Sequelize.INTEGER
      },
      adaAbadi: {
        type: Sequelize.INTEGER
      },
      dhonia: {
        type: Sequelize.INTEGER
      },
      dhoniaAbadi: {
        type: Sequelize.INTEGER
      },
      kalojira: {
        type: Sequelize.INTEGER
      },
      kalojiraAbadi: {
        type: Sequelize.INTEGER
      },
      bikolpo: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
     
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      },
      dd_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return chakKa;
  };