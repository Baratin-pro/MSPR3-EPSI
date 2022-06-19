'use strict';

const requestSql = {
  checkWasteDeposit: checkWasteDeposit(),
};

function checkWasteDeposit() {
  return 'SELECT SUM(`detaildepot`.`QuantiteDeposee`) AS `QuantityTotal`,\
  `typedechet`.`NomTypeDechet`,`centretraitement`.`NoCentre` \
  FROM detaildepot\
  INNER JOIN `typedechet` ON `typedechet`.`NoTypeDechet` = `detaildepot`.`NoTypeDechet`\
  INNER JOIN `centretraitement`ON `centretraitement`.`NoCentre` = `detaildepot`.`NoCentre`\
  INNER JOIN `tournee`ON `tournee`.`NoTournee` = `detaildepot`.`NoTournee`\
  WHERE `centretraitement`.`NoCentre` = ? AND `typedechet`.`NomTypeDechet` = ?';
}

module.exports = requestSql;
