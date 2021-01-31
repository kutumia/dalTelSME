module.exports = (sequelize, Sequelize) => {
    const bijSale = sequelize.define("bijsale", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      number: {
        type: Sequelize.STRING
      },

      moshur: {
        type: Sequelize.STRING
      },
      moshurAmount: {
        type: Sequelize.INTEGER
      },
      moshurSale: {
        type: Sequelize.INTEGER
      },
      moshurBlock: {
        type: Sequelize.STRING
      },

      mug: {
        type: Sequelize.STRING
      },
      mugAmount: {
        type: Sequelize.INTEGER
      },
      mugSale: {
        type: Sequelize.INTEGER
      },
      mugBlock: {
        type: Sequelize.INTEGER
      },

      mashkolai: {
        type: Sequelize.STRING
      },
      mashkolaiAmount: {
        type: Sequelize.INTEGER
      },
      mashkolaiSale: {
        type: Sequelize.INTEGER
      },
      mashkolaiBlock: {
        type: Sequelize.INTEGER
      },

      kheshari: {
        type: Sequelize.STRING
      },
      kheshariAmount: {
        type: Sequelize.INTEGER
      },
      kheshariSale: {
        type: Sequelize.INTEGER
      },
      kheshariBlock: {
        type: Sequelize.INTEGER
      },

      felon: {
        type: Sequelize.STRING
      },
      felonAmount: {
        type: Sequelize.INTEGER
      },
      felonSale: {
        type: Sequelize.INTEGER
      },
      felonBlock: {
        type: Sequelize.INTEGER
      },

      arohor: {
        type: Sequelize.STRING
      },
      arohorAmount: {
        type: Sequelize.INTEGER
      },
      arohorSale: {
        type: Sequelize.INTEGER
      },
      arohorBlock: {
        type: Sequelize.INTEGER
      },


      shorisha: {
        type: Sequelize.STRING
      },
      shorishaAmount: {
        type: Sequelize.INTEGER
      },
      shorishaSale: {
        type: Sequelize.INTEGER
      },
      shorishaBlock: {
        type: Sequelize.INTEGER
      },

      til: {
        type: Sequelize.STRING
      },
      tilAmount: {
        type: Sequelize.INTEGER
      },
      tilSale: {
        type: Sequelize.INTEGER
      },
      tilBlock: {
        type: Sequelize.INTEGER
      },


      soyabean: {
        type: Sequelize.STRING
      },
      soyabeanAmount: {
        type: Sequelize.INTEGER
      },
      soyabeanSale: {
        type: Sequelize.INTEGER
      },
      soyabeanBlock: {
        type: Sequelize.INTEGER
      },

      chinabadam: {
        type: Sequelize.STRING
      },
      chinabadamAmount: {
        type: Sequelize.INTEGER
      },
      chinabadamSale: {
        type: Sequelize.INTEGER
      },
      chinabadamBlock: {
        type: Sequelize.INTEGER
      },

      sunflower: {
        type: Sequelize.STRING
      },
      sunflowerAmount: {
        type: Sequelize.INTEGER
      },
      sunflowerSale: {
        type: Sequelize.INTEGER
      },
      sunflowerBlock: {
        type: Sequelize.INTEGER
      },

      onion: {
        type: Sequelize.STRING
      },
      onionAmount: {
        type: Sequelize.INTEGER
      },
      onionSale: {
        type: Sequelize.INTEGER
      },
      onionBlock: {
        type: Sequelize.INTEGER
      },

      roshun: {
        type: Sequelize.STRING
      },
      roshunAmount: {
        type: Sequelize.INTEGER
      },
      roshunSale: {
        type: Sequelize.INTEGER
      },
      roshunBlock: {
        type: Sequelize.INTEGER
      },

      holud: {
        type: Sequelize.STRING
      },
      holudAmount: {
        type: Sequelize.INTEGER
      },
      holudSale: {
        type: Sequelize.INTEGER
      },
      holudBlock: {
        type: Sequelize.INTEGER
      },

      morich: {
        type: Sequelize.STRING
      },
      morichAmount: {
        type: Sequelize.INTEGER
      },
      morichSale: {
        type: Sequelize.INTEGER
      },
      morichBlock: {
        type: Sequelize.INTEGER
      },

      ada: {
        type: Sequelize.STRING
      },
      adaAmount: {
        type: Sequelize.INTEGER
      },
      adaSale: {
        type: Sequelize.INTEGER
      },
      adaBlock: {
        type: Sequelize.INTEGER
      },

      dhonia: {
        type: Sequelize.STRING
      },
      dhoniaAmount: {
        type: Sequelize.INTEGER
      },
      dhoniaSale: {
        type: Sequelize.INTEGER
      },
      dhoniaBlock: {
        type: Sequelize.INTEGER
      },

      kalojira: {
        type: Sequelize.STRING
      },
      kalojiraAmount: {
        type: Sequelize.INTEGER
      },
      kalojiraSale: {
        type: Sequelize.INTEGER
      },
      kalojiraBlock: {
        type: Sequelize.INTEGER
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
  
    return bijSale;
  };